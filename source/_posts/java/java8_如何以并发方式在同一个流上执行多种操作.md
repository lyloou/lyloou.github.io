---
title: java8_如何以并发方式在同一个流上执行多种操作
date: 2021-05-07 11:55:46
toc: true
comments: true
tags:
  - java
---

java8 中，stream 流多次使用会抛出异常：java.lang.IllegalStateException: stream has already been operated upon or closed

所以如何解决呢——如何以并发方式在同一个流上执行多种操作

可以 借助 Spliterator，尤其是它的延迟绑定能力，结合 BlockingQueues 和 Futures 来实现这一大有裨益的特性

## 代码实现

```java

import java.util.*;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.Future;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.function.Consumer;
import java.util.function.Function;
import java.util.stream.Stream;
import java.util.stream.StreamSupport;

/**
 * 如何以并发方式在同一个流上执行多种操作
 * 参考：java8_in_action 附录C
 *
 * @author lilou
 * @since 2021/5/7
 */
public class StreamForker<T> {
    private final Stream<T> stream;
    private final Map<Object, Function<Stream<T>, ?>> forks = new HashMap<>();

    public StreamForker(Stream<T> stream) {
        this.stream = stream;
    }

    public StreamForker<T> fork(Object key, Function<Stream<T>, ?> f) {
        forks.put(key, f);
        return this;
    }

    public Results getResults() {
        ForkingStreamConsumer<T> consumer = build();
        try {
            stream.sequential().forEach(consumer);
        } finally {
            consumer.finish();
        }
        return consumer;
    }

    private ForkingStreamConsumer<T> build() {
        List<BlockingQueue<T>> queues = new ArrayList<>();
        Map<Object, Future<?>> actions = forks.entrySet()
                .stream()
                .reduce(
                        new HashMap<Object, Future<?>>(),
                        (map, e) -> {
                            map.put(e.getKey(), getOperationResult(queues, e.getValue()));
                            return map;
                        },
                        (m1, m2) -> {
                            m1.putAll(m2);
                            return m1;
                        }
                );
        return new ForkingStreamConsumer<>(queues, actions);
    }

    private Future<?> getOperationResult(List<BlockingQueue<T>> queues, Function<Stream<T>, ?> f) {
        BlockingQueue<T> queue = new LinkedBlockingQueue<>();
        queues.add(queue);
        final Spliterator<T> spliterator = new BlockingQueueSpliterator<>(queue);
        final Stream<T> source = StreamSupport.stream(spliterator, false);
        return CompletableFuture.supplyAsync(() -> f.apply(source));
    }

    public static interface Results {

        public <R> R get(Object key);
    }

    static class ForkingStreamConsumer<T> implements Consumer<T>, Results {
        static final Object END_OF_STREAM = new Object();
        private final List<BlockingQueue<T>> queues;
        private final Map<Object, Future<?>> actions;

        public ForkingStreamConsumer(List<BlockingQueue<T>> queues, Map<Object, Future<?>> actions) {
            this.queues = queues;
            this.actions = actions;
        }

        @SuppressWarnings({"unchecked", "SSBasedInspection"})
        @Override
        public <R> R get(Object key) {
            try {
                return ((Future<R>) actions.get(key)).get();
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        @Override
        public void accept(T t) {
            queues.forEach(q -> q.add(t));
        }

        public void finish() {
            //noinspection unchecked
            accept((T) END_OF_STREAM);
        }
    }

    static class BlockingQueueSpliterator<T> implements Spliterator<T> {
        private final BlockingQueue<T> q;

        public BlockingQueueSpliterator(BlockingQueue<T> q) {
            this.q = q;
        }

        @Override
        public boolean tryAdvance(Consumer<? super T> action) {
            T t;
            while (true) {
                //noinspection SSBasedInspection
                try {
                    t = q.take();
                    break;
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
            if (t != ForkingStreamConsumer.END_OF_STREAM) {
                action.accept(t);
                return true;
            }
            return false;
        }

        @Override
        public Spliterator<T> trySplit() {
            return null;
        }

        @Override
        public long estimateSize() {
            return 0;
        }

        @Override
        public int characteristics() {
            return 0;
        }
    }
}

```

## 测试

```java


import java.util.Arrays;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * @author lilou
 * @since 2021/5/7
 */
public class StreamForkerTest {
    public static void main(String[] args) {
        int[] a = new int[100];
        Arrays.fill(a, 1);
        Arrays.parallelPrefix(a, Integer::sum);

        final Stream<Integer> integerStream = Arrays.stream(a).boxed();
        final StreamForker.Results results = new StreamForker<>(integerStream)
                .fork("平均值", StreamForkerTest::average)
                .fork("求和", StreamForkerTest::sum)
                .fork("拼接", StreamForkerTest::concat)
                .getResults();

        String average = results.get("平均值");
        String sum = results.get("求和");
        String concat = results.get("拼接");

        System.out.println("平均值:" + average);
        System.out.println("求和:" + sum);
        System.out.println("拼接:" + concat);

    }

    private static String concat(Stream<Integer> stream) {
        return stream.map(String::valueOf).collect(Collectors.joining(","));
    }

    private static String sum(Stream<Integer> stream) {
        return stream.reduce(Integer::sum).map(String::valueOf).orElse("");
    }

    private static String average(Stream<Integer> stream) {
        return stream.mapToInt(Integer::intValue).summaryStatistics().getAverage() + "";
    }
}

```

**结果**

```
平均值:50.5
求和:5050
拼接:1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100
```

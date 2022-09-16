---
title: java并发学习
date: 2019-01-26 12:30:13
toc: true
comments: true
tags:
  - java
---

- [Java 并发编程 - 随笔分类 - 海 子 - 博客园](https://www.cnblogs.com/dolphin0520/category/602384.html)
- [Java 并发编程：volatile 关键字解析 - 海 子 - 博客园](https://www.cnblogs.com/dolphin0520/p/3920373.html)

## completableFuture

![readme-2021-07-14-17-10-12](https://raw.githubusercontent.com/lyloou/img/develop/readme-2021-07-14-17-10-12.png)

```java
final List<CompletableFuture<Void>> futureList = nameToContent.keySet().stream()
        .map(name -> CompletableFuture.runAsync(() -> doUploadFile(map, name, nameToContent), executor))
        .collect(Collectors.toList());

//noinspection ResultOfMethodCallIgnored
futureList.stream().map(CompletableFuture::join).collect(Collectors.toList());

// 注意：如果使用 count() 不会阻塞
// futureList.stream().map(CompletableFuture::join).count()
```

## 线程池如何合理配置

[CPU 密集型 和 IO 密集型 的区别，如何确定线程池大小？ - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1806245)
配置线程池可以从以下几个方面来考虑。

- 任务是 CPU 密集型、IO 密集型或者混合型；
- 任务优先级，高中低；
- 任务时间执行长短；
- 任务依赖性：是否依赖其他系统资源。

---

- CPU 密集型可以配置可能小的线程，比如：N+1 线程。
- IO 密集型（网络、磁盘 IO）可以配置较多的线程，如 2n 个线程。
- 混合型可以拆成 IO 密集型任务和 CPU 密集型任务，计算如下：
  > 最佳线程数目 = （线程等待时间与线程 CPU 时间之比 + 1）\* CPU 数目

```
示例：

假如一个程序平均每个线程CPU运行时间为0.5s，而线程等待时间（非CPU运行时间，比如IO）为1.5s，CPU核心数为8，那么最佳的线程数应该是？
     根据上面这个公式估算得到最佳的线程数：((0.5+1.5)/0.5)*8=32。

```

通过`Runtime.getRuntime().avaiableProcessors()`来获取 cpu 个数。

## 窃取线程池

```java

import cn.hutool.core.thread.ThreadUtil;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class ExecutorOfWorkStealingPoolTest {
    public static void main(String[] args) {
        final ExecutorService executorService = Executors.newWorkStealingPool();
        for (int i = 0; i < Integer.MAX_VALUE; i++) {
            System.out.println(i);
            int finalI = i;
            executorService.submit(() -> {
                System.out.println(Thread.currentThread().getName() + " - " + finalI);
                ThreadUtil.sleep(1000);
            });
        }
        ThreadUtil.sleep(1000000);
        executorService.shutdown();
    }
}

```

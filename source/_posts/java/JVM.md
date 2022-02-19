---
title: JVM
date: 2019-04-01 16:41:34
toc: true
comments: true
tags:
  - java
---

## 查看堆栈信息

### 查看当前机器上运行的 java 进程

[JVM--查看堆栈信息*u013891584 的博客-CSDN 博客*如何查看堆栈信息](https://blog.csdn.net/u013891584/article/details/80983494)

`jps -lvm`
命令格式 jps [options][hostid]
注：如果不指定 hostid 就默认为当前主机或服务器。
命令行参数选项说明如下：
-q 不输出类名、Jar 名和传入 main 方法的参数
-m 输出传入 main 方法的参数
-l 输出 main 类或 Jar 的全限名
-v 输出传入 JVM 的参数

`jstat -gc 21275`
-gc 垃圾回收堆的行为统计，常用命令
![JVM_2020-08-11-15-37-17](https://raw.githubusercontent.com/lyloou/img/develop/img/20210702091905.png)
C 即 Capacity 总容量，U 即 Used 已使用的容量
S0C : survivor0 区的总容量
S1C : survivor1 区的总容量
S0U : survivor0 区已使用的容量
S1C : survivor1 区已使用的容量
EC : Eden 区的总容量
EU : Eden 区已使用的容量
OC : Old 区的总容量
OU : Old 区已使用的容量
MC：方法区大小
MU：方法区使用大小
CCSC:压缩类空间大小
CCSU:压缩类空间使用大小
YGC : 新生代垃圾回收次数
YGCT : 新生代垃圾回收时间
FGC : 老年代垃圾回收次数
FGCT : 老年代垃圾回收时间
GCT : 垃圾回收总消耗时间

`jstat -gc 1262 2000 20`
这个命令意思就是每隔 2000ms 输出 1262 的 gc 情况，一共输出 20 次

[JVM 堆、栈信息监测*Think In JAVA—Max-CSDN 博客*查看 jvm 堆栈信息](https://blog.csdn.net/Daybreak1209/article/details/80540360)
![JVM_2020-08-11-15-45-17](https://raw.githubusercontent.com/lyloou/img/develop/img/20210702091918.png)

## Class 文件字节码结构示意图

![this is an image](https://github.com/lyloou/img/raw/develop/z/20191023193030.png)

## visualvm plugin

https://visualvm.github.io/pluginscenters.html
(注意如果是用 jvisualvm，要选择`Java VisualVM`的地址))

- [What is Java JDK, JRE and JVM - In-depth Analysis - HowToDoInJava](https://howtodoinjava.com/java/basics/jdk-jre-jvm/)
- [How the JIT compiler optimizes code](https://www.ibm.com/support/knowledgecenter/en/SSYKE2_8.0.0/com.ibm.java.vm.80.doc/docs/jit_optimize.html)

## [JVM 垃圾回收 之 强引用、弱引用、软引用、虚引用\_cyt-CSDN 博客](https://blog.csdn.net/qq_41291945/article/details/108549120)

```java

public class Strong {
    /**
     * 强引用 是最常见的引用， 首先用 new 关键字创建对象的时候
     * 这个对象就是一个强引用也就是默认的引用类型。 只要强引用的对象
     * 是可触及的， 那么他就不会被回收！如果强引用对象超过了他的作用范围
     * 或者被设置为 null  那就可以被回收了。
     *
     * 只要有强引用在， 当内存不足的时候jvm就算抛出OOM也不会回收掉它！
     */
    public static void main(String[] args) {
        String test_strong_reference = new String("test strong reference");
        String test = test_strong_reference;
        test_strong_reference = null;
        System.gc();

        try {
            TimeUnit.SECONDS.sleep(2);
        } catch (Exception e) {
            e.printStackTrace();
        }
        System.out.println("test_strong_reference - > "+ test_strong_reference);
        System.out.println("test - > "+test);
    }
}
```

```java

public class Soft {

    /**
     * 软引用， 用来描述那些还有用， 但是不是必须用的对象， 只被软引用关联着的对象
     * 在系统内存溢出之前，会把这些对象列进入回收范围之内进行二次回收， 如果回收之后
     * 内存还不够的话， 就抛出内存溢出的异常.
     * <p>
     * 可以在一些内存敏感的地方 进行使用, 高速缓存之类的
     * <p>
     * 内存够用的时候就保留软引用的可达对象
     * 内存不够的时候就回收可达对象
     *
     * @param args
     */
    public static void main(String[] args) {
        User cuiyt = new User(1, "cuiyt");
        SoftReference<User> reference = new SoftReference<User>(cuiyt);
        cuiyt = null;

        System.out.println(reference.get().toString());
        System.gc();
        System.out.println("after - > " + reference.get().toString());

        try {
            TimeUnit.SECONDS.sleep(3);
            byte[] bytes = new byte[1024 * 1024 * 7];
        } catch (Exception e) {
            e.printStackTrace();
        } finally {
            System.out.println(reference.get());
        }
    }
}


```

```java

public class Weak {
    /**
     * 弱引用， 发送GC就会被回收掉！ 不管内存够不够
     *
     * @param args
     */
    public static void main(String[] args) {

        WeakReference<User> test = new WeakReference<User>(new User(1, "@cuiyut"));
        System.out.println(test.get());
        System.gc();
        System.out.println(test.get());
    }
}


```

```java
public class Empty {
    public static Empty empty;
    public static PhantomReference<Empty> reference;
    public static ReferenceQueue<Empty> queue;

    @Override
    protected void finalize() throws Throwable {
        super.finalize();
        System.out.println("调用 finalize");
        empty = this;
    }

    public static class Check extends Thread {
        @Override
        public void run() {
            while (true) {
                super.run();
                if (reference != null) {
                    PhantomReference<Empty> test = null;
                    try {
                        test = (PhantomReference<Empty>) queue.remove();
                    } catch (Exception e) {

                    }
                    if (test != null) {
                        System.out.println("跟踪垃圾回收过程， Empty 被GC");
                    }
                }
            }
        }
    }

    /**
     * 形同虚设的一个引用类型， 当试图从虚引用中获得对象的时候
     * 它总是空的 ！ 为一个对象设置虚引用关联的唯一目的是跟踪垃圾回收的过程
     * 比如: 能在这个对象被回收的时候发出一个通知
     */
    public static void main(String[] args) {
        Check check = new Check();
        check.setDaemon(true);
        check.start();

        queue = new ReferenceQueue<>();
        empty = new Empty();
        reference = new PhantomReference<>(empty, queue);
        // 取消强引用
        empty = null;
        System.out.println(reference.get());

        System.out.println("第一次GC");
        // 把回收的对象， 放到引用队列中
        System.gc();
        try {
            TimeUnit.SECONDS.sleep(3);
        } catch (Exception e) {
            e.printStackTrace();
        }

        System.out.println("after 第一次GC");
        if (empty != null) {
            System.out.println("empty 可用");
        } else {
            System.out.println("empty 不可用");
        }
        System.out.println("第二次GC");

        // 取消强引用
        empty = null;
        System.gc();

        System.out.println("after 第二次GC");
        if (empty != null) {
            System.out.println("empty 可用");
        } else {
            System.out.println("empty 不可用");
        }
    }
}



```

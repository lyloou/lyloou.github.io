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
![](/images/article/JVM_2020-08-11-15-37-17.png)
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
![](/images/article/JVM_2020-08-11-15-45-17.png)

## Class 文件字节码结构示意图

![this is an image](https://github.com/lyloou/img/raw/develop/z/20191023193030.png)

## visualvm plugin

https://visualvm.github.io/pluginscenters.html
(注意如果是用 jvisualvm，要选择`Java VisualVM`的地址))

- [What is Java JDK, JRE and JVM - In-depth Analysis - HowToDoInJava](https://howtodoinjava.com/java/basics/jdk-jre-jvm/)
- [How the JIT compiler optimizes code](https://www.ibm.com/support/knowledgecenter/en/SSYKE2_8.0.0/com.ibm.java.vm.80.doc/docs/jit_optimize.html)

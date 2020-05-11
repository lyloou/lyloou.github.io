---
title: JVM参数列表
date: 2019-01-22 11:26:19
toc: true
comments: true
tags:
  - java
---

## [How to Set JVM Proxy Setting Without Touching the Code](http://www.glomelurus.com/2009/09/how-to-set-jvm-proxy-setting-without.html)

## `-X` 参数

On the basis of how we specify JVM option it can be divided into two parts, JVM Options which starts with –X and those which starts with -XX:

> 1.  JVM Options that begin with -X are non-standard (thy are not guaranteed to be supported on all JVM implementations), and are subject to change without notice in subsequent releases of the JDK.
> 2.  JVM Options or parameters which are specified with -XX are not stable and are not recommended for casual use. These options are subject to change without notice also.

[10 Examples of HotSpot JVM Options in Java](https://javarevisited.blogspot.com/2011/11/hotspot-jvm-options-java-examples.html#axzz5dIpc21eU)

【推荐】给 JVM 环境参数设置-XX:+HeapDumpOnOutOfMemoryError 参数，让 JVM 碰到 OOM 场
景时输出 dump 信息。
说明：OOM 的发生是有概率的，甚至相隔数月才出现一例，出错时的堆内信息对解决问题非常
有帮助。
// 《阿里巴巴 Java 开发手册 1.4.0pdf - p34》

## `-D`参数

参数 `-D` 是 Java 自带的，其功能是通过命令行设置一个 Java 系统属性。

## 常用参数

-Xms2G
-Xmx2G
-XX:NewRatio=4
-XX:SurvivorRatio=8
-XX:UseParNewGC
-XX:UseParallelOldGC
-XX:UseConcMarkSweepGC
-XX:+PrintGC
-XX:+PrintGCDetails

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

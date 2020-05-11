---
title: UML图
date: 2020-05-09 22:32:07
toc: true
comments: true
tags:
  - java
---

#### [UML 类图符号 各种关系说明以及举例](https://www.cnblogs.com/duanxz/archive/2012/06/13/2547801.html)

- 依赖（Dependency）:虚线箭头表示
- 关联（Association）：实线箭头表示
- 聚合（Aggregation）：带空心菱形头表示
  > 特征：属于是关联的特殊情况，体现部分-整体关系，是一种弱拥有关系；整体和部分可以有不一样的生命周期；是一种弱关联；
- 组合（Composition）：带实心菱形头的实线表示
  > 特征：属于是关联的特殊情况，也体现了体现部分-整体关系，是一种强“拥有关系”；整体与部分有相同的生命周期，是一种强关联；
- 泛化（Generalization）：带空心箭头的实线线表示 // 类继承类
- 实现（Realization）：空心箭头和虚线表示 // 类实现接口

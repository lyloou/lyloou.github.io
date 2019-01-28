---
title: UnsupportedOperationException at java.util.AbstractList.remove
date: 2016-07-19 09:23:17
toc: true
tags:
- android
---

## UnsupportedOperationException at java.util.AbstractList.remove(AbstractList.java:638)
【问题场景】
- 在给`RecyclerView.Adapter`传递数据源的时候，
我传递进去了`Arrays.asList`构成的列表，在调用`lists.remove()`方法删除某个元素的时候，出现了这个异常；

【解答】
- 我使用了`Arrays.asList()`方法，通过查看源码知道，这个方法调用了`Arras.ArrayList(E[])`来构建列表，
而这个列表是`final`的，不可modify的，所以会出现`UnsupportedOperationException`异常；
- 解决办法1：使用`new ArrayList<>();`的方式来新建列表，而不是`Arrays.asList`或数组的方式；
- 解决方法2：new ArrayList<>(Arrays.asList("1","2")); // 即封装下就可；

【外部链接】
- [Unable to modify ArrayAdapter in ListView: UnsupportedOperationException](http://stackoverflow.com/questions/3200551/unable-to-modify-arrayadapter-in-listview-unsupportedoperationexception)

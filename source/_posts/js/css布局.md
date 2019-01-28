---
title: CSS布局
date: 2017.12.17 09:27
toc: true
comments: true
tags:
- css
---

> 从局部到全面。一小块，一小块。
> 从全面到局部。逐级增大。

## Flex 布局教程
[Flex 布局教程：语法篇 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html)
[Flex 布局教程：实例篇 - 阮一峰的网络日志](http://www.ruanyifeng.com/blog/2015/07/flex-examples.html)

## 圆角图片
```css
.icon {
    border-radius:50%;
}
```

## 横向滚动
```css
.items {
    display: flex;
    flex-direction: row;
    overflow-x: scroll;
}
.item {
    width: 218px;
    margin: 15px;
    display: flex;
    flex-direction: column;
}
```
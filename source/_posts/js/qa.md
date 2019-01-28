---
title: js中的常见问题
date: 2017.08.16 17:12
toc: true
comments: true
tags:
- js
---

通过var拿到到对象的属性后，能直接删除它吗？（而不是通过类似`a[b]`的方式）
===========
```js
a={
    b:1,
    c:2,
}
delete a['b']; // ok，返回true

var k = a[b]; 
delete k; // 这样是不行，《JavaScript权威指南》p89中这样说：不能删除通过var声明的变量，返回false
```
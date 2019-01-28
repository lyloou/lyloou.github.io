---
title: CSS中易混淆概念
date: 2017.02.17 09:27
toc: true
comments: true
tags:
- css
---



### 轮廓（outline）的宽度是否影响元素尺寸？

在盒子模型里，元素的尺寸依赖于：边距，边框，填充，内容。

>
outline 属性与 border 属性不同：outline不是元素尺寸的一部分，元素的总宽度和高度不受轮廓宽度的影响。
轮廓不被视为页面的一部分，因此在应用它们时不会导致页面布局被调整。
http://www.w3cschool.cn/css/html-css-outline.html

ps:当宽度很宽时，outline直接覆盖到其他元素了。
通过颜色透明度来观察会更清晰：`outline:52px solid #80aaaaaa;`
（可以在`http://www.w3cschool.cn/tryrun/showhtml/trycss3_outline-offset`这个实验里修改更大的宽度和颜色看看。）


### 浮动和清除浮动
clear属性指定元素两侧不能出现浮动元素。
[CSS Float（浮动）](http://www.w3cschool.cn/css/css-float.html)

```
- 假如某个div元素A是浮动的，如果A元素上一个元素也是浮动的，那么A元素会跟随在上一个元素的后边
  (如果一行放不下这两个元素，那么A元素会被挤到下一行)；如果A元素上一个元素是标准流中的元素，那么A的相对垂直位置不会改变，也就是说A的顶部总是和上一个元素的底部对齐。
- clear属性只对当前被作用的标签有效，不能影响其他元素；
```
[经验分享：CSS浮动(float,clear)通俗讲解](http://www.cnblogs.com/iyangyuan/archive/2013/03/27/2983813.html)

### 常见的块级元素和内联元素
块级元素：
```
- div
- p
- h1, h2, h3, ..., h6
- ul
- table
```
内联元素：
```
- span
- b
- td
- a
- img
```

### 下拉菜单
http://www.w3cschool.cn/css/xohvqfmc.html
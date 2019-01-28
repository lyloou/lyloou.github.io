---
title: 《Android群英传》读书笔记
date: 2016-06-26 09:46:04
toc: true
tags:
- android
---

## 《Android群英传》 笔记

| apk 安装路径： --p220(q1)
- `/system/app` : 系统及别的 apk;
- `/data/app` : 用户安装的 apk;

| android 管理器
  pm(package manager)： 主宰着应用的包管理；
  am(activity manager): 主宰着应用的活动管理； --p210(q1)

| 如果说系统信息好比是国家的 GDP， 那么 Apk 应用信息则像是对个人的经济普查。 --p210(q1)

| 一个 Task 中的 Activity 可以来自不同的 APP，
同一个 App 的  Activity 也可能不再一个 Task 中。 --p200(q1)

| 一个合理的任务调度栈不仅是性能的保证，更是提供性能的基础。 --p200(q1)

| 如果你得自定义 View 需要频繁刷新，或者刷新时数据处理量比较大，
那么就可以考虑使用 SurfaceView 来取代 View 了。 --p155(q1)

| canvas 的方法： --p118(q1)
- save(): 保存画布；作用是将之前的所有已绘制图像保存起来，让后续的操作就好像在新图层上操作一样;
- restore(): 合并图层；作用是将 save 之后的和 save 之前的图像进行合并；
- translate(): 坐标系的平移；
- rotate(): 坐标系的翻转；


| scrollTo、scrollBy 方法移动的是 View 的 content, 即让 View 的内容移动( content )，
如果在 ViewGroup 中使用 scrollTo、 scrollBy 方法，那么移动的将是所有子 View；
例如： TextView, content 就是它的文本; ImageView, content 就是它的 drawable. --p95(q1)

| 形象的事件处理机制： --p62(q1)
- 事件的传递顺序：
    总经理(MyViewGroupA) --> 部长(MyViewGroupB) --> 你(View)。
    事件传递的时候，先执行 dispatchTouchEvent() 方法，再执行 onInterceptTouchEvent()
    方法（注意：View 没有 onInterceptTouchEvent方法，只有 ViewGroup 有这个方法）。
- 事件的处理顺序：
    你(View) --> 部长(MyViewGroupB) --> 总经理(MyViewGroupB)。
    事件处理都是执行 onTouchEvent() 方法。
- 事件传递的返回值： true, 拦截；false, 不拦截, 继续流程；    
- 事件处理的返回值： true, 处理了，不用审核； false, 给上级处理。
- 初始情况下，返回值都是 false。

| 动态控制UI模板的方法：接口回调、提供 public 方法。 --p48(q1)
- 接口回调
```java
interface Ilistener {
  void click(View v);  
}

private void innerMethod(View v) {
  mIlistener.click(v);
}

// 声明和初始化
Ilistener mIlistener;
public void register(Ilistener listener){
  mIlistener = listener;
}
```
- 提供 public 方法
```java
private String mStr;
public void publicMethod(String str) {
  mStr = str;
}
```

| 解释 bitmap 和 Canvas  --p38(q1)
```java
// 装载画布：将 bitmap 装载到画布 canvas 上,
// 这个 bitmap 存储了所有绘制在 Canvas.drawXXX 方法的像素信息
Canvas canvas = new Canvas(bitmap);
```
代码解释：
```java
Canvas canvas;
Bitmap bitmap1, bitmap2;
private void initBitmap() {
  bitmap1 = new Bitmap(...);
  bitmap2 = new Bitmap(...);
}

private void initCanvas() {
  this.canvas = new Canvas(bitmap2);
}

@Override
protected void onDraw(Canvas canvas) {
  canvas.drawBitmap(bitmap1, 0, 0, null);
  canvas.drawBitmap(bitmap2, 0, 0, null);
}

private void changeBitmap2(){

}
```


| Canvas 就像一个画板，使用 Paint 就可以在上面作画了。 --p37(q1)

| 其实，Android 就好像那个蒙着眼睛画画的人，你必须精确地告诉它如何去画，
它才能绘出你想要的图形；--p34(q1)|

| Intent - Android上的信使，信息传递的载体；
--p5(q1)

---
title: Android中常见问题及解答
date: 2016-07-18 15:56:32
toc: true
tags:
- android
---

## assets文件夹和raw文件夹的区别
【解答】
- 相同点：以原有形式保存到apk中，均不会被编译成二进制文件；
- raw里的文件会被映射到R.id中，assets不会；
- assets文件夹里面可以包含目录结构，raw不可；
- 引用方式不同：参考下面的外部链接；

【外部链接】
- [Android中asset文件夹和raw文件夹区别](Android中asset文件夹和raw文件夹区别)

## invalidate和postInvalidate的区别
【解答】
- invalidate必须在主线程中调用，变量发生改变时用来刷新界面；
- postInvalidate可以在非主线程中调，用来刷新界面；
- 通过查看源码发现：postInvalidate是通过Handler间接调用了invalidate;

【外部链接】
- [Android笔记：invalidate()和postInvalidate() 的区别及使用](http://blog.csdn.net/mars2639/article/details/6650876)

## java.lang.RuntimeException: Performing stop of activity that is not resumed
- http://www.aichengxu.com/java/6992563.htm
- https://stackoverflow.com/questions/21947675/android-4-4-2-java-lang-runtimeexception-performing-stop-of-activity-that-is/23246159#23246159
```java
// 方案1：
Handler handler = new Handler(new Handler.Callback() {
   @Override
   public boolean handleMessage(Message msg) {
       switch (msg.what) {
           case 1:
             //Start another Activity Here
           default:
           break;
        }
        return false;
    }
});
handler.sendEmptyMessageDelayed(1, 1000);

// 方案2：
new Handler().postDelay(()->{doSomething()}, 100);
```

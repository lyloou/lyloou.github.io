---
title: adb相关
date: 2017-08-14 15:56:55
tags:
  - android
---

## restart adb

```sh
adb kill-server && adb start-server
```

## 判断当前界面的所属 activity

```sh
adb shell dumpsys activity # 加上 -h 可以获取帮助信息
adb shell dumpsys activity top
adb shell dumpsys activity top | grep ACTIVITY
```

- [移动测试基础 android 中 dumpsys 命令使用](https://testerhome.com/topics/1462)

https://blog.csdn.net/qq_31028313/article/details/79679355
(1)查看当前 Activity ：
adb shell "dumpsys window w | grep name="
(2)查看当前栈顶的 Activity ：
adb shell "dumpsys activity | grep mFocusedActivity"
(3)查看当前栈顶的 Activity 的 Fragment ：
adb shell dumpsys activity your.package.name

## 启动程序

```sh
adb shell am start -n com.tencent.mm/.ui.LauncherUI
```

## 停止程序

```sh
adb shell am force-stop com.tencent.mm
```

## wifi 连接手机

https://blog.csdn.net/u013250071/article/details/80527993

```sh
1.手机打开开发者模式，然后打开USB调试

2.使用USB数据线连接手机和电脑

3.在PC端打开cmd命令窗口，输入adb devices ，可以看到已经连接的设备

4.输入adb tcpip 8888   （设置端口号为8888）

5.断开手机和电脑的连接

6.输入adb connect 10.67.161.8:8888，连接成功
```

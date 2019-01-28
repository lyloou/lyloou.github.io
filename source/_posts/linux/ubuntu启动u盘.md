---
title: 制作ubuntu系统启动u盘
date: 2016-10-26 17:16:15
toc: true
comments: true
tags:
- linux
- ubuntu
---

## 下载发行版镜像
有这几个供参考：ubuntu、xbuntu、mate ubuntu

## ubuntu
- Startup Disk Creator(启动盘创建器)
```sh
# install
sudo apt-get install usb-creator-gtk
# run
usb-creator-gtk
```
- https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-ubuntu

## mac
- Disk Utility 
- https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-macos

## windows
- 下载Pen Drive Linux's USB 安装器 （或：rufus）
- 从下拉选项中选择Ubuntu桌面版本。
- 点击‘浏览’然后打开已下载的ISO文件。
- 选择一个USB驱动器并点击‘创建’.

- [如何在Windows下创建一个可启动USB驱动器 | Ubuntu](http://www.ubuntu.org.cn/download/desktop/create-a-usb-stick-on-windows)
注意：U盘启动后，会出现提示`gfxboot.c32: not a com32r image`，这时按下TAB，并输入`live`回车即可进入启动系统。
- https://tutorials.ubuntu.com/tutorial/tutorial-create-a-usb-stick-on-windows
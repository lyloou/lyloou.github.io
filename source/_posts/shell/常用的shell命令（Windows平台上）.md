---
title: 常用的shell命令（Windows平台上）
date: 2016-12-20 10:30:13
toc: true
comments: true
tags:
- shell
- linux
---

按任意键退出
==========
``` shell
read -n 1 -p "按任意键退出，并打开apk目录..."
```

打开Windows资源管理器指定目录
=========================
``` shell
# 获取当前目录
rootpath=$(pwd)
# 打开当前目录下的/_apk/apk目录
start $rootpath'/_apk/apk'
```


参考资料
======
[Linux Shell编程语法（变量及其赋值）](http://blog.csdn.net/zzban/article/details/8852655)
[SHELL学习笔记----IF条件判断，判断条件](http://blog.csdn.net/ithomer/article/details/5904632)
[shell的read方法使用介绍](http://blog.csdn.net/liuxincumt/article/details/6202295)

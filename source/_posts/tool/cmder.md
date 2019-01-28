---
title: cmder定置
date: 2016-07-12 08:17:25
toc: true
comments: true
tags:
- tool
---

## 前导
安装git: d:/c/git
安装cmder: d:/p/cmder

## user_aliases
```sh
e.=explorer .
;gl=git log --color --oneline  --all --graph --decorate  $*
gl=git lg
ls=ls --show-control-chars -F --color=auto $*
ll=ls -l
pwd=cd
clear=cls
history=cat "%CMDER_ROOT%\config\.history"
unalias=alias /d $1
vi=vim $*
cmderr=cd /d "%CMDER_ROOT%"
cdt=cd /d d:/t
cdw=cd /d d:/w
```

## Settings -> Startup/Environment
```sh
set PATH=%ConEmuBaseDir%\Scripts;%PATH%
set LANG=zh_CN.UTF8
set HOME=D:\w\cmder
set http_proxy=http://127.0.0.1:1080
set https_proxy=http://127.0.0.1:1080
```

## 快捷键
模仿terminal终端的快捷键，
+^O: 水平分割
+^E: 垂直分割
+^P: 上一个终端
+^N: 下一个终端

## 主题
solarized


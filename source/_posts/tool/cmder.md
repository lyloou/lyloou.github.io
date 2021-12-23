---
title: cmder定置
date: 2016-07-12 08:17:25
toc: true
comments: true
tags:
  - tool
---

## 前导

安装 git: d:/c/git
安装 cmder: d:/p/cmder

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

模仿 terminal 终端的快捷键，
+^O: 水平分割
+^E: 垂直分割
+^P: 上一个终端
+^N: 下一个终端

## 主题

solarized

## 设置别名

[cmder 别名设置和自定义 cmder 启动界面 - SegmentFault 思否](https://segmentfault.com/a/1190000010304395)

在 gitbash安装目录下的 `etc/bash.bashrc`中加入 alias 配置
```sh


alias e.="explorer ."
alias gl="git log --color --oneline  --all --graph --decorate  $*"
alias glh="git lg | head"
alias gh="git lg | head"
alias ls="ls --show-control-chars -F --color=auto $*"
alias ll="ls -l"
alias pwd="cd"
alias clear="cls"
alias unalias="alias /d $1"
alias vi="vim $*"
alias cdt="cd d:/t"
alias cdw="cd d:/w"
alias cdc="cd d:/c"
alias cdd="cd C:/Users/lilou/Desktop"
alias cdwr="cd d:/w/weex/mobile"
alias cdp="cd d:/w/go/src/github.com/lyloou/pugo"
alias cdgo="cd d:/w/go/src/"
alias vv="d:/c/Vim/vim81/gvim.exe -p --remote-tab-silent $*"
alias mvnc="mvn clean -Dmaven.test.skip"
alias mvncc="mvn clean compile -Dmaven.test.skip"
alias mvncd="mvn clean deploy -Dmaven.test.skip"
alias mvnci="mvn clean install -Dmaven.test.skip"

alias ..="cd .."
alias ...="cd .. && cd .."
alias www="python -m SimpleHTTPServer 8000"

```
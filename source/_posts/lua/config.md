---
title: lua配置
date: 2018-08-18 20:17:54
toc: true
comments: true
tags:
- lua
---



```sh
# c
# https://askubuntu.com/questions/194523/how-do-i-install-gnu-readline
    sudo apt-get install libreadline6 libreadline6-dev

curl -R -O http://www.lua.org/ftp/lua-5.3.5.tar.gz
tar zxf lua-5.3.5.tar.gz
cd lua-5.3.5
make linux test
```
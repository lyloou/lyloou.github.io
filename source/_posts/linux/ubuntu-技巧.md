---
title: ubuntu-技巧
date: 2018-08-16 16:39:15
toc: true
comments: true
tags:
- linux
- ubuntu
---

## https://www.youtube.com/watch?v=V8EUdia_kOE
- sudo !!
- ctrl-k, ctrl-u, ctrl-w, ctrl-y - cutting and pasting text in the command line
- practical kill/yank example
- use 'less +F' to view logfiles, instead of 'tail' (ctrl-c, shift-f, q to quit)
- ctrl-x-e - continue editing your current shell line in a text editor (uses $EDITOR)
- alt-. - paste previous command's argument (useful for running multiple commands on the same resource)
- reset - resets/unborks your terminal


## linux kill 某个端口对应的进程
- [Linux 一条命令杀死占用端口的所有进程 - gq__97的博客 - CSDN博客](https://blog.csdn.net/gq__97/article/details/80487588)
```sh
kill -9 $(lsof -i:端口号 -t)
```

- [linux下怎么根据端口号杀死进程 - shengzhu1的博客 - CSDN博客](https://blog.csdn.net/shengzhu1/article/details/54138419)
```sh
kill [']netstat -nlp | grep :3306 | awk '{print $7}' | awk -F"/" '{ print $1 }'[']
```

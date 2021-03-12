---
title: 【linux】shell
date: 2019-07-05 17:16:15
toc: true
comments: true
tags:
  - linux
---

- [shell 基础 \$(cd `dirname $0`;pwd) - 哎幽的成长 - CSDN 博客](https://blog.csdn.net/u012373815/article/details/62076793)

在/home/admin/test/下新建 test.sh 内容如下：

```sh
cd `dirname $0`
echo `pwd`
```

然后返回到/home/admin/执行
`sh test/test.sh`
运行结果:
`/home/admin/test`

## 查看网络连接数情况

netstat -an|awk '/tcp/ {print \$6}'|sort|uniq -c

## 查看一下你最常用的 10 个命令

```sh
cat .bash_history | sort | uniq -c | sort -rn | head -n 10
```

## 查看端口号占用情况

```sh
ss -nelp | grep 8080
```

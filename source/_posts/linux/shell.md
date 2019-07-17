---
title: 【linux】shell
date: 2019-07-05 17:16:15
toc: true
comments: true
tags:
- linux
---

- [shell 基础 $(cd `dirname $0`;pwd) - 哎幽的成长 - CSDN博客](https://blog.csdn.net/u012373815/article/details/62076793)

在/home/admin/test/下新建test.sh内容如下：
```sh
cd `dirname $0`
echo `pwd`
```

然后返回到/home/admin/执行
`sh test/test.sh`
运行结果:
`/home/admin/test`


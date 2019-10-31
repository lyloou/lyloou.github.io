---
title: jenkins
date: 2018-07-14 17:16:15
toc: true
comments: true
tags:
  - devops
---

## install

- [Installing Jenkins](https://jenkins.io/doc/book/installing/#debian-ubuntu)

- [jenkins 入门教程(上) - 菩提树下的杨过 - 博客园](http://www.cnblogs.com/yjmyzz/p/jenkins-tutorial-part-1.html)
- [jenkins 入门教程(中) - 菩提树下的杨过 - 博客园](http://www.cnblogs.com/yjmyzz/p/jenkins-tutorial-part-2.html)
- [jenkins 入门教程(下) - 菩提树下的杨过 - 博客园](http://www.cnblogs.com/yjmyzz/p/jenkins-tutorial-part-3.html)

* [Jenkins 的关闭、重启 - CSDN 博客](https://blog.csdn.net/itfootball/article/details/44876517)
  - 关闭 jenkins 服务: http://localhost:8080/exit
  - 重新启动 jenkins 服务器: http://localhost:8080/restart
  - 重载 jenkins 服务器: http://localhost:8080/reload

个人觉得难点在于：密码、授权、密钥的配置。这一步走通了，后面的就好走了。

## config

- [How to stop Jenkins log from becoming huge? - Stack Overflow](https://stackoverflow.com/questions/31719756/how-to-stop-jenkins-log-from-becoming-huge)

## remove
/var/log/jenkins/jenkins.log
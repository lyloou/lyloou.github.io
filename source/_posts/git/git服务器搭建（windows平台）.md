---
title: git服务器搭建（windows平台）
date: 2016-07-14 15:40:21
toc: true
comments: true
tags:
- git
---

## 以GitBlit来讲解
1. 安装Java；
2. 配置Java的环境变量；
3. 下载并安装[GitBlit](http://www.gitblit.com/)
4. 配置GitBlit（以1.8.0为例）:
  - 打开配置文件：`C:\Git\gitblit-1.8.0\data\defaults.properties`
  - 修改资料库路径（也可以使用默认的）：`git.repositoriesFolder = C:\\Git\\GitRepository`
  - 修改http协议端口：`server.httpPort = 10108`
  - 设定服务器http地址：`server.httpBindInterface = 192.168.0.30`
  - 设定服务器https地址：`server.httpsBindInterface = localhost`
  - 保存并关闭文件；
  - 运行服务器，双击打开：`gitblit.bat`
5. 浏览器中打开GitBlit：`http://192.168.0.30:10108`
6. 作为服务自动运行在后台：
  - 打开`installService.bat`文件；
  - 根据系统环境配置ARCH：`SET ARCH=amd64`
  - 设置程序目录：`C:\\Git\\gitblit-1.8.0`
  - 设置启动参数：`--StartParams=""`
  - 关闭bat文件，并以管理员身份运行；
  - 查看服务是否安装成功：Win+R，输入`services.msc`，找得到gitbit服务；
  - 启动gitbit服务；
7. 再次在浏览器中验证是否安装成功；
8. 登陆：账号密码默认均为`admin`

## 其它 git 服务
- [gitlab](https://gitlab.com/)
- [gogs](https://github.com/gogits/gogs)

---
## 外部链接
- [Windows平台下Git服务器搭建](http://www.cnblogs.com/ucos/p/3924720.html)

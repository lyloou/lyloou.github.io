---
title: git坑
date: 2019-01-22 15:40:21
toc: true
comments: true
tags:
- git
---

## 上传到远程仓库的文件再次改名(大小写)不生效
https://juejin.im/post/5bbdc1ff6fb9a05d011cfe66

配置 `git config core.ignorecase false --global`，大小写默认不敏感

## 在.gitmodules中找不到路径的子模块映射,缺少.gitmodules文件
https://codeday.me/bug/20170816/58438.html
[Git - 子模块](https://git-scm.com/book/zh/v2/Git-%E5%B7%A5%E5%85%B7-%E5%AD%90%E6%A8%A1%E5%9D%97)

首先移除模块依赖，
`git rm --cached library/algs4`
其次重新添加模块依赖
`git submodule add https://github.com/lyloou/algs4 library/algs4`

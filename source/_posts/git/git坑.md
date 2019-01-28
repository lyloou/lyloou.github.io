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
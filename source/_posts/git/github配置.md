---
title: github配置
date: 2016-07-12 08:17:25
toc: true
comments: true
tags:
- git
---

### 生成密钥
密钥是上传到远程库的凭证，是本地与远程库的桥梁；
```
$ ssh-keygen -t rsa -C "lyloou@qq.com"
```

### 添加密钥
复制`~/.ssh/id_rsa.pub`内容到`https://github.com/settings/keys`的`SSH and GPG keys`

### 测试连通性
```
ssh -T git@github.com
```
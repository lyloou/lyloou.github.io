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

## 
- [GitHub限制上传单个大于100M的大文件 - 霍莉雪特 - 博客园](https://www.cnblogs.com/guxin/p/github-cannot-push-files-larger-than-100mb.html)
- [突破github的100M单个大文件上传限制 - Johnny的专栏 - CSDN博客](https://blog.csdn.net/tyro_java/article/details/53440666)
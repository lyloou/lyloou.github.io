---
title: 安全
date: 2019-08-19 11:40:58
toc: true
comments: true
tags:
  - devops
---

## PGP

### 描述

PGP（Pretty Good Privacy），用来提高安全性的软件，可以用来验证文件的合法性；例如常用来给邮件加密、解密及验证,以提高电子邮件交流的安全性；

### 安装

```sh
# 需要安装 rng-tools才能成功生成 gpg 密钥
apt install rng-tools

# 生成gpg密钥
gpg --gen-key

# 查看公钥
gpg --list-keys

# 查看私钥
gpg --list-secret-keys

# 上传公钥
gpg --keyserver hkp://pgp.mit.edu --send-keys FD9EF47E271531EC53C8F6B1EE2E9AE32588D3D8
# or
gpg --keyserver hkp://pgp.mit.edu --send-keys EE2E9AE32588D3D8

# 用户下载公钥
gpg --keyserver hkp://pgp.mit.edu --recv-keys EE2E9AE32588D3D8

# 对文件生成 asc 文件（会生成）以 .asc 的后缀文件
# 参数 -a 表示创建 ASCII 的输出；
# 参数 -b 表示创建一个独立的文件；
gpg -ab test.sh

# 对文件是否被修改进行验证
gpg --verify test.sh.asc
```

### 参考资料

《Maven 实战》——版本管理(C13.6)

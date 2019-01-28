---
title: linux用户管理和权限设置
date: 2018-07-27 17:16:15
toc: true
comments: true
tags:
- linux
---

- 修改文件的所有者和所属组：
```
sudo chown -R OWNER:GROUP /www
```

- [修改用户所在组，group，usermod-J S Chu的技术家园-51CTO博客](http://blog.51cto.com/jschu/1722959)
```
usermod -g 用户组 用户名
    强制修改用户所在组
usermod -a -G 用户组 用户名
    把某个用户添加进某个组
```


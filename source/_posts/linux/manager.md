---
title: linux管理工具
date: 2019-07-08 18:05:40
toc: true
comments: true
tags:
  - linux
---

# 进程管理

## supervisor 进程管理工具

- [Supervisor: A Process Control System — Supervisor 4.0.3 documentation](http://supervisord.org/)
- [Supervisor 安装与配置（Linux/Unix 进程管理工具） - CSDN 博客](https://blog.csdn.net/xyang81/article/details/51555473)
- [supervisor - BigBao 的博客 - 博客园](https://www.cnblogs.com/smail-bao/p/5673434.html)

# 磁盘管理

## [自动挂载 E 盘](https://askubuntu.com/questions/46588/how-to-automount-ntfs-partitions)

- `vi /etc/fstab` & add below line

```sh
#Windows-Partition
UUID=0004D1FE0007434B /home/lou/e ntfs rw,auto,users,exec,nls=utf8,umask=003,gid=46,uid=1000    0   0
```

- Finding which disk you will set

```sh
sudo fdisk -l
```

- Finding the UUID

```sh
sudo blkid
```

- Check it

```
sudo mount -a
```

设置 image:

```
http://mirros.aliyun.com/ubuntu
```

## pm2

# 权限管理

- 修改文件的所有者和所属组：

```
sudo chown -R OWNER:GROUP /www
```

- [修改用户所在组，group，usermod-J S Chu 的技术家园-51CTO 博客](http://blog.51cto.com/jschu/1722959)

```
usermod -g 用户组 用户名
    强制修改用户所在组
usermod -a -G 用户组 用户名
    把某个用户添加进某个组
```

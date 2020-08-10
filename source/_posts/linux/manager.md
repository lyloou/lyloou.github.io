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

## 空间

```sh
df -a #  显示目前在Linux系统上的文件系统的磁盘使用情况统计
du -sh * # 显示当前目录或文件所占用的磁盘空间. -s表示总计，-h是以K，M，G为单位，提高信息的可读性
```

```sh
/var/log/journal/
journalctl --vacuum-size=10M
journalctl --disk-usage
# https://blog.csdn.net/ithomer/article/details/89530790
```

```sh
# 查看某个目录的文件大小并排序（单位为MB）
du -hm --max-depth=1 /var/ | sort -n
```

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

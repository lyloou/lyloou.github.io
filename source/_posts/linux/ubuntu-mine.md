---
title: ubuntu-mine
date: 2018-08-05 17:16:15
toc: true
comments: true
tags:
- linux
- ubuntu
---

## 设置管理员密码
首次使用管理员登录需要先设置密码
```sh
sudo passwd
```


## [自动挂载E盘](https://askubuntu.com/questions/46588/how-to-automount-ntfs-partitions)
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

设置image:
```
http://mirros.aliyun.com/ubuntu
```

## 软件
- [ubuntu软件](../ubuntu软件/)
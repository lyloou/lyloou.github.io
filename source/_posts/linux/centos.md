---
title: centos 相关
date: 2021-04-25 17:33:11
toc: true
comments: true
tags:
  - linux
---

## 设置主机名称

```sh
# 设置主机名
hostnamectl set-hostname yourhostname
# 刷新生效
bash
```

**查看版本**

```sh
cat /etc/redhat-release
uname -a
uname -r
```

## 配置固定 ip

编辑：`vi /etc/sysconfig/network-scripts/ifcfg-ens0s8`
(注意：ens0s8 这个名字要和 `ip addr`中的名字保持一致，如果不一样修改文件名即可，否则会重启失败)

**默认**

```sh
TYPE=Ethernet
BOOTPROTO=dhcp
DEFROUTE=yes
PEERDNS=yes
PEERROUTES=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_FAILURE_FATAL=no
NAME=enp0s8
UUID=ed6c068c-149c-4678-8a13-d6e34a5d50c9
DEVICE=enp0s8
ONBOOT=yes
DNS1=10.0.2.2
DNS2=8.8.8.8
```

**自定义**

```sh
TYPE=Ethernet
BOOTPROTO=none
DEFROUTE=yes
PEERDNS=yes
PEERROUTES=yes
IPV4_FAILURE_FATAL=no
IPV6INIT=yes
IPV6_AUTOCONF=yes
IPV6_DEFROUTE=yes
IPV6_PEERDNS=yes
IPV6_PEERROUTES=yes
IPV6_FAILURE_FATAL=no
NAME=enp0s8
UUID=ed6c068c-149c-4678-8a13-d6e34a5d50c9
DEVICE=enp0s8
ONBOOT=yes
IPADDR=172.20.130.84
GATEWAY=172.20.130.1
DNS1=10.0.2.2
DNS2=8.8.8.8
```

重启： `systemctl restart network`

## 关闭防火墙

```sh
systemctl status firewalld
systemctl stop firewalld
systemctl disable firewalld
```

## 免密登录

```sh
ssh-copy-id -i ~/.ssh/id_rsa.pub root@172.20.130.84
```

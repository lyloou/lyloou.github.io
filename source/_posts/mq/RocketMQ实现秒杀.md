---
title: RocketMQ实现秒杀
date: 2021-06-16 11:19:15
toc: true
comments: true
tags:
  - mq
---

## 软件环境

virtualbox: 6.1
centos: 7.0
jdk: 1.8
rocketmq: https://archive.apache.org/dist/rocketmq/4.5.1/rocketmq-all-4.5.1-bin-release.zip
rocketmq-console: https://github.com/apache/rocketmq-externals/tree/release-rocketmq-console-1.0.0
redis: Redis-x64-5.0.10
mysql: 5.6

## 配置

```sh
# 修改主机名
hostnamectl set-hostname node1.com
hostnamectl set-hostname node2.com
hostnamectl set-hostname node3.com
hostnamectl set-hostname node4.com

# 刷新终端
bash
# 查看是否生效
hostname

# 修改网络为具体某个ip
vi /etc/sysconfig/network-scripts/ifcfg-ens0s8
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
IPADDR=192.168.56.11
GATEWAY=192.168.56.1
DNS1=10.0.2.2
DNS2=8.8.8.8

# 重启网络
systemctl restart network
```

## 修改和同步 hosts

1. 修改 node1.com

```
192.168.56.11 node1.com
192.168.56.12 node2.com
192.168.56.13 node3.com
192.168.56.14 node4.com
```

```sh
scp /etc/hosts root@node1.com:/etc/hosts
scp /etc/hosts root@node2.com:/etc/hosts
scp /etc/hosts root@node3.com:/etc/hosts
scp /etc/hosts root@node4.com:/etc/hosts
```

## 启动 RocketMQ

**启动 nameserver**
node1 操作：

```shell
/root/c/rocketmq-all-4.5.1-bin-release/bin/mqnamesrv
```

node2 操作：

```shell
/root/c/rocketmq-all-4.5.1-bin-release/bin/mqnamesrv
```

**启动 broker**

```shell
[root@node1 ~]#
/root/c/rocketmq-all-4.5.1-bin-release/bin/mqbroker -n "node1.com:9876;node2.com:9876" -c /root/c/rocketmq-all-4.5.1-bin-release/conf/2m-2s-sync/broker-a.properties
[root@node2 ~]#
/root/c/rocketmq-all-4.5.1-bin-release/bin/mqbroker -n "node1.com:9876;node2.com:9876" -c /root/c/rocketmq-all-4.5.1-bin-release/conf/2m-2s-sync/broker-b.properties
[root@node3 ~]#
/root/c/rocketmq-all-4.5.1-bin-release/bin/mqbroker -n "node1.com:9876;node2.com:9876" -c /root/c/rocketmq-all-4.5.1-bin-release/conf/2m-2s-sync/broker-a-s.properties
[root@node4 ~]#
/root/c/rocketmq-all-4.5.1-bin-release/bin/mqbroker -n "node1.com:9876;node2.com:9876" -c /root/c/rocketmq-all-4.5.1-bin-release/conf/2m-2s-sync/broker-b-s.properties
```

**启动控制台**

```sh
cd /root/c/rocketmq-externals-rocketmq-console-1.0.0
mvn clean package -Dmaven.test.skip
java -jar /root/c/rocketmq-externals-rocketmq-console-1.0.0/rocketmq-console/target/rocketmq-console-ng-1.0.0.jar
```

## 分布式事务

通过分布式事务来保证一致性（数据库与 MQ 的一致性）

![RocketMQ-2021-06-15-11-33-52](http://cdn.lyloou.com/img/RocketMQ-2021-06-15-11-33-52.png)

> RocketMQ 事务消息的实现原理就是基于两阶段提交和事务状态回查，来决定消息最终是提交还是回滚。

- [基于 RocketMQ 分布式事务 - 完整示例](https://juejin.cn/post/6844904099993878536)

## 演示

**下单页**
http://localhost:8081/order
![RocketMQ实现秒杀-2021-06-16-11-09-12](http://cdn.lyloou.com/img/RocketMQ实现秒杀-2021-06-16-11-09-12.png)

**支付页**
http://localhost:8081/pay
![RocketMQ实现秒杀-2021-06-16-11-09-30](http://cdn.lyloou.com/img/RocketMQ实现秒杀-2021-06-16-11-09-30.png)

**批量购买**
![RocketMQ实现秒杀-2021-06-16-11-14-49](http://cdn.lyloou.com/img/RocketMQ实现秒杀-2021-06-16-11-14-49.png)
不会导致库存超卖
![RocketMQ实现秒杀-2021-06-16-11-10-18](http://cdn.lyloou.com/img/RocketMQ实现秒杀-2021-06-16-11-10-18.png)

## 源码

https://gitee.com/lyloou/practice-rocketmq-seckill/tree/feature_transaction/

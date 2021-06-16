---
title: RocketMQ 相关
date: 2021-05-31 11:19:15
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

## 启动 RocketMQ

**启动 mq server**

```sh
./mqnamesrv
```

**启动 broker**

```
./mqbroker -n localhost:9876
```

**示例**

```sh
# 配置 namesrv 地址环境
export NAMESRV_ADDR=localhost:9876
# 示例：生产
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
# 示例：消费
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
```

**启动控制台**

```sh
cd /root/c/rocketmq-externals-rocketmq-console-1.0.0
mvn clean package -Dmaven.test.skip
java -jar /root/c/rocketmq-externals-rocketmq-console-1.0.0/rocketmq-console/target/rocketmq-console-ng-1.0.0.jar
```

## 基于 RocketMQ 分布式事务

![RocketMQ-2021-06-15-11-33-52](http://cdn.lyloou.com/img/RocketMQ-2021-06-15-11-33-52.png)

> RocketMQ 事务消息的实现原理就是基于两阶段提交和事务状态回查，来决定消息最终是提交还是回滚。

- [基于 RocketMQ 分布式事务 - 完整示例](https://juejin.cn/post/6844904099993878536)

---
title: kafka相关
date: 2020-07-30 11:10:04
toc: true
comments: true
tags:
  - mq
---

[Kafka - 随笔分类 - 郭俊 Jason - 博客园](https://www.cnblogs.com/jasongj/category/672183.html)

www.jasongj.com/2015/01/02/Kafka 深度解析/

## [查看 kafka 消息队列的积压情况-12463494-51CTO 博客](https://blog.51cto.com/12473494/2420105)

[Kafka 的 Lag 计算误区及正确实现\_朱小厮的博客-CSDN 博客\_kafka lag](https://blog.csdn.net/u013256816/article/details/79955578)

查看正在运行的消费组
![](/images/article/kafka_2020-07-30-12-51-21.png)

```
kafka-consumer-groups --bootstrap-server master:9092 --list --new-consumer
kafka-consumer-groups.sh --bootstrap-server ce-kafka:9092 --list
```

计算消息的消息堆积情况
![](/images/article/kafka_2020-07-30-12-51-47.png)

```sh
kafka-consumer-groups --bootstrap-server master:9092 --describe --group  test_kafka_game_x_g1
kafka-consumer-groups.sh --bootstrap-server ce-kafka:9092 --describe --group  default-group
```

说明：

> LogEndOffset 下一条将要被加入到日志的消息的位移
> CurrentOffset 当前消费的位移
> LAG 消息堆积量
>
> 消息堆积量：消息中间件服务端中所留存的消息与消费掉的消息之间的差值即为消息堆积量也称之为消费滞后量

## [kafka 清理数据日志 - Adrian·Ding - 博客园](https://www.cnblogs.com/ding2016/p/9294544.html)

```ini
log.dirs=/data/kafka-logslog.cleaner.enable=true
log.cleanup.policy = delete　　　　// delete|compact
log.retention.hours=168
log.segment.bytes=1073741824
log.retention.check.interval.ms=300000
```

```sh
kafka-configs.sh --zookeeper ce-zookeeper:2181 --entity-type topics --entity-name __consumer_offsets --describe
kafka-configs.sh --zookeeper ce-zookeeper:2181 --entity-type topics --entity-name __consumer_offsets --alter --delete-config cleanup.policy
```

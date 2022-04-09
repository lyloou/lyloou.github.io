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

```
kafka-consumer-groups.sh --bootstrap-server 172.20.154.101:9092 --describe --group  marketing_group | grep task-prize-gift

```

[Kafka 的 Lag 计算误区及正确实现\_朱小厮的博客-CSDN 博客\_kafka lag](https://blog.csdn.net/u013256816/article/details/79955578)

查看正在运行的消费组
![kafka_2020-07-30-12-51-21](https://raw.githubusercontent.com/lyloou/img/develop/img/20210702092139.png)

```
kafka-consumer-groups --bootstrap-server master:9092 --list --new-consumer
kafka-consumer-groups.sh --bootstrap-server ce-kafka:9092 --list
```

计算消息的消息堆积情况
![kafka_2020-07-30-12-51-47](https://raw.githubusercontent.com/lyloou/img/develop/img/20210702092149.png)

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

## 命令行操作

```sh
# 创建名称为 topic_1 的主题
kafka-topics.sh --zookeeper nodek.com:2181/myKafka --create --topic topic_1 --partitions 1 --replication-factor 1

# 显示消费组
kafka-consumer-groups.sh --bootstrap-server nodek.com:9092 --list
kafka-consumer-groups.sh --new-consumer --bootstrap-server nodek.com:9092 --list

# 描述消费组（可以查看 offset, client_id, partition等）
kafka-consumer-groups.sh --bootstrap-server nodek.com:9092 --describe --group  consumer_demo1

# 生产消息
kafka-console-producer.sh --topic topic_1 --broker-list nodek.com:9092

# 消费消息（指定消费组为 console-consumer-83559）
kafka-console-consumer.sh --bootstrap-server nodek.com:9092 --topic topic_1 --group console-consumer-83559
kafka-console-consumer.sh --bootstrap-server 172.20.154.101:9092 --topic task-prize-gift-dev --from-beginning
```

## [【spring-kafka】属性 concurrency 的作用及如何配置(RoundRobinAssignor 、RangeAssignor) - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1846785)

[kafka 系列七、kafka 核心配置 - 小人物的奋斗 - 博客园](https://www.cnblogs.com/wangzhuxing/p/10111831.html#_label1_14)

[Apache Kafka-通过 concurrency 实现并发消费\_小小工匠的技术博客\_51CTO 博客](https://blog.51cto.com/u_15239532/2858254)
[kafka 动态添加 topic，动态添加消费者\_小小传奇的博客-CSDN 博客\_kafka topic 动态](https://blog.csdn.net/weixin_42331178/article/details/119936230)
[Kafka 中@KafkaListener 如何动态指定多个 topic*Java 知音*的博客-CSDN 博客](https://blog.csdn.net/weixin_36380516/article/details/119524653?utm_medium=distribute.pc_relevant.none-task-blog-2~default~baidujs_baidulandingword~default-1.pc_relevant_default&spm=1001.2101.3001.4242.2&utm_relevant_index=4)
[Kafka auto.offset.reset 值详解\_lishuangzhe7047 的博客-CSDN 博客\_auto.offset.reset](https://blog.csdn.net/lishuangzhe7047/article/details/74530417)
[Kafka 获得 topicPartition 的最早，最新 offset 的时间，以及存储量\_卞卞要运动的博客-CSDN 博客\_topicpartitions](https://blog.csdn.net/qq_29976261/article/details/90229375)
[Kafka 消费者重复消费问题解决 | 贫贫贫贫僧](http://haoyuanliu.github.io/2020/07/24/Kafka%E6%B6%88%E8%B4%B9%E8%80%85%E9%87%8D%E5%A4%8D%E6%B6%88%E8%B4%B9%E9%97%AE%E9%A2%98%E8%A7%A3%E5%86%B3/)




[“高深莫测”的Kafka时间轮原理，原来也就这么回事-CFANZ编程社区](https://www.cfanz.cn/mobile/resource/detail/QzqWOjxEnjxEv)
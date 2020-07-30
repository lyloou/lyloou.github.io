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


## [查看kafka消息队列的积压情况-12463494-51CTO博客](https://blog.51cto.com/12473494/2420105)

[Kafka的Lag计算误区及正确实现_朱小厮的博客-CSDN博客_kafka lag](https://blog.csdn.net/u013256816/article/details/79955578)



查看正在运行的消费组

```
kafka-consumer-groups --bootstrap-server master:9092 --list --new-consumer  
```

![image-20200730112144234](kafka.assets/image-20200730112144234.png)

计算消息的消息堆积情况

```
kafka-consumer-groups --bootstrap-server master:9092 --describe --group  test_kafka_game_x_g1
```

![image-20200730112307195](kafka.assets/image-20200730112307195.png)

说明：

> LogEndOffset 下一条将要被加入到日志的消息的位移
> CurrentOffset 当前消费的位移
> LAG 消息堆积量
>
> 消息堆积量：消息中间件服务端中所留存的消息与消费掉的消息之间的差值即为消息堆积量也称之为消费滞后量


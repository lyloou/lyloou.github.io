---
title: RabbitMq
date: 2020-07-24 16:21:57
toc: true
comments: true
tags:
  - mq
---

[docker安装RabbitMq - 掘金](https://juejin.im/post/5dabec98e51d4524c06047aa)
```yml

version: '3.3'
services:
  rabbitmq-server:
    container_name: rabbitmq
    image: rabbitmq:3.8-management
    restart: always
    ports:
        - 15672:15672
        - 25672:25672
        - 4369:4369
        - 5671:5671
        - 5672:5672
    volumes:
        - ./mq/rabbitmq:/var/lib/rabbitmq
    environment:
        - TZ=Asia/Hong_Kong
        - RABBITMQ_DEFAULT_USER=qq
        - RABBITMQ_DEFAULT_PASS=1234
        - RABBITMQ_DEFAULT_VHOST=/qq
```
[Rabbit安装配置问题 - 简书](https://www.jianshu.com/p/2ecad37d64ff)

[RabbitMQ入门教程（概念，应用场景，安装，使用） - 简书](https://www.jianshu.com/p/dae5bbed39b1)

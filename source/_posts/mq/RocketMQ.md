---
title: RocketMQ 相关
date: 2021-05-31 11:19:15
toc: true
comments: true
tags:
  - mq
---

# 基本操作

```sh
# 启动 mq server
./mqnamesrv

# 启动 broker
./mqbroker -n localhost:9876

# 配置namesrv地址环境
export NAMESRV_ADDR=localhost:9876
# 示例：生产
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Producer
# 示例：消费
sh bin/tools.sh org.apache.rocketmq.example.quickstart.Consumer
```

## RocketMQ 事务

[基于 RocketMQ 分布式事务 - 完整示例](https://juejin.cn/post/6844904099993878536)

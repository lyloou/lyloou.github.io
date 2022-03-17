---
title: redis面试题
date: 2019/11/10 17:29
toc: true
comments: true
tags:
  - redis
  - 面试题
---

## 常见问题

[大Key/热Key分析/整库扫描_分布式缓存服务 DCS_常见问题_华为云](https://support.huaweicloud.com/dcs_faq/dcs-faq-0805001.html)

# 备份策略

## RDB

rdb：指定时间点上生成的数据集快照

优点：

1. 保存某个时间点上的数据；
2. 文件紧凑，恢复快；方便传输
3. 父进程不受 IO 影响，是从父进程中 fork 一份出来备份的；

缺点：

1. 可能造成备份期间的数据丢失；
2. fork 过程可能比较耗时（数据集大时，消耗的 CPU 可能导致无法响应客户端）

## AOF

aof：所有写操作命令（redis 协议），恢复时执行这些命令
优点：

1. 灵活配置 fsync 策略；1）无 fsync；2）每秒一次；3）每次写入都 fsync；（就算发生了故障也是 1 秒，性能也不错；fsync 在后台线程执行）
2. 对 aof 日志文件只进行追加操作；
3. 文件变大时，会进行重写；
4. 以 redis 协议写入日志，易读和修复（flushall）

缺点：

1. 相对 rdb，体积更大；
2. fsync 策略可能会比 rdb 慢
3. 个别 bug

总结：
如果想要非常高的安全性，可以结合 rdb 和 aof 同时使用；在重启的时候，会优先使用 aof 来恢复数据（aof 更完整）；

其他：
rdb: 默认存入到 dumb.rdb 文件中；
RDB 手动备份：
SAVE：阻塞主进程，此时客户端无法连接；
BGSAVE：fork 一个子线程，不阻塞主进程，客户端依然可以连接；完成后通知主进程，子进程退出；
可以设置多少秒内有多少变动时触发备份

```ini
#save <seconds> <changes>
#
#   Will save the DB if both the given number of seconds and the given
#   number of write operations against the DB occurred.
#
#   In the example below the behaviour will be to save:
#   after 900 sec (15 min) if at least 1 key changed
#   after 300 sec (5 min) if at least 10 keys changed
#   after 60 sec if at least 10000 keys changed
#
#   Note: you can disable saving completely by commenting out all "save" lines.
#
#   It is also possible to remove all the previously configured save
#   points by adding a save directive with a single empty string argument
#   like in the following example:
#
#   save ""
# 时间窗口M和改动的键个数N，每当时间M内改动的键个数大于N时，则触发快照备份。
save 900 1
save 300 10
save 60 10000
```

AOF 重写：
bgrewrite 可以用来重写，重新生成一个文件，此文件只包含当前数据集需要的最少的指令（因为是 append 的方式 ，对同一个 key 进行操作也会追加多次指令）

## 参考资料

- [redis 持久化与备份策略\_is_zhoufeng 的专栏-CSDN 博客](https://blog.csdn.net/is_zhoufeng/article/details/10210353)
- [Redis Save 与 BGSAVE 的区别 - Ray 雷 - 博客园](https://www.cnblogs.com/rayong/p/6791330.html)

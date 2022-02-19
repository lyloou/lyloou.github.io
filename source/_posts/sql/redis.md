---
title: redis
date: 2018/11/10 17:29
toc: true
comments: true
tags:
  - redis
---

## install

```
sudo apt update
sudo apt install redis-server
```

- [How To Install and Secure Redis on Ubuntu 18.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-redis-on-ubuntu-18-04)

**安装时出现 Errors were encountered while processing: redis-server 的问题**

> You should probably alter the redis.conf file to force it to use IPv4 if it supports that mode only and then maybe you could run it without IPv6.
> [apt - Cannot install redis server - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/351668/cannot-install-redis-server) > https://unix.stackexchange.com/a/501785

**单机安装 ubuntu**

```sh
wget -v http://download.redis.io/releases/redis-5.0.5.tar.gz
apt install build-essential tcl
mkdir /var/redis-standalone
make install PREFIX=/var/redis-standalone MALLOC=libc
cp ./redis.conf /var/redis-standalone
cd /var/redis-standalone
./bin/redis-server ./redis.conf
```

**单机安装 centos**

```sh
yum install wget -y
wget https://download.redis.io/releases/redis-5.0.8.tar.gz
tar -zxf redis-5.0.8.tar.gz
yum install gcc -y
cd redis-5.0.8
make && make install
cd /usr/local/bin/
cp ~/redis-5.0.8/redis.conf .
redis-server redis.conf
```

## 参考资料

- [Redis-主从复制与 Sentinel - 简书](https://www.jianshu.com/p/88636a819802)
  ![主从复制](http://img.hb.aicdn.com/047fcbdf9c84f15fb0b2b28eb74a7409304c200418489-i4oOmX_fw658)

- [How to atomically delete keys matching a pattern using Redis](https://stackoverflow.com/questions/4006324/how-to-atomically-delete-keys-matching-a-pattern-using-redis)

```
EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 prefix:*
```

## set password

```sh
sudo vim /etc/redis/redis.conf
# find and uncomment line : # requirepass foobared

# then restart server
systemctl restart redis-server
```

## [redis 过期策略及定期策略配置\_bobozai86 的博客-CSDN 博客\_redis 过期策略 配置文件](https://blog.csdn.net/bobozai86/article/details/112299322)

```ini

redis 过期策略
redis 过期策略是：定期删除+惰性删除。
所谓定期删除，指的是 redis 默认是每隔 100ms 就随机抽取一些设置了过期时间的 key，检查其是否过期，如果过期就删除。
假设 redis 里放了 10w 个 key，都设置了过期时间，你每隔几百毫秒，就检查 10w 个 key，那 redis 基本上就死了，cpu 负载会很高的，消耗在你的检查过期 key 上了。注意，这里可不是每隔 100ms 就遍历所有的设置过期时间的 key，那样就是一场性能上的灾难。实际上 redis 是每隔 100ms 随机抽取一些 key 来检查和删除的。

但是问题是，定期删除可能会导致很多过期 key 到了时间并没有被删除掉，那咋整呢？所以就是惰性删除了。这就是说，在你获取某个 key 的时候，redis 会检查一下 ，这个 key 如果设置了过期时间那么是否过期了？如果过期了此时就会删除，不会给你返回任何东西。
获取 key 的时候，如果此时 key 已经过期，就删除，不会返回任何东西。
但是实际上这还是有问题的，如果定期删除漏掉了很多过期 key，然后你也没及时去查，也就没走惰性删除，此时会怎么样？如果大量过期 key 堆积在内存里，导致 redis 内存块耗尽了，咋整？
答案是：走内存淘汰机制。

内存淘汰机制
redis 内存淘汰机制有以下几个：
• noeviction: 当内存不足以容纳新写入数据时，新写入操作会报错，这个一般没人用吧，实在是太恶心了。
• allkeys-lru：当内存不足以容纳新写入数据时，在键空间中，移除最近最少使用的 key（这个是最常用的）。
• allkeys-random：当内存不足以容纳新写入数据时，在键空间中，随机移除某个 key，这个一般没人用吧，为啥要随机，肯定是把最近最少使用的 key 给干掉啊。
• volatile-lru：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，移除最近最少使用的 key（这个一般不太合适）。
• volatile-random：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，随机移除某个 key。
• volatile-ttl：当内存不足以容纳新写入数据时，在设置了过期时间的键空间中，有更早过期时间的 key 优先移除。
```

[调整 Redis 定期任务的执行频率](https://help.aliyun.com/document_detail/142171.html)

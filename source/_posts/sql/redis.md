---
title: redis
date: 2018/11/10 17:29
toc: true
comments: true
tags:
- sql
- mysql
---

- [Redis-主从复制与Sentinel - 简书](https://www.jianshu.com/p/88636a819802)
![主从复制](http://img.hb.aicdn.com/047fcbdf9c84f15fb0b2b28eb74a7409304c200418489-i4oOmX_fw658)

- [How to atomically delete keys matching a pattern using Redis](https://stackoverflow.com/questions/4006324/how-to-atomically-delete-keys-matching-a-pattern-using-redis)
```
EVAL "return redis.call('del', unpack(redis.call('keys', ARGV[1])))" 0 prefix:*
```
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

---
title: redis集群
date: 2018/11/10 17:29
toc: true
comments: true
tags:
  - redis
---

# docker 搭建 redis 伪集群

## 参考资料

- [Docker Redis 5.0 集群（cluster）搭建 - 掘金](https://juejin.im/post/6844903809005649927)
- [Redis 集群搭建详细指南 - Mafly - 博客园](https://www.cnblogs.com/mafly/p/redis_cluster.html)

## 创建网段

```sh
docker network create redis-net
docker network ls
docker inspect redis-net
```

## 模板配置 redis-cluster.tmpl

```sh
port ${PORT}
protected-mode no
cluster-enabled yes
cluster-config-file nodes.conf
cluster-node-timeout 5000
cluster-announce-ip 172.20.0.1
cluster-announce-port ${PORT}
cluster-announce-bus-port 1${PORT}
appendonly yes
```

## 根据模板批量创建配置文件

```sh
for port in `seq 6000 6005`; do \
  mkdir -p ./${port}/conf \
  && PORT=${port} envsubst < ./redis-cluster.tmpl > ./${port}/conf/redis.conf \
  && mkdir -p ./${port}/data; \
done
```

## 批量运行(注意修改目录)

```sh
for port in `seq 6000 6005`; do \
docker run -d -ti -p ${port}:${port} -p 1${port}:1${port} \
-v /root/w/cluster/redis-cluster/${port}/conf/redis.conf:/usr/local/etc/redis/redis.conf \
-v /root/w/cluster/redis-cluster/${port}/data:/data \
--restart always --name redis-${port} --net redis-net \
--sysctl net.core.somaxconn=1024 redis:5.0.3 redis-server /usr/local/etc/redis/redis.conf; \
done
```

## 运行和查看

```sh
docker exec -it redis-6000 bash
redis-cli --cluster create 172.20.0.1:6000 172.20.0.1:6001 172.20.0.1:6002 172.20.0.1:6003 172.20.0.1:6004 172.20.0.1:6005 --cluster-replicas 1

# 连接客户端，查看主从信息
redis-cli -c -p 6000
redis> keys *
redis> info replication
```

## 开放防火墙

```sh
for port in `seq 7000 7005`; do \
  firewall-cmd --zone=public --add-port=${port}/tcp --permanent
done

#重新载入
firewall-cmd --reload

```

## 停止和移除

```sh
# 暂停容器并删除容器
for port in `seq 6000 6005`; do \
  docker stop redis-${port};
  docker rm redis-${port};
done
```

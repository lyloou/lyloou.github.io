---
title: docker
date: 2018-06-04 17:16:15
toc: true
comments: true
tags:
  - devops
---

## install

wget -qO- https://get.docker.com | sh

## config

https://www.jianshu.com/p/95e397570896
｀｀｀ sh
如果还没有 docker group 就添加一个：
sudo groupadd docker

将用户加入该 group 内。然后退出并重新登录就生效啦。
sudo gpasswd -a \${USER} docker

重启 docker 服务
sudo service docker restart

切换当前会话到新 group 或者重启 X 会话
newgrp - docker

注意:最后一步是必须的，否则因为 groups 命令获取到的是缓存的组信息，刚添加的组信息未能生效，所以 docker images 执行时同样有错。
｀｀｀

## 加速器

https://www.daocloud.io
config docker preference(registry-mirrors) :
for ubuntu

> curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://6cde3c02.m.daocloud.io
> sudo systemctl restart docker.service

> curl -sSL https://get.daocloud.io/daotools/set_mirror.sh | sh -s http://d1d9aef0.m.daocloud.io

## 示例

```sh
docker run hello-world

docker run -it alpine sh

docker images

docker run -d -p 80:80 nginx
docker ps
docker kill __id__

docker run -d -p 9200:9200 elasticsearch
docker logs __id__
```

## [Docker 中文教程\_Docker 开发中文手册[PDF]下载-极客学院 Wiki](http://wiki.jikexueyuan.com/project/docker/)

`-d`: 标示是让 docker 容器在后台运行。
`-P`: 标示 Docker 所需的端口映射从主机映射到我们的容器内。
`-t`: 表示在新容器内指定一个伪终端或终端，
`-i`: 表示允许我们对容器内的 STDIN 进行交互。
`-p`: 标识来指定容器端口绑定到主机端口 > `sudo docker run -d -p 5000:5000 training/webapp python app.py` > `sudo ocker port nostalgic_morse 5000` > https://wiki.jikexueyuan.com/project/docker/userguide/dockerlinks.html

```sh
sudo docker run -t -i training/sinatra /bin/bash
sudo docker commit -m="Added json gem" -a="Lou Li" \
    9e4dcef3e152 lyloou/sinatra:v2
    4f177bd27a9ff0f6dc2a830403925b5360bfe0b93d476f7fc3231110e7f71b1c
```

```sh
sudo docker build -t="lyloou/sinatra:v2" .
sudo docker tag 5db5f8471261 lyloou/sinatra:devel
sudo docker push lyloou/sinatra
sudo docker rmi lyloou/sinatra
```

```sh
# http://wiki.jikexueyuan.com/project/docker/examples/nodejs_web_app.html
# run in background
sudo docker run -p 49161:8080 -d lyloou/centos-node-hello:latest

# https://askubuntu.com/questions/505506/how-to-get-bash-or-ssh-into-a-running-container-in-background-mode
sudo docker exec -it f3b /bin/bash
```

## 数据持久化

如果需要数据持久化，可以使用数据卷机制。

```sh
docker run -p 8080:8080 -p 50000:50000 -v /your/home:/var/jenkins_home jenkins
```

or

```sh
docker volume create --name jenkins_home
docker run -p 8080:8080 -p 50000:50000 -v jenkins_home:/var/jenkins_home jenkins/jenkins:lts
```

## docker-compose

### install and run

```sh
pip install docker-compose

# create file docker-compose.yml
# run
docker-compose up
```

### uninstall and remove

```sh
# Stop and remove containers, networks, images, and volumes
docker-compose down
```

```sh
# 获取docker服务地址
[root@iZj6c9zr2mst7l8t6ardbkZ ~]# cat show_ip.sh
#/bin/bash
docker inspect --format='{{.Name}} - {{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $(docker ps -aq)

[root@iZj6c9zr2mst7l8t6ardbkZ ~]# ./show_ip.sh
/nginx - 172.18.0.8
/reward - 172.18.0.4
/web - 172.18.0.14
/app - 172.18.0.7
/check - 172.18.0.13
/exapi - 172.18.0.3
/coin - 172.18.0.12
/api - 172.18.0.5
/trade - 172.18.0.9
/admin - 172.18.0.11
/service - 172.18.0.6
/rabbitmq - 172.18.0.17
/redis2 - 172.18.0.2
/zookeeper - 172.18.0.15
/redis1 - 172.18.0.10
/mysql - 172.18.0.16
/nexus3 - 172.17.0.2
```

## 网络管理

[Docker 错误集合\_挂件-CSDN 博客\_error: pool overlaps with other one on this addres](https://blog.csdn.net/benpaodelulu_guajian/article/details/90546129)
查看 docker 网卡

```
docker network ls
```

查看 docker 网卡的相关详细信息 确认是自己创建的 ip 段 然后在删除相应的网卡

```
docker network inspect ${containerid}
```

删除 docker 网卡

```
docker network rm ${containerid}
```

## 清除日志

https://stackoverflow.com/a/43570083

```sh
truncate -s 0 /var/lib/docker/containers/*/*-json.log
```

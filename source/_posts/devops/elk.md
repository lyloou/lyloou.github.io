---
title: ELK环境部署
date: 2019-06-04 17:16:15
toc: true
comments: true
tags:
  - devops
  - es
---

## 软件和环境：

virtual box 6.1
centos 7
java: jdk1.8.0_171

es: 7.3.0
官网地址：https://www.elastic.co/cn/downloads/elasticsearch
下载地址：https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-7.3.0-linux-x86_64.tar.gz

Kibana: 7.3.0
官网地址：https://www.elastic.co/cn/downloads/kibana
下载地址：https://artifacts.elastic.co/downloads/kibana/kibana-7.3.0-linux-x86_64.tar.gz

logstash: 7.3.0
官网地址：https://www.elastic.co/cn/downloads/logstash
下载地址：https://artifacts.elastic.co/downloads/logstash/logstash-7.3.0.tar.gz

配置 hosts

```sh
# vi /etc/hosts
172.20.130.84 node.com
```

关闭防火墙

```sh
systemctl stop firewalld.service #停止firewall
systemctl disable firewalld.service #禁止firewall开机启动
firewall-cmd --state # 查看防火墙
```

java 环境配置

```sh
# vi /etc/profile
JAVA_HOME=/usr/java JRE_HOME=/usr/java/jre
CLASS_PATH=.:$JAVA_HOME/lib/dt.jar:$JAVA_HOME/lib/tools.jar:$JRE_HOME/lib PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH
export JAVA_HOME JRE_HOME CLASS_PATH PATH

# source /etc/profile
```

#### es

1. 单机安装请取消注释：node.name: node-1，否则无法正常启动。修改网络和端口，取消注释 master 节点，单机只保留一个 node

```yml
node.name: node-1
network.host: node.com #
# Set a custom port for HTTP: #
http.port: 9200
cluster.initial_master_nodes: ["node-1"]
```

2. 按需修改 vim /usr/elasticsearch/conﬁg/jvm.options 内存设置

```sh
# 根据实际情况修改占用内存，默认都是1G，单机1G内存，启动会占用700m+然后在安装kibana 后，基本上无法运行了，运行了一会就挂了报内存不足。
# 内存设置超出物理内存，也会无法启动，启动报错。
-Xms1g
-Xmx1g
```

3. 添加 es 用户，es 默认 root 用户无法启动，需要改为其他用户

```sh
useradd	estest
# 修改密码
passwd	estest
chown -R estest /usr/elasticsearch/
```

4. 修改/etc/sysctl.conf

```sh
vm.max_map_count=655360
# 是修改生效：sysctl -p
```

5. 修改/etc/security/limits.conf

```
*	soft	nofile	65536
*	hard	nofile	65536
*	soft	nproc	4096
*	hard	nproc	4096
```

6. 用 estest 用户启动 es

```sh
su estest
/usr/elasticsearch/bin/elasticsearch
```

7. 测试

```
curl http://node.com:9200
```

#### ik 分词器

https://github.com/medcl/elasticsearch-analysis-ik/releases/tag/v7.3.0

1. 在 elasticsearch 的 bin 目录下执行以下命令,es 插件管理器会自动帮我们安装，然后等待安装完成：

```
/usr/elasticsearch/bin/elasticsearch-plugin install https://github.com/medcl/elasticsearch-analysis-ik/releases/download/v7.3.0/elasticsearch-analysis-ik-7.3.0.zip
```

2. 下载完成后会提示 Continue with installation?输入 y 即可完成安装
3. 重启 Elasticsearch 和 Kibana

测试

```
POST	_analyze
{
"analyzer": "ik_max_word", "text": "南京市长江大桥"
}
```

#### Kibana

最好也用 estest 用户操作
解压，修改配置（端口号、es 地址等）

```sh
# vim /usr/kibana/config/kibana.yml
server.port: 5601
server.host: "0.0.0.0"
# The URLs of the Elasticsearch instances to use for all your queries.
elasticsearch.hosts: ["http://192.168.211.136:9200"]
```

启动

```sh
./bin/kibana
```

#### 按照和运行`redis`:

```sh
yum install wget -y
wget https://download.redis.io/releases/redis-5.0.8.tar.gz
tar -zxf redis-5.0.8.tar.gz
yum install gcc -y

cd redis-5.0.8
make && make install

cd /usr/local/bin/
cp ~/redis-5.0.8/redis.conf .
# 配置 redis.conf 的密码为123456，ip为 bind 0.0.0.0
redis-server redis.conf
```

#### Logstash

配置 shipper-logstash.conf

```ini
input {
  file {
    path => [
      "/log/out.log"
    ]
  }
}

output {
  redis {
    host => "node.com"
    port => 6379
    db => 0
    password => "123456"
    data_type => "channel"
    key => "sb-logback"
  }
}
```

配置 indexer-logstash.conf

```ini
input {
    redis {
        host      => "node.com"    # redis主机地址
        port      => 6379               # redis端口号
        password  => "123456"
        db        => 0                  # redis数据库编号
        data_type => "channel"          # 使用发布/订阅模式
        key       => "sb-logback"  # 发布通道名称
    }
}

filter {
     #定义数据的格式
     grok {
       match => { "message" => "%{TIMESTAMP_ISO8601:time} \[%{NOTSPACE:threadName}\] %{LOGLEVEL:level}  %{DATA:logger} %{NOTSPACE:applicationName} -(?:.*=%{NUMBER:timetaken}ms|)"}
     }
}

output {
    stdout {}
    elasticsearch {
        hosts => "node.com:9200"
        index => "logback"
   }
}
```

#### 运行 jar，指定输出目录

```sh
java -jar spring-api.jar & > /log.out
```

## 其他资料

- [ELK 处理 Spring Boot 日志，妙！](https://mp.weixin.qq.com/s/i1qgONtrtaqHo0o0TcRFGA)
- [ElasticSearch 相关](./ElasticSearch相关)
- [Docker 安装及安装单机版 ELK 日志收集系统 - osc_dg0eswo7 的个人空间 - OSCHINA](https://my.oschina.net/u/4342169/blog/4333777/print)
- [ELK 实时日志分析平台环境部署--完整记录 - 云+社区 - 腾讯云](https://cloud.tencent.com/developer/article/1026543)
- [使用 ELK(Elasticsearch + Logstash + Kibana) 搭建日志集中分析平台实践 | HelloDog](https://wsgzao.github.io/post/elk/)
- [Kibana（一张图片胜过千万行日志） - 废物大师兄 - 博客园](https://www.cnblogs.com/cjsblog/p/9476813.html)
- [Filebeat 模块与配置 - 废物大师兄 - 博客园](https://www.cnblogs.com/cjsblog/p/9495024.html)

---
title: frps内网穿透软件
date: 2022-02-08 21:04:14
toc: true
comments: true
tags:
  - linux
---

frps 是一个优秀的内网穿透软件。

frps 下载安装：https://github.com/fatedier/frp/releases

**服务端:** `./frps -c ./frps.ini`

frps.ini

```ini
[common]
bind_addr = 0.0.0.0
bind_port = 7000

bind_udp_port = 7001

dashboard_port = 7500
dashboard_user = admin
dashboard_pwd = admin

vhost_http_port = 2780
subdomain_host = frps.example.com
```

**客户端:** `./frpc -c ./frpc.ini`

frpc.ini

```ini
[common]
server_addr = xx.xx.xx.xx
server_port = 7000
admin_addr = 127.0.0.1
admin_port = 7400

[ssh]
type = tcp
local_ip = 127.0.0.1
local_port = 22
remote_port = 7022

[web]
type = http
local_port = 2780
subdomain = office
```

访问服务器端的 dashboard 查看统计信息: `http://frps.example.com:7500/`

访问内网 ssh： `ssh -oPort=7022 test@x.x.x.x`
通过浏览器访问内网机器: `http://office.frps.example.com:2780/`

## 配置自动启动

安装 supervisor

```sh
apt install supervisor

# 查看 supervisor 状态
service supervisor status
```

添加 frps 配置：`vi /etc/supervisor/conf.d/frps.conf`

```sh
[program:frps]
command=/root/c/frp/frps -c /root/c/frp/frps.ini
autostart=true
autorestart=true
```

可以依次运行下面操作加载 新加入的 frps

```sh
# 告诉 supervisor 新加了配置
supervisorctl reread

# 让 supervisor 启动 frps
supervisorctl update

```

输入 supervisorctl 查看 frps 是否已运行

![202202082113352](https://raw.githubusercontent.com/lyloou/img/develop/img/202202082113352.png)

start 和 stop frps
![202202082114908](https://raw.githubusercontent.com/lyloou/img/develop/img/202202082114908.png)

设置 supervisor 开机启动

```sh
systemctl enable supervisor.service
systemctl daemon-reload
```

为 supervisor 添加 dashboard，通过 9001 来访问：

`vi /etc/supervisor/supervisord.conf` 添加下面代码

```sh
[inet_http_server]
port=*:9001
username=admin
password=admin
```

![202202082135628](https://raw.githubusercontent.com/lyloou/img/develop/img/202202082135628.png)

## 参考资料

https://github.com/fatedier/frp

[通过 frp 实现访问内网 ssh 与 http 简明教程 - 简书](https://www.jianshu.com/p/219553bfeca9)

[How to Install and Configure Supervisor on Ubuntu 20.04 | Atlantic.Net](https://www.atlantic.net/vps-hosting/how-to-install-and-configure-supervisor-on-ubuntu-20-04/)

```ini
[program:nginx]
command=/usr/sbin/nginx -g "daemon off;"
autostart=true
autorestart=true
startretries=5
numprocs=1
startsecs=0
process_name=%(program_name)s_%(process_num)02d
stderr_logfile=/var/log/supervisor/%(program_name)s_stderr.log
stderr_logfile_maxbytes=10MB
stdout_logfile=/var/log/supervisor/%(program_name)s_stdout.log
stdout_logfile_maxbytes=10MB
```

[使用 supervisor 设置服务端 frp 开机启动 - 一只猿 - 前端攻城尸 | 安全研究员 | 硬件控 | 业余极客 | 开源拥护者](https://www.92ez.com/?action=show&id=23484)

[frp - 《frp 中文文档》 - 书栈网 · BookStack](https://www.bookstack.cn/read/frp/README_zh.md)

---
title: nginx
date: 2018-09-19 16:58:15
toc: true
comments: true
tags:
- linux
---

# install nginx
```sh
sudo apt install nginx
```

```sh
# 启动Nginx
/etc/init.d/nginx start

# 如果nginx已经启动，我们修改配置之后，可以用
/etc/init.d/nginx reload
```

在`/etc/nginx/nginx.conf`末尾有一句：include /etc/nginx/conf.d/*.conf;　　推荐把用户自己的配置放到conf.d/
下面把默认的server修改为一个简单的文件服务器，`vi /etc/nginx/conf.d/default.conf`，修改监听端口listen和文件目录
```conf
# /etc/nginx/conf.d/default.conf
autoindex on;# 显示目录
autoindex_exact_size on;# 显示文件大小
autoindex_localtime on;# 显示文件时间

server {
     listen       8080 default_server;
     listen       [::]:8080 default_server;
     server_name  _;
     #root         /root/share/;
     root         /opt/share/;

     # Load configuration files for the default server block.
     include /etc/nginx/default.d/*.conf;

     location / {
     }

     error_page 404 /404.html;
     location = /40x.html {
     }

     error_page 500 502 503 504 /50x.html;
     location = /50x.html {
     }

 }

```


```conf
# 修改/etc/nginx/nginx.conf
# 由于我们使用的是root用户进行的共享，需要修改nginx.conf的用户，否则会出现权限问题，导致访问的时候出现403 Forbidden的错误

user root;
```



- [利用nginx搭建小型的文件服务器](https://www.jianshu.com/p/95602720e7c8)
- [How To Install Nginx on Ubuntu 16.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)
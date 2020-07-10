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

在`/etc/nginx/nginx.conf`末尾有一句：include /etc/nginx/conf.d/\*.conf;　　推荐把用户自己的配置放到 conf.d/
下面把默认的 server 修改为一个简单的文件服务器，`vi /etc/nginx/conf.d/default.conf`，修改监听端口 listen 和文件目录

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

- [利用 nginx 搭建小型的文件服务器](https://www.jianshu.com/p/95602720e7c8)
- [How To Install Nginx on Ubuntu 16.04 | DigitalOcean](https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-16-04)

## nginx 配置（含 ssl）

取名为 bs.lyloou.com.conf，并放入文件夹： /etc/nginx/conf.d 中，因为 nginx.conf 中会加载此目录下的文件，可以可以得到注册。

```conf
server
{
    listen 80;
    listen 443 ssl http2;
    server_name bs.lyloou.com;
    #index index.php index.html index.htm default.php default.htm default.html;
    #root /www/wwwroot/bs.lyloou.com;

    include /etc/nginx/default.d/*.conf;

    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则
    #error_page 404/404.html;
    #HTTP_TO_HTTPS_START
    if ($server_port !~ 443){
        rewrite ^(/.*)$ https://$host$1 permanent;
    }
    #HTTP_TO_HTTPS_END
    ssl_certificate    /root/c/nginx/33333_bs.lyloou.com.pem;
    ssl_certificate_key   /root/c/nginx/33333_bs.lyloou.com.key;
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;
    #error_page 497  https://$host$request_uri;

    #SSL-END

    location / {
        proxy_pass http://127.0.0.1:8080;
    }

    error_page 404 /404.html;
    location = /40x.html {
    }

    error_page 500 502 503 504 /50x.html;
    location = /50x.html {
    }
}

```

[Nginx -- proxy_pass 配置 - Bigberg - 博客园](https://www.cnblogs.com/bigberg/p/7651197.html)

> url 后带 / （则不会加上 location 中的匹配路径）
> url 中不带 / （则会加上 location 中的匹配路径）

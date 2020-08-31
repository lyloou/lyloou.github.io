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

## [Nginx -- proxy_pass 配置 - Bigberg - 博客园](https://www.cnblogs.com/bigberg/p/7651197.html)

在 proxy_pass 中的代理 url 后加上/，代理转发的 url 中就不会带上 location 中匹配路径；
![](/images/article/nginx_2020-08-19-18-50-37.png)
我们访问 http://my.yemao.com/proxy/index.html，其实是访问到了 http://test.yemao.com/index.html

> 在 proxy_pass 中的代理 url 后带 / （则不会加上 location 中的匹配路径）
> 在 proxy_pass 中的代理 url 中不带 / （则会加上 location 中的匹配路径）

## [nginx 在一个服务器上配置两个项目，并通过两个不同的域名访问 - 半马 - 博客园](https://www.cnblogs.com/banma/p/9069858.html)

## nginx 搭建文件服务器

- [用 nginx 一分钟实现文件服务器 - 简书](https://www.jianshu.com/p/d9f886a9666a)
- [NGINX as a file server](https://www.yanxurui.cc/posts/server/2017-03-21-NGINX-as-a-file-server/)

```conf
server {
  listen 80;
  server_name file.lyloou.com; # 自己PC的ip或者服务器的域名 charset utf-8; # 避免中文乱码
  root /home/xx/share; # 存放文件的目录
  location / {
    # download
    autoindex on;               # enable directory listing output
    autoindex_exact_size off;   # output file sizes rounded to kilobytes, megabytes, and gigabytes
    autoindex_localtime on;     # output local times in the directory
  }
}

```

## [如何为 nginx 配置 https(免费证书) - 主啊~ - 博客园](https://www.cnblogs.com/immense/p/11402157.html)

注意

- 如果用了 docker 要暴露 443 端口
- 如果用了服务商服务器，要在安全组中配置 443 入方向

## nginx 设置 websocket 连接

```
  location /market {
    index index.html;
    client_max_body_size    5m;
    proxy_pass http://172.21.90.214:6001;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_set_header X-Real-IP $remote_addr;
  }
```

## 无法访问静态资源

- [nginx 找不到静态（css,js,html）文件 404 报错，root 的解析\_lwgkzl 的博客-CSDN 博客\_nginx 找不到静态文件](https://blog.csdn.net/lwgkzl/article/details/81278985)
- [解决 nginx 部署后 css、js、图片等样式不加载的问题\_qq_27184497 的博客-CSDN 博客\_nginx 无法加载 js 与 css](https://blog.csdn.net/qq_27184497/article/details/82292399)

```ini
server{
        listen 80;
        location / {
                proxy_pass http://xd-project;

        }
        # 添加下面部分
        location ~ .* {
                proxy_pass http://xd-project;
                proxy_set_header Host $http_host;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }

}
```

或者使用下面部分：

```ini
location ~.*(js|css|png|gif|jpg|mp3|ogg)$ {
    root /home/kzl/data/app/;
}
```

> 这个 location 说明如果你要访问 js,css,png...结尾的文件，你需要在你的访问路径前加上 root。
> 这个 root 实际上就是替换了网页上的 http:10.10.10.10:5000。如果加了这个 location，那么网页在访问 http:10.10.10.10:5000/static/css/morris.css.这个路径的时候，因为文件结尾是 css 匹配到了这个 location,然后网页就会访问

## 替代方案：Caddy

- https://caddyserver.com/

- [Using Caddy instead of Nginx, the whole station upgrades https, and the configuration is simpler.](https://programmer.help/blogs/5d1a87803e2e9.html)

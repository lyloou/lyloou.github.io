[2018 最新检查搬瓦工 IP / 端口是否被封的方法-Bandwagonhost中文网](https://www.bandwagonhost.net/1934.html)

https://kiwivm.64clouds.com/main-exec.php?mode=blacklistcheck

## 

```sh
apt-get install python-pip
pip install git+https://github.com/shadowsocks/shadowsocks.git@master
sudo ssserver -p 443 -k password -m aes-256-cfb --user nobody -d start
```

https://github.com/shadowsocks/shadowsocks/tree/master

## 问题

- [pip安装时locale.Error: unsupported locale setting解决办法 - Ranger - CSDN博客](https://blog.csdn.net/qq_31927797/article/details/79191474)
  
  ```sh
  ubuntu:~# export LC_ALL=C
  ```
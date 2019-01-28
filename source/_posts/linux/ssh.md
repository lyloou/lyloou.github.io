---
title: ssh
date: 2016-11-26 17:16:15
toc: true
comments: true
tags:
- linux
---
## connection refused
https://askubuntu.com/questions/30080/how-to-solve-connection-refused-errors-in-ssh-connection
```sh
sudo apt-get install openssh-server openssh-client
```

##  将 ssh keys 复制到 user@host 以启用无密码 SSH 登录。
```sh
$ssh-copy-id user@host
```

## 将本地的文本文件保存到远程服务端中
```sh
cat ~/.ssh/id_rsa.pub | ssh user@123.45.56.78 "mkdir -p ~/.ssh && cat >>  ~/.ssh/authorized_keys"
https://www.digitalocean.com/community/tutorials/how-to-set-up-ssh-keys--2
```

## [How to enter ssh password using bash? ](https://stackoverflow.com/questions/16928004/how-to-enter-ssh-password-using-bash)

> Create a new keypair: (go with the defaults)
> `ssh-keygen`

> Copy the public key to the server: (password for the last time)
> `ssh-copy-id user@my.server.com`

> From now on the server should recognize your key and not ask you for the password anymore:
> `ssh user@my.server.com`

## 设置ngrok域名
- ngrok -proto=tcp 22
- ssh -p 3894 lilou@ngrok.lyloou.com
- [如何远程登录家里的Ubuntu电脑(命令行模式)？](https://www.zhihu.com/question/27771692)
- https://blog.csdn.net/sethqqq/article/details/77033154

## [ssh: connect to host localhost port 22: Connection refused](https://blog.csdn.net/jszhangyili/article/details/8881807)
错误原因：
1.sshd 未安装
2.sshd 未启动
3.防火墙
解决方法：
1.确定安装sshd:  
`$ sudo apt-get install openssh-server  `
2.启动sshd: 
`$ sudo net start sshd  `
3.检查防火墙设置,关闭防火墙：
`$ sudo ufw disable   `
检验方法，输入命令：
`$ ssh localhost  `
若成功，则表示安装成功，且连接通过；
但是有的时候虽然成功了但是还是会出现Connection refused 问题。
运行 ps -e | grep ssh，查看是否有sshd进程：
有时候虽然可以看到sshd 但是还是不能连接成功
这时候就要想到重新启动一下：sudo service ssh restart


## 

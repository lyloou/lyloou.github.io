---
title: samba
date: 2019-01-07 13:50:34
toc: true
comments: true
tags:
- linux
---


https://tutorials.ubuntu.com/tutorial/install-and-configure-samba#0

[https://blog.csdn.net/wbaction/article/details/72758673](https://blog.csdn.net/wbaction/article/details/72758673)

## install
```sh
sudo apt-get install samba
```
## config
```sh
sudo vim /etc/samba/smb.conf
```

```ini
[smbshare]
    comment = samba home directory 
    path = /home/user/w/smbshare
    public = yes
    browseable = yes
    public = yes
    read only = no
    valid users = user
    create mask = 0777
    directory mask = 0777 
    force user = nobody
    force group = nogroup
    available = yes
```    

```sh
chmod 777 /home/user/w/smbshare
```

## add user
```sh
sudo smbpasswd -a user
```

## restart
```sh
sudo service smbd restart
```

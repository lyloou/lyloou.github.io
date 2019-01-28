---
title: linux-interview
date: 2018-08-23 16:53:15
toc: true
comments: true
tags:
- linux
---

## [(3) Top 10 Linux Job Interview Questions - YouTube](https://www.youtube.com/watch?v=l0QGLMwR-lY)
Can you answer the 10 most popular Linux tech job interview questions?
0:00 Introduction
0:53 Tech Phone screens
1:50 How to check the kernel version of a Linux system?
```sh 
man uname 

uname -a # everything
uname -rsm
```


2:50 How to see the current IP address on Linux?
```sh
ifconfig

ip addr
ip addr show eth0
```

4:03 How to check for free disk space in Linux?
```sh
man df
df -ah

df -T -h
```

4:55 How to see if a Linux service is running?
```sh
service udev status
systemctl status udev
```

6:33 How to check the size of a directory in Linux?
```sh
man du
du -sh directory_name/
```

7:02 How to check for open ports in Linux?
```sh
man netstat
netstat -tulpn
sudo !! # show PID/Program name
```

9:48 How to check Linux process information (CPU usage, memory, user information, etc.)?
```sh
ps -aux | grep ngrok
top
htop
```

11:49 How to deal with mounts in Linux
```sh
ls /mnt 
mount /dev/sdb2 /mnt
less /etc/fstab
```

13:51 Man pages
15:04 Other resources

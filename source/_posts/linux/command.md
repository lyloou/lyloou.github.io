---
title: linux常用命令
date: 2016-11-27 17:16:15
toc: true
comments: true
tags:
- linux
---

## 设置管理员密码
首次使用管理员登录需要先设置密码
```sh
sudo passwd
```

## 定时关机
http://os.51cto.com/art/201108/287974.htm
```sh
shutdown -h 22:30 # 在指定时间关机
shutdown -h 30 #30分钟后关机
```

## history之后执行指定行的命令
> `$ history // 查看命令历史`  
> `$ !334  //表示执行第334行的命令`

## 在命令行中用默认程序打开文件
`xdg-open { file | URL }`
> [Ubuntu下用命令行快速打开各类型文件(转)-bough22-ChinaUnix博客](http://blog.chinaunix.net/uid-27025492-id-3376626.html)

## ps 查看运行的进程
`ps -aux | grep vim`

## Ubuntu 系统强制关闭进程。
> $ps -aux | grep [应用名]  # 抓取指定应用的进程信息，几下 应用的pid
> $kill -9 [应用的pid]

## cat
10行的上下文
```sh
cat file.txt | grep -C 10 key_word
```

## tail
查看实时日志： tail -fn 100 log_file_name.out
```sh
tail --help
-f: `--follow[HOW]` Output appended data as the file grows;
-n: `--lines=[+]NUM` Output the last NUM lines, instead of the last 10;
```
## sed
https://coolshell.cn/articles/9104.html
```
sed -i "s/'proxy.*/'proxy': 'http://proxy.lyloou.com'/g" eros.dev.js
```

## nohup
用途：不挂断地运行命令。
语法：nohup Command [ Arg … ] [　& ]
描述：nohup 命令运行由 Command 参数和任何相关的 Arg 参数指定的命令，忽略所有挂断（SIGHUP）信号。在注销后使用 nohup 命令运行后台中的程序。要运行后台中的 nohup 命令，添加 & （ 表示”and”的符号）到命令的尾部。
http://www.cnblogs.com/allenblogs/archive/2011/05/19/2051136.html

### nohup 不生成 nohup.out的方法
```sh
nohup java -jar /xxx/xxx/xxx.jar >/dev/null 2>&1 &
```
关键在于最后的 >/dev/null 2>&1 部分，/dev/null是一个虚拟的空设备（类似物理中的黑洞），任何输出信息被重定向到该设备后，将会石沉大海
>/dev/null 表示将标准输出信息重定向到"黑洞"
2>&1 表示将标准错误重定向到标准输出(由于标准输出已经定向到“黑洞”了，即：标准输出此时也是"黑洞"，再将标准错误输出定向到标准输出，相当于错误输出也被定向至“黑洞”)
http://www.cnblogs.com/yjmyzz/p/4831182.html




## 在某目录及其子目录下所有文件的最前面添加几行文字
```sh
grep -rl '' tmpdir\ | xargs sed -i "1 i hi 你好吗\n 你知道我是谁吗\n 是的，是我\n"
```
- [linux - Find and replace with sed in directory and sub directories - Stack Overflow](https://stackoverflow.com/questions/6758963/find-and-replace-with-sed-in-directory-and-sub-directories)

## lsof -i 8088

## 通过域名查看ip
- ping的方式：`ping lyloou.com`
- nslookup方式： `nslookup lyloou.com`

## 拉取远程文件
```
scp root@138.128.208.16:/root/go/src/github.com/inconshreveable/ngrok/bin/ngrok D:/dd/ngrok
```
如果出现这个错误：`connect to xxxxxxx port 22: Connection refused`
```sh
yum -y install openssh-server
service sshd start
# 首先使用命令：ss -lnt查询22号端口是否开启，如下图所示为正常开启，否则要开启22号端口。 如果要修改端口，查看或编辑SSH服务配置文件，使用命令 vi /etc/ssh/sshd.config，进入后把 port 后面默认的22端口改成别的端口即可.
# https://www.linuxidc.com/Linux/2017-11/148586.htm
```

```sh
# http://wiki.ubuntu.org.cn/UbuntuSkills#.E9.80.9A.E8.BF.87ssh.E4.BC.A0.E8.BE.93.E6.96.87.E4.BB.B6
scp -rp /path/filename username@remoteIP:/path #将本地文件拷贝到服务器上
scp -rp username@remoteIP:/path/filename /path #将远程文件从服务器下载到本地
```


## df查看硬盘容量 
```sh
df -h
```

## [how-to-automount-ntfs-partitions](https://askubuntu.com/questions/46588/how-to-automount-ntfs-partitions)
- `vi /etc/fstab` & add below line
```sh
#Windows-Partition
UUID=<xxxxx> /media/win ntfs rw,auto,users,exec,nls=utf8,umask=003,gid=46,uid=1000    0   0
```

- Finding which disk you will set
```sh
sudo fdisk -l
```

- Finding the UUID
```sh
sudo blkid
```

- Check it
```
sudo mount -a
```

## 查看使用最多的10条命令
```sh
history | awk '{print $2}' | sort | uniq -c | sort -k1,1nr | head -10
```
https://coolshell.cn/articles/8619.html
http://blog.51cto.com/huanglianfeng/1381267


## [bash - How to use arguments from previous command? - Stack Overflow](https://stackoverflow.com/questions/4009412/how-to-use-arguments-from-previous-command)
```sh
$ echo a b c d e 
a b c d e
$ echo !^
echo a
a

$ echo a b c d e 
a b c d e
$ echo !:1
echo a
a
```

```sh
!^      first argument
!$      last argument
!*      all arguments
!:2     second argument

!:2-3   second to third arguments
!:2-$   second to last arguments
!:2*    second to last arguments
!:2-    second to next to last arguments

!:0     the command
!!      repeat the previous line
```

## kill
- [Linux kill -9 和 kill -15 的区别 - 妖老山黑 - 博客园](https://www.cnblogs.com/liuhouhou/p/5400540.html)
- [大家在kill -9前不会尝试kill -15么？ - 知乎](https://www.zhihu.com/question/23747655)
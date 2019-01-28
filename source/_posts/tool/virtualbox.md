---
title: virtualbox定制
date: 2017-07-23 09:49:34
toc: true
comments: true
tags:
- tool
---


## [How to SSH to a VirtualBox guest externally through a host?](https://stackoverflow.com/questions/5906441/how-to-ssh-to-a-virtualbox-guest-externally-through-a-host)
### plan 1
```
The best way to login to a guest Linux VirtualBox VM is port forwarding. By default, you should have one interface already which is using NAT. Then go to the Network settings and click the Port Forwarding button. Add a new Rule:
`Host port 3022, guest port 22, name ssh, other left blank.`
```
### plan 2
```
Change the adapter type in VirtualBox to bridged, and set the guest to use DHCP or set a static IP address outside of the bounds of DHCP. This will cause the Virtual Machine to act like a normal guest on your home network. You can then port forward.
```

## [Virtualbox虚拟机Ubuntu共享文件夹设置 自动挂载 - CSDN博客](http://blog.csdn.net/taochangchang/article/details/12918537)
1. run `autorun.sh`
2. reboot
3. name shared folder
> 点击"设备(Devices)" -> 共享文档夹(Shared Folders)菜单，添加一个共享文档夹，选项固定和临时是指该文档夹是否是持久的。共享名能够任取一个自己喜欢的，比如"gongxiang"，尽量使用英文名称。
4. mount dir
```
sudo mkdir /mnt/shared
sudo mount -t vboxsf gongxiang /mnt/shared
```
5. add to auto mount
```
// add to file: `/etc/fstab`
gongxiang /mnt/shared vboxsf rw,gid=username,uid=username,auto 0 0
// 以上的 vboxsf 是群组名称 username 是你的 用户名 就是 /home/下的文件夹名称/mnt/shared 是挂载目录
```
6. umount
```
sudo umount -f /mnt/shared
```
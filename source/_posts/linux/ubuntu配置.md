---
title: ubuntu配置
date: 2018-07-27 17:16:15
toc: true
comments: true
tags:
- linux
- ubuntu
---

## 修改hostname
```sh
vi /etc/hostname
reboot
```

## [Linux Basics - Set a Static IP on Ubuntu](https://www.howtoforge.com/linux-basics-set-a-static-ip-on-ubuntu)

Here is an example for an older Ubuntu Release:

```bash
auto lo eth0
iface lo inet loopback
iface eth0 inet static
	address 192.168.1.100
	netmask 255.255.255.0
	gateway 192.168.1.1
```    
And here an example for Ubuntu 16.04 and newer:
```bash
# This file describes the network interfaces available on your system
# and how to activate them. For more information, see interfaces(5).

source /etc/network/interfaces.d/*

# The loopback network interface
auto lo
iface lo inet loopback

# test

# The primary network interface
auto ens33
iface ens33 inet static
 address 192.168.1.100
 netmask 255.255.255.0
 network 192.168.1.0
 broadcast 192.168.1.255
 gateway 192.168.1.1
 dns-nameservers 8.8.8.8 8.8.4.4
 ```

## Changing ubuntu server's language to english
```sh
sudo apt-get install language-pack-en language-pack-en-base manpages
```

```sh
# /etc/default/locale
LANG="en_US.UTF-8"
```
```sh
## OR
sudo update-locale LANG=en_US.UTF-8
```

## build-essential 
```sh
apt-get install build-essential
```

## switch between gdm,lightdm
http://www.webupd8.org/2011/07/how-to-switch-between-gdm-lightdm-or.html
```sh
sudo dpkg-reconfigure lightdm
```

## [How can I define startup applications with the Awesome Window Manager? - Ask Ubuntu](
https://askubuntu.com/questions/57264/how-can-i-define-startup-applications-with-the-awesome-window-manager)

Starting from a template
First you'll need to copy the template rc.lua file into your home folder
```sh
mkdir ~/.config/awesome
cp /etc/xdg/awesome/rc.lua ~/.config/awesome/
```
Defining applications to start
Now using awesome - edit config copy the following code at the bottom of your new rc.lua file
```lua
do
  local cmds =
  {
    "firefox",
    "xedit"
  }

  for _,i in pairs(cmds) do
    awful.util.spawn(i)
  end
end
```
In this example - firefox and xedit are run on startup.
An excellent wiki page describing this and much more can be found on [ArchLinux](https://wiki.archlinux.org/index.php/Awesome3#Autorun_programs)

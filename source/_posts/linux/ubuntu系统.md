---
title: ubuntu系统
date: 2018-07-26 17:16:15
toc: true
comments: true
tags:
- linux
- ubuntu
---

## [如何找到Linux的版本号](https://linux.cn/article-9760-1.html)
``` sh
uname -srm
# uname --kernel-name --kernel-release --machine
# Linux 4.13.0-46-generic x86_64
```

```sh
cat /etc/os-release
```

## [How do you run Ubuntu Server with a GUI?](https://askubuntu.com/questions/53822/how-do-you-run-ubuntu-server-with-a-gui)
```sh
# Minimal GUI:
sudo apt install xorg
sudo apt install --no-install-recommends openbox

# Minimal GUI with display manager:
sudo apt install xorg
sudo apt install --no-install-recommends lightdm-gtk-greeter
sudo apt install --no-install-recommends lightdm
sudo apt install --no-install-recommends openbox

# A more functional minimal desktop environment (the one I use):
sudo apt install xorg
sudo apt install --no-install-recommends lightdm-gtk-greeter
sudo apt install --no-install-recommends lightdm
sudo apt install --no-install-recommends lxde-icon-theme
sudo apt install --no-install-recommends lxde-core
sudo apt install --no-install-recommends lxde-common
sudo apt install --no-install-recommends policykit-1 lxpolkit
sudo apt install --no-install-recommends lxsession-logout
sudo apt install --no-install-recommends gvfs-backends

# A full lightweight desktop environment:
sudo apt install xorg
sudo apt install --no-install-recommends xubuntu-core
# or
sudo apt install --no-install-recommends ubuntu-mate-core
```
## [Can I access Ubuntu from Windows remotely?](https://askubuntu.com/questions/592537/can-i-access-ubuntu-from-windows-remotely)
https://www.tweaking4all.com/software/linux-software/use-xrdp-remote-access-ubuntu-14-04/


## vmware esxi

---
title: ubuntu软件
sticky: 10
date: 2018-08-05 17:16:15
toc: true
comments: true
tags:
- linux
- ubuntu
---

## gvim
```sh
sudo apt update
sudo apt install vim-gnome
```

## synpase（快速启动）
```sh
sudo add-apt-repository ppa:synapse-core/ppa
sudo apt-get update
sudo apt-get install synapse
```

## fcitx 五笔输入法
- 安装
`sudo apt-get install fcitx fcitx-table-wubi fcitx-tools -y`

- 启用自动调频
修改配置文件 /usr/share/fcitx/table/wbx.conf
```
AdjustOrder=AdjustFreq
```

- 不能正常打出中文标点
修改配置文件 
/usr/share/fcitx/addon/fcitx-fullwidth-char.conf
```
Priority=80
```

- 重启输入法
`fcitx -r`

- [linux 安装与配置 fcitx 五笔输入法](https://zhuanlan.zhihu.com/p/28586200)

## git
```sh
sudo apt-get update
sudo apt-get install git
```

## vlc（多媒体播放器）
```sh
sudo apt-get update
sudo apt install vlc
```

## wiz
```
http://www.wiz.cn/wiznote-linux.html
```

## firefox
```sh
# 
# https://www.computernetworkingnotes.com/ubuntu-linux-tutorials/how-to-update-firefox-in-ubuntu-linux.html
# install
sudo apt-get update
sudo apt-get install firefox

# update
sudo apt-get update
sudo apt-get install --only-upgrade firefox
```

## chrome
- install
```sh
# https://askubuntu.com/questions/510056/how-to-install-google-chrome

# 1. add key
wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -
# 2. set repository
echo 'deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main' | sudo tee /etc/apt/sources.list.d/google-chrome.list
# 3. install package
sudo apt-get update 
sudo apt-get install google-chrome-stable
```
- config
```sh
https://github.com/FelisCatus/SwitchyOmega/releases/

https://raw.githubusercontent.com/gfwlist/gfwlist/master/gfwlist.txt
```

## vscode
```sh
# https://code.visualstudio.com/docs/setup/linux

curl https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo mv microsoft.gpg /etc/apt/trusted.gpg.d/microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt-get update
sudo apt-get install code # or code-insiders
```

## idea
```sh
# https://www.jetbrains.com/help/idea/install-and-set-up-product.html
sudo snap install intellij-idea-ultimate --classic
```

## emacs
```sh
sudo apt-get install emacs
```

## [shadowsocks](https://blog.huihut.com/2017/08/25/LinuxInstallConfigShadowsocksClient/)
- install
```sh
# ubuntu
sudo apt-get install python-pip
pip install --upgrade pip
```

```python
// sudo vim /usr/bin/pip
from pip import __main__
if __name__ == '__main__':
    sys.exit(__main__._main())
```

sudo pip install shadowsocks

- config
`sudo vi $HOME/p/shadowsocks.json`
```json
// 在shadowsocks.json中加入以下内容：
{
  "server":"my_server_ip",
  "local_address": "127.0.0.1",
  "local_port":1080,
  "server_port":my_server_port,
  "password":"my_password",
  "timeout":300,
  "method":"aes-256-cfb"
}
```
`sudo ln -s $HOME/p/shadowsocks.json /etc/shadowsocks.json`

- start
```sh
- 前端启动： sudo sslocal -c /etc/shadowsocks.json
- 后端启动： sudo sslocal -c /etc/shadowsocks.json -d start
- 后端停止： sudo sslocal -c /etc/shadowsocks.json -d stop
- 重启(修改配置要重启才生效)： sudo sslocal -c /etc/shadowsocks.json -d restart
```
- boot up
`sudo vim /etc/systemd/system/shadowsocks.service`
```ini
[Unit]
Description=Shadowsocks Client Service
After=network.target

[Service]
Type=simple
User=root
ExecStart=/usr/bin/sslocal -c /etc/shadowsocks.json

[Install]
WantedBy=multi-user.target
```
`systemctl enable /etc/systemd/system/shadowsocks.service`
- now you can reboot to check it~

## proxychains
```sh
# https://askubuntu.com/questions/610333/how-to-set-socks5-proxy-in-the-terminal
# install proxychains
sudo apt install proxychains
sudo proxychains apt-get update

# now you can config your proxy in /etc/proxychains.conf
# sudo vim /etc/proxychains.conf
socks5 127.0.0.1 1080
```

## privoxy
```sh
# https://linoxide.com/linux-how-to/install-use-privoxy-ubuntu-16-04/
# install
sudo apt-get install privoxy

# sudo vim /etc/privoxy/config
# 添加下面这一行
forward-socks5 / 0.0.0.0:1080 .

#启动
/etc/init.d/privoxy restart

# 测试
curl  -x 127.0.0.1:8118 http://www.google.com
```


## caja（文件管理器）
```sh
# https://www.devmanuals.net/install/ubuntu/ubuntu-16-04-LTS-Xenial-Xerus/how-to-install-caja.html
sudo apt-get update
sudo apt-get install caja
```

## terminal
### terminator
```sh
# http://www.ubuntugeek.com/terminator-multiple-gnome-terminals-in-one-window.html
# https://linux.cn/article-2978-1.html
sudo apt-get install terminator
```
### PAC Manager

## tmux
```sh
sudo apt-get install tmux
```

- [Update your tmux to latest version](http://witkowskibartosz.com/blog/update-your-tmux-to-latest-version.html#.W2wMk87-iCo)
```sh
VERSION=2.8
wget https://github.com/tmux/tmux/releases/download/${VERSION}/tmux-${VERSION}.tar.gz
tar xf tmux-${VERSION}.tar.gz
rm -f tmux-${VERSION}.tar.gz
cd tmux-${VERSION}

sudo apt-get install libevent-dev
sudo apt-get install ncurses-dev
./configure
make
sudo make install
cd -
sudo rm -rf /usr/local/src/tmux-\*
sudo mv tmux-${VERSION} /usr/local/src
```

## zsh
- https://www.cnblogs.com/EasonJim/p/7863099.html

```sh
# install
sudo apt-get install zsh

# change default shell to zsh
chsh -s /bin/zsh
```

- oh my zsh
```sh
# https://github.com/robbyrussell/oh-my-zsh
sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

- autojump
```sh
sudo apt-get install autojump

vim .zshrc
#在最后一行加入，注意点后面是一个空格
plugins=( [plugins...] autojump)
```

- zsh-syntax-highlighting
```sh
# https://github.com/zsh-users/zsh-syntax-highlighting/blob/master/INSTALL.md
# 1. Clone this repository in oh-my-zsh's plugins directory:
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
# 2. Activate the plugin in ~/.zshrc:
plugins=( [plugins...] zsh-syntax-highlighting)
# 3. Source ~/.zshrc to take changes into account:
source ~/.zshrc
```

- zsh-autosuggestions
```sh
git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions
plugins=( [plugins...] zsh-autosuggestions)
```

- theme: 
```sh
$ git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k

vi ~/.vimrc
ZSH_THEME="powerlevel9k/powerlevel9k"
```

## git-cola
```sh
apt-get install git-cola
```

## variety 壁纸切换
```sh
sudo apt-get update
sudo apt-get install variety
```

## catfish 文件搜索
## calibre（电子书阅读器）
## 红移（色温调节工具）
## workrave（定时提醒）
## LibreOffice
## Transmission (downloader)
## diodon

## 截图软件 shutter
1. `sudo add-apt-repository ppa:shutter/ppa1`
2. `sudo apt-get update`  
3. `sudo apt-get install shutter1`
4. 设置快捷键 keyboard -> shortcut -> `shutter -s` -> Ctrl+Alt+A -> ok
- [Ubuntu 安装截图工具Shutter，并设置快捷键 Ctrl+Alt+A_Linux教程_Linux公社-Linux系统门户网站](http://www.linuxidc.com/Linux/2015-07/119753.htm)

## 卸载软件
1. 查找安装名称：`dpkg -l | grep package_name`
2. 卸载`sudo apt-get remove package_name`, 具体输入`apt-get`命令查看

## 本地安装
以安装网易云音乐为例
1. 从官网下载deb安装文件
2. 执行下列命令
```sh
$ sudo dpkg -i netease*.dbg
$ sudo apt -f install
```

## 去除chrome的`输入密码以解锁密码环`提示
- 终端输入`seahorse`
- 右键删除 `登录`
- 退出 chrome
- 提示输入密码时，不输入任何内容，直接按下一步。
> [解决打开Chrome出现 输入密码以解锁您的登录密钥环 - Android/Linux的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/kangear/article/details/20789451)

## 安装WenQuanYi Zen Hei 字体
1. download file: wqy-zenhei-0.9.45.deb
2. install: dpkg -i wqy-zenhei-0.9.45.deb


## supervisor
- [Supervisor安装与配置（Linux/Unix进程管理工具） - CSDN博客](https://blog.csdn.net/xyang81/article/details/51555473)

## [sleep](https://medium.com/@jerilkuriakose/keyboard-shortcuts-for-custom-terminal-commands-in-ubuntu-17-10-aeb902f71869)
```sh
#!/bin/bash
dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 "org.freedesktop.login1.Manager.Suspend" boolean:true
```

## wine
https://wiki.winehq.org/Ubuntu

## add C env
apt-get install build-essential

## rg
https://github.com/BurntSushi/ripgrep
```sh
curl -LO https://github.com/BurntSushi/ripgrep/releases/download/0.10.0/ripgrep_0.10.0_amd64.deb

sudo dpkg -i ripgrep_0.10.0_amd64.deb
``` 

## trash-cli
- [andreafrancia/trash-cli: Command line interface to the freedesktop.org trashcan.](https://github.com/andreafrancia/trash-cli)
- [分享|Trash-Cli：Linux 上的命令行回收站工具](https://linux.cn/article-10029-1.html)

## fzf
A command-line fuzzy finder

https://github.com/junegunn/fzf


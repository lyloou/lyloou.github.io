---
title: tmux
date: 2018-07-26 17:16:15
toc: true
comments: true
tags:
- linux
- tool
---

```sh
# Steps to build and install tmux from source on Ubuntu.
# Takes < 25 seconds on EC2 env [even on a low-end config instance].
VERSION=2.7
sudo apt-get -y remove tmux
sudo apt-get -y install wget tar libevent-dev libncurses-dev
wget https://github.com/tmux/tmux/releases/download/${VERSION}/tmux-${VERSION}.tar.gz
tar xf tmux-${VERSION}.tar.gz
rm -f tmux-${VERSION}.tar.gz
cd tmux-${VERSION}
./configure
make
sudo make install
cd -
sudo rm -rf /usr/local/src/tmux-*
sudo mv tmux-${VERSION} /usr/local/src

## Logout and login to the shell again and run.
tmux -V
```

- [Tmux 快捷键 & 速查表](https://gist.github.com/ryerh/14b7c24dfd623ef8edc7)

```conf
bind r source-file ~/.tmux.conf \; display-message "Config reloaded"

bind '"' split-window -c '#{pane_current_path}'
bind '%' split-window -h -c '#{pane_current_path}'

bind Escape copy-mode
bind-key -Tcopy-mode-vi 'v' send -X begin-selection
bind-key -Tcopy-mode-vi 'y' send -X copy-selection
unbind p
bind p pasteb
setw -g mode-keys vi      # Vi风格选择文本
# set-window-option -g mode-keys vi

# https://stackoverflow.com/questions/17445100/getting-back-old-copy-paste-behaviour-in-tmux-with-mouse
set -g mouse off # 不启用鼠标（启用鼠标会导致无法复制到系统）

########### myself ##########
# select panel
bind k selectp -U
bind j selectp -D
bind h selectp -L
bind l selectp -R

set-option -g default-shell /bin/zsh
```

- [How do I rename a session in tmux? - Super User](https://superuser.com/questions/428016/how-do-i-rename-a-session-in-tmux)
`Ctrl` + `B`, `$`

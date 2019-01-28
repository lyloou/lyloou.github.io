---
title: C编译
date: 2018-12-21 10:12:40
toc: true
comments: true
tags:
- c
---


https://www.videolan.org/developers/libdvbcsa.html

```sh
export LD_LIBRARY_PATH=/usr/local/lib
sudo ldconfig -v
```

```sh
# configure.ac
# Makefile.am
git clone https://code.videolan.org/videolan/libdvbcsa.git
cd libdvbcsa

sudo apt-get install automake autoconf
sudo apt-get install libtool
autoreconf -i
./configure
make
make install
```

https://www.cnblogs.com/bugutian/p/5560548.html
http://www.51cos.com/?p=1649
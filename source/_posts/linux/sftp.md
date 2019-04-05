---
title: sftp
date: 2019-04-05 08:38:15
toc: true
comments: true
tags:
  - linux
---

## 帮助文档

sftp> help

## 连接

类似 `ssh` 的用法

```sh
sftp lilou@192.168.0.1
```

## 常用命令

| 命令描述   | 命令（远程/本地) | 示例                                                 |
| ---------- | ---------------- | ---------------------------------------------------- |
| 切换目录   | cd/lcd           | cd /tmp                                              |
| 显示目录   | pwd/lpwd         | pwd                                                  |
| 下载到本地 | get              | `get a.txt` `get -r /tmp/dir/ /local/tmp/dir`        |
| 上传到远程 | put              | `put a.txt a.txt` `put -r /local/tmp/dir/ /tmp/dir/` |

## 参考资料：

- [SFTP 用法](https://blog.zfanw.com/sftp/#%E4%B8%8B%E8%BD%BD%E6%96%87%E4%BB%B6%E6%88%96%E6%96%87%E4%BB%B6%E5%A4%B9)
- [linux 下如何使用 sftp 命令 - BradyChen - 博客园](https://www.cnblogs.com/chen1987lei/archive/2010/11/26/1888391.html)

---
title: mysql命令行实用程序
date: 2018/03/17 08:29
toc: true
comments: true
tags:
  - sql
  - mysql
---

## help

```sh
mysql --help
```

## 启动 mysql：

```sh
mysql -u root -p
mysql -u root --password=your_password
```

## 导入数据结构和数据

```bash
mysql -u root -p goods < goods_db_structure.sql
mysql -u root -p goods < goods_db_data.sql
```

## show

[mysql show columns 等 show 的用法 - yufenfei - ITeye 博客](https://www.iteye.com/blog/yufenfei-1743967)
SHOW DATABASES︰列出 MySQL Server 上的数据库。
SHOW TABLES [FROM db_name]︰列出数据库中的表。
SHOW TABLE STATUS [FROM db_name]︰列出数据库的表信息，比较详细。
SHOW COLUMNS FROM tbl_name [FROM db_name]︰列出表的列信息，同 SHOW FIELDS FROM tbl_name [FROM db_name]，DESCRIBE tbl_name [col_name]。
SHOW FULL COLUMNS FROM tbl_name [FROM db_name]︰列出表的列信息，比较详细，同 SHOW FULL FIELDS FROM tbl_name [FROM db_name]。
SHOW INDEX FROM tbl_name [FROM db_name]︰列出表的索引信息。
SHOW STATUS︰列出 Server 的状态信息。
SHOW VARIABLES︰列出 MySQL 系統参数值
SHOW PROCESSLIST︰查看当前 mysql 查询进程 （可以用来查看死锁问题）
SHOW GRANTS FOR user︰列出用户的授权命令

## `\g` 和 `\G`

[MySQl 中的\g 和\G - 一步一个小脚印 - 博客园](https://www.cnblogs.com/tjudzj/p/10032846.html)

1. \g
   在 MySQL 的 sql 语句后加上\g，效果等同于加上定界符，一般默认的定界符是分号;
2. \G
   在 MySQL 的 sql 语句后加上\G，表示将查询结果进行按列打印，可以使每个字段打印到单独的行。即将查到的结构旋转 90 度变成纵向；

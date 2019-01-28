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

## 启动mysql：
```sh
mysql -u root -p
mysql -u root --password=your_password
```

## 导入数据结构和数据
```bash
mysql -u root -p goods < goods_db_structure.sql
mysql -u root -p goods < goods_db_data.sql
```

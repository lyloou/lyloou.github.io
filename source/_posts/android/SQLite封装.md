---
title: SQLite封装
date: 2016-07-13
toc: true
tags:
- android
- sql
---

## 摘要：
> 主要内容：
本文介绍了封装后的SQLite，以便快速开发；
只保留必要的定制，重复的代码封装到一个通用类中；


## 说明
- `LouSQLite.java`文件为通用的代码，所有项目中不需要修改即可使用；
- `MyCallBack.java`文件是自定义的文件，关于项目的数据库配置都在这里进行，例如：数据库名称、数据库版本号、table语句等；
- `LouSQLite.java`支持常用的CRUD操作（支持事务）；


## 代码
<script src="https://gist.github.com/lyloou/9974be6cce20a32144c8dfb9aa296ec0.js"></script>

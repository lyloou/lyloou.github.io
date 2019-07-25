---
title: postgresql
date: 2018/10/28 18:17
toc: true
comments: true
tags:
  - sql
---

## 基本用法

```sh
# 1 创建数据库
CREATE DATABASE testdb OWNER dbuser;

# 2 列出所有数据库
\l

# 3 连接数据库
\c testdb

# 4 创建表和查看表
CREATE TABLE student(id int, name varchar(20), birth_date date);
\d # 查看所有表
\d student # 查看当前表结构
\d+ student # 显示更多的信息，如：与表列关联的注释

# 5 插入数据
INSERT INTO student(id, name, birth_date) values(1, 'a', '2010-10-10');
INSERT INTO student(id, name, birth_date) values(2, 'b', '2010-10-12');

# 6 查询表
SELECT * FROM student;

# 7 修改
UPDATE student SET name='aa' WHERE id = 1;
UPDATE student SET name='bb' WHERE id = 2;

# 8 删除
DELETE FROM student where id = 1;

# 9 删除表
DROP TABLE student;
```

## 安装

```
sudo apt-get install postgresql-client
sudo apt-get install postgresql
```

- [PostgreSQL 新手入门](http://www.ruanyifeng.com/blog/2013/12/getting_started_with_postgresql.html)

```sh
\h：查看SQL命令的解释，比如\h select。
\?：查看psql命令列表。
\l：列出所有数据库。
\c [database_name]：连接其他数据库。
\d：列出当前数据库的所有表格。
\d [table_name]：列出某一张表格的结构。
\du：列出所有用户。
\e：打开文本编辑器。
\conninfo：列出当前数据库和连接的信息。
```

## 注意

- 要用`;`来结束语句；
- 字符串要用单引号`'`来包裹；

## enable remote connection

- [Configure PostgreSQL to allow remote connection | BigBinary Blog](https://blog.bigbinary.com/2016/01/23/configure-postgresql-to-allow-remote-connection.html)

sudo service postgresql restart

## 参考资料

- [PostgreSQL 入门 - CSDN 博客](https://blog.csdn.net/Chen_Victor/article/details/55515266)
- [PostgreSQL - 随笔分类 - Stephen_Liu - 博客园](https://www.cnblogs.com/stephen-liu74/category/343171.html)
- 《PostgreSQL 修炼之道》

## Permission denied for relation

```sql
-- login in admin:
psql -U postgres -d exampledb -h 127.0.0.1 -p 5432;
-- grant
GRANT ALL PRIVILEGES ON ALL TABLES user_tbl TO dbuser;

-- login in dbuser
psql -U dbuser -d exampledb -h 127.0.0.1 -p 5432;
```

## 命令

https://stackoverflow.com/questions/26277356/how-to-get-current-database-and-user-name-using-a-select-in-postgresql/26277430

查看当前用户；

```sql
select user;
```

查看当前数据库

```sql
select current_database();
```

## pgcli

https://www.pgcli.com/config

## 注意

在修改某个字段类型之前，最好删除这个字段的约束，
修改完后再把合适的约束添加上去。《PostgreSQL 修炼之道》p166

## 插入或更新

```sql
INSERT INTO contacts VALUES (1,'n1', '{15200000000, 15200000001}', 'shenzhen') on conflict (id) do UPDATE set phone = excluded.phone;
```

- https://stackoverflow.com/questions/1109061/insert-on-duplicate-update-in-postgresql
- https://stackoverflow.com/questions/39663280/how-to-do-insert-into-select-and-on-duplicate-update-in-postgresql-9-5

## 插入数组

```sql
create TABLE contacts(
        id int primary key,
        name varchar(40),
        phone varchar(32)[],
        address text);

 INSERT INTO contacts VALUES (1,'n1', '{15200000000, 15200000001}', 'shenzhen')
```

https://stackoverflow.com/questions/33335338/inserting-array-values

## 批量插入数据

```sql
create table student(student_no int, student_name varchar(20), age int, class_no int);

INSERT INTO student select generate_series(1,23), concat('s',generate_series(1,23)),18,  1
on conflict (student_no) do update
set student_name=excluded.student_name,
    age=excluded.age,
    class_no=excluded.class_no;
```

## 修改默认的`schema`

https://stackoverflow.com/questions/2875610/permanently-set-postgresql-schema-path

```sql
 ALTER DATABASE lou SET search_path TO lou, osdba,postgres,public
```

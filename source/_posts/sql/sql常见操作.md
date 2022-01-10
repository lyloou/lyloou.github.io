---
title: sql常见操作
date: 2016/10/9 20:29
toc: true
comments: true
tags:
  - sql
---

## 拼接字符串

```sql
-- 语法：CONCAT(str1,str2,…)
-- 返回结果为连接参数产生的字符串。
select concat('a','b');
-- 如有任何一个参数为NULL ，则返回值为 NULL。
select concat('a',null,'b');



-- 语法：CONCAT_WS(separator,str1,str2,…)
-- CONCAT_WS，表示 CONCAT With Separator
-- 如果分隔符为 NULL，则结果为 NULL。
SELECT CONCAT_WS(null,1,2);
-- 函数会忽略任何分隔符参数后的 NULL 值。这是和MySQL中concat函数不同的地方、concat_ws函数在执行的时候，不会因为NULL值而返回NULL。（这点很重要）
SELECT CONCAT_WS(',','First name',NULL,'Last Name');
```

**GROUP_CONCAT 只有一列时如何拼接**

> 完整的语法如下：group_concat([DISTINCT] 要连接的字段 [Order BY ASC/DESC 排序字段] [Separator '分隔符'])（分隔符默认逗号）

示例
![sql常见操作-2021-08-25-10-49-37](http://cdn.lyloou.com/img/sql常见操作-2021-08-25-10-49-37.png)

```sql
SELECT 1, GROUP_CONCAT(id SEPARATOR ',') ids FROM `user` GROUP BY 1;
SELECT 1, GROUP_CONCAT(id ORDER BY id desc SEPARATOR ',')ids FROM `user` GROUP BY 1;
```

![sql常见操作-2021-08-25-10-50-11](http://cdn.lyloou.com/img/sql常见操作-2021-08-25-10-50-11.png)

```sql
-- 获取某列的组合
SELECT GROUP_CONCAT(id ORDER BY id desc SEPARATOR ',')ids FROM `user` GROUP BY '';
SELECT GROUP_CONCAT(DISTINCT nickname  ORDER BY nickname  desc  SEPARATOR ',')nickname FROM `user` GROUP BY '';
```

![sql常见操作-2021-08-25-10-56-01](http://cdn.lyloou.com/img/sql常见操作-2021-08-25-10-56-01.png)
![sql常见操作-2021-08-25-10-58-34](http://cdn.lyloou.com/img/sql常见操作-2021-08-25-10-58-34.png)

- [mysql 中 concat 和 group_concat()的用法 - zhming - 博客园](https://www.cnblogs.com/zhming26/p/6382995.html)
- [模糊搜索：concat 各种函数详解、like 操作符、通配符 - 古兰精 - 博客园](https://www.cnblogs.com/goloving/p/7576440.html)

## 字符串拆分

```sql
SELECT
SUBSTRING_INDEX(SUBSTRING_INDEX('7654,7698,7782,7788',',',help_topic_id+1),',',-1) AS num
FROM
mysql.help_topic
WHERE
help_topic_id < LENGTH('7654,7698,7782,7788')-LENGTH(REPLACE('7654,7698,7782,7788',',',''))+1
```

[mysql 字符串拆分实现 split 功能](https://www.shuzhiduo.com/A/x9J2vlNWJ6/)
[MySQL——字符串拆分（含分隔符的字符串截取）\_逗比的小博客-CSDN 博客\_mysql 字符串分割](https://blog.csdn.net/pjymyself/article/details/81668157)

## 查询某个字段的值出现多于 1 次的

```sql
SELECT id,flow_id, COUNT(flow_id) FROM orders GROUP BY flow_id HAVING count(flow_id)>1;
```

## 是否为空

```sql
select * from product where weight is null
```

## 获取最大值/最小值

```sql
# 最小值
select min(column_name) from table_name;
select num from table_name order by num;

# 最大值
select max(column_name) from table_name;
select num from table_name order by num desc;

# 获取最大值所在行
SELECT *
FROM orders
WHERE final_amount = (SELECT MAX(final_amount)
					   FROM orders);
```

参考资料

- [sql 中 max()和 min()取最大值和最小值语句](http://www.111cn.net/database/mssqlserver/42437.htm)

## [判断记录是否存在,不存在则插入存在则更新的场景](https://my.oschina.net/iceman/blog/53735)

创建表

```sql
CREATE TABLE `clients2` (
  `client_id` int(8) NOT NULL AUTO_INCREMENT,
  `client_name` varchar(25) DEFAULT NULL,
  `client_type` int(8) DEFAULT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8
```

不存在则插入存在则更新的场景

```sql
# 如果表中不存在则插入指定值，如果存在则给`client_type`增加1
INSERT INTO clients (clients.`client_id`, clients.`client_name`, clients.`client_type`) VALUES (1, "Lou12", 3) ON DUPLICATE KEY UPDATE clients.`client_type`=clients.`client_type`+1;
```

https://dev.mysql.com/doc/refman/8.0/en/insert-on-duplicate.html

## 插入或更新时的 NULL 字段处理

想法来自【小白】

```sql
# 如果待插入的数据不为NULL，则改变原来的为新值
SET @title = '新标题234';
INSERT INTO goods (goods_id,title) VALUES (9934,IFNULL(@title,'')) ON DUPLICATE KEY UPDATE title=IF(VALUES(title)='',title,VALUES(title));
SELECT * FROM goods WHERE goods_id  =9934;

# 如果待插入的数据为NULL，则不改变原来的
SET @title = NULL;
INSERT INTO goods (goods_id,title) VALUES (9934,IFNULL(@title,'')) ON DUPLICATE KEY UPDATE title=IF(VALUES(title)='',title,VALUES(title));
SELECT * FROM goods WHERE goods_id  =9934;
```

## 和 0 做比较避免出现负值

https://bbs.csdn.net/topics/392371054

```sql
-- 和0做比较避免出现负值
update products set stocks=greatest(stocks-10,0) where product_id=55635

UPDATE goods AS g SET stock = greatest((SELECT SUM(stocks) FROM products AS p WHERE p.`goods_id` = g.`goods_id`), 0) WHERE  goods_id=1234
```

## 没有时插入或存在时忽略

```sql
INSERT IGNORE INTO task_link (user_id, task_id) VALUES (20021413, 50000)
```

## duplicate entry for key

```sql
SELECT GROUP_CONCAT(id),user_id,task_id,count(1) as cnt FROM task_link group by user_id,task_id having cnt > 1;
delete from task_link where id in (100,137,131,138,136,125,124);
```

## 依据两个字段来更新或插入表的其他字段

1. 要先为这两个字段添加一个组合的唯一索引；
   ![](https://github.com/lyloou/img/raw/develop/z/20190708173423.png)

2. 使用语句来更新或插入

```sql
insert into task_bonus_user (user_id,task_id,task_bonus_id) values (?,?,?)
             on duplicate key update task_bonus_id = values(task_bonus_id)
```

## 去除小数点和后面的 0

[MySQL 去掉字符串前后或中间的某一字符串\_strggle_bin 的博客-CSDN 博客\_mysql 去掉前两个字符](https://blog.csdn.net/strggle_bin/article/details/78135071)

```
UPDATE cc_brief_video_author SET user_id = TRIM(TRAILING '.0' from user_id)
```

## 删除重复的关键词

```sql
DELETE from cc_brief_keyword_v2 WHERE id not in (
	SELECT min(id) FROM cc_brief_keyword_v2 GROUP BY keyword HAVING count(keyword) > 1
)
and
keyword in (
 SELECT keyword FROM cc_brief_keyword_v2 GROUP BY keyword HAVING count(keyword) > 1
)
```

## 数据库备份

如果是记录表，且不对外提供查询操作可以这样处理。

快速备份的方案，具体操作如下：

1.  创建一个和 order_info 一样的新表（表结构、索引）。
    -- 执行 DDL 语句
    create table order_info_new like order_info;

2.  修改 order_info 的表名为 order_info_20220101，用日期做后缀方便以后查询
    -- 执行 DDL 语句
    alter table order_info rename to order_info_20220101;

3.  修改 order_info_new 为 order_info。
    -- 执行 DDL 语句
    alter table order_info_new rename to order_info;

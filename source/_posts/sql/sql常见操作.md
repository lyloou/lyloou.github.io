---
title: sql常见操作
date: 2016/10/9 20:29
toc: true
comments: true
tags:
- sql
---


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
- [sql中max()和min()取最大值和最小值语句](http://www.111cn.net/database/mssqlserver/42437.htm)


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



## 插入或更新时的NULL字段处理
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
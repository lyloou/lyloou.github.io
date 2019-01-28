---
title: mysql必知必会
date: 2018/03/16 20:29
toc: true
comments: true
tags:
- sql
- mysql
---

> 《MySQL必知必会》——BenForta著 刘晓霞译
> 表结构和数据源文件 http://forta.com/books/0672327120/


## 客户机-服务器软件
- 服务器部分是负责所有数据访问和处理的一个软件。
- 客户机是与用户打交道的软件。
例如，如果你请求一个按字母顺序列出的产品表，则客户机软件通过网络提交该请求给服务器软件。
服务器软件处理这个请求，根据需要过滤、丢弃和排序数据；然后把结果送回到你的客户机软件。
* 服务器软件为MySQL DBMS。
* 客户机软件可以是MySQL提供的工具、脚本语言（如Perl）、Web应用开发语言（如ASP、ColdFusion、JSP和PHP）、
    程序设计语言（如C、C++、Java）等。

## SHOW
```sql
SHOW DATABASES;
SHOW TABLES;
SHOW COLUMNS FROM customers;
SHOW CREATE DATABASE crashcouse;
SHOW CREATE TABLE customers;
```

## 检索
SELECT 子句及其顺序 p88

| 子句     | 说明               | 是否必须使用             |
| -------- | ------------------ | ------------------------ |
| SELECT   | 要返回的列或表达式 | 是                       |
| FROM     | 从中检索数据的表   | 仅在从表中选择数据时使用 |
| WHERE    | 行级过滤           | 否                       |
| GROUP BY | 分组说明           | 仅在按组计算聚集时使用   |
| HAVING   | 组级过滤           | 否                       |
| ORDER BY | 输出排序顺序       | 否                       |
| LIMIT    | 要检索的行数       | 否                       |

```sql
SELECT prod_name FROM products;
SELECT prod_name, prod_price FROM products; # 检索多列
SELECT * FROM products;  # 除非确实需要表中的每个列，否则最好不要使用`*`通配符，检索不需要的列通常会降低检索和应用程序的性能。
```

### DISTINCT
```sql
SELECT DISTINCT vend_id FROM products;  # DISTINCT 表示只返回唯一不同的行，用法是直接放在列名前，注意不能使用DISTINCT
                                        # DISTINCT 应用于所有列而不是前置它的列。
                                        # 可以通过 LEFT JOIN + IN 的方式：
```

### LIMIT
```sql
SELECT prod_name FROM products LIMIT 5;     # 返回前5行；类似 LIMIT 0,5
SELECT prod_name FROM products LIMIT 5, 10; # 返回从第5行（包括5）开始的10条数据； 注意下标从0开始。
SELECT prod_name FROM products LIMIT 10 OFFSET 5; # 返回从第5行开始的10行
```

### ORDER BY
关系数据设计理论认为，如果不明确规定排序，则不应该假定检索出的数据的顺序有意义。
```sql
SELECT prod_name FROM products ORDER BY prod_name; 
SELECT prod_name FROM products ORDER BY prod_price;  # 可以用非检索的列来排序 
SELECT prod_name, prod_price FROM products ORDER BY prod_price,prod_name;  # 多列检索 
SELECT prod_name, prod_price FROM products ORDER BY prod_price,prod_name DESC;  # 反序 （默认是ASC——升序）
SELECT prod_name, prod_price FROM products ORDER BY prod_price DESC,prod_name;  # 注意和上面的区别；  
SELECT prod_name, prod_price FROM products ORDER BY prod_price DESC,prod_name DESC;  # DESC 关键字只应用到直接位于其前面的列名
SELECT prod_name, prod_price FROM products ORDER BY prod_price DESC LIMIT 1;    # 找到最昂贵的物品；
                                                     # ORDER BY 位于 FROM 之后，LIMIT 位于 ORDER BY 之后；
```

### WHERE
```sql
SELECT prod_name, prod_price FROM products WHERE prod_price = 2.50;                                                     
SELECT prod_name, prod_price FROM products WHERE prod_price >= 2.50;
SELECT prod_name, prod_price FROM products WHERE prod_price BETWEEN 5 AND 10;
SELECT cust_id FROM customers WHERE cust_email IS NULL;

```

*子句操作符*

| 操作符  | 说明               |
| ------- | ------------------ |
| =       | 等于               |
| <>      | 不等于             |
| !=      | 不等于             |
| <       | 小于               |
| <=      | 小于等于           |
| >       | 大于               |
| >=      | 大于等于           |
| BETWEEN | 在指定的两个值之间 |

*`AND` & `OR`* 
```sql
SELECT prod_id, prod_price, prod_name FROM products WHERE vend_id = 1003 AND prod_price <= 10; # 逻辑与
SELECT vend_id, prod_id, prod_price, prod_name FROM products WHERE vend_id = 1003 OR vend_id = 1002; # 逻辑或
```
当`AND`和`OR`在一起时，在处理`OR`之前，优先处理`AND`操作符。解决办法是使用`()`
```sql
SELECT prod_name, prod_price FROM products WHERE vend_id = 1002 OR vend_id = 1003 AND prod_price >= 10;
SELECT prod_name, prod_price FROM products WHERE (vend_id = 1002 OR vend_id = 1003) AND prod_price >= 10;
# 使用圆括号没有什么坏处，它能消除歧义
```

*`IN`*
```sql
SELECT prod_name,prod_price FROM products WHERE vend_id IN (1002, 1003) ORDER BY prod_name;
```
`IN`的功能与`OR`相当，且有更多的优点：
- 在使用长的合法选项清单时，`IN`操作符的语法更清楚且更直观。
- 在使用`IN`时，计算的次序更容易管理（因为使用的操作符更少）
- `IN`操作符一般比`OR`操作符清单执行的更快。
- `IN`的最大优点是可以包含其他`SELECT`语句，使得能够更容易动态地建立`WHERE`子句。

`NOT`，在`WHERE`子句中用来否定后跟条件的关键字
```sql
SELECT prod_name, prod_price FROM products WHERE vend_id NOT IN (1002, 1003) ORDER BY prod_name;
```
`NOT`可以和`IN`、`BETWEEN`、`EXISTS`子句结合使用，对结果取反。


### 通配符
```sql
SELECT prod_id, prod_name FROM products WHERE prod_name LIKE 'jet%'; # 检索任意以jet起头的词
SELECT prod_id, prod_name FROM products WHERE prod_name LIKE '%anvil%'; # 检索任意位置包含文本anvil的值
SELECT prod_id, prod_name FROM products WHERE prod_name LIKE '_ ton anvil'; # 与%可以匹配任意字符不一样, 
                                                                            # _ 总是匹配一个字符，不能多也不能少 
```
`%`通配符不能匹配值为`NULL`的行。
使用通配符的技巧：
- 不要过度使用通配符。如果其他操作符能达到相同的目的，应该使用其他操作符。
- 在确实需要使用通配符时，除非绝对有必要，否则不要把它们用在搜索模式的开始处。把通配符置于搜索模式的开始处，搜索起来是最慢的。
- 仔细注意通配符的位置。如果放错了地方，可能不会返回想要的数据。

### 正则表达式
```sql
SELECT prod_name FROM products WHERE prod_name REGEXP '1000' ORDER BY prod_name;
SELECT prod_name FROM products WHERE prod_name REGEXP '.000' ORDER BY prod_name; # `.`匹配任意一个字符
SELECT prod_name FROM products WHERE prod_name REGEXP BINARY 'JetPack .000'; # 默认不匹配大小写, 使用 BINARY 来区分
SELECT prod_name FROM products WHERE prod_name REGEXP '1000|2000|3000'; # 进行OR匹配
SELECT prod_name FROM products WHERE prod_name REGEXP '[123] ton'; # 匹配任意几个字符, 指定一组用[和]括起来的字符
SELECT prod_name FROM products WHERE prod_name REGEXP '1|2|3 ton'; # 区别于上面的[123] ton,这里匹配的是1, 2, 3 ton 
SELECT prod_name FROM products WHERE prod_name REGEXP '[1-5] ton'; # 匹配范围  
SELECT prod_name FROM products WHERE prod_name REGEXP '\\.'; # 匹配特殊字符, 需要使用转义符
                                                             # Mysql要求两个反斜杠(Mysql自己解释一个,正则表达式库解释一个)  
SELECT prod_name FROM products WHERE prod_name REGEXP '[:alnum:]'; # 匹配字符类,更多参考p58 
SELECT prod_name FROM products WHERE prod_name REGEXP '\\([0-9] sticks?\\)'; # sticks? 匹配stick和sticks 
```
重复元字符

| 元字符 | 说明                       |
| ------ | -------------------------- |
| *      | 0个或多个匹配              |
| +      | 1个或多个匹配(等于{1,})    |
| ?      | 0个或1个匹配(等于{0,1})    |
| {n}    | 指定数目的匹配             |
| {n,}   | 不少于指定数目的匹配       |
| {n,m}  | 匹配数目的范围(m不超过255) |

定位元字符

| 元字符  | 说明       |
| ------- | ---------- |
| ^       | 文本的开始 |
| $       | 文本的结尾 |
| [[:<:]] | 词的开始   |
| [[:>:]] | 词的结尾   |

`^` 有两种用法，在集合中（用`[`和`]`定义），用它来否定该集合，否则，用来指串的开始。

简单的正则表达示测试
```sql
SELECT 'hello' REGEXP '[a-zA-Z]' # 验证字符是否符合正则
```
条件符合时结果为1，条件不符合时结果为0；

### 计算字段
```sql
SELECT Concat(vend_name, ' (', vend_country, ')') FROM vendors ORDER BY vend_name; # 拼接字段Concatenate, 将值连接到一起构成单个值
SELECT Concat(vend_name, ' (', vend_country, ')') AS vend_title FROM vendors ORDER BY vend_name; # 别名alias
SELECT Concat(RTrim(vend_name), ' (', RTrim(vend_country), ')') AS vend_title FROM vendors ORDER BY vend_name; # 去除左边LTrim(), 右边RTrim(), 两边Trim()的空格
```
MySQL 算术操作符

| 操作符 | 说明 |
| ------ | ---- |
| +      | 加   |
| -      | 减   |
| *      | 乘   |
| /      | 除   |


### 数据处理
```sql
SELECT vend_name, Upper(vend_name) AS vend_name_upcase FROM vendors ORDER BY vend_name;
SELECT cust_name, cust_contact FROM customers WHERE Soundex(cust_contact) = Soundex('Y. Lie'); # 比较发音字符
```
常用文本处理函数

| 函数        | 说明              |
| ----------- | ----------------- |
| Left()      | 返回串左边的字符  |
| Length()    | 返回串的长度      |
| Locate()    | 找出串的一个子串  |
| Lower()     | 将串转换为小写    |
| LTrim()     | 去除串左边的空格  |
| Right()     | 返回串右边的字符  |
| RTrim()     | 去除串右边的空格  |
| Soundex()   | 返回串的SOUNDEX值 |
| SubString() | 返回子串的字符    |
| Upper()     | 将串转换为大写    |

```sql
SELECT cust_id, order_num FROM orders WHERE Date(order_date) = '2005-09-01';
SELECT cust_id, order_num FROM orders WHERE Date(order_date) BETWEEN '2005-09-01' AND '2005-09-30';
SELECT cust_id, order_num FROM orders WHERE Year(order_date) = '2005' AND Month(order_date) = '09';
```
常用日期和时间处理函数

| 函数          | 说明                           |
| ------------- | ------------------------------ |
| AddDate()     | 增加一个日期（天、周等）       |
| AddTime()     | 增加一个时间                   |
| CurDate()     | 返回当前日期                   |
| CurTime()     | 返回当前日间                   |
| Date()        | 返回日期时间的日期部分         |
| DateDiff()    | 计算两个日期之差               |
| Date_Add()    | 高度灵活的日期运算函数         |
| Date_Format() | 返回一个格式化的日期或时间串   |
| Day()         | 返回一个日期的天数部分         |
| DayOfWeek()   | 对于一个日期，返回对应的星期几 |
| Hour()        | 返回一个时间的小时部分         |
| Minute()      | 返回一个时间的分钟部分         |
| Month()       | 返回一个日期的月数部分         |
| Now()         | 返回当前日期和时间             |
| Second()      | 返回一个时间的秒部分           |
| Time()        | 返回一个日期的时间部分         |
| Year()        | 返回一个日期的年份部分         |

### 汇总数据
```sql
SELECT AVG(prod_price) AS avg_price FROM products; # AVG函数只作用于单个列,为了获得多个列的平均值,必须使用多个AVG函数
SELECT AVG(prod_price) AS avg_price FROM products WHERE vend_id=1003;
                                                   # AVG 忽略列值为NULL的行
SELECT COUNT(*) AS num_cust FROM customers; # 对表中的所有行计数, 不论是否为NULL                                                   
SELECT COUNT(cust_email) AS num_cust FROM customers; # 对特定的列计数,忽略NULL值                                                   
SELECT MAX(prod_price) AS max_price FROM products; # 找出最大值     ,忽略NULL值                                              
SELECT MIN(prod_price) AS min_price FROM products; # 找出最小值     ,忽略NULL值
SELECT SUM(quantity) AS items_ordered FROM orderitems WHERE order_num = 20005; # 指定列求和                                    
SELECT SUM(quantity*item_price) AS total_price FROM orderitems WHERE order_num = 20005; # 合计计算值
SELECT AVG(DISTINCT prod_price) AS avg_price FROM products WHERE vend_id = 1003;                                    
SELECT AVG(ALL prod_price) AS avg_price FROM products WHERE vend_id = 1003; # 默认AVG(ALL)
SELECT COUNT(*) AS num_items, MIN(prod_price) AS price_min, MAX(prod_price) AS price_max, AVG(prod_price) AS price_avg
FROM products;
```
聚集函数用来汇总数据。MySQL支持一系列聚集函数，可以用多种方法使用它们以返回所需的结果。
这些函数是高效设计的，它们返回结果一般比你在自己的客户机应用程序中计算要快得多。

### 分组数据
```sql
SELECT vend_id, COUNT(*) AS num_prods FROM products GROUP BY vend_id;
SELECT cust_id, COUNT(*) AS orders FROM orders GROUP BY cust_id HAVING COUNT(*) >=2;
SELECT cust_id, COUNT(*) AS orders FROM orders GROUP BY cust_id HAVING orders >=2; # 第三条 
SELECT vend_id, COUNT(*) AS num_prods FROM products WHERE prod_price >= 10 
       GROUP BY vend_id HAVING num_prods >=2; # WHERE 和 HAVING 的区别, WHERE在数据分组前进行过滤,HAVING在数据分组后进行过滤,
                                              # WHERE 排除的行不包括在分组中 
SELECT order_num, SUM(quantity*item_price) AS ordertotal FROM orderitems GROUP BY order_num HAVING ordertotal >=50;                                              
SELECT order_num, SUM(quantity*item_price) AS ordertotal FROM orderitems GROUP BY order_num HAVING ordertotal >=50 ORDER BY ordertotal; # 对总计订单价格排序                                              
```
`GROUP BY`重要规定
- `GROUP BY` 子句可以包含任意数目。这使得能对分组进行嵌套，为数据分组提供更细致的控制。
- 如果在`GROUP BY`子句中嵌套了分组，数据将在最后规定的分组上进行汇总换句话说，在建立分组时，指定的所有列都一起计算
    （所以不能从个别的列取回数据）。
- `GROUP BY` 子句中列出的每个列都必须是检索列或有效的表达式（但不能是聚集函数）。
    如果在SELECT中使用表达式，则必须在 GROUP BY 子句中指定相同的表达式。不能使用别名。 // 这个不对吧，譬如上面的第三条语句。版本升级？
- 除聚集计算语句外，SELECT语句中的每个列都必须在GROUP BY子句中给出。
- 如果分组列中具有NULL值，则NULL将作为一个分组返回。如果列中有多行NULL值它们将分为一组。
- GROUP BY子句必须出现在WHERE子句之后，ORDER BY 子句之前。  

### 子查询和联结
```sql
SELECT cust_name, cust_contact 
FROM customers 
WHERE cust_id IN (SELECT cust_id
                  FROM orders
                  WHERE order_num IN (SELECT order_num
                                      FROM orderitems
                                      WHERE prod_id = 'TNT2')); # 方法1 子查询 p92
SELECT cust_name, cust_contact 
FROM customers
LEFT JOIN orders ON customers.cust_id = orders.cust_id
LEFT JOIN orderitems ON orders.order_num = orderitems.order_num
WHERE orderitems.prod_id = 'TNT2'; # 方法2 外查询 

SELECT cust_name, 
       cust_state,
       (SELECT COUNT(*)
        FROM orders
        WHERE orders.cust_id = customers.cust_id) AS orders
FROM customers
ORDER BY cust_name; # 有必要完全限定列名, 即: table名.filed名
                                      
SELECT cust_name, cust_contact 
FROM customers, orders, orderitems 
WHERE customers.cust_id = orders.cust_id
  AND orderitems.order_num = orders.order_num
  AND prod_id = 'TNT2'; # 方法3 内部查询 p105                                       
                                      
SELECT cust_name, cust_contact 
FROM customers
INNER JOIN orders ON customers.cust_id = orders.cust_id
INNER JOIN orderitems ON orders.order_num = orderitems.order_num
WHERE orderitems.prod_id = 'TNT2'; # 方法4 内部查询 INNER JOIN p104
                                 # ANSI SQL 规范首选INNER JOIN 语法.对比WHERE子句,明确要使用联结条件, 性能更佳

SELECT p1.prod_id, p1.prod_name
FROM products AS p1, products AS p2
WHERE p1.vend_id = p2.vend_id
  AND p2.prod_id = 'DTNTR'; # 自联结  对比子查询, 有时候处理自联结远比处理子查询快的多

SELECT c.*, o.order_num, o.order_date, 
       oi.prod_id, oi.quantity, oi.item_price
FROM customers AS c, orders AS o, orderitems AS oi
WHERE c.cust_id = o.cust_id
  AND oi.order_num = o.order_num
  AND prod_id = 'FB';  # 自然联结 排除多次出现, 全每个列只返回一次
                       # 系统不完成这项工作, 由你自己完成它
                       # 一般是对表使用通配符 (SELECT *), 对所有其他表的列使用明确的子集来完成

SELECT customers.cust_id, orders.order_num
FROM customers LEFT OUTER JOIN orders
 ON customers.cust_id = orders.cust_id; # 外部联结 和内部联结不同的是，外部联结还包括没有关联行的行。
                                        # 相对的还有 RIGHT OUT JOIN ，究竟使用哪一种纯粹是根据方便而定
                                        # 注意：LEFT JOIN 等同于 LEFT OUTER JOIN  —— https://stackoverflow.com/questions/406294/left-join-vs-left-outer-join-in-sql-server

SELECT customers.cust_name,
       customers.cust_id,
       COUNT(orders.order_num) AS num_ord
FROM customers INNER JOIN orders
ON customers.cust_id = orders.cust_id
GROUP BY customers.cust_id; # 带聚集函数的联结, 按客户分组；
                            # 其中 INNER JOIN 可以换成 LEFT JOIN，查找到订单为0的客户                                         
```
使用联结的要点：
- 注意所使用的联结类型。一般我们使用内部联结，但使用外部联结也是有效的。
- 保证使用正确的联结条件，否则将返回不正确的数据。
- 应该总是提供联结条件，否则会得出笛卡尔积。
- 在一个联结中可以包含多个表，甚至对于每个联结可以采用不同的联结类型。虽然这样做是合法的，一般也很有用，但应该在一起测试它们前，分别测试每个联结。这将使故障排除更为简单。

### 组合查询
```sql
SELECT vend_id, prod_id, prod_price
FROM products
WHERE prod_price <= 5
UNION
SELECT vend_id, prod_id, prod_price
FROM products
WHERE vend_id IN (1001, 1002);

SELECT vend_id, prod_id, prod_price
FROM products
WHERE prod_price <= 5
UNION ALL
SELECT vend_id, prod_id, prod_price
FROM products
WHERE vend_id IN (1001, 1002); # 使用 UNION ALL 不排除重复的行

SELECT vend_id, prod_id, prod_price
FROM products
WHERE prod_price <= 5
UNION 
SELECT vend_id, prod_id, prod_price
FROM products
WHERE vend_id IN (1001, 1002)
ORDER BY vend_id, prod_price; # 使用 UNION查询，只能使用一条ORDER BY 子句，必须出现在最后一条SELECT语句之后。但实际上是对所有结果排序。
```
`UNION`规则
- UNION必须由两条或两条以上的SELECT语句组成，语句之间用关键字UNION分隔（因此，如果组合4条SELECT语句，将要使用3个UNION关键字）
- UNION中的每个查询必须包含相同的列、表达式或聚集函数（不过各个列不需要以相同的次序列出）。
- 列数据类型必须兼容：类型不必完全相同，但必须是DBMS可以隐含地转换的类型（例如，不同的数值类型或不同的日期类型）。

### 全文本搜索 
```sql
SELECT note_text FROM productnotes WHERE Match(note_text) Against('rabbit');

SELECT note_text, Match(note_text) Against('rabbit') AS rank 
FROM productnotes; # 演示排序如何工作（等级越高，越靠前）

SELECT note_text FROM productnotes 
WHERE Match(note_text) Against('anvils' WITH QUERY EXPANSION);

SELECT note_text
FROM productnotes
WHERE Match(note_text) Against('heavy -rope*' IN BOOLEAN MODE);

SELECT note_text FROM productnotes WHERE Match(note_text) Against('+rabbit +bait' IN BOOLEAN MODE);
SELECT note_text FROM productnotes WHERE Match(note_text) Against('rabbit bait' IN BOOLEAN MODE);
SELECT note_text FROM productnotes WHERE Match(note_text) Against('"rabbit bait"' IN BOOLEAN MODE);
SELECT note_text FROM productnotes WHERE Match(note_text) Against('>rabbit <carrot' IN BOOLEAN MODE);
SELECT note_text FROM productnotes WHERE Match(note_text) Against('+safe +(<combination)' IN BOOLEAN MODE);

```
MySQL中，最常用的两个引擎为MyISAM和InnoDB，MyISAM引擎支持全文本搜索。
不要在导入数据时使用FULLTEXT，应该首先导入数据，然后再修改表，定义FULLTEXT。

全文本布尔操作符

| 布尔操作符 | 说明                                                                       |
| ---------- | -------------------------------------------------------------------------- |
| +          | 包含，词必须存在                                                           |
| -          | 排除，词必须不出现                                                         |
| >          | 包含，而且增加等级值                                                       |
| <          | 包含，且减少等级值                                                         |
| ()         | 把词组成子表达式（允许这些子表达式作为一个组实包含、排除、排列等）         |
| ~          | 取消一个词的排序值                                                         |
| *          | 词尾的通配符                                                               |
| ""         | 定义一个短语（与单个词的列表不一样，它匹配整个短语以便包含或排除这个短语） |

## 插入 & 更新 & 删除
### INSERT
```sql
INSERT INTO customers(cust_name,
  cust_contact,
  cust_email,
  cust_address,
  cust_city,
  cust_state,
  cust_zip,
  cust_country)
VALUES('Pep E.LaPew',
  NULL,
  NULL,
  '100 Main Street',
  'Los Angeles',
  'CA',
  '90046',
  'USA');

INSERT INTO customers(cust_name,
  cust_address,
  cust_city,
  cust_state,
  cust_zip,
  cust_country)
VALUES('Pep E. Lapwe',
'100 Main Street',
'Los Angeles',
'CA',
'90046',
'USA'),
('M. Martian',
'42 Galaxy Way',
'New York',
'NY',
'11213',
'USA'); # 一次插入多条数据：单条INSERT语句处理多个插入比使用多条INSERT语句快。

INSERT INTO customers(cust_name,
  cust_address,
  cust_city,
  cust_state,
  cust_zip,
  cust_country)
SELECT cust_name,
       cust_address,
       cust_city,
       cust_state,
       cust_zip,
       cust_country
FROM custnew; # 插入检索出的数据；
              # 不一定要求一列名匹配，但是列要互相对应：第一列对第一列，第二列对第二列。         
        
```
总是使用列的列表：即便表的结构改变，INSERT语句仍能正确工作。
省略列，须满足以下某个条件：
- 该列定义为允许NULL值（无值或空值）
- 在表定义中给出默认值。这表示如果不给出值，将使用默认值。

如果系统的数据检索是最重要的，可以降低INSERT、UPDATE、DELETE的优先级来提高整体性能。
`INSERT LOW PRIORITY INTO`

### UPDATE
```sql
UPDATE customers
SET cust_email = 'elmer@fudd.com'
WHERE cust_id = 10005; # 务必指定 WHERE子句，否则更新所有行。

UPDATE customers SET cust_email = NULL WHERE cust_id = 10005; # 删除某个列的值，可设置它为NULL(前提是可以为NULL)
```
### DELETE 
```sql
DELETE FROM customers
WHERE cust_id = 10006; # 务必指定 WHERE子句，否则删除所有行。

DELETE FROM customers; # 删除所有用户（逐行删除）
TRUNCATE TABLE customers; # 删除所有用户，更快的删除（删除表并重新创建表）
```

更新和删除的指导原则
- 除非确实打算更新和删除每一行，否则绝对不要使用不带WHERE子句的UPDATE或DELETE语句；
- 保证每个表都有主键，尽可能像WHERE子句那样使用它（可以指定各主键、多个值或值的范围）；
- 在对UPDATE或DELETE使用WHERE 子句前，应该先用SELECT进行测试，保证它过滤的是正确的记录，以防编写的WHERE子句不正确。
- 使用强制实施引用完整性的数据库，这样MySQL将不允许删除具有与其他表相关联的数据的行。

## 创建和操纵表
```sql
CREATE TABLE customers
(
  cust_id       int       NOT NULL AUTO_INCREMENT,
  cust_name     char(50)  NOT NULL,
  cust_address  char(50)  NULL,
  cust_city     char(50)  NULL,
  cust_state    char(5)   NULL,
  cust_zip      char(10)  NULL,
  cust_country  char(50)  NULL,
  cust_contact  char(50)  NULL,
  cust_email    char(50)  NULL,
  PRIMARY KEY (cust_id)
) ENGINE = InnoDB; # 适当的格式缩进以便阅读和编辑
                   # 试图给NOT NULL的列插入NULL（该列无值），将返回错误，插入失败
                   # 每个表只允许一个AUTO_INCREMENT列，而且它必须被索引（如，使它成为主键）
                   # `SELECT last_insert_id()`来获取最后一个AUTO_INCREMENT值。

CREATE TABLE IF NOT EXISTS customers
(cust_id       int       NOT NULL AUTO_INCREMENT); # 仅在表名不存在时创建

CREATE TABLE IF NOT EXISTS orderitems
(
  order_num   int       NOT NULL , 
  order_item  int       NOT NULL ,
  prod_id     char(10)  NOT NULL ,
  quantity    int       NOT NULL DEFAULT 1,
  item_price  DECIMAL(8,2) NOT NULL ,
  PRIMARY KEY (order_num, order_item)
) ENGINE = InnoDB; # 由多个列组成的主键，以逗号分隔。
                   # 默认值不可为函数，只支持常量
```
引擎：
- InnoDB是一个可靠的事务处理引擎，它不支持全文本搜索。
- MEMORY在功能等同于MyISAM，但由于数据存储在内在（不是磁盘）中，速度很快（特别适合于临时表）
- MyISAM是一个性能极高的引擎，它支持全文本搜索，但不支持事务处理。

外键不能跨引擎，即使用一个引擎的表不能引用具有使用不同引擎的表的外键。
使用哪个引擎，依赖于需要什么样的特性；

```sql
ALTER TABLE vendors
ADD vend_phone CHAR(20); # 添加一个列

ALTER TABLE vendors
DROP COLUMN vend_phone; # 删除列

ALTER TABLE orderitems
ADD CONSTRAINT fk_orderitems_orders
FOREIGN KEY (order_num) REFERENCES orders (order_num); # ALTER TABLE常见的用途是定义外键。


DROP TABLE customers2; # 删除表

RENAME TABLE customers2 TO customers; # 重命名表

RENAME TABLE backup_customers TO customers,
             backup_vendors TO vendors,
             backup_products TO products; # 对多个表重命名
```

## 使用视图
*常见视图应用*
- 重用SQL语句
- 简化复杂SQL操作。在编写查询后，可以方便地重用它而不必知道它的基本查询细节。
- 使用表的组成部分而不是整个表。
- 保护数据。可以给用户授予表的特定部分的访问权限而不是整个表的访问权限。
- 更改数据格式和表示。视图可返回与底层表的表示和格式不同的数据。

*视图的规则和限制*
- 与表一样，视图必须唯一命名（视图名不能重复或与表名相同）
- 对于可以创建的视图数目没有限制。
- 为了创建视图，必须具有足够的访问权限。这些限制通常由数据库管理人员授予。
- 视图可以嵌套，即可以利用从其他视图中检索数据的查询来构造一个视图
- ORDER BY可以用在视图中，但如果从该视图检索数据的SELECT语句中也含有ORDER BY， 那么该视图中的ORDER BY将被覆盖。
- 视图不能索引，也不能有关联的触发器或默认值。
- 视图可以和表一起使用。例如，编写一条联结表和视图的SELECT语句。

*视图的创建*
- 视图用CREATE VIEW语句来创建。
- 使用`SHOW CREATE VIEW viewname;` 来查看创建视图的语句。
- 用DROP删除视图，其语法为`DROP VIEW viewname;`
- 更新视图时，可以先用DROP再用CREATE，也可以直接用`CREATE OR REPLACE VIEW`。如果更新的视图不存在，则第1条语句会创建一个视图；
  如果要更新的视图存在，则第2条更新的语句会替换原有视图。

```sql
CREATE VIEW productcustomers AS 
SELECT cust_name, cust_contact, prod_id
FROM customers, orders, orderitems
WHERE customers.cust_id = orders.cust_id
    AND orderitems.order_num = orders.order_num; # 创建视图
    
SELECT cust_name, cust_contact
FROM productcustomers
WHERE prod_id = 'TNT2';    # 查询视图

CREATE VIEW vendorlocations AS 
SELECT Concat(RTrim(vend_name), ' (', RTrim(vend_country), ')')
    AS vend_title
FROM vendors
ORDER BY vend_name; # 创建重新格式化的视图

SELECT * FROM vendorlocations;

CREATE VIEW customeremaillist AS
SELECT cust_id, cust_name, cust_email
FROM customers
WHERE cust_email IS NOT NULL; # 创建过滤条件的视图

SELECT * FROM customeremaillist;

CREATE VIEW orderitemsexpanded AS 
SELECT order_num,
       prod_id,
       quantity,
       item_price,
       quantity*item_price AS expanded_price
FROM orderitems;
SELECT * FROM orderitemsexpanded WHERE order_num = 20005; 
```  
*视图定义在以下操作不可更新*
- 分组（使用GROUPING和HAVING）
- 联结
- 子查询
- 并
- 聚集函数（Min(), Cust(), Sum()等）
- DISTINCT
- 导出（计算）列

视图的主要作用在于数据检索，而不用于更新（INSERT、UPDATE和DELETE）

## 存储过程
*为什么使用存储过程*
- 通过把处理封装在容易使用的单元中，简化复杂的操作。
- 由于不要求反复建立一系列处理步骤，这保证了数据的完整性。
  如果所有开发人员和应用程序都使用同一存储过程，则所使用的代码都是相同的。防止错误，保证了数据的一致性。
- 简化对变动的管理。如果表名、列名、或业务逻辑有变化，只需要更改存储过程的代码。使用这的人员甚至不需要知道这些变化。
  这一点的延伸就是安全性。通过存储过程限制对基础数据的访问减少了数据讹误的机会。
- 提高性能。因为使用在座过程比使用单独的SQL语句要快。
- 存在一些只能用在单个请求中的MySQL元素和特性，存储过程可以使用它们来编写功能更强更灵活的代码。

换句话说，使用存储过程有3个主要好处：简单、安全、高性能。

另外也有一些缺陷：
- 存储过程的编写比SQL语句复杂，编写存储过程概要更高的技能，更丰富的经验。
- 由于数据库管理员限制，可能只有使用的权限，没有创建的权限。

```sql
CREATE PROCEDURE productpricing(
  OUT pl DECIMAL(8,2),
  OUT ph DECIMAL(8,2),
  OUT pa DECIMAL(8,2)
)
BEGIN
  SELECT Min(prod_price)
  INTO pl
  FROM products;
  SELECT MAX(prod_price)
  INTO ph
  FROM products;
  SELECT AVG(prod_price)
  INTO pa
  FROM products;      
END; # 存储过程的创建
     # 参数中的IN：传递数据给存储过程
     # 参数中的OUT：从存储过程传出
     # 参数中的INOUT：对存储过程传入传出

CALL productpricing(@pricelow, @pricehigh, @priceaverage); # 调用存储过程

SELECT @pricelow; # 检索结果 
SELECT @pricehigh;
SELECT @priceaverage;

DROP PROCEDURE productpricing; # 删除存储过程，如果不存在会产生错误
DROP PROCEDURE IF EXISTS productpricing; # 删除存储过程 

SHOW CREATE PROCEDURE productpricing; # 检查存储过程
SHOW PROCEDURE STATUS LIKE 'productpricing'; # 限制过程状态结果
```

> mysql命令行客户机的分隔符：
> mysql命令行实用程序使用`;`作为分隔符   
> 默认mysql语句也使用`;`作为分隔符
> 解决冲突的办法是临时更改命令行实用程序的语句分隔符
```sql
DELIMITER //
CREATE PROCEDURE productpricing()
BEGIN
    SELECT Avg(prod_price) AS priceaverage
    FROM products;
END //
DELIMITER ;
```
考虑这个场景。你需要获得与以前一样的订单合计，但需要对合计增加营业税，不过只针对某些顾客。
那么，你需要做下面几件事情：
- 获得合计（与以前一样）；
- 把营业税有条件地添加到合计；
- 返回合计（带或不带税）
```sql
-- Name: order total
-- Parameters: onumber = order number
--             taxable = 0 if not taxable, 1 if taxable
--             ototal = order total variable

CREATE PROCEDURE ordertotal(
  IN onumber INT,
  IN taxable BOOLEAN, 
  OUT ototal DECIMAL(8, 2)
) COMMENT 'Obtain order total, optionally adding tax'
BEGIN 
  -- Declare variable for total
  DECLARE total DECIMAL(8, 2);
  -- Decliare tax percentage
  DECLARE taxrate INT DEFAULT 6;
  
  -- Get the order total
  SELECT Sum(item_price*quantity)
  FROM orderitems
  WHERE order_num = onumber
  INTO total;
  
  -- Is this taxable?
  IF taxable THEN   # 不可使用 ELSEIF THEN、ELSE子句
  SELECT total+(total/100*taxrate) INTO total;
  END IF;
  
  -- And finally, save to out variable
  SELECT total INTO ototal; 
END;

CALL ordertotal(20005, 0, @total);
SELECT @total;
CALL ordertotal(20005, 1, @total);
SELECT @total;
               
```    

## 游标
MySQL游标只能用于存储过程。

使用游标的步骤：
- 在能够使用游标前，必须声明（定义）它。这个过程实际上没有检索数据，它只是定义要使用的SELECT语句。
- 一旦声明后，必须打开游标以供使用。这个过程用前面定义的SELECT语句把数据实际检索出来。
- 对于填有数据的游标，根据需要取出（检索）各行。
- 在结束游标使用时，必须关闭游标。

```sql
CREATE PROCEDURE processorders()
BEGIN
  -- Declare local variables
  DECLARE done BOOLEAN DEFAULT 0;
  DECLARE o INT;
  DECLARE t DECIMAL(8, 2);
  
  -- Declare the cursor
  DECLARE ordernumbers CURSOR
  FOR 
  SELECT order_num FROM orders;
  -- Declare continue handler
  DECLARE CONTINUE HANDLER FOR SQLSTATE '02000' SET done=1; # SQLSTATE '02000'是一个未找到条件。
  
  -- Create a table to store the results
  CREATE TABLE IF NOT EXISTS ordertotals(order_num INT, total DECIMAL(8, 2));
  
  -- Open the cursor
  OPEN ordernumbers;
  
  -- Loop through all rows
  REPEAT
    -- Get order number
    FETCH ordernumbers INTO o;
    
    -- Get the total for this order
    CALL ordertotal(o, 1, t);
    
    -- Insert order and total into ordertotals
    INSERT INTO ordertotals(order_num, total) VALUES(o, t);
    
    -- End of loop
  UNTIL done  END REPEAT;
  
  -- Close the cursor
  CLOSE ordernumbers;
END;  # 使用游标将Fetch的数据存储到表中

CALL processorders(); # 调用
SELECT * FROM ordertotals;
```

## 触发器
触发器，在表发生一些更改时，自动处理一些事情。
MySQL触发器只支持`UPDATE`、`DELETE`、`INSERT`。
创建触发器，需要给出4条信息：
- 唯一的触发器名；
- 触发器关联的表；
- 触发器应该响应的活动（DELETE、INSERT或UPDATE）
- 触发器何时执行（处理之前或之后）
```sql
# http://www.cnblogs.com/duhuo/p/4655957.html
CREATE TRIGGER newproduct AFTER INSERT ON products
FOR EACH ROW SELECT 'Product added' INTO @msg; # 创建触发器
INSERT INTO products (prod_id, vend_id, prod_name, prod_price, prod_desc) VALUES ('Lou', 1002, 'TNT 5', 20, 'TNT 5, yellow, pack of 100 sticks');
SELECT @msg;

DROP TRIGGER newproduct; # 删除触发器

CREATE TRIGGER deleteorder BEFORE DELETE ON orders
FOR EACH ROW 
BEGIN 
    INSERT INTO archive_orders(order_num, order_date, cust_id)
    VALUES(OLD.order_num, OLD.order_date, OLD.cust_id); # 删除前先存档
END;

CREATE TRIGGER updatevendor BEFORE UPDATE ON vendors
FOR EACH ROW SET NEW.vend_state = Upper(New.vend_state); # 更新前先转换为大写（数据净化）
```

> 只有表支持触发器，视图不支持

> 每个表支持6个触发器（每条INSERT、UPDATE、DELETE的之前和之后）

> 如果BEFORE触发器失败，则MySQL将不执行请求的操作。
此外，如果BEFORE触发器或语句本身失败，MySQL将不执行AFTER触发器（如是有的话）

> 触发器一个非常有意义的使用是创建审计跟踪。使用触发器，把更改记录到另外一个表非常容易。

## 管理事务
事务处理（transaction processing） 可以用来维护数据库的完整性，它保证成批的MySQL操作要么完全执行，要么完全不执行。

MyISAM引擎不支持事务，InnoDB支持事务。

```sql
SELECT * FROM ordertotals;
START TRANSACTION WITH CONSISTENT SNAPSHOT ;  # 标识事务开始
DELETE FROM ordertotals;
ROLLBACK ; # 只能在一个事务处理内使用（在执行一条START TANASACTION之后）
SELECT * FROM ordertotals;

START TRANSACTION WITH CONSISTENT SNAPSHOT ;  # 标识事务开始
DELETE FROM orderitems WHERE order_num = 20007; 
DELETE FROM orders WHERE order_num = 20007; 
COMMIT; # 提交事务

SAVEPOINT delete1; # 保留点
ROLLBACK TO delete1; # 回滚到保留点

SET AUTOCOMMIT = 0; # 设置不自动提交
```

## 全球化和本地化
```sql
SHOW CHARACTER SET ; # 查看字符集
SHOW COLLATION ; # 查看校对, 以latin1为例，许多校对出现两次，一次区分大小写（由_cs表示）， 一次不区分（由_ci表示）

SHOW VARIABLES LIKE 'character%';
SHOW VARIABLES LIKE 'collation%';

CREATE TABLE mytable
(
  columnn1 INT, 
  columnn2 VARCHAR(10) 
) DEFAULT CHARACTER SET hebrew
  COLLATE hebrew_general_ci; # 给表指定字符集和校对

CREATE TABLE mytable
(
  columnn1 INT, 
  columnn2 VARCHAR(10), 
  columnn3 VARCHAR(10) CHARACTER SET latin1 COLLATE latin1_general_ci # 给特定的列指定字符集和校对
) DEFAULT CHARACTER SET hebrew
  COLLATE hebrew_general_ci;

SELECT * FROM customers
ORDER BY lastname, firstname COLLATE latin1_general_cs;  
   # 校对在对用`ORDER BY`子句检索出来的数据排序时起重要的作用（如是否忽略大小写）。
```

## 安全管理
MySQL的用户账号和信息存储在名为mysql的MySQL数据库中。
```sql
USE mysql;
SELECT user FROM user;

CREATE USER name_lou IDENTIFIED BY 'password_lou'; # 创建用户
RENAME USER name_lou TO lou; # 更改名

DROP USER lou; # 删除账号

SHOW GRANTS FOR lou; # 查看已经有的权限
GRANT SELECT ON goods.* TO lou; # 授予goods数据库的所有表的SELECT权限
REVOKE SELECT ON goods.* FROM lou; # 撤销权限

GRANT SELECT, INSERT ON goods.* TO lou; # 简化多次授权，使用逗号分隔

SET PASSWORD FOR lou = Password('new_password'); # 更改口令； 
SET PASSWORD = Password('new_password'); # 更改自己的口令； 
```
*GRANT和REVOKE可在几个层次上控制访问权限*
- 整个服务器，使用GRANT ALL和REVOKE ALL；
- 整个数据库，使用ON database.*;
- 特定的表，使用ON database.table;
- 特定的列；
- 特定的存储过程；
- 详细看p202

## 数据库维护
从以下几个角度考虑
- 备份数据
备份前使用`FLUSH TABLE`

- 表问题分析和检查
```sql
ANALYZE TABLE orders;
CHECK TABLE orders, orderitems;
```
- 诊断启动问题
使用命令行选项，`--help`、`--safe-mode`、`--verbose`

- 查看日志文件
https://stackoverflow.com/questions/5441972/how-to-see-log-files-in-mysql

## 改善性能
- 一般来说，关键的生产DBMS应该运行在自己的专用服务器上。
- MySQL是用一系列默认设置预先配置的，这些设置开始通常是很好的。但过一段时间后你可能需要调整内在分配、缓冲区大小等。
  （为查看当前设置，可使用SHOW VARIABLES; 和SHOW STATUS;）
- MySQL是一个多用户多线程的DBMS，换言之，它经常同时执行多个任务。
  如果这些任务中的某个执行缓慢，则所有请求都会执行缓慢。
  如果你遇到显著的性能不良，可使用`SHOW PROCESSLIST`显示所有活动进程（以及它们的线程ID和执行时间）。
  你还可以用KILL命令终结某个特定的进程（使用这个命令需要作为管理员登录）。
- 总是有不止一种方法编写同一条SELECT语句。应该试验联结、并、子查询等，找出最佳的方法。
- 使用EXPANIN语句让MySQL解释它将如何执行一条SELECT语句。
- 一般来说，存储过程执行得比一条一条地执行其中的各条MySQL语句快。
- 应该总是使用正确的数据类型。
- 决不要检索比需求还要多的数据。换言之，不要用`SELECT *`（除非你真正需要每个列）。
- 有的操作（包括INSERT）支持一个可靠的DELAYED关键字，如果使用它，将把控制立即返回给调用程序，并且一旦有可能就实际执行该操作。
- 在导入数据时，应该关闭自动提交。你可能还想删除索引（包括FULLTEXT索引），然后在导入完成后再重建它们。
- 必须索引数据库以改善数据检索的性能确定索引什么不是一件微不足道的任务，需要分析使用的SELECT语句以找出重复的WHERE和ORDER BY子句。
  如果一个简单的WHERE子句返回结果所花的时间太长，则可以断定其中使用的列（或几个列）就是需要索引的对象。
- 你的SELECT语句中有一系列复杂的OR条件吗？通过使用多条SELECT语句和连接它们的UNION语句，你能看到极大的性能改进。
- 索引改善数据的性能，但损害数据插入、删除和更新的性能。
  如果你有一些表，它们收集数据且不经常被搜索，则在有必要之前不要索引它们。（索引可根据需要添加和删除）
- LIKE很慢。一般来说，最好是使用FULLTEXT而不是LIKE。
- 数据库是不断变化的实体。一组优化良好的表一会儿后可能就面目全非了。由于表的使用和内容的更改，理想的优化和配置也会改变。
- 最重要的规则就是，每条规则在某些条件下都会被打破。       

## 注意
- 何时使用单引号？单引号用来限定字符串。如果将值与串类型的列进行比较，则需要限定引号。用来与数值列进行比较的值不需要引号。
- SQL 是不区分大小写的。
- SQL 语句以`;`结束。
- SQL 语句中的空格会被忽略，将 SQL 语句分成多行更容易阅读和调试；
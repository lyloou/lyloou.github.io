---
title: 【mysql】字段类型
date: 2019-07-18 15:31:11
toc: true
comments: true
tags:
  - sql
  - mysql
---

## 常用

| 数值类型 | 范围(signed)                                | 范围(unsigned)                        | 字节数 |
| -------- | ------------------------------------------- | ------------------------------------- | -----: |
| int      | -2147493648 到 2147493647                   | 0 到 4294967295 (`2^(4*8)`)           |      4 |
| bigint   | -9223372036854775808 到 9223372036854775807 | 0 到 18446744073709551615 (`2^(8*8)`) |      8 |
| float    | 见下方                                      | 见下方                                |      4 |
| double   | 见下方                                      | 见下方                                |      - |
| decimal  | DECIMAL[(M[,D])] `M<=65 && D<=30`           | 不能为负值                            |      - |

mysql 官方说明文档: [MySQL :: MySQL 5.6 Reference Manual :: 11.1 Data Type Overview](https://dev.mysql.com/doc/refman/5.6/en/data-type-overview.html)

## [mysql 字段类型范围说明:int、bigint、smallint、tinyint,char、varchar、nvarchar - 幻星宇 - 博客园](https://www.cnblogs.com/xingmeng/archive/2012/10/24/2737455.html)

MySQL 的列类型主要有三种：数字、字串和日期。

下面来详细的说明,不一定准确不一定完整,请多包含或者提出您的建议,我很乐意倾听,呵呵.

数字列类型 int、bigint、smallint、tinyint
　　数字列类型用于储存各种数字数据，如价格、年龄或者数量。数字列类型主要分为两种：整数型和浮点型。所有的数字列类型都允许有两个选 项：UNSIGNED 和 ZEROFILL。选择 UNSIGNED 的列不允许有负数，选择了 ZEROFILL 的列会为数值添加零。下面是 MySQL 中可用的 数字列类型
• TINYINT——一个微小的整数，支持 -128 到 127(SIGNED)，0 到 255(UNSIGNED)，需要 1 个字节存储
• BIT——同 TINYINT(1)
• BOOL——同 TINYINT(1)
• SMALLINT——一个小整数，支持 -32768 到 32767(SIGNED)，0 到 65535(UNSIGNED)，需要 2 个字节存储 MEDIUMINT——一个中等整数，支持 -8388608 到 8388607(SIGNED)，0 到 16777215(UNSIGNED)，需要 3 个字节存储
• INT——一个整数，支持 -2147493648 到 2147493647(SIGNED)，0 到 4294967295(UNSIGNED)，需要 4 个字节存储
• INTEGER——同 INT
• BIGINT——一个大整数，支持 -9223372036854775808 到 9223372036854775807(SIGNED)，0 到 18446744073709551615(UNSIGNED)，需要 8 个字节存储
• FLOAT(precision)——一个浮点数。precision<=24 用于单精度浮点数；precision 在 25 和 53 之间，用于又精度 浮点数。FLOAT(X)与相诮的 FLOAT 和 DOUBLE 类型有差相同的范围，但是没有定义显示尺寸和小数位数。在 MySQL3.23 之前，这不是一个 真的浮点值，且总是有两位小数。MySQL 中的所有计算都用双精度，所以这会带来一些意想不到的问题。
• FLOAT——一个小的菜单精度浮点数。支持 -3.402823466E+38 到-1.175494351E-38，0 和 1.175494351E-38 to 3.402823466E+38，需要 4 个字节存储。如果是 UNSIGNED，正数的范围保持不变，但负数是不允许的。
• DOUBLE——一个双精度浮点数。支持 -1.7976931348623157E+308 到-2.2250738585072014E-308，0 和 2.2250738585072014E- 308 到 1.7976931348623157E+308。如果是 FLOAT，UNSIGNED 不会改变正数范围，但负数是不允许的。
• DOUBLE PRECISION——同 DOUBLE
• REAL——同 DOUBLE
• DECIMAL——将一个数像字符串那样存储，每个字符占一个字节
• DEC——同 DECIMAL
• NUMERIC——同 DECIMAL

字符串列类型:char、varchar、nvarchar
　　字符串列类型用于存储任何类型的字符数据，如名字、地址或者报纸文章。下面是 MySQL 中可用的字符串列类型
• CHAR——字符。固定长度的字串，在右边补齐空格，达到指定的长度。支持从 0 到 155 个字符。搜索值时，后缀的空格将被删除。
• VARCHAR——可变长的字符。一个可变长度的字串，其中的后缀空格在存储值时被删除。支持从 0 到 255 字符
• TINYBLOB——微小的二进制对象。支持 255 个字符。需要长度+1 字节的存储。与 TINYTEXT 一样，只不过搜索时是区分大小写的。(0.25KB)
• TINYTEXT——支持 255 个字符。要求长度+1 字节的存储。与 TINYBLOB 一样，只不过搜索时会忽略大小写。(0.25KB)
• BLOB——二进制对象。支持 65535 个字符。需要长度+2 字节的存储。 (64KB)
• TEXT——支持 65535 个字符。要求长度+2 字节的存储。 (64KB)
• MEDIUMBLOB——中等大小的二进制对象。支持 16777215 个字符。需要长度+3 字节的存储。 (16M)
• MEDIUMTEXT——支持 16777215 个字符。需要长度+3 字节的存储。 (16M)
• LONGBLOB——大的的二进制对象。支持 4294967295 个字符。需要长度+4 字节的存储。 (4G)
• LONGTEXT——支持 4294967295 个字符。需要长度+4 字节的存储。(4G)
• ENUM——枚举。只能有一个指定的值，即 NULL 或""，最大有 65535 个值
• SET——一个集合。可以有 0 到 64 个值，均来自于指定清单.

日期和时间列类型
　　日期和时间列类型用于处理时间数据，可以存储当日的时间或出生日期这样的数据。格式的规定：Y 表示年、M（前 M）表示月、D 表示日、H 表示小时、M（后 M）表示分钟、S 表示秒。下面是 MySQL 中可用的日期和时间列类型
• DATETIME——格式：'YYYY-MM-DD HH:MM:SS'，范围：'1000-01-01 00:00:00'到'9999-12-31 23:59:59'
• DATE——格式：'YYYY-MM-DD'，范围：'1000-01-01'到'9999-12-31'
• TIMESTAMP——格式：'YYYYMMDDHHMMSS'、'YYMMDDHHMMSS'、'YYYYMMDD'、'YYMMDD'，范围：'1970-01-01 00:00:00'到'2037-01-01 00:00:00'
• TIME——格式：'HH:MM:SS'
• YEAR——格式：'YYYY，范围：'1901'到'2155'

## MySQL 中 int(5)最大长度是多少？

- 无论是 int(3)、int(10)，内存存储的是 4 个字节；
- 最大长度取决于类型是 int 还是 bigint ；
- `int(5)`的 5 表示默认显示字符的宽度: 如果输入的是`10`默认给你显示为`00010`（加上 `zerofill`后可以看到）；

```sql
CREATE TABLE `test1` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `id2` int(5) unsigned DEFAULT NULL,
  `id3` int(5) unsigned zerofill DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
```

![](https://github.com/lyloou/img/raw/develop/z/20190718155452.png)

参考： [MySQL 中 int(11)最大长度是多少？ - 养码青年 - CSDN 博客](https://blog.csdn.net/allenjay11/article/details/76549503)

> 在 SQL 语句中 int 代表你要创建字段的类型，int 代表整型，11 代表字段的长度。
> 　这个 11 代表显示宽度，整数列的显示宽度与 mysql 需要用多少个字符来显示该列数值，与该整数需要的存储空间的大小都没有关系，比如，不管设定了显示宽度是多少个字符，bigint 都要占用 8 个 字节。
>
> int 是整型，(11)是指显示字符的长度，但要加参数的，最大为 255，比如它是记录行数的 id,插入 10 笔资料，它就显示 00000000001 ~~~00000000010，当字符的位数超过 11,它也只显示 11 位，如果你没有加那个让它未满 11 位就前面加 0 的参数，它不会在前面加 0
>
> 声明整型数据列时，我们可以为它指定个显示宽度 M(1~255)，如 INT(5)，指定显示宽度为 5 个字符,如果没有给它指定显示宽度，MySQL 会为它指定一个默认值。显示宽度只用于显示，并不能 限制取值范围和占用空间，如：INT(3)会占用 4 个字节的存储空间，并且允许的最大值也不会是 999,而是 INT 整型所允许的最大值。
>
> MySQL 有五种整型数据列类型，即 TINYINT，SMALLINT，MEDIUMINT，INT 和 BIGINT。它们之间的区别是取值范围不同，存储空间也各不相同。
> 在整型数据列后加上 UNSIGNED 属性可以禁止负数，取值从 0 开始。

## varchar(5)中的 5 又代表什么?

这里的`5`就真的是字符串的长度了

```sql
CREATE TABLE `test1` (
  `id` int(5) NOT NULL AUTO_INCREMENT COMMENT 'id',
  `id2` int(5) unsigned DEFAULT NULL,
  `id3` int(5) unsigned zerofill DEFAULT NULL,
  `name1` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
```

![](https://github.com/lyloou/img/raw/develop/z/20190718163004.png)

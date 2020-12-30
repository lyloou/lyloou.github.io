---
title: spring jpa
date: 2020-12-30 16:11:15
toc: true
comments: true
tags:
  - sql
  - ssm
---

## 2. ddl-auto

[ddl-auto](https://links.jianshu.com/go?to=https%3A%2F%2Fblog.csdn.net%2FYoungLee16%2Farticle%2Fdetails%2F88990763)
自己手动测试下呗

![img](https:////upload-images.jianshu.io/upload_images/4165335-be4de4bd296bbde2.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

ddl-auto 可取的值

1）spring.jpa.hibernate.ddl-auto=create
Hibernate: drop table if exists auth_user
Hibernate: create table auth_user (id bigint not null, account varchar(32), name varchar(32), pwd varchar(64), primary key (id)) engine=InnoDB
Hibernate 删掉已经存在表， 并重建表，恐怖！！！

1. spring.jpa.hibernate.ddl-auto=create-drop

Hibernate: drop table if exists auth_user
Hibernate: drop table if exists cardo
Hibernate: create table auth_user (id bigint not null, account varchar(32), name varchar(32), pwd varchar(64), primary key (id)) engine=InnoDB
Hibernate: create table cardo (id bigint not null, brand_id integer, brand_name varchar(16), primary key (id)) engine=InnoDB
...
Hibernate: drop table if exists auth_user
Hibernate: drop table if exists cardo

1. spring.jpa.hibernate.ddl-auto=update
   Hibernate: create table auth_user (id bigint not null, account varchar(32), name varchar(32), pwd varchar(64), primary key (id)) engine=InnoDB
   Hibernate: create table cardo (id bigint not null, brand_id integer, brand_name varchar(16), primary key (id)) engine=InnoDB

给 entity 类添加一个字段 others, 表也会自动同步添加一个字段 others.

```kotlin
@Entity
@Table(name = "AUTH_USER")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDO {
    @Id
    private Long id;
    @Column(length = 32)
    private String name;
    @Column(length = 32)
    private String account;
    @Column(length = 64)
    private String pwd;
    @Column(length = 255)
    private String others;

}
```

添加个字段 others
Hibernate: alter table auth_user add column others varchar(255)
给表添加了字段 others.

表添加一个字段， 对 entity 类有啥影响？
没有任何影响.
Hibernate: insert into auth_user (account, name, others, pwd, id) values (?, ?, ?, ?, ?)

不会校验 entity 中字段类型和表中对应的字段的类型是否匹配。

1. spring.jpa.hibernate.ddl-auto=validate

当表中字段 others 是 varchar 类型， 实体类 entity 的 others 是 Integer 类型，
类型不匹配报错：

Caused by: org.hibernate.tool.schema.spi.SchemaManagementException: Schema-validation: wrong column type encountered in column [others] in table [auth_user]; found [varchar (Types#VARCHAR)], but expecting [integer (Types#INTEGER)]

1. spring.jpa.hibernate.ddl-auto=none
   禁止 ddl

1. ddl-auto 不能同时指定多个属性， 只能在 create, create-drop, update, validate, none 中选择一个属性

1. 总结：
   一般选择 validate/update/none
   绝对不能选 create, create-drop

update 能帮助建表。

如果希望实体类发生改动而数据库表做出相应的更改且不破坏数据库现有的数据，要将 spring.jpa.hibernate.ddl-auto 属性值设置为 update

这里还有一点，就算把 ddl-auto 设置成 update 值，也不能识别对表结构的所有更改，往往只能识别出增加的字段，比如修改字段名，修改字段类型或者删除一个字段都是不能够识别的。

ddl-auto：create ----每次运行该程序，没有表格会新建表格，表内有数据会清空；
ddl-auto：create-drop ----每次程序结束的时候会清空表
ddl-auto：update ---- 每次运行程序，没有表格会新建表格，表内有数据不会清空，只会更新
ddl-auto： validate ---- 运行程序会校验数据与数据库的字段类型是否相同，不同会报错。

作者：BenjaminCool
链接：https://www.jianshu.com/p/bc509369b3a3
来源：简书
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

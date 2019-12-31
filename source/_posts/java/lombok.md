---
title: lombok
date: 2018-11-07 15:31:02
tags:
  - java
---

## [常用的 lombok 注解](https://blog.csdn.net/mccand1234/article/details/53456411)

- `@EqualsAndHashCode` ：实现 equals()方法和 hashCode()方法 @ToString：实现` toString()方法
- `@Data` ：注解在类上；提供类所有属性的 getting 和 setting 方法，此外还提供了 equals、canEqual、hashCode、toString 方法
- `@Setter` ：注解在属性上；为属性提供 setting 方法
- `@Getter` ：注解在属性上；为属性提供 getting 方法
- `@Log4j` ：注解在类上；为类提供一个 属性名为 log 的 log4j 日志对象
- `@NoArgsConstructor` ：注解在类上；为类提供一个无参的构造方法
- `@AllArgsConstructor` ：注解在类上；为类提供一个全参的构造方法
- `@Cleanup` ：关闭流 @Synchronized：对象同步 @SneakyThrows：抛出异常

## 转换数据库数据到实体对象出错

> org.springframework.dao.DataIntegrityViolationException: Error attempting to get column 'content' from result set. Cause: java.sql.SQLDataException: Cannot convert string '2202' to java.sql.Timestamp value

实际上是因为没有空构造函数引起的错误，参考 [改变实体类成员变量的顺序,导致报错 · Issue #1074 · baomidou/mybatis-plus](https://github.com/baomidou/mybatis-plus/issues/1074)

```java
@Data
@Builder
@NoArgsConstructor // 添加这个
@AllArgsConstructor // 也加上这个
public class Event {
    private Long id;

    private Date gmtCreate;

    private Date gmtModified;

    private String day;

    private String content;
}
```

---
title: lombok
date: 2018-11-07 15:31:02
tags:
- java
---

- [常用的 lombok 注解](https://blog.csdn.net/mccand1234/article/details/53456411)
@EqualsAndHashCode：实现equals()方法和hashCode()方法 @ToString：实现toString()方法
@Data ：注解在类上；提供类所有属性的 getting 和 setting 方法，此外还提供了equals、canEqual、hashCode、toString 方法
@Setter：注解在属性上；为属性提供 setting 方法
@Getter：注解在属性上；为属性提供 getting 方法
@Log4j ：注解在类上；为类提供一个 属性名为log 的 log4j 日志对象
@NoArgsConstructor：注解在类上；为类提供一个无参的构造方法
@AllArgsConstructor：注解在类上；为类提供一个全参的构造方法
@Cleanup：关闭流 @Synchronized：对象同步 @SneakyThrows：抛出异常
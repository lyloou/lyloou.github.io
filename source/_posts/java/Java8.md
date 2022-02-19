---
title: java8
date: 2018/07/02 20:53
toc: true
comments: true
tags:
  - java
---

- https://github.com/winterbe/java8-tutorial
- http://winterbe.com/posts/2014/07/31/java8-stream-tutorial-examples/

Optional
需要返回值时
Optional.orElse
Optional.orElseThrow

不需要返回值时
Optional.ifPresent

## [LocalDate to TimeStamp](https://stackoverflow.com/questions/8992282/convert-localdate-to-localdatetime-or-java-sql-timestamp)

```java
ZoneId zoneId = ZoneId.of("Asia/Shanghai");
LocalDate date = LocalDate.parse(time, DateTimeFormatter.ofPattern("yyyy-MM-dd").withZone(zoneId));
Timestamp.valueOf(date.atStartOfDay());
```

## String to TimeStamp

```java
String time = "2018-12-12"
Timestamp.valueOf(time + " 00:00:00")
```

## list to map

[Java8 中 List 转 Map(Collectors.toMap) 使用技巧\_Hern_16 的博客-CSDN 博客](https://blog.csdn.net/hern_16/article/details/105118006)

```java
// 简单对象
@Accessors(chain = true) // 链式方法
@lombok.Data
class User {
    private String id;
    private String name;
}
// 列表
List<User> userList = Lists.newArrayList(
        new User().setId("A").setName("张三"),
        new User().setId("B").setName("李四"),
        new User().setId("C").setName("王五")
);

//
/*希望转换成
A-> 张三
B-> 李四
C-> 王五
*/
Map<String, String> map = new HashMap<>();
for (User user : userList) {
    map.put(user.getId(), user.getName());
}

// java8之前的做法
Map<String, String> map = new HashMap<>();
for (User user : userList) {
    map.put(user.getId(), user.getName());
}

// java8的做法
userList.stream().collect(Collectors.toMap(User::getId, User::getName));

// 如果希望得到 Map 的 value 为对象本身时
userList.stream().collect(Collectors.toMap(User::getId, t -> t));
// 或者
userList.stream().collect(Collectors.toMap(User::getId, Function.identity()));

// 注意如果Id有重复的话 Collectors.toMap 会抛出异常，需要手动处理，使用 toMap 的重载方法
toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper);
toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper,
        BinaryOperator<U> mergeFunction);
toMap(Function<? super T, ? extends K> keyMapper, Function<? super T, ? extends U> valueMapper,
        BinaryOperator<U> mergeFunction, Supplier<M> mapSupplier);
// 具体做法是
userList.stream().collect(Collectors.toMap(User::getId, User::getName, (n1, n2) -> n1 + n2)); // 合并字符串
userList.stream().collect(Collectors.toMap(User::getId, User::getName, (n1, n2) -> n1)); // 取第一个
// mapSupplier可以用来自定义map类型，如依据 key 排序
userList.stream().collect(
    Collectors.toMap(User::getId, User::getName, (n1, n2) -> n1, TreeMap::new)
);
/*
A-> 李四
B-> 张三
C-> 王五
*/

```

[聊聊 Java8 以后各个版本的新特性 - 掘金](https://juejin.cn/post/6844903918586052616)
[A categorized list of all Java and JVM features since JDK 8 to 17 - Advanced Web Machinery](https://advancedweb.hu/a-categorized-list-of-all-java-and-jvm-features-since-jdk-8-to-17/)
[Java 9 到 16 的语言和 JVM 特性更新分类清单 | NanoNova's cyberspace](https://nanova.me/java-lang-jvm-updates/)
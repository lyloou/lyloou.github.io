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
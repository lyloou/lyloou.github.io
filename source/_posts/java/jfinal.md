---
title: 【java】jfinal
date: 2019-07-17 17:04:56
toc: true
comments: true
tags:
- java
---

## 数据库数据保存后，随即用id作其他更新操作，导致无法更新成功问题

原因：因为是刚保存的，如果没有取回id，其id肯定还是默认的0；
解决办法：回传ID
```java
Record record = RecordUtils.toRecord(ps);
record.set("id", null);

ps.setCreated(Timestamp.from(Instant.now()));
boolean ret = Db.save(TABLE.PROXY_STOCKS, "id", record);
// 回传ID
ps.setId(record.getNumber("id").longValue());
```

[Jfinal quartz动态的增、删、暂停、恢复job | 易踪网](https://www.yeetrack.com/?p=1151)

[jfinal使用QuartzPlugin（定时任务插件）(上)](https://www.jfinal.com/share/1618)
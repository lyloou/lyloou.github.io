---
title: jackson和fastjson区别
date: 2019-11-02 10:43:54
toc: true
comments: true
tags:
  - java
---

## model

```java
import com.alibaba.fastjson.annotation.JSONField;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;

public class Model {
    @JSONField(name = "fastjson_name") // fastjson 改名
    @JsonProperty("jackson_name") // jackson 改名
    private String name = "name";

    @JSONField(name = "fastjson_time", format = "yyyy-MM-dd hh:mm") // fastson 修改日期格式
    @JsonProperty("jackson_time")
    @JsonFormat(pattern = "yyyy/MM/dd hh:mm:ss") // jackson 修改日期格式
    private Date time;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

}
```

## controller

```java
@RestController
public class MyController {

    @RequestMapping("/jackson")
    public Model jackson() {
        Model model = new Model();
        model.setTime(new Date());
        return model;
    }

    @RequestMapping("/fastjson")
    public Object fastjson() {
        Model model = new Model();
        model.setTime(new Date());
        // 这里也可以再次指定dateFormat，会覆盖之前的
        return JSON.toJSONStringWithDateFormat(model, null, SerializerFeature.DisableCircularReferenceDetect);
    }
}

```

## 结果

```json
// http://localhost:8080/jackson
{
  "jackson_name": "name",
  "jackson_time": "2020/11/02 02:52:03"
}
```

```json
// http://localhost:8080/fastjson
{
  "fastjson_name": "name",
  "fastjson_time": "2020-11-02 10:51"
}
```

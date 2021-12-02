---
title: Postman
date: 2021-10-26 10:44:24
toc: true
comments: true
tags:
  - tool
---

## 设置 Header 中的 token

```js
pm.test("Status code is 200", function () {
  pm.response.to.have.status(200);
});

var r = JSON.parse(responseBody);

var token = r.data.token;
console.log(token);

pm.globals.unset("LoginToken");

pm.globals.set("LoginToken", "Bearer:" + token);
```
## [如何使用 Postman 对接口参数进行签名](http://autuan.top/2019/08/28/how-to-sign-params-by-postman/)

在 `Pre-request Script` 选项卡中添加

```js
// 获取当前的请求路径
var url = pm.request.url;

// 获取环境变量
const client = pm.environment.get("client");
const reqVersion = pm.environment.get("reqVersion");
const sign = pm.environment.get("reqVersion");

// 将必填参数拼接到路径上
url = url + "&client=" + client + "&reqVersion=" + reqVersion + "&sign=" + sign;

// 重写url
pm.request.url = url;
```

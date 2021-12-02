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

## SHA256 签名示例

```js
// 获取当前的请求路径
var url = pm.request.url;

// 配置参数
let activeId = "2197";
let awardId = 10266;
let cOpenId = "aaaa";
let MAC = "001a9a000000";
let cUDID = "23320005";
let accessToken = "bbb";
let cChip = "ccc";
let cEmmcCID = "ddd";
let cModel = "eee";

// 签名
let signStr = `MAC=${MAC}&accessToken=${accessToken}&cChip=${cChip}&cEmmcCID=${cEmmcCID}&cModel=${cModel}&cOpenId=${cOpenId}&cUDID=${cUDID}&id=${activeId}&source=wechat`;
var sign = CryptoJS.SHA256(signStr).toString();

// 将必填参数拼接到路径上
url = `${url}?activeId=${activeId}&awardId=${awardId}&cOpenId=${cOpenId}&MAC=${MAC}&cUDID=${cUDID}&accessToken=${accessToken}&&token=${sign}`;

// 重写url
pm.request.url = url;
```

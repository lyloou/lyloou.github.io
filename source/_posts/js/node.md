---
title: node相关
date: 2017.08.18 17:12
toc: true
comments: true
tags:
- js
---



| crypto模块：提供通用的加密和哈希算法。

| 服务器案例（模块http、path、fs的运用）：
```js
'use strict'

var http = require("http");
var path = require("path");
var fs = require("fs");

var server = http.createServer(function(request, response) {
  var workDir = path.resolve("."); // 获取当前目录
  var filepath = path.join(workDir, "showdate.html"); // 定位showdate.html文件

  // 将本地的文件作为响应返回
  response.writeHead(200);
  fs.createReadStream(filepath).pipe(response);
});

server.listen(3000);
console.log("服务已开启，请登录：http://localhost:3000");
```

| pipe
```js
var fs = require("fs");
var rs = fs.createReadStream("hello.js");
var ws = fs.createWriteStream("copy.js");
rs.pipe(ws);
```

| stream 是node.js提供的仅在服务端可用的模块；
基于事件的、异步的方式：
```js
var fs = require("fs");
var rs = fs.createReadStream("hello.js", "utf-8");
rs.on("data", f);
rs.on("end", f);
rs.on("error", f);
```

| 同步的写文件：`fs.writeFileSync()`；

| 写文件：`fs.writeFile("output.txt", data, function(x){})`，如果data是String，默认
  编码是UTF-8；如果传入的是Buffer，则写入的是二进制文件；回调函数只关心成功与否。

| 同步读文件使用`fs.readFileSync()`方法，不接受回调函数，函数直接返回结果。
通过`try...catch`来捕获同步获取文件时的错误。

| `Buffer`对象可以和String做转换：
```js
// Buffer -> String
var text = data.toString("utf-8");
console.log(text);
// String -> Buffer
var buf = new Buffer(text, "utf-8");
console.log(buf);
```

| fs模块
- 读取文件编码是`utf-8`的文件；
```js
var fs = require("fs");
fs.readFile("hello.js", "utf-8", console.log);
```
- 读取二进制文件，不传入文件编码，回调函数将返回一个Buffer对象。
```js
fs.readFile("hello.js", console.log);
```

| 在需要使用回调函数的地方，传入`console.log`，可以打印出回调函数的参数信息。

| 建议始终使用`module.exports`的方式，而不是省写的`exports`；

| 如果要输出一个键值对象`{}`，可以利用`exports`这个已经存在的空对象`{}`，
  并继续在上面添加新的键值；
  > var exported = load(module.exports, module);
  因为对exports重新赋值，对module.exports没有任何副作用。

如果要输出一个函数或数组，必须直接对`module.exports`对象赋值；

| 实现“模块”功能的奥妙就在于JavaScript是一种函数式编程语言，它支持闭包。

| 引入的对象具体是什么，取决于引用模块输出的变量。（输出的变量可以是任意对象、函数、数组等等）

| 一个模块想要对外暴露变量（函数也是变量），可以用`module.exports = variable;`；
  一个模块想要引用其他模块暴露的变量，用`var ref = require('module_name')`就拿到了引用模块变量；


| 使用模块的好处：
- 提高了代码的可维护性；
- 代码重用；
- 避免了函数名和变量名冲突；

| 在Node环境中，一个.js文件就称之为一个模块（module）。

| 让node直接为所有js文件都开启严格模式：
```js
node --use_strict myFile.js
```


http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000


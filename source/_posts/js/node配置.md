---
title: node配置
date: 2017.08.18 17:12
toc: true
comments: true
tags:
- js
---

## [国内优秀npm镜像推荐及使用](http://riny.net/2014/cnpm/)
淘宝npm镜像
- 搜索地址：http://npm.taobao.org/
- registry地址：http://registry.npm.taobao.org/
cnpmjs镜像
- 搜索地址：http://cnpmjs.org/
- registry地址：http://r.cnpmjs.org/

### 临时使用
```sh
npm --registry https://registry.npm.taobao.org install express
```
### 持久使用
```sh
npm config set registry https://registry.npm.taobao.org

// 配置后可通过下面方式来验证是否成功
npm config get registry
// 或
npm info express
```
### 通过cnpm使用
```sh
npm install -g cnpm --registry=https://registry.npm.taobao.org

// 使用
cnpm install express
```




## https://blog.niceue.com/front-end-development/using-domestic-npm-images.html

```sh
# 配置 registry
npm config set registry https://r.cnpmjs.org/
# 验证配置是否修改成功
npm config get registry
```

## npm install
> If you have a package.json file in your directory and you run npm install,
then npm will look at the dependencies that are listed in that file and
download the latest versions satisfying semver rules for all of those.
https://docs.npmjs.com/getting-started/using-a-package.json

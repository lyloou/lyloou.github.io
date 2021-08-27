---
title: maven命令
date: 2021-05-18 10:16:44
toc: true
comments: true
tags:
  - java
---

## maven 修改版本号命令

```sh
# 更新根模块及所有子模块的版本号，同时会生成 pom.xml.versionsBackup 文件
mvn versions:set -DnewVersion=x.x.x-SNAPSHOT

# 提交版本修改 同时会删除 pom.xml.versionsBackup 文件。
mvn versions:commit
```

ref:

> - [【Maven】修改模块版本号 | 佳佳的博客](https://www.liujiajia.me/2018/11/29/maven-set-modules-version)
> - [DevNote_CN · alibaba/jetcache Wiki](https://github.com/alibaba/jetcache/wiki/DevNote_CN)
> - [Versions maven plugin 修改版本\_GGBomb2 的博客-CSDN 博客](https://blog.csdn.net/ggbomb2/article/details/78316068)

## 多个 maven 模块的项目，只打包某个模块和其关联的模块

参考：[Maven 多个 mudule 只编译、打包指定 module_fqwgc8 的博客-CSDN 博客\_maven 编译指定 module](https://blog.csdn.net/fqwgc8/article/details/50517821)

例如 A,B,P 的继承关系为
P
|
—– A
|
—– B

```
-pl, --projects
        Build specified reactor projects instead of all projects
-am, --also-make
        If project list is specified, also build projects required by the list
```

打包 A

```sh
# 进入目录 P
mvn install -pl A -am
# 添加prod参数
mvn install -pl A -am -Pprod
mvn package -pl A -am -Pprod
```

## maven 多模块

- [三分钟把 spring boot 打成 war 包部署到 tomcat 中 - 掘金](https://juejin.im/post/5cd15ed2e51d453b5854b881)
- 打包共享 lib ，分离配置文件

## 模块太多，编译指定模块

```sh
#!/bin/bash
# 编译指定module
# [continuous integration - Skip a submodule during a Maven build - Stack Overflow](https://stackoverflow.com/questions/8304110/skip-a-submodule-during-a-maven-build)

mvn -pl \
:marketing-api-tv-topic-pk,\
:marketing-api-phone-topic-pk\
  clean install -Dmaven.skip.test=true
```

## 查看包依赖情况，从什么时候引入的

[通过 IntelliJ IDEA 和 Maven 命令查看某个 jar 包是怎么引入的 - 小墨的童鞋 - 博客园](https://www.cnblogs.com/wormday/p/8186109.html)

```
mvn dependency:tree -Dverbose -Dincludes=org.yaml:snakeyaml
```

## 打包时跳过测试

注意用的是 package 命令 而不是 war 命令

```
mvn clean package -Dmaven.test.skip=true
```

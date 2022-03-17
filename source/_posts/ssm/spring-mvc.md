---
title: spring-mvc
date: 2018-09-10 18:28:02
toc: true
comments: true
tags:
  - spring
  - java
---

## 流程

![mvc 流程](./mvc_flow.png)

## 处理器是如何 JSON 转换成 Java 对象

使用的是 HttpMessageConverter 机制
在这个接口里面有 5 个方法，canRead, canWrite, write, read, getSupportMediaTypes
在发起 http 请求的时候，先读取 HTTP 请求的请求体；
然后在 HttpMessageConverter 众多实例中（由 Spring MVC 组织成一条链存放）根据 canRead 方法来判断实例能否转换，
这样就找到了 MappingJackson2HttpMessageConverter 实例了，
接着执行 read 方法，将请求体转换成 Java 对象。
https://m.imooc.com/collector/read/62

## IDEA 配置 tomcat

![202203021514358](https://raw.githubusercontent.com/lyloou/img/develop/img/202203021514358.png)
![202203021515228](https://raw.githubusercontent.com/lyloou/img/develop/img/202203021515228.png)

## 参考资料

- [Configure a Spring MVC Project with Intellij IDEA | In My Own Write](https://iamsaurabh.wordpress.com/2017/02/11/configure-a-spring-mvc-project-with-intellij-idea/)
- [Maven + Spring mvc 配置 webApp](https://www.jianshu.com/p/bae8f30300c5)
- [spring-mvc-simple-demo](https://github.com/lyloou/spring-mvc-simple-demo)

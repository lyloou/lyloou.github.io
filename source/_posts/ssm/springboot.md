---
title: springboot
date: 2018-10-11 11:29
toc: true
comments: true
tags:
  - java
---

maven: http://wiki.jikexueyuan.com/project/maven/
spring: https://wiki.jikexueyuan.com/project/spring

## Spring

注解仅仅是对类加上了一些元信息，如果不使用反射等 API 对其进行探测、处理，和不加注解没有任何区别。
https://course.tianmaying.com/web-development+form-validation#

任何一个标注了@Bean 的方法，其返回值将作为一个 bean 定义注册到 Spring 的 IoC 容器，方法名将默认成该 bean 定义的 id。
http://tengj.top/2017/03/09/springboot3/

Spring Boot 常用注解（一） - 声明 Bean 的注解 - CSDN 博客
https://blog.csdn.net/lipinganq/article/details/79155072

## JOOQ

https://www.jooq.org/doc/3.10/manual/

JOOQ 3.8.2 使用 教程：从入门到提高
https://amao12580.github.io/post/2016/04/JOOQ-from-entry-to-improve/

## spring-boot-devtools

Spring Boot 1.3 has introduced devtools, a module to improve the development-time experience when working on Spring Boot applications. To enable it, just add the following dependency to your project:
(https://docs.spring.io/spring-boot/docs/current/maven-plugin/usage.html)

```
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <version>2.1.1.RELEASE</version>
    <optional>true</optional>
  </dependency>
</dependencies>
```

When devtools is running, it detects change when you recompile your application and automatically refreshes it. This works for not only resources but code as well. It also provides a LiveReload server so that it can automatically trigger a browser refresh whenever things change.
Devtools can also be configured to only refresh the browser whenever a static resource has changed (and ignore any change in the code). Just include the following property in your project:

```
spring.devtools.remote.restart.enabled=false
```

## 配置

```sh
   _____
  /  _  \__  _  __ ____   __________   _____   ____
 /  /_\  \ \/ \/ // __ \ /  ___/  _ \ /     \_/ __ \
/    |    \     /\  ___/ \___ (  <_> )  Y Y  \  ___/
\____|__  /\/\_/  \___  >____  >____/|__|_|  /\___  >
        \/            \/     \/            \/     \/

// spring banner
// file name: src/main/resources/banner.txt
// design by http://patorjk.com/software/taag
// [18-SpringBoot——核心-基本配置 - https://github.com/Wang-Jun-Chao - CSDN博客](https://blog.csdn.net/DERRANTCM/article/details/77284924)
```

## 下面这两种有什么区别呢

```xml
<!-- 1 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.1.RELEASE</version>
    <relativePath/>
</parent>
```

```xml
<!-- 2  -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>${spring-boot.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

参照[spring.profiles.active=@profiles.active@的含义 - 毛会懂 - 博客园](https://www.cnblogs.com/maohuidong/p/11507362.html)
在动态配置环境的过程中，如果用了 2（新建项目时自动生成的） 而没有用 1，就会导致报一个错误
@profiles.active@ IllegalStateException: Failed to load property source from spring.profile.active

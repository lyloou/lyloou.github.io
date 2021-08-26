---
title: spring基础
date: 2018-10-31 20:21:02
toc: true
comments: true
tags:
  - spring
  - java
---

## 生命周期

```
Bean的完整生命周期经历了各种方法调用，这些方法可以划分为以下几类：

1、Bean自身的方法　　：　　这个包括了Bean本身调用的方法和通过配置文件中<bean>的init-method和destroy-method指定的方法

2、Bean级生命周期接口方法　　：　　这个包括了BeanNameAware、BeanFactoryAware、InitializingBean和DiposableBean这些接口的方法

3、容器级生命周期接口方法　　：　　这个包括了InstantiationAwareBeanPostProcessor 和 BeanPostProcessor 这两个接口实现，一般称它们的实现类为“后处理器”。

4、工厂后处理器接口方法　　：　　这个包括了AspectJWeavingEnabler, ConfigurationClassPostProcessor, CustomAutowireConfigurer等等非常有用的工厂后处理器　　接口的方法。工厂后处理器也是容器级的。在应用上下文装配配置文件之后立即调用。
```

## AOP 切面的几种通知

![spring-2021-08-24-18-40-42](http://cdn.lyloou.com/img/spring-2021-08-24-18-40-42.png)

[Spring Bean 的生命周期（非常详细） - Chandler Qian - 博客园](https://www.cnblogs.com/zrtqsk/p/3735273.html)

## 常见问题

版本问题：
例如：`4.0.0.RELEASE`版本对 Component 和 ComponentScan 支持不好，
而`4.3.2.RELEASE`是支持很好的。

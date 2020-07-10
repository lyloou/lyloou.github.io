---
title: spring-cloud
date: 2020-07-10 14:29:03
toc: true
comments: true
tags:
  - spring
---

## spring cloud 和 spring boot 版本不对应时，会无法启动

```
org.springframework.context.ApplicationContextException: Unable to start web server; nested exception is org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.onRefresh(ServletWebServerApplicationContext.java:156) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.context.support.AbstractApplicationContext.refresh(AbstractApplicationContext.java:544) ~[spring-context-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.refresh(ServletWebServerApplicationContext.java:141) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.SpringApplication.refresh(SpringApplication.java:747) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.SpringApplication.refreshContext(SpringApplication.java:397) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.SpringApplication.run(SpringApplication.java:315) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.builder.SpringApplicationBuilder.run(SpringApplicationBuilder.java:140) [spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at com.eureka.EurekaServerApplication.main(EurekaServerApplication.java:21) [classes/:na]
Caused by: org.springframework.boot.web.server.WebServerException: Unable to start embedded Tomcat
    at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.initialize(TomcatWebServer.java:126) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.<init>(TomcatWebServer.java:88) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory.getTomcatWebServer(TomcatServletWebServerFactory.java:438) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.embedded.tomcat.TomcatServletWebServerFactory.getWebServer(TomcatServletWebServerFactory.java:191) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.createWebServer(ServletWebServerApplicationContext.java:180) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.onRefresh(ServletWebServerApplicationContext.java:153) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    ... 7 common frames omitted
Caused by: org.springframework.beans.factory.UnsatisfiedDependencyException: Error creating bean with name 'traceFilterRegistration' defined in class path resource [org/springframework/cloud/netflix/eureka/server/EurekaServerAutoConfiguration.class]: Unsatisfied dependency expressed through method 'traceFilterRegistration' parameter 0; nested exception is org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'javax.servlet.Filter' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@org.springframework.beans.factory.annotation.Qualifier(value=httpTraceFilter)}
    at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:787) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.ConstructorResolver.instantiateUsingFactoryMethod(ConstructorResolver.java:528) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.instantiateUsingFactoryMethod(AbstractAutowireCapableBeanFactory.java:1338) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBeanInstance(AbstractAutowireCapableBeanFactory.java:1177) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.doCreateBean(AbstractAutowireCapableBeanFactory.java:557) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory.createBean(AbstractAutowireCapableBeanFactory.java:517) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.AbstractBeanFactory.lambda$doGetBean$0(AbstractBeanFactory.java:323) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.AbstractBeanFactory$$Lambda$171/204684384.getObject(Unknown Source) ~[na:na]
    at org.springframework.beans.factory.support.DefaultSingletonBeanRegistry.getSingleton(DefaultSingletonBeanRegistry.java:222) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.AbstractBeanFactory.doGetBean(AbstractBeanFactory.java:321) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.AbstractBeanFactory.getBean(AbstractBeanFactory.java:207) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.boot.web.servlet.ServletContextInitializerBeans.getOrderedBeansOfType(ServletContextInitializerBeans.java:211) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.servlet.ServletContextInitializerBeans.getOrderedBeansOfType(ServletContextInitializerBeans.java:202) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.servlet.ServletContextInitializerBeans.addServletContextInitializerBeans(ServletContextInitializerBeans.java:96) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.servlet.ServletContextInitializerBeans.<init>(ServletContextInitializerBeans.java:85) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.getServletContextInitializerBeans(ServletWebServerApplicationContext.java:253) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext.selfInitialize(ServletWebServerApplicationContext.java:227) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.springframework.boot.web.servlet.context.ServletWebServerApplicationContext$$Lambda$386/305651902.onStartup(Unknown Source) ~[na:na]
    at org.springframework.boot.web.embedded.tomcat.TomcatStarter.onStartup(TomcatStarter.java:53) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    at org.apache.catalina.core.StandardContext.startInternal(StandardContext.java:5135) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1384) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1374) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at java.util.concurrent.FutureTask.run(FutureTask.java:266) ~[na:1.8.0_25]
    at org.apache.tomcat.util.threads.InlineExecutorService.execute(InlineExecutorService.java:75) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at java.util.concurrent.AbstractExecutorService.submit(AbstractExecutorService.java:134) ~[na:1.8.0_25]
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:909) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.core.StandardHost.startInternal(StandardHost.java:841) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1384) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.core.ContainerBase$StartChild.call(ContainerBase.java:1374) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at java.util.concurrent.FutureTask.run(FutureTask.java:266) ~[na:1.8.0_25]
    at org.apache.tomcat.util.threads.InlineExecutorService.execute(InlineExecutorService.java:75) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at java.util.concurrent.AbstractExecutorService.submit(AbstractExecutorService.java:134) ~[na:1.8.0_25]
    at org.apache.catalina.core.ContainerBase.startInternal(ContainerBase.java:909) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.core.StandardEngine.startInternal(StandardEngine.java:262) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.core.StandardService.startInternal(StandardService.java:421) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.core.StandardServer.startInternal(StandardServer.java:930) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.util.LifecycleBase.start(LifecycleBase.java:183) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.apache.catalina.startup.Tomcat.start(Tomcat.java:459) ~[tomcat-embed-core-9.0.27.jar:9.0.27]
    at org.springframework.boot.web.embedded.tomcat.TomcatWebServer.initialize(TomcatWebServer.java:107) ~[spring-boot-2.2.1.RELEASE.jar:2.2.1.RELEASE]
    ... 12 common frames omitted
Caused by: org.springframework.beans.factory.NoSuchBeanDefinitionException: No qualifying bean of type 'javax.servlet.Filter' available: expected at least 1 bean which qualifies as autowire candidate. Dependency annotations: {@org.springframework.beans.factory.annotation.Qualifier(value=httpTraceFilter)}
    at org.springframework.beans.factory.support.DefaultListableBeanFactory.raiseNoMatchingBeanFound(DefaultListableBeanFactory.java:1695) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.DefaultListableBeanFactory.doResolveDependency(DefaultListableBeanFactory.java:1253) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.DefaultListableBeanFactory.resolveDependency(DefaultListableBeanFactory.java:1207) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.ConstructorResolver.resolveAutowiredArgument(ConstructorResolver.java:874) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    at org.springframework.beans.factory.support.ConstructorResolver.createArgumentArray(ConstructorResolver.java:778) ~[spring-beans-5.2.1.RELEASE.jar:5.2.1.RELEASE]
    ... 54 common frames omitted
```

查看 spring 官方对应关系和官方文档

spring 官方对应关系：https://start.spring.io/actuator/info

```
"Finchley.M2": "Spring Boot >=2.0.0.M3 and <2.0.0.M5",
"Finchley.M3": "Spring Boot >=2.0.0.M5 and <=2.0.0.M5",
"Finchley.M4": "Spring Boot >=2.0.0.M6 and <=2.0.0.M6",
"Finchley.M5": "Spring Boot >=2.0.0.M7 and <=2.0.0.M7",
"Finchley.M6": "Spring Boot >=2.0.0.RC1 and <=2.0.0.RC1",
"Finchley.M7": "Spring Boot >=2.0.0.RC2 and <=2.0.0.RC2",
"Finchley.M9": "Spring Boot >=2.0.0.RELEASE and <=2.0.0.RELEASE",
"Finchley.RC1": "Spring Boot >=2.0.1.RELEASE and <2.0.2.RELEASE",
"Finchley.RC2": "Spring Boot >=2.0.2.RELEASE and <2.0.3.RELEASE",
"Finchley.SR4": "Spring Boot >=2.0.3.RELEASE and <2.0.999.BUILD-SNAPSHOT",
"Finchley.BUILD-SNAPSHOT": "Spring Boot >=2.0.999.BUILD-SNAPSHOT and <2.1.0.M3",
"Greenwich.M1": "Spring Boot >=2.1.0.M3 and <2.1.0.RELEASE",
"Greenwich.SR6": "Spring Boot >=2.1.0.RELEASE and <2.1.16.BUILD-SNAPSHOT",
"Greenwich.BUILD-SNAPSHOT": "Spring Boot >=2.1.16.BUILD-SNAPSHOT and <2.2.0.M4",
"Hoxton.SR6": "Spring Boot >=2.2.0.M4 and <2.3.2.BUILD-SNAPSHOT",
"Hoxton.BUILD-SNAPSHOT": "Spring Boot >=2.3.2.BUILD-SNAPSHOT and <2.4.0.M1",
"2020.0.0-SNAPSHOT": "Spring Boot >=2.4.0.M1"
```

官方文档：https://spring.io/projects/spring-cloud

- [springboot 和 springcloud 版本冲突问题 - Alice 口袋有糖 - 博客园](https://www.cnblogs.com/koudaiyoutang/p/11995137.html)

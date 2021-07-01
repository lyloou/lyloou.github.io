---
title: jar包相关
date: 2018-09-27 17:43
toc: true
comments: true
tags:
  - java
---

## [基于 Java 的打包 jar、war、ear 包的作用与区别详解](https://blog.csdn.net/liangrui1988/article/details/49964711)

|              | JAR                                                                                                                  | WAR                                                                                            | EAR                                     |
| ------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | --------------------------------------- |
| **英文**     | Java Archive file                                                                                                    | Web Archive file                                                                               | Enterprise Archive file                 |
| **包含内容** | class、properties 文件，是文件封装的最小单元；包含 Java 类的普通库、资源（resources）、辅助文件（auxiliary files）等 | Servlet、JSP 页面、JSP 标记库、JAR 库文件、HTML/XML 文档和其他公用资源文件，如图片、音频文件等 | 除了包含 JAR、WAR 以外，还包括 EJB 组件 |
| **部署文件** | application-client.xml                                                                                               | web.xml                                                                                        | application.xml                         |
| **容器**     | 应用服务器（application servers）                                                                                    | 小型服务程序容器（servlet containers）                                                         | EJB 容器（EJB containers）              |
| **级别**     | 小                                                                                                                   | 中                                                                                             | 大                                      |

## 运行 jar 包

```sh
java -Dlogging.level.root=debug -D'file.encoding=utf-8' -jar -Dspring.profiles.active=master admin.jar
```

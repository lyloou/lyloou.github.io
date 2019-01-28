---
title: maven
date: 2018/07/02 20:53
toc: true
comments: true
tags:
- java
---

## nexus
### nexus2

 [【原创】Nexus搭建Maven私服](https://www.cnblogs.com/dreamroute/p/5440419.html)
https://help.sonatype.com/repomanager2/installing-and-running/running

注意访问网址是： http://localhost:8081/nexus/

学习建议：mvn这个东西，就是难者不会，会者不难。基本上按照这样一个路线就问题不大，基本使用 => 了解继承/聚合 => 了解jar包冲突机制，并解决冲突 =>了解mvn的3个默认声明周期 ，生命周期的各个阶段phase ，各个阶段的目标goal => mvn的插件开发 => Nexus私服搭建及其使用。大致这样一个过程下来，就能非常熟悉mvn，如果在稍微看看mvn的源码，大致看一看，基本上可以说是精通mvn了。

### nexus3
https://www.cnblogs.com/EasonJim/p/6858333.html
```sh
nexus.exe /install <optional-service-name> #安装
nexus.exe /start <optional-service-name> #开始
nexus.exe /stop <optional-service-name> #结束
nexus.exe /uninstall <optional-service-name> #卸载
#其中<optional-service-name>为服务的名称，可自定义
```


- [使用Maven管理Java项目 - 大梦初晓 - SegmentFault 思否](https://segmentfault.com/a/1190000003044418)
- [理解Maven中的SNAPSHOT版本和正式版本 - 黄博文的地盘](http://www.huangbowen.net/blog/2016/01/29/understand-official-version-and-snapshot-version-in-maven/)
- [Maven - 快照 - Maven 教程 - 极客学院Wiki](http://wiki.jikexueyuan.com/project/maven/snapshots.html)
快照 vs 版本
对于版本，Maven 一旦下载了指定的版本（例如 data-service:1.0），它将不会尝试从仓库里再次下载一个新的 1.0 版本。想要下载新的代码，数据服务版本需要被升级到 1.1。
对于快照，每次用户接口团队构建他们的项目时，Maven 将自动获取最新的快照（data-service:1.0-SNAPSHOT）。


## 设置deploy的地址
```xml
<!-- pom.xml中加入 -->
<distributionManagement>
    <repository>
        <id>remote-nexus</id> <!-- 注意id要和.m2文件夹中的setting.xml server标签下的id一样 -->
        <name>Releases</name>
        <url>http://localhost:8081/repository/maven-releases/</url>
    </repository>
    <snapshotRepository>
        <id>remote-nexus</id>
        <name>Snapshot</name>
        <url>http://localhost:8081/repository/maven-snapshots/</url>
    </snapshotRepository>
</distributionManagement>

<!-- .m2/setting.xml -->
<!-- [maven设置-setting.xml文件学习](https://blog.csdn.net/tomato__/article/details/13025187) -->
<!-- [Maven – Settings Reference](https://maven.apache.org/settings.html) -->
  <servers>
    <server>
      <id>local-nexus</id>
      <username>admin</username>
      <password>admin123</password>
    </server>
    <server>
      <id>remote-nexus</id>
      <username>name</username>
      <password>password</password>
    </server>
  </servers>

```


## [有一些与 Maven 生命周期相关的重要概念需要说明](http://wiki.jikexueyuan.com/project/maven/build-life-cycle.html)

当一个阶段通过 Maven 命令调用时，例如 mvn compile，只有该阶段之前以及包括该阶段在内的所有阶段会被执行。

不同的 maven 目标将根据打包的类型（JAR / WAR / EAR），被绑定到不同的 Maven 生命周期阶段。


## [maven dependency中scope=compile 和 provided区别](https://blog.csdn.net/mccand1234/article/details/60962283)
maven中三种classpath
编译，测试，运行
1.compile：默认范围，编译测试运行都有效
2.provided：在编译和测试时有效
3.runtime：在测试和运行时有效
4.test:只在测试时有效
5.system:在编译和测试时有效，与本机系统关联，可移植性差 
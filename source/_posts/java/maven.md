---
title: maven
date: 2018/07/02 20:53
toc: true
comments: true
tags:
  - java
---

## 一键生成

```sh
mvn archetype:generate -DgroupId=com.lyloou.app -DartifactId=algs4 -DarchetypeArtifactId=maven-archetype-quickstart -DinteractiveMode=false
```

## 多模块开发

- [Maven 构建简单的多模块项目 - CN.programmer.Luxh - 博客园](https://www.cnblogs.com/luxh/p/3506750.html)
- [基于 Maven 分模块开发实践 - 郭恩洲的个人页面 - OSCHINA](https://my.oschina.net/guoenzhou/blog/395851)
- [Maven 最佳实践：划分模块 - Maven 中文 - ITeye 博客](https://juvenshun.iteye.com/blog/305865)

## nexus 安装

### nexus2

[【原创】Nexus 搭建 Maven 私服](https://www.cnblogs.com/dreamroute/p/5440419.html)
https://help.sonatype.com/repomanager2/installing-and-running/running

注意访问网址是： http://localhost:8081/nexus/

学习建议：mvn 这个东西，就是难者不会，会者不难。基本上按照这样一个路线就问题不大，基本使用 => 了解继承/聚合 => 了解 jar 包冲突机制，并解决冲突 =>了解 mvn 的 3 个默认声明周期 ，生命周期的各个阶段 phase ，各个阶段的目标 goal => mvn 的插件开发 => Nexus 私服搭建及其使用。大致这样一个过程下来，就能非常熟悉 mvn，如果在稍微看看 mvn 的源码，大致看一看，基本上可以说是精通 mvn 了。

### nexus3

https://help.sonatype.com/repomanager3/download/download-archives---repository-manager-3

```sh
docker volume create --name nexus-data
docker run -d -p 8081:8081 --name nexus -v nexus-data:/nexus-data sonatype/nexus3

docker volume inspect nexus-data
# see admin password in nexus-data/admin.password
```

https://www.cnblogs.com/EasonJim/p/6858333.html

```sh
nexus.exe /install <optional-service-name> #安装
nexus.exe /start <optional-service-name> #开始
nexus.exe /stop <optional-service-name> #结束
nexus.exe /uninstall <optional-service-name> #卸载
#其中<optional-service-name>为服务的名称，可自定义
```

- [使用 Maven 管理 Java 项目 - 大梦初晓 - SegmentFault 思否](https://segmentfault.com/a/1190000003044418)
- [理解 Maven 中的 SNAPSHOT 版本和正式版本 - 黄博文的地盘](http://www.huangbowen.net/blog/2016/01/29/understand-official-version-and-snapshot-version-in-maven/)
- [Maven - 快照 - Maven 教程 - 极客学院 Wiki](http://wiki.jikexueyuan.com/project/maven/snapshots.html)
  快照 vs 版本
  对于版本，Maven 一旦下载了指定的版本（例如 data-service:1.0），它将不会尝试从仓库里再次下载一个新的 1.0 版本。想要下载新的代码，数据服务版本需要被升级到 1.1。
  对于快照，每次用户接口团队构建他们的项目时，Maven 将自动获取最新的快照（data-service:1.0-SNAPSHOT）。

##  设置 deploy 的地址

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

## [maven dependency 中 scope=compile 和 provided 区别](https://blog.csdn.net/mccand1234/article/details/60962283)

maven 中三种 classpath
编译，测试，运行
1.compile：默认范围，编译测试运行都有效
2.provided：在编译和测试时有效
3.runtime：在测试和运行时有效
4.test:只在测试时有效
5.system:在编译和测试时有效，与本机系统关联，可移植性差

## multiple conflict

[maven 2 - SLF4J: Class path contains multiple SLF4J bindings - Stack Overflow](https://stackoverflow.com/questions/14024756/slf4j-class-path-contains-multiple-slf4j-bindings)

```xml
<exclusions>
    <exclusion>
        <groupId>org.slf4j</groupId>
        <artifactId>slf4j-log4j12</artifactId>
    </exclusion>
</exclusions>
```

## [Generate source code jar for Maven based project – Mkyong.com](https://www.mkyong.com/maven/generate-source-code-jar-for-maven-based-project/)

```xml
  <build>
	  <plugins>
	    <plugin>
		<groupId>org.apache.maven.plugins</groupId>
		<artifactId>maven-source-plugin</artifactId>
		<executions>
			<execution>
				<id>attach-sources</id>
				<goals>
					<goal>jar</goal>
				</goals>
			</execution>
		</executions>
	   </plugin>
	 </plugins>
  </build>

```

```sh
# 查看 goal 和 phase 的默认绑定
mvn help:describe -Dplugin=org.apache.maven.plugins:maven-source-plugin:2.1.1 -Ddetail
```

## 打包的时候，resource 中的文件没有打包进去

```sh
mvn resources:resources
```

[Apache Maven Resources Plugin – Filtering](https://maven.apache.org/plugins/maven-resources-plugin/examples/filter.html)

## 其他镜像

- [最快的 maven repository--阿里镜像仓库-云栖社区-阿里云](https://yq.aliyun.com/articles/78124)
- [阿里云帮助中心-阿里云，领先的云计算服务提供商](https://help.aliyun.com/document_detail/102512.html?spm=a2c4e.11153940.0.0.213c7bdebk30HM)

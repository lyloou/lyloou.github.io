---
title: mybatis相关
date: 2018/09/17 17:29
toc: true
comments: true
tags:
  - sql
---

## mybatisplus

https://github.com/lyloou/spring-master/tree/master/spring-mybatisplus

- 自动生成，包括 Controller、Mapper、Entity、Service、Mapper.xml

## mybatis 自动生成工具

- 下载`mybatis-generator-core-1.3.7.jar`

```sh
https://github.com/mybatis/generator/releases
https://github.com/mybatis/generator/releases/download/mybatis-generator-1.3.7/mybatis-generator-core-1.3.7.zip
```

- 下载`postgresql-42.2.2.jar`

```sh
https://jdbc.postgresql.org/download.html
https://jdbc.postgresql.org/download/postgresql-42.2.2.jar
```

- 配置`generatorConfig.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>
    <classPathEntry
            location="D:/c/mybatis/mybatis-generator-core-1.3.7/lib/postgresql-42.2.2.jar"/>

    <context id="MysqlContext" targetRuntime="MyBatis3Simple">
        <!-- 生成的pojo，将implements Serializable-->
        <plugin type="org.mybatis.generator.plugins.SerializablePlugin"></plugin>

        <jdbcConnection driverClass="org.postgresql.Driver"
                        connectionURL="jdbc:postgresql://192.168.1.123:5432/users?currentSchema=hello&amp;tcpKeepAlive=true"
                        userId="hello" password="hello"/>

        <!--
        默认false，把JDBC DECIMAL 和 NUMERIC 类型解析为 Integer
            true，把JDBC DECIMAL 和 NUMERIC 类型解析为java.math.BigDecimal
        -->
        <javaTypeResolver>
            <property name="forceBigDecimals" value="false" />
        </javaTypeResolver>

        <javaModelGenerator targetPackage="com.example.model.original"
                            targetProject="./src/main/java">
            <property name="enableSubPackages" value="true"/>
            <!-- 从数据库返回的值被清理前后的空格  -->
            <property name="trimStrings" value="true" />
        </javaModelGenerator>

        <javaClientGenerator type="ANNOTATEDMAPPER"
                             targetPackage="com.example.repository.mapper"
                             targetProject="./src/main/java"  >
            <property name="rootInterface" value="com.example.repository.mark.IMarkMapper"/>
        </javaClientGenerator>

        <commentGenerator>
			<!-- 阻止**生成的注释包含时间戳 true：是 ： false:否 -->
			<property name="suppressDate" value="true" />
			<!-- 是否去除自动生成的注释 true：是 ： false:否 -->
			<property name="suppressAllComments" value="false" />
		</commentGenerator>

        <table schema="hello" tableName="app_verify_info" />
        <table schema="hello" tableName="api_interface_info" />
        <table schema="hello" tableName="api_interface_access" />
        <table schema="hello" tableName="app_code" />

    </context>

</generatorConfiguration>
```

- 配置`generatorConfig.bat`

```bat
@echo off
java -jar mybatis-generator-core-1.3.2.jar -configfile generatorConfig.xml
pause
```

参考资料：

- [官网 generator](https://github.com/mybatis/generator)
- [mybatis 自动生成工具-MBG](https://blog.csdn.net/zxh_2581285470/article/details/51915228)

```sh
# mysql使用的是不同的连接库
mysql-connector-java-5.1.37.jar
```

- [Mybatis 最入门---代码自动生成（generatorConfig.xml 配置） - 越来越好 ing 的博客 - CSDN 博客](https://blog.csdn.net/weixin_42476601/article/details/81479362)

## 根据数据库表生成对应实体类（Lombok 的注解实现）

记得 IDEA 安装好插件：Lombok Plugin

文件`pom.xml`

```xml
    <properties>
        <project.build.sourceEncoding>UTF-8</project.build.sourceEncoding>
        <mybatis.generator.version>1.3.7</mybatis.generator.version>
        <mysql.connector.java>5.1.46</mysql.connector.java>
        <mybatis.generator.lombok.plugin>1.0</mybatis.generator.lombok.plugin>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <version>1.16.16</version>
            <type>jar</type>
        </dependency>
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>${mysql.connector.java}</version>
        </dependency>
    </dependencies>

    <build>
        <plugins>
            <plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>${mybatis.generator.version}</version>
                <configuration>
                    <overwrite>true</overwrite>
                    <configurationFile>src/main/resources/mybatis/generatorConfig.xml</configurationFile>
                </configuration>

                <dependencies>
                    <dependency>
                        <groupId>mysql</groupId>
                        <artifactId>mysql-connector-java</artifactId>
                        <version>${mysql.connector.java}</version>
                    </dependency>
                    <dependency>
                        <groupId>com.softwareloop</groupId>
                        <artifactId>mybatis-generator-lombok-plugin</artifactId>
                        <version>${mybatis.generator.lombok.plugin}</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>
```

文件`src/main/resources/mybatis/generatorConfig.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration
        PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN"
        "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">

<generatorConfiguration>

    <context id="context1" targetRuntime="MyBatis3Simple" defaultModelType="flat">
        <!-- include the plugin -->
        <plugin type="com.softwareloop.mybatis.generator.plugins.LombokPlugin">

            <!-- enable annotations -->
            <property name="builder" value="true"/>
            <!-- annotation's option(boolean) -->
            <property name="builder.fluent" value="true"/>
            <!-- annotation's option(String) -->
            <property name="builder.builderMethodName" value="myBuilder"/>

            <property name="accessors" value="true"/>
            <!-- annotation's option(array of String) -->
            <property name="accessors.prefix" value="m_, _"/>

            <!-- disable annotations -->
            <property name="allArgsConstructor" value="false"/>
        </plugin>

        <commentGenerator>
            <!--  关闭自动生成的注释  -->
            <property name="suppressAllComments" value="true"/>
        </commentGenerator>

        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://127.0.0.1/lyloou?useUnicode=true&amp;characterEncoding=utf8"
                        userId="root" password="root"/>


        <javaModelGenerator
                targetPackage="com.lyloou.orders.entity.task"
                targetProject="src/main/java">
            <property name="trimStrings" value="true"/>
        </javaModelGenerator>

        <!--<table tableName="tasks" domainObjectName="Tasks"/>-->
        <table tableName="task_bonus" domainObjectName="TaskBonus"/>
        <table tableName="task_bonus_coupon" domainObjectName="TaskBonusCoupon"/>
        <table tableName="task_bonus_user" domainObjectName="TaskBonusUser"/>

    </context>

</generatorConfiguration>

```

如下图所示点击生成 entity
![点击生成 entity](https://github.com/lyloou/img/raw/develop/z/20190624151033.png)

如果数据库中的时间用的是 `timestamp`，为了不损失精度，做一个【在文件夹中替换】的操作。
选中刚才的 task 文件夹，键入 `Ctrl + Shift + R`
替换 `private Date` 为 `private java.sql.Timestamp`

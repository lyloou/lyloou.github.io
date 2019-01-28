---
title: mybatis相关
date: 2018/09/17 17:29
toc: true
comments: true
tags:
- sql
---

## mybatis自动生成工具
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
        <jdbcConnection driverClass="org.postgresql.Driver"
                        connectionURL="jdbc:postgresql://192.168.1.123:5432/users?currentSchema=hello&amp;tcpKeepAlive=true"
                        userId="hello" password="hello"/>

        <javaModelGenerator targetPackage="com.example.model.original"
                            targetProject="D:/t/">
            <property name="trimStrings" value="true" />
        </javaModelGenerator>

        <javaClientGenerator type="ANNOTATEDMAPPER" 
                             targetPackage="com.example.repository.mapper"
                             targetProject="D:/t/"  >
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
- 配置`generatorConfig.bat `
```bat
@echo off
java -jar mybatis-generator-core-1.3.2.jar -configfile generatorConfig.xml
pause
```

参考资料： 
- [官网generator](https://github.com/mybatis/generator)
- [mybatis自动生成工具-MBG](https://blog.csdn.net/zxh_2581285470/article/details/51915228)
```sh
# mysql使用的是不同的连接库
mysql-connector-java-5.1.37.jar
```

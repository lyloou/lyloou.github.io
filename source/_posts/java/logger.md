---
title: 【java】日志
date: 2019-01-18 19:34:03
toc: true
comments: true
tags:
  - java
---

## logback

[SpringBoot 日志处理之 Logback - 掘金](https://juejin.im/post/6844903822687485965)
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
    <contextName>logback-spring-demo-dev</contextName>
    <property name="pattern" value="%d{yyyy-MM-dd HH:mm:ss.SSS} [%thread] %-5level %logger{50} - %msg %n"/>
    <property name="pattern-color" value="%yellow(%d{yyyy-MM-dd HH:mm:ss.SSS}) [%thread] %highlight(%-5level) %green(%logger{50}) - %highlight(%msg) %n"/>
    <property name="LOG_HOME" value="logs"/>

    <!-- 控制台输出 -->
    <appender name="CONSOLE" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>

    <!-- 控制台输出-带颜色 -->
    <appender name="CONSOLE-WITH-COLOR" class="ch.qos.logback.core.ConsoleAppender">
        <encoder class="ch.qos.logback.classic.encoder.PatternLayoutEncoder">
            <pattern>${pattern-color}</pattern>
        </encoder>
    </appender>

    <!-- 文件输出 -->
    <appender name="FILE" class="ch.qos.logback.core.rolling.RollingFileAppender">
        <rollingPolicy class="ch.qos.logback.core.rolling.TimeBasedRollingPolicy">
            <fileNamePattern>${LOG_HOME}/all.%d.%i.log</fileNamePattern>
            <timeBasedFileNamingAndTriggeringPolicy class="ch.qos.logback.core.rolling.SizeAndTimeBasedFNATP">
                <maxFileSize>10MB</maxFileSize>
            </timeBasedFileNamingAndTriggeringPolicy>
            <maxHistory>30</maxHistory>
        </rollingPolicy>

        <encoder>
            <pattern>${pattern}</pattern>
        </encoder>
    </appender>


    <root level="INFO">
        <appender-ref ref="CONSOLE-WITH-COLOR"/>
        <appender-ref ref="FILE"/>
    </root>

    <logger name="com.example.logbackdemo.IndexAction" level="info" additivity="false">
        <appender-ref ref="CONSOLE"/>
    </logger>

</configuration>

```

## 日志

- [java ???? log4j ?????? slf4j ?????? - ywlaker - ???](https://www.cnblogs.com/ywlaker/p/6124067.html)
- [SLF4j Vs Log4j - Which one is better? - HowToDoInJava](https://howtodoinjava.com/log4j/slf4j-vs-log4j-which-one-is-better/)
- [https://www.hollischuang.com/archives/3000](https://www.hollischuang.com/archives/3000)
- [Top 10 Tips on Logging in Java - Tutorial](https://javarevisited.blogspot.com/2011/05/top-10-tips-on-logging-in-java.html#axzz5dIpc21eU)

* [Intellij IDEA live template for SLF4J logger | chhh, quiet plxplx...](http://3rdaftergod.blogspot.com/2017/01/intellij-idea-live-template-for-slf4j.html)

How to define a live template

    Go to File->Settings->Editor->Live Templates.
    In the right panel tree select category other.
    Click the plus (+) sign on the top right, select Live Template.
    Set
        Abbreviation: log
        Description: Inserts private static Logger for slf4j
        Template text: private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger($CLASS_NAME$.class);$END$
    Now click the Edit Variables button, we will tell the IDE what $CLASS_NAME$ means here. $END$ means where to place the cursor after template expansion.
        Name: CLASS_NAME
        Expression: className()
        Default value: leave empty
        Skip if defined: true (check the checkbox)
    At the very bottom look for text Applicable in with a link Change next to it, click it. Select Java->declaration.

Congratulations, you're done! Just type log and press Tab anywhere in the class declaration.

## 有颜色的 log4j

```ini
log4j.debug=false
#
# Default level is INFO
log4j.rootLogger=DEBUG,StdoutErrorFatal,StdoutWarn,StdoutInfo,StdoutDebug,StdoutTrace
#
# and for com.some.package.* log everything
log4j.logger.com.some.package=TRACE
#
log4j.appender.StdoutErrorFatal=org.apache.log4j.ConsoleAppender
log4j.appender.StdoutErrorFatal.layout=org.apache.log4j.PatternLayout
log4j.appender.StdoutErrorFatal.layout.conversionPattern=\u001b[31;1m%d{HH:mm:ss,SSS} %-5p - %-26c - [user:%X{username}] %m\n
log4j.appender.StdoutErrorFatal.threshold=ERROR
#
log4j.appender.StdoutWarn=org.apache.log4j.ConsoleAppender
log4j.appender.StdoutWarn.layout=org.apache.log4j.PatternLayout
log4j.appender.StdoutWarn.layout.conversionPattern=\u001b[33;1m%d{HH:mm:ss,SSS} %-5p - %-26c - [user:%X{username}] %m\n
log4j.appender.StdoutWarn.threshold=WARN
log4j.appender.StdoutWarn.filter.filter1=org.apache.log4j.varia.LevelRangeFilter
log4j.appender.StdoutWarn.filter.filter1.levelMin=WARN
log4j.appender.StdoutWarn.filter.filter1.levelMax=WARN
#
log4j.appender.StdoutInfo=org.apache.log4j.ConsoleAppender
log4j.appender.StdoutInfo.layout=org.apache.log4j.PatternLayout
log4j.appender.StdoutInfo.layout.conversionPattern=\u001b[0m%d{HH:mm:ss,SSS} %-5p - %-26c - [user:%X{username}] %m\n
log4j.appender.StdoutInfo.threshold=INFO
log4j.appender.StdoutInfo.filter.filter1=org.apache.log4j.varia.LevelRangeFilter
log4j.appender.StdoutInfo.filter.filter1.levelMin=INFO
log4j.appender.StdoutInfo.filter.filter1.levelMax=INFO
#
log4j.appender.StdoutDebug=org.apache.log4j.ConsoleAppender
log4j.appender.StdoutDebug.layout=org.apache.log4j.PatternLayout
log4j.appender.StdoutDebug.layout.conversionPattern=\u001b[0;36m%d{HH:mm:ss,SSS} %-5p - %-26c - [user:%X{username}] %m\n
log4j.appender.StdoutDebug.threshold=DEBUG
log4j.appender.StdoutDebug.filter.filter1=org.apache.log4j.varia.LevelRangeFilter
log4j.appender.StdoutDebug.filter.filter1.levelMin=DEBUG
log4j.appender.StdoutDebug.filter.filter1.levelMax=DEBUG
#
log4j.appender.StdoutTrace=org.apache.log4j.ConsoleAppender
log4j.appender.StdoutTrace.layout=org.apache.log4j.PatternLayout
log4j.appender.StdoutTrace.layout.conversionPattern=\u001b[0;30;1m%d{HH:mm:ss,SSS} %-5p - %-26c - [user:%X{username}] %m\n
log4j.appender.StdoutTrace.threshold=TRACE
log4j.appender.StdoutTrace.filter.filter1=org.apache.log4j.varia.LevelRangeFilter
log4j.appender.StdoutTrace.filter.filter1.levelMin=TRACE
log4j.appender.StdoutTrace.filter.filter1.levelMax=TRACE
```

完整配置: http://javapub.iteye.com/blog/866664

```ini
log4j.rootLogger=CONSOLE,FILE
log4j.addivity.org.apache=true

# 应用于控制台
log4j.appender.CONSOLE=org.apache.log4j.ConsoleAppender
log4j.appender.CONSOLE.Threshold=INFO
log4j.appender.CONSOLE.Target=System.out
log4j.appender.CONSOLE.Encoding=GBK
log4j.appender.CONSOLE.layout=org.apache.log4j.PatternLayout
log4j.appender.CONSOLE.layout.ConversionPattern=[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n

# 每天新建日志
log4j.appender.A1=org.apache.log4j.DailyRollingFileAppender
log4j.appender.A1.File=C:/log4j/log
log4j.appender.A1.Encoding=GBK
log4j.appender.A1.Threshold=DEBUG
log4j.appender.A1.DatePattern='.'yyyy-MM-dd
log4j.appender.A1.layout=org.apache.log4j.PatternLayout
log4j.appender.A1.layout.ConversionPattern=%d{ABSOLUTE} %5p %c{1}:%L : %m%n

#应用于文件
log4j.appender.FILE=org.apache.log4j.FileAppender
log4j.appender.FILE.File=C:/log4j/file.log
log4j.appender.FILE.Append=false
log4j.appender.FILE.Encoding=GBK
log4j.appender.FILE.layout=org.apache.log4j.PatternLayout
log4j.appender.FILE.layout.ConversionPattern=[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n

# 应用于文件回滚
log4j.appender.ROLLING_FILE=org.apache.log4j.RollingFileAppender
log4j.appender.ROLLING_FILE.Threshold=ERROR
log4j.appender.ROLLING_FILE.File=rolling.log
log4j.appender.ROLLING_FILE.Append=true
log4j.appender.CONSOLE_FILE.Encoding=GBK
log4j.appender.ROLLING_FILE.MaxFileSize=10KB
log4j.appender.ROLLING_FILE.MaxBackupIndex=1
log4j.appender.ROLLING_FILE.layout=org.apache.log4j.PatternLayout
log4j.appender.ROLLING_FILE.layout.ConversionPattern=[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n

#自定义Appender
log4j.appender.im = net.cybercorlin.util.logger.appender.IMAppender
log4j.appender.im.host = mail.cybercorlin.net
log4j.appender.im.username = username
log4j.appender.im.password = password
log4j.appender.im.recipient = yyflyons@163.com
log4j.appender.im.layout=org.apache.log4j.PatternLayout
log4j.appender.im.layout.ConversionPattern =[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n

#应用于socket
log4j.appender.SOCKET=org.apache.log4j.RollingFileAppender
log4j.appender.SOCKET.RemoteHost=localhost
log4j.appender.SOCKET.Port=5001
log4j.appender.SOCKET.LocationInfo=true
# Set up for Log Facter 5
log4j.appender.SOCKET.layout=org.apache.log4j.PatternLayout
log4j.appender.SOCET.layout.ConversionPattern=[start]%d{DATE}[DATE]%n%p[PRIORITY]%n%x[NDC]%n%t[THREAD]%n%c[CATEGORY]%n%m[MESSAGE]%n%n
# Log Factor 5 Appender
log4j.appender.LF5_APPENDER=org.apache.log4j.lf5.LF5Appender
log4j.appender.LF5_APPENDER.MaxNumberOfRecords=2000

# 发送日志给邮件
log4j.appender.MAIL=org.apache.log4j.net.SMTPAppender
log4j.appender.MAIL.Threshold=FATAL
log4j.appender.MAIL.BufferSize=10
log4j.appender.MAIL.From=yyflyons@163.com
log4j.appender.MAIL.SMTPHost=www.wusetu.com
log4j.appender.MAIL.Subject=Log4J Message
log4j.appender.MAIL.To=yyflyons@126.com
log4j.appender.MAIL.layout=org.apache.log4j.PatternLayout
log4j.appender.MAIL.layout.ConversionPattern=[framework] %d - %c -%-4r [%t] %-5p %c %x - %m%n
```

## [Spring MVC + Log4j example](https://www.mkyong.com/spring-mvc/spring-mvc-log4j-integration-example/)

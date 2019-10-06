---
title: gradle
date: 2018-07-10 19:16:17
toc: true
tags:
  - android
---

- [[Tips] Auto-increment versionCode using Gradle – Supitsara Prathan – Medium](https://medium.com/@prathanbomb/tips-auto-increment-versioncode-of-android-using-gradle-dba0425af97c)
- [深入理解 Android（一）：Gradle 详解](http://www.infoq.com/cn/articles/android-in-depth-gradle)
- [【Android】使用 Gradle 进行配置 · 诸隆隆](https://zllbird.github.io/2016/01/14/android%E4%BD%BF%E7%94%A8gradle%E8%BF%9B%E8%A1%8C%E9%85%8D%E7%BD%AE/)

- [The Apache Groovy programming language - Groovy Development Kit](http://www.groovy-lang.org/api.html)
- [Gradle DSL Version 4.8](https://docs.gradle.org/current/dsl/)
- [配置构建  |  Android Developers](https://developer.android.com/studio/build/)
- [从命令行构建您的应用  |  Android Developers](https://developer.android.com/studio/build/building-cmdline)

## (Plugin version) VS (Required Gradle version)

[Android Gradle plugin release notes | Android Developers](https://developer.android.com/studio/releases/gradle-plugin)

## 了解在构建生命周期的各个阶段所花费的时间

通过 `--profile` 来生成报告

```sh
./gradlew assembleDebug --profile
```

## [android studio error- mixing versions can lead to run-time crashes](https://stackoverflow.com/questions/42960731/android-studio-error-mixing-versions-can-lead-to-run-time-crashes)

```groovy
// Add these lines of code in your build.gradle (Module:app) file at end:
configurations.all {
    resolutionStrategy.eachDependency { DependencyResolveDetails details ->
        def requested = details.requested
        if (requested.group == 'com.android.support') {
            if (!requested.name.startsWith("multidex")) {
                details.useVersion '27.1.1'
            }
        }
    }
}
```

## proxy

java -DsocksProxyHost=10.1.1.2 -DsocksProxyPort=8877 -Djava.net.socks.username=alibaba -Djava.net.socks.password=secret

[AndroidStudio 彻底关闭 http 网络代理方法 - Mr.Liu - CSDN 博客](https://blog.csdn.net/qq_29033193/article/details/84985536)

[AndroidStudio 中 Gradle 的 Socks 代理设置 - WittyCollegeStudent 的博客 - CSDN 博客](https://blog.csdn.net/WittyCollegeStudent/article/details/78954200)

[Android Studio 代理配置指南 · 奔跑的锅炉](https://blog.boileryao.com/2019/01/config-android-studio-proxy/)

## Android Gradle 下载的依赖包位置

[Android Gradle 下载的依赖包位置 - 简书](https://www.jianshu.com/p/e8db626d768f)

Mac 系统默认下载到：/Users/(用户名)/.gradle/caches/modules-2/files-2.1

Windows 系统默认下载到：C:\Users\(用户名)\.gradle\caches\modules-2\files-2.1

举个例子：
错误如下： Download Failed ：https://jcenter.bintray.com/org/jetbrains/kotlin/kotlin-compiler-embeddable/1.2.31/kotlin-compiler-embeddable-1.2.31.jar
文件夹生成的规律是根据依赖中的组织名称，classpath"org.jetbrains.kotlin:kotlin-gradle-plugin
地址路径则查找位置是：
C:\Users\Administrator\.gradle\caches\modules-2\files-2.1\org.jetbrains.kotlin\kotlin-compiler-embeddable\1.2.71\b394ac31590bff78aea6619b8dc0e2c0958aa599

还有一种方式：使用 `everything` 软件来搜索关键字，找到对应目录；

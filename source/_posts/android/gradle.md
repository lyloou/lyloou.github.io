---
title: gradle
date: 2018-07-10 19:16:17
toc: true
tags:
- android
---

- [[Tips] Auto-increment versionCode using Gradle – Supitsara Prathan – Medium](https://medium.com/@prathanbomb/tips-auto-increment-versioncode-of-android-using-gradle-dba0425af97c)
- [深入理解Android（一）：Gradle详解](http://www.infoq.com/cn/articles/android-in-depth-gradle)
- [【Android】使用Gradle进行配置 · 诸隆隆](https://zllbird.github.io/2016/01/14/android%E4%BD%BF%E7%94%A8gradle%E8%BF%9B%E8%A1%8C%E9%85%8D%E7%BD%AE/)

- [The Apache Groovy programming language - Groovy Development Kit](http://www.groovy-lang.org/api.html)
- [Gradle DSL Version 4.8](https://docs.gradle.org/current/dsl/)
- [配置构建  |  Android Developers](https://developer.android.com/studio/build/)
- [从命令行构建您的应用  |  Android Developers](https://developer.android.com/studio/build/building-cmdline)

## (Plugin version) VS (Required Gradle version)
[Android Gradle plugin release notes  |  Android Developers](https://developer.android.com/studio/releases/gradle-plugin)


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
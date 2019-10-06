---
title: Gradle学习
date: 2016-11-11 11:43:52
comments: true
toc: true
tags:
  - android
  - gradle
---

# 简介

Gradle 是以 Groovy 语言为基础，面向 Java 应用为主，基于 DSL 语法的自动化构建工具。

# 如何自动化打包（含签名的）

## 步骤

1、将准备好的`keystore`签名文件放在根目录下；（目的是待会儿配置 build.gradle 文件时，可以直接通过指定路径引用）
2、在 module 级别的 build.gradle 中添加如下配置代码：

```js
android {
    // ...
    signingConfigs {
        myConfig {
            storeFile file("lyloou.keystore")
            storePassword "lyloou"
            keyAlias "lyloou"
            keyPassword "lyloou"
        }
    }

    buildTypes {
        release {
            signingConfig signingConfigs.myConfig
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}
```

3、执行`gradle clean`清理之前的自动生成文件；
4、执行`gradle build`开始生成文件；
5、在`build/outputs/apk/`文件夹中可以看到生成成功的 apk 文件；

## 注意事项

通过执行`gradle build`自动生成的文件包含：

- [项目名]-debug-unaligned.apk：指的是调试模式，没有优化的 apk（可直接安装）
- [项目名]-release-unsigned.apk：指的是没有签名的 apk（不可直接安装）
- [项目名]-debug.apk：指的是已经签名过的调试版 apk；
- [项目名]-release.apk：指的是已经签名过的发布版 apk；

## 扩展技巧

- 敏感信息保存到`gradle.properties`文件中，具体参考 [Gradle 配置](https://www.kancloud.cn/thinkphp/android-best-practices/42169)
- 自动化命名并输出 apk，具体参考[build.gradle 配置](https://github.com/lyloou/hexo/blob/master/source/_posts/tech/build.gradle%E9%85%8D%E7%BD%AE.md)

## 参考资料

- [ANDROID GRADLE](http://stormzhang.com/android/2014/02/28/android-gradle/)

# 如何根据环境自动选择 key 或其他配置信息

## 动态替换`AndroidManifest.xml`中的 key 信息

1. 在`AndroidManifest`中添加占位符

```xml
<data android:scheme="${WECHATAPPID}" />
```

2. 在`build.gradle`中的`defaultConfig`标签或者`buildTypes`的 debug 和 release 标签下定义具体 value

```js
defaultConfig {
    manifestPlaceholders = [WECHATAPPID: "wxea2xxxxxxxxxxxxxxx"]
}
```

或者

```js
debug {
    manifestPlaceholders = [WECHATAPPID: "wxea2xxxxxxxxxxxxxxx1"]
}

release {
    manifestPlaceholders = [WECHATAPPID: "wxea2xxxxxxxxxxxxxxx2"]
}
```

## 通过`BuildConfig`定义值

在不同的环境中设置不同的值，这样在打包（测试环境或正式环境）的时候就会有不同的值。注意定义完成后，要重新编译下环境，这样才能在 BuildConfig.java 中生效；

```js
debug {
    buildConfigField "boolean", "TEST_ENV", "true"
}

release {
    buildConfigField "boolean", "TEST_ENV", "false"
}
```

在代码中引用

```java
public static final boolean TEST_ENV = BuildConfig.TEST_ENV;
```

## 在编译之前执行脚本


```groovy
// 在 settings.gradle 最上方添加
def updateDependencies(){
    def command = "sh install.sh"
    exec {
        executable "bash"
        args "-c", command
    }
}

updateDependencies()
```

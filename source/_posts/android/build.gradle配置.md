---
title: build.gradle配置
date: 2016-11-16 15:24:55
comments: true
toc: true
tags:
- android
- gradle
---

bulid.gradle文件
===============
``` groov
android {
  signingConfigs {
    renrenDebug {
        keyAlias 'test'
        keyPassword 'test'
        storeFile file('tool/test.key')
        storePassword 'test'
    }
  }
  sourceSets {
      main {
          manifest.srcFile 'AndroidManifest.xml'
          java.srcDirs = ['src']
          resources.srcDirs = ['src']
          aidl.srcDirs = ['src']
          renderscript.srcDirs = ['src']
          res.srcDirs = ['res']
          assets.srcDirs = ['assets']
          jniLibs.srcDirs = ['libs']
      }
  }

  lintOptions {
      abortOnError false;
  }
  buildTypes {
    debug {
        signingConfig signingConfigs.debug
        shrinkResources false
        zipAlignEnabled false
        minifyEnabled false

        // 测试
        buildConfigField "boolean", "TEST_ENV", "true"
        manifestPlaceholders = [WECHATAPPID: "wxea2b67dxxxxxx"]
    }

    release {
        signingConfig signingConfigs.release // 密钥配置
        shrinkResources true // 删除不必要的源文件
        zipAlignEnabled true // 压缩对齐
        minifyEnabled true
        proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'

        // 正式
        buildConfigField "boolean", "TEST_ENV", "false"
        manifestPlaceholders = [WECHATAPPID: "wxb093774eaxxxxxx"]

        applicationVariants.all { variant ->
            variant.outputs.each { output ->
                def outputFile = output.outputFile
                if (outputFile != null && outputFile.name.endsWith('.apk')) {
                    def fileName =
                            // 输出apk名称为 LOU_20161101_V0.2.0.apk
                            "LOU_${releaseTime()}_V${defaultConfig.versionName}.apk"

                            // 输出apk名称为 LOU_20161101_V0.2.0_wandoujia.apk
                            // "LOU_${releaseTime()}_V${defaultConfig.versionName}_${variant.productFlavors[0].name}.apk"

                    output.outputFile = new File(outputFile.parent, fileName)
                }

            }

        }
    }
  }

//    AndroidManifest的application标签下添加： <meta-data android:name="UMENG_CHANNEL" android:value="${UMENG_CHANNEL_VALUE}" />

//    productFlavors {
//        yingyongbao {}
//        wandoujia {}
//        xiaomi {}
//        qihu360 {}
//        baidu {}
//        meizu {}
//    }
//
//    productFlavors.all {
//        flavor -> flavor.manifestPlaceholders = [UMENG_CHANNEL_VALUE: name]
//    }
}

def releaseTime() {
    return new Date().format("yyyMMdd", TimeZone.getTimeZone("UTC"))
}
```


proguard混淆配置
===========================

为什么要过滤混淆
--------------
> （http://blog.csdn.net/fengyuzhengfan/article/details/43876197）
ProGuard默认会对第三方库也进行混淆的，而第三方库有的已经混淆过了，有的使用了Java反射技术，所以我们在进行代码混淆的时候要排除这些第三方库。排除对第三方库的混淆需要在混淆规则文件（通常是：proguard-project.txt或proguard.cfg或proguard-rules.pro或proguard-rules.txt也可以是其它的文件名只要在配置文件中将含有混淆规则的文件名配置进去就行了）中添加如下规则：
1.如果使用了Gson之类的工具要使JavaBean类即实体类不被混淆。
2.如果使用了自定义控件那么要保证它们不参与混淆。
3.如果使用了枚举要保证枚举不被混淆。
4.对第三方库中的类不进行混淆


proguard-rules.pro文件
----------------------
``` pro
# If your project uses WebView with JS, uncomment the following
# and specify the fully qualified class name to the JavaScript interface
# class:
-keepclassmembers class fqcn.of.javascript.interface.for.webview {
  public *;
}

# 忽略警告
-ignorewarning

# 移除日志
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** i(...);
    public static *** w(...);
}


```

参考资料
----------
- [代码混淆规则配置文件:proguard-rules.pro](https://as.quanke.name/代码混淆规则配置文件proguard-rulespro.html)


Avoid Maven dynamic dependency resolution. (such as `2.1.+`)
======================================
  this result in different and unstable builds or subtle, untracked difference
  in behavior between builds.

在配置 `build.gradle` 的时候，避免直接写入敏感信息（例如：密码），而是写入到版本控制工具
======================================
忽略的文件`gradle.properties`中。
> https://github.com/futurice/android-best-practices#gradle-configuration

针对测试版本和发布版本使用不同的 appId, 这样两个版本就可以同时存在在一个设备上了。
======================================
可以通过前缀或后缀的方式来区分。
> https://github.com/futurice/android-best-practices#gradle-configuration

使用 Maven 依赖方案代替使用导入jar包方案
======================================
如果在你的项目中你明确使用率 jar文件，那么它们可能成为永久的版本，如2.1.1.下载jar包更新他们是很繁琐的， 这个问题Maven很好的解决了，这在Android Gradle构建中也是推荐的方法。你可以指定版本的一个范围，如2.1.+,然后Maven会自动升级到制定的最新版本，例如：
``` js
dependencies {
    compile 'com.netflix.rxjava:rxjava-core:0.19.+'
    compile 'com.netflix.rxjava:rxjava-android:0.19.+'
    compile 'com.fasterxml.jackson.core:jackson-databind:2.4.+'
    compile 'com.fasterxml.jackson.core:jackson-core:2.4.+'
    compile 'com.fasterxml.jackson.core:jackson-annotations:2.4.+'
    compile 'com.squareup.okhttp:okhttp:2.0.+'
    compile 'com.squareup.okhttp:okhttp-urlconnection:2.0.+'
}
```

  
参考资料
-------
- [Gradle 配置](https://www.kancloud.cn/thinkphp/android-best-practices/42169)

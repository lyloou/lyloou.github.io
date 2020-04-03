---
title: 解决gradle编译时的版本冲突
date: 2020-03-31 10:29:43
toc: true
comments: true
tags:
  - android
---

## 方法 1：排除冲突的依赖

```sh
# 查看 app 模块所依赖的项目（通过 grep 来过滤冲突的模块名称）
./gradlew -q app:dependencies | grep commons-codec
```

```kotlin
// 针对某个冲突模块排除
api("com.afollestad.material-dialogs:core:0.9.5.0") {
    exclude group: 'com.android.support', module: 'support-v13'
    exclude group: 'com.android.support', module: 'support-vector-drawable'
}
```

```kotlin
// 重置所有相同模块的版本号
configurations.all {
    resolutionStrategy.eachDependency { DependencyResolveDetails details ->
        def requested = details.requested
        if (requested.group == 'com.android.support') {
            if (!requested.name.startsWith("multidex")) {
                details.useVersion '28.0.0'
            }
        }
    }
}

```

## 方法 2：使用 androidx

如果是 `com.android.support` 库冲突可以使用 androidx 来解决。

具体查看 [迁移到 AndroidX  |  Android 开发者  |  Android Developers](https://developer.android.google.cn/jetpack/androidx/migrate)

## 参考资料

- [com.android.support 版本冲突的解决办法*移动开发*喻志强的博客-CSDN 博客](https://blog.csdn.net/yuzhiqiang_1993/article/details/78214812)
- [implementation、api、compileOnly 区别详解*移动开发*喻志强的博客-CSDN 博客](https://blog.csdn.net/yuzhiqiang_1993/article/details/78366985)

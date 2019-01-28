---
title: jni实现步骤
date: 2017-08-27 17:16:15
toc: true
comments: true
tags:
- android
---

## 步骤

1. 配置ndk路径
`ctrl+shift+alt+s`,ndk location

2. 配置app下 build.gradle  
```java
// 指定生成lib so文件的名称
defaultConfig{
    ndk{
        moduleName "MyJniLib"
    }
}
// 指定jni路径
sourceSets{
    main{
        jni.srcDirs = ['src/main/jni','src/main/jni/']
    }
}
```

3. 修改gradle.properties文件
```java
android.userDeprecatedNdk=true
```

4. 设置native接口
```java
package com.lyloou.secretjni;
public class Ujni {
    static {
        System.loadLibrary("MyJniLib");//之前在build.gradle里面设置的so名字，必须一致
    }

    public static native String getSec(int type, int hashcode);
}
```

5. build项目，生成Ujni.class文件

6. 通过Ujni.class文件生成头文件
```java
javah -d jni -classpath MyProject/app/build/intermediates/classes/debug/com.lyloou.secretjni.Ujni
```

7. 编写c文件
将上一步骤生成的头文件，放在main/jni文件夹下
另外新建一个cpp文件实现业务逻辑。

8. 获取so文件
编译运行后，在build/intermediates/ndk/debug/lib文件夹下得到一系列包含so文件的文件夹。

9. 只需要保留so文件即可运行项目，jni文件备份起来吧。


## 参考资料
- [Android Studio jni开发之经典入门demo - FeiPeng_的博客 - CSDN博客](http://blog.csdn.net/feipeng_/article/details/73554777)
- [Android通过JNI加密，并实现APP签名验证 | wxmylife](http://wxmylife.com/2017/03/22/Android%E9%80%9A%E8%BF%87JNI%E5%8A%A0%E5%AF%86%EF%BC%8C%E5%B9%B6%E5%AE%9E%E7%8E%B0APP%E7%AD%BE%E5%90%8D%E9%AA%8C%E8%AF%81/)
- [Android 密钥保护 - 简书](http://www.jianshu.com/p/2a27ad45e023)
- [android开发如何保障本地加密密钥的安全？ - 知乎](https://www.zhihu.com/question/35136485)

- [Android NDK 运行错误：java.lang.UnsatisfiedLinkError: Couldn't load XXX indLibrary returned null](https://blog.csdn.net/yy1300326388/article/details/46291417)
  ### 方法1
  ```java
  //目录结构一定要改成这个样子
|---src
     |---main
           |---jniLibs
                  |---arm64-v8a
                         |---libhello-jni.so
                  |---armeabi
                         |---libhello-jni.so
                  |---armeabi-v7a
                         |---libhello-jni.so
                  |---x86
                         |---libhello-jni.so
                  |---x86_64
                         |---libhello-jni.so
                  |---mips
                         |---libhello-jni.so
                  |---mips64
                         |---libhello-jni.so
  ```
  ### 方法2［推荐］
  ```java
  android {
    sourceSets {
        main {
            jniLibs.srcDirs = ['libs']
        }
}
  ```
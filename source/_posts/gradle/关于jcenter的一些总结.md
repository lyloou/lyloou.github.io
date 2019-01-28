---
title: 关于jcenter的一些总结
date: 2016-07-06 16:18:12
toc: true
tags:
- android
---

## 摘要：
本文介绍了将自己的库发布到jcenter相关的一些总结。

之所以有这篇文章，起源于这样一种原因：
> 在AS中使用开源库很简单，只需要在`build.gradle`文件中添加一句命令即可。
如果我想要把自己积累的常用代码库也通过这种方式，那么我就可以在多个项目中使用，也可以开源给其他程序员使用。



## 初次配置（具体参考外部链接）
- 配置project的build.gradle文件；
- 配置lib的build.gradle文件；
- 在终端执行gradlew相关命令上传到jcenter；



## 更新版本库
- 修改版本号；
- 完成清单`tool/Checklist.md`；
- 在命令行窗口执行下面命令（当发生错误时，参照错误提示进行修改）
``` java
gradlew clean build bintrayUpload
  -PbintrayUser=「Your Name」
  -PbintrayKey=「API KEY」
  -PdryRun=false
```

 ### 外部链接
 - [如何使用Android Studio把自己的Android library分发到jCenter和Maven Central](https://github.com/hehonghui/android-tech-frontier/blob/master/issue-17/%E5%A6%82%E4%BD%95%E4%BD%BF%E7%94%A8Android-Studio%E6%8A%8A%E8%87%AA%E5%B7%B1%E7%9A%84Android-library%E5%88%86%E5%8F%91%E5%88%B0jCenter%E5%92%8CMaven-Central.md)
 - [Android library分享到jcenter](http://wuxiaolong.me/2016/05/06/jcenter2/)

---
title: cordova相关
date: 2016.12.29 16:40
toc: true
comments: true
tags:
- cordova
---

## 一个坑

运行环境

```
java: jdk1.8
cordova: 6.4.0
```

通过`cordova build android`的方式自动编译打包程序时，
Manifest文件会被重新生成。

我给第一个Activity设置了屏幕不反旋转的属性`android:screenOrientation="portrait"`，但是自动生成的过程中，总会将这行代码自动删除了。

解决办法是：找一个不含该属性的Activity放在第一个位置。

## 覆盖安装APP，assets文件不更新问题

### 症状

用cordova生成的app，其中的assets文件夹中保存的是前端文件`www`。如果修改前端代码，  
覆盖安装app后，其前端代码未生效（原生代码是生效了的）。

### 解决办法

1. 在activity中调用 `getAssets()`方法；
2. 更新版本号；（对于有些机型来说，相同version的app不会更新assets文件，也不可降级覆盖安装。）

相信通过上面两个步骤可以解决掉大部分机型的覆盖安装问题；

> open file with `context.getAssets()` on each startup of the app, when upgrade the app,  
> first launch it and after that check if file has change.
> Its seems that until you access the file, it is not extracted from the apk to  
> `/data/data/<your-package>/`

- [Android Asset file not upgraded on app upgrade](https://stackoverflow.com/questions/30651788/android-asset-file-not-upgraded-on-app-upgrade)
- [Assets not replaced by version upgrade?](https://stackoverflow.com/questions/33469330/assets-not-replaced-by-version-upgrade)
- [android开发，assets下面的资源文件不会变化/改动](http://www.cnblogs.com/feijian/p/4424923.html)

## cordova 后台切换到前台触发back返回按键

问题描述：  
现在app处在前台，这时候来了一个qq消息或者微信消息，点击通知后再次回来app的时候，会触发返回按键
这样就有可能会莫名其妙地将之前的编辑操作给毁掉了。

解决办法：  
思路是这样的，当离开app的时候，设置一个标志表示现在处于后台了，
当再次返回来的时候，先检测之前的标志是否在后台，如果是，则不处理返回按键的逻辑；
如果不是，则正常执行返回按键的逻辑。

```js
var isAppInFront = true;

document.addEventListener('pause', function(){
    isAppInFront = false;
}, false);

document.addEventListener('resume', function(){
    setTimeout(function(){
        isAppInFront = true;
    }, 200) // 注意需要延时，否则拿到的标志一直是true
}, false);

document.addEventListener('backbutton', function(){
    // 程序不在前台运行，不响应
    if(!isAppInFront) return;

    // 其他点按返回按键的逻辑
}
```

参考资料：  

- [javascript - how to check app running in foreground or background in ionic/cordova/phonegap - Stack Overflow](https://stackoverflow.com/questions/29606012/how-to-check-app-running-in-foreground-or-background-in-ionic-cordova-phonegap)

## cordova插件

社交类：
QQ：https://github.com/iVanPan/Cordova_QQ
微信：https://github.com/xu-li/cordova-plugin-wechat
微博：https://github.com/iVanPan/cordova_weibo
参考网址：http://blog.csdn.net/jcy472578/article/details/50718951

二维码扫描：https://github.com/phonegap/phonegap-plugin-barcodescanner
热更新插件：https://github.com/nordnet/cordova-hot-code-push/

Cordova - 从相册中选择照片并上传，以及拍照上传:
http://www.hangge.com/blog/cache/detail_1181.html

```bash
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-file
cordova plugin add cordova-plugin-file-transfer
```

## 常用命令

卸载 cordova: `npm uninstall -g cordova`
安装 cordova: `npm install -g cordova`
安装指定版本 cordova: `npm install -g cordova@6.4.0`

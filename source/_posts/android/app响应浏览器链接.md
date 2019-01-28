---
title: Android中app响应浏览器链接
date: 2016-07-19 09:23:17
toc: true
tags:
- android
---

## App响应外部链接（类似：http, https, tel, mailto）
主要步骤是，配置、使用、获取数据；
## 配置  
```html
在自定义的 webview中点击<a href="lyloou://...">链接，可以跳转到app。
在系统浏览器中（魅族）打开一个页面，页面中包含<a href="lyloou://...">链接，可以跳转
在chrome浏览器中打开一个页面，页面中包含<a href="lyloou://...">链接，可以跳转
在qq浏览器中打开一个页面，页面中包含<a href="lyloou://...">链接，可以跳转

直接通过浏览器的地址栏输入，不可以跳转到app。
微信对话中点击，不可以跳转app。
qq对话中点击，不可以跳转app。

app没有安装的时候，点击链接都没有任何反应。
```

```xml
<activity android:name=".MainActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>
        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>

    <!-- 必要的 -->
    <intent-filter>
        <action android:name="android.intent.action.VIEW"/>
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="android.intent.category.BROWSABLE"/>
        <data
            android:host="lou.app"
            android:pathPrefix="/openwith"
            android:scheme="lyloou"/>
    </intent-filter>
</activity>
```

## 在html中使用
``` html
<!-- 
    如果把html代码放在了 WebView中，如果设置了setWebViewClient()，
    其中重写的方法不要拦截，否则app无法响应； （即，重写shouldOverrideUrlLoading方法时需要小心，不设置webviewClient为妙）
-->
<a href="lyloou://lou.app/openwith?name=zhangsan&age=26">启动应用程序</a>
```

## 获取数据
```java
private void getData() {
    Intent i_getvalue = getIntent();
    String action = i_getvalue.getAction();

    if (Intent.ACTION_VIEW.equals(action)) {
        Uri uri = i_getvalue.getData();
        if (uri != null) {
            String name = uri.getQueryParameter("name");
            String age = uri.getQueryParameter("age");
            Log.i(TAG, "getData: name=" + name);
            Log.i(TAG, "getData: age=" + age);
        }
    }
}
```

## 参考资料：  
- [android实现通过浏览器点击链接打开本地应用（APP）并拿到浏览器传递的数据 - 极客公园 - CSDN博客](http://blog.csdn.net/geekpark/article/details/16118457)

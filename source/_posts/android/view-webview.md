---
title: webview相关
date: 2016.08.04 08:42:57
toc: true
tags:
  - android
---

# Android 7.0 webview 不自动刷新

当 webview 所在的 activity 采用了以下主题时，Android7.0 设备将无法正常运行：

```xml
    <style name="WelcomeBg" parent="@android:style/Theme.DeviceDefault.NoActionBar">
        <item name="android:windowIsTranslucent">false</item>
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowActionBar">false</item>
        <item name="android:windowBackground">@null</item>
    </style>
```

之所以有这样的改变，目的是想要提升启动 Activity 的性能，哪里知道 7.0 之后会遇到无法正常渲染 WebView 的问题。

解决办法是：
直接使用默认主题，而不再对其包装：

```xml
@android:style/Theme.DeviceDefault.NoActionBar
```

# 获取 WebView 的点击元素

可以通过搜索关键字：`HitTestResult getHitTestResult`来知道更多内容；

注意：X5WebView，来源于腾讯 TBS 系统，是另外一个继承体系（可以通过打印`view.getClass()`的方式查看其继承体系）

```java
private void setLongClick(final View view) {
    //长按点击事件
    view.setOnLongClickListener(new View.OnLongClickListener() {
        @Override
        public boolean onLongClick(View v) {
            //响应长按事件（如果webview继承自安卓原生系统）
            if (view instanceof WebView) {
                WebView.HitTestResult result = ((WebView) view).getHitTestResult();
                if (result != null) {
                    int type = result.getType();
                    //判断点击类型如果是图片
                    if (type == WebView.HitTestResult.IMAGE_TYPE || type == WebView.HitTestResult.SRC_IMAGE_ANCHOR_TYPE) {
                        //弹出对话框
                        showDialog(result.getExtra());
                    }
                }
            } else if (view instanceof X5WebView) {
                //响应长按事件（如果webview继承自腾讯的TBS系统）
                Log.i(TAG, "onLongClick: x5");
                com.tencent.smtt.sdk.WebView.HitTestResult hitTestResult = ((X5WebView) view).getHitTestResult();
                if (hitTestResult != null) {
                    int type = hitTestResult.getType();
                    if (type == X5WebView.HitTestResult.IMAGE_TYPE || type == X5WebView.HitTestResult.SRC_IMAGE_ANCHOR_TYPE) {
                        showDialog(hitTestResult.getExtra());
                    }
                }
            }
            return false;
        }
    });
}
```

**参考资料**

- [获取 Android webview 的点击元素](http://www.cnblogs.com/classloader/p/5302784.html)
- [HitTestResult](https://developer.android.com/reference/android/webkit/WebView.HitTestResult.html)

# 需要登录网页授权的页面处理

```java
webSettings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NARROW_COLUMNS);
webSettings.setUseWideViewPort(true);
webSettings.setJavaScriptEnabled(true);
webSettings.setDomStorageEnabled(true);
webSettings.setLoadWithOverviewMode(true);
webview.setWebViewClient(getWebViewClient());

private WebViewClient getWebViewClient() {
    return new WebViewClient() {
        @Override
        public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm) {
            // [Android-WebView's onReceivedHttpAuthRequest() not called again - Stack Overflow](https://stackoverflow.com/questions/20399339/android-webviews-onreceivedhttpauthrequest-not-called-again)
            final EditText usernameInput = new EditText(mContext);
            usernameInput.setHint("Username");

            final EditText passwordInput = new EditText(mContext);
            passwordInput.setHint("Password");
            passwordInput.setInputType(InputType.TYPE_CLASS_TEXT | InputType.TYPE_TEXT_VARIATION_PASSWORD);

            LinearLayout ll = new LinearLayout(mContext);
            ll.setOrientation(LinearLayout.VERTICAL);
            ll.addView(usernameInput);
            ll.addView(passwordInput);

            AlertDialog.Builder authDialog = new AlertDialog
                    .Builder(mContext)
                    .setTitle("Authentication")
                    .setView(ll)
                    .setCancelable(false)
                    .setPositiveButton("OK", (dialog, whichButton) -> {
                        String username = usernameInput.getText().toString();
                        String password = passwordInput.getText().toString();
                        handler.proceed(username, password);
                        Toast.makeText(mContext, username + ":" + password, Toast.LENGTH_LONG).show();
                        dialog.dismiss();
                    })
                    .setNegativeButton("Cancel", (dialog, whichButton) -> {
                        dialog.dismiss();
                        view.stopLoading();
                    });

            authDialog.show();
        }
    };
}
```

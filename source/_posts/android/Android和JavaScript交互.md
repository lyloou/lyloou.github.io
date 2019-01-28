---
title: Android和JavaScript交互
date: 2018-07-10 19:16:17
toc: true
tags:
- android
---

- [Android：这是一份全面 & 详细的Webview使用攻略 - 简书](https://www.jianshu.com/p/3c94ae673e2a)
- [最全面总结 Android WebView与 JS 的交互方式 - 简书](https://www.jianshu.com/p/345f4d8a5cfa)
- [WebViewJavascriptBridge](https://github.com/marcuswestin/WebViewJavascriptBridge)
- [wendux/WebViewJavascriptBridge](https://github.com/wendux/WebViewJavascriptBridge)

```java
//: MainActivity.java
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
    WebView.setWebContentsDebuggingEnabled(BuildConfig.TEST_ENV);
}
mWvContent = (WebView) findViewById(R.id.wv_content);
mWvContent.setScrollbarFadingEnabled(true);
mWvContent.addJavascriptInterface(new JavaScriptInterface(mWvContent), "android");
WebSettings settings = mWvContent.getSettings();
settings.setJavaScriptEnabled(true);
settings.setBuiltInZoomControls(true);
settings.setDisplayZoomControls(false);
settings.setDatabaseEnabled(true);
settings.setCacheMode(WebSettings.LOAD_NO_CACHE);
settings.setDomStorageEnabled(true);
settings.setAllowFileAccess(true);
settings.setAppCacheEnabled(true);
settings.setAppCachePath(mWvContent.getContext().getCacheDir().getAbsolutePath());
settings.setJavaScriptCanOpenWindowsAutomatically(true);
settings.setBlockNetworkImage(false);

mWvContent.setWebViewClient(new WebViewClient() {
    @Override
    public boolean shouldOverrideUrlLoading(WebView view, String url) {
        view.loadUrl(url);
        return true;
    }
    @Override
    public void onPageFinished(WebView view, String url) {
        super.onPageFinished(view, url);
    }
});
mWvContent.setWebChromeClient(new WebChromeClient() {

    @Override
    public void onReceivedTitle(WebView view, String title) {
        super.onReceivedTitle(view, title);
        TextView tvTitle = toolbar.findViewById(R.id.tv_top_title);
        tvTitle.setTextColor(Color.WHITE);
        tvTitle.setText(title);
    }

    @Override
    public void onProgressChanged(WebView view, int newProgress) {
        super.onProgressChanged(view, newProgress);
        if (!isScrolled && newProgress > 50) {
            int lastPosition = Usp.getInstance().getInt(sKey + "position", 0);
            view.scrollTo(0, lastPosition);
            isScrolled = true;
        }
    }

    @Override
    public boolean onConsoleMessage(ConsoleMessage consoleMessage) {
        boolean b = super.onConsoleMessage(consoleMessage);
        System.out.println("|");
        System.out.println("============console==========");
        System.out.println(consoleMessage.message());
        System.out.println("===========console===========");
        return b;

    }
});

mWvContent.loadUrl(mUrl);
```

```java
//: JavaScriptInterface.java
// https://blog.csdn.net/FDoubleman/article/details/78189332
public class JavaScriptInterface {
    private Context mContext;
    private WebView mWebView;

    JavaScriptInterface(WebView webView) {
        mContext = webView.getContext();
        mWebView = webView;
    }

    @JavascriptInterface
    public String showToast(String str) {
        final IWXAPI api = WXApiModule.getInstans().getWXApi();
        Toast.makeText(mContext, str, Toast.LENGTH_LONG).show();
        //WebActivity.newInstance(mContext, "https://m3.renrenyoupin.com", "tag");
        return Uresult.newInstance().status(0).msg(String.valueOf(api.isWXAppInstalled())).toMap().toString();
    }

    @JavascriptInterface
    public void executeJs(String str) {
        mWebView.post(() -> {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                mWebView.evaluateJavascript(str, value -> {
                    System.out.println(value);
                });
            } else {
                mWebView.loadUrl(str);
            }
        });
    }
}
```
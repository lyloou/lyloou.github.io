---
title: weex
date: 2018.03.28 20:12
toc: true
comments: true
tags:
- js
---
## 学习资源
- 官网：[快速上手 | Weex](https://weex.incubator.apache.org/cn/guide/)
- 示例：[weex-vue-examples](https://hanks10100.github.io/weex-vue-examples/)
- 源码：[incubator-weex](https://github.com/apache/incubator-weex)
- [Weex Ui](https://alibaba.github.io/weex-ui/#/?id=weex-ui)


## 案例
- [weex-start-kit](https://github.com/w11p3333/weex-start-kit)
- [GSYGithubAppWeex](https://github.com/CarGuo/GSYGithubAppWeex)


## 问题

### [可能是史上最全的weex踩坑攻略](https://www.jianshu.com/p/497f1a9ff33f)

### [WEEX 使用navigator跳转Android系统出现ActivityNotFoundException报错](https://blog.csdn.net/violetjack0808/article/details/74390249)
```xml
<activity
  android:name=".WXPageActivity"
  android:label="@string/app_name"
  android:screenOrientation="portrait"
  android:theme="@style/AppTheme.NoActionBar">
    <intent-filter>
        <action android:name="com.taobao.android.intent.action.WEEX"/>
    
        <category android:name="android.intent.category.DEFAULT"/>
        <category android:name="com.taobao.android.intent.category.WEEX"/>
        <action android:name="android.intent.action.VIEW"/>
    
        <data android:scheme="http"/>
        <data android:scheme="https"/>
        <data android:scheme="file"/>
        <data android:scheme="wxpage" />
    </intent-filter>
</activity>
```
```java
 String navUrl = getIntent().getData().toString();
```

分析模板代码（如下面所示）：
我们需要一个`mContainer`来容纳已经渲染过的`wxview`

```xml
<!-- activity_wxpage.xml -->
<FrameLayout
    android:id="@+id/container"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="#ffffff">

</FrameLayout>
```

```java
// AbsWeexActivity.java
@Override
public void onViewCreated(WXSDKInstance wxsdkInstance, View view) {
    if (mContainer != null) {
        mContainer.removeAllViews();
        mContainer.addView(view); // mContainer是用来容纳wxview的viewgroup
    }
}
```
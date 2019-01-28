---
title: manifest相关
date: 2016-08-05 09:49:16
toc: true
tags:
- android
---

# Manifest中注册以内部类形式存在的Activity

## 问题
- 在《Android编程权威指南》P127中，作者建议我们坚持AUF(Always Use Fragments)原则，即“总是使用fragment”；
另外作者封装了一个很好用的`SingleFragmentActivity`类，但是这个类通常只有一句话，。
个人觉得，为每一个Activity都建立一个文件有点浪费。
可是使用Activity（四大组件之一），必须在Manifest中注册。
那么能不能将所有这类Activity放在一个类中进行管理呢？
通过搜索关键字：`android manifest innerclass` 找到了方法；

## 解答
> 1. As someone pointed out, in AndroidManifest, use the $ sign, like:
> `<activity android:name=".A$B">`
> 2. Declare class B as static:
> `public static class B`

## 例如
**【Activity管理类】**
``` java
//: .../activity/ActivityMgr.java
public class ActivityMgr {

    public static void start(Activity context, Class clazz){
        Intent intent = new Intent(context, clazz);
        context.startActivity(intent);
    }

    public static class LoginActivity extends SingleFragmentActivity {
        @Override
        public Fragment createFragment() {
            return new LoginFragment();
        }
    }


    public static class ForgetPasswordActivity extends SingleFragmentActivity {
        @Override
        public Fragment createFragment() {
            return new ForgetPasswordFragment();
        }
    }

    public static class RegisterActivity extends SingleFragmentActivity {
        @Override
        public Fragment createFragment() {
            return new RegisterFragment();
        }
    }

    public static class AddDeviceActivity extends SingleFragmentActivity {
        @Override
        public Fragment createFragment() {
            return new AddDeviceFragment();
        }
    }
}

```


**【Activity注册】**
``` xml
<activity
    android:name=".activity.ActivityMgr$LoginActivity"
    android:clearTaskOnLaunch="true"
    android:launchMode="singleTask"
    android:screenOrientation="portrait"
    android:theme="@style/AppTheme.NoActionBar">
    <intent-filter>
        <action android:name="android.intent.action.MAIN"/>

        <category android:name="android.intent.category.LAUNCHER"/>
    </intent-filter>
</activity>

<activity
    android:name=".activity.ActivityMgr$RegisterActivity"
    android:screenOrientation="portrait"
    android:theme="@style/AppTheme.NoActionBar">
</activity>
<activity
    android:name=".activity.ActivityMgr$ForgetPasswordActivity"
    android:screenOrientation="portrait"
    android:theme="@style/AppTheme.NoActionBar">
</activity>
<activity
    android:name=".activity.ActivityMgr$AddDeviceActivity"
    android:screenOrientation="portrait"
    android:theme="@style/AppTheme.NoActionBar">
</activity>
```

**【启动对应Activity】**
``` java
// 启动忘记密码Activity
ActivityMgr.start(mContext, ActivityMgr.ForgetPasswordActivity.class);

// 启动注册Activity
ActivityMgr.start(mContext, ActivityMgr.RegisterActivity.class);
```

## 扩展
- 同样的方式也可以用于Receiver的注册；

## 参考资料
- [Declare Inner Activity In The Android Manifest](http://stackoverflow.com/questions/3687661/declare-inner-activity-in-the-android-manifest)
- [Receiver as inner class in Android](http://stackoverflow.com/questions/3608955/receiver-as-inner-class-in-android)
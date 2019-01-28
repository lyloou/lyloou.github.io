---
title: Android启动模式
date: 2018-08-06 20:04:15
toc: true
comments: true
tags:
- android
---
## [Android: Understanding Activity launch mode](https://www.mobomo.com/2011/06/android-understanding-activity-launchmode/)
>
> - ‘standard’ and ‘singleTop’ can instantiate multiple activity instances and the instance will stay in the same task.
> - For ‘singleTask’ or ‘singleInstance’, the activity class uses the singleton pattern, and that instance will be the root activity of a new task. Let’s examine each value:

## the weird launch mode
```
https://stackoverflow.com/questions/9363200/android-singletask-singletop-and-home-button
The behaviour of activity back stack becomes quit weird when define main activity with singleTask at the same time:

    <activity android:name=".MainActivity"
        android:launchMode="singleTask">
        <intent-filter>
            <action android:name="android.intent.action.MAIN" />
            <category android:name="android.intent.category.LAUNCHER" />
        </intent-filter>
    </activity>
    
What even worse is there is no clear explanation in the official dev guide regarding to this special use case. Some sections related to this topic are even self-contradictory.

Try using launchMode="standard" on your MainActivity A, and launchMode="singleTask" on your Activity B, which will give the expect behaviour you described.
```

## [自学笔记：Activity的启动模式:FLAG_ACTIVITY_CLEAR_TOP和FLAG_ACTIVITY_REORDER_TO_FRONT](http://blog.51cto.com/glblong/1209829)
```java
// A, B, C 和 D ==> A, B
Intent intent = new Intent(this, B.class);
intent.setFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
startActivity(intent);

// add below code , B will be reused.
intent.addFlags(Intent.FLAG_ACTIVITY_SINGLE_TOP);
```

```java
// A，B，C和D ==> A,C,D,B，
Intent intent = new Intent(this, MainActivity.class);
intent.addFlags(Intent.FLAG_ACTIVITY_REORDER_TO_FRONT);
startActivity(intent);
```

## [深入讲解Android中Activity launchMode - 技术小黑屋](https://droidyue.com/blog/2015/08/16/dive-into-android-activity-launchmode/)

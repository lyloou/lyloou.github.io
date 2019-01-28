---
title: toolbar相关
date: 2017-08-31 17:16:15
toc: true
comments: true
tags:
- android
---

## 设置状态栏透明，并保持住 toolbar 在status之下（支持 API 19 以上）：
1. 添加到 theme： `<item name="android:windowTranslucentStatus">true</item>`
2. 使 toolbar 的 marginTop 正好等于 statusHeight：
    ```java
    public static void setToolbarMarginTop(Activity activity, Toolbar toolbar){
       ViewGroup.MarginLayoutParams params = (ViewGroup.MarginLayoutParams) toolbar.getLayoutParams();
       params.topMargin = getStatusBarHeight(activity);
    }
    
    public static int getStatusBarHeight(Activity activity){
       int resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
       int statusBarHeight = activity.getResources().getDimensionPixelSize(resourceId);
       return statusBarHeight;
    }
    ```


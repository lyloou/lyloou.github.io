---
title: IME输入法
date: 2019-03-04 19:01:24
toc: true
comments: true
tags:
  - android
---

## 输入法遮盖 EditText 问题

修复弹框不能被顶上去的问题： AndroidBug5497Workaround，
原代码在部分手机上会有底部导航栏被遮盖的问题，下面的代码可兼容华为、小米，三星等机型。

```java

import android.app.Activity;
import android.graphics.Rect;
import android.os.Build;
import android.view.View;
import android.widget.FrameLayout;

public class AndroidBug5497Workaround {
    public static void assistActivity(Activity activity) {
        new AndroidBug5497Workaround(activity);
    }

    private View mChildOfContent;
    private int usableHeightPrevious;
    private FrameLayout.LayoutParams frameLayoutParams;
    private int contentHeight;
    private boolean isfirst = true;
    private Activity activity;
    private int statusBarHeight;

    private AndroidBug5497Workaround(Activity activity) {
        //获取状态栏的高度
        int resourceId = activity.getResources().getIdentifier("status_bar_height", "dimen", "android");
        statusBarHeight = activity.getResources().getDimensionPixelSize(resourceId);
        this.activity = activity;
        FrameLayout content = (FrameLayout) activity.findViewById(android.R.id.content);
        mChildOfContent = content.getChildAt(0);

        //界面出现变动都会调用这个监听事件
        mChildOfContent.getViewTreeObserver().addOnGlobalLayoutListener(() -> {
            if (isfirst) {
                contentHeight = mChildOfContent.getHeight();//兼容华为等机型
                isfirst = false;
            }
            possiblyResizeChildOfContent();
        });

        frameLayoutParams = (FrameLayout.LayoutParams)
            mChildOfContent.getLayoutParams();
    }

    //重新调整跟布局的高度
    private void possiblyResizeChildOfContent() {

        int usableHeightNow = computeUsableHeight();

        //当前可见高度和上一次可见高度不一致 布局变动
        if (usableHeightNow != usableHeightPrevious) {
            //int usableHeightSansKeyboard2 = mChildOfContent.getHeight();//兼容华为等机型
            int usableHeightSansKeyboard = mChildOfContent.getRootView().getHeight();
            int heightDifference = usableHeightSansKeyboard - usableHeightNow;
            if (heightDifference > (usableHeightSansKeyboard / 4)) {
                // keyboard probably just became visible
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
                    //frameLayoutParams.height = usableHeightSansKeyboard - heightDifference;
                    frameLayoutParams.height = usableHeightSansKeyboard - heightDifference + statusBarHeight;
                } else {
                    frameLayoutParams.height = usableHeightSansKeyboard - heightDifference;
                }
            } else {
                frameLayoutParams.height = contentHeight;
            }

            mChildOfContent.requestLayout();
            usableHeightPrevious = usableHeightNow;
        }
    }

    /**
     * 计算mChildOfContent可见高度
     */
    private int computeUsableHeight() {
        Rect r = new Rect();
        mChildOfContent.getWindowVisibleDisplayFrame(r);
        return (r.bottom - r.top);
    }
}

```

## 使用方式

```java
// ...
setContentView(R.layout.xxx);
AndroidBug5497Workaround.assistActivity(this);
// ...
```

## 参考资料

- [android 显示内容被底部导航栏遮挡 - 菜鸟的 android 晋级之路 - CSDN 博客](https://blog.csdn.net/tyk9999tyk/article/details/78457372)
- [关于 AndroidBug5497Workaround 的兼容性问题 - 简书](https://www.jianshu.com/p/a95a1b84da11)

---
title: drawable相关
date: 2016-05-30 08:59:00
toc: true
tags:
  - android
---

## 动态修改 shape 中的颜色

```xml
<!-- drawable/opera_circle.xml -->
<?xml version="1.0" encoding="utf-8"?>
<shape xmlns:android="http://schemas.android.com/apk/res/android" android:shape="oval">
    <solid android:color="#fff002" />
    <size android:height="64dp" android:width="64dp"/>
</shape>
```

```xml
<!-- layout/ -->
<ImageView
        android:id="@+id/item_mode_list_iv_color"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:padding="28dp"
        android:src="@drawable/opera_circle"/>
```

```java
ImageView ivColor = getView(R.id.item_mode_list_iv_color);
GradientDrawable drawable = (GradientDrawable) ivColor.getDrawable();
drawable.setColor(Color.parseColor("#2b3c89"));
```

## 动态修改 Selector --> layer-list --> shape 中的颜色

```xml
<!-- drawable/selector_skin_color.xml -->
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_checked="true" >
        <layer-list >
            <item android:left="4dp" android:top="4dp" android:right="4dp" android:bottom="4dp">
                <shape android:shape="oval">
                    <solid android:color="@android:color/transparent"/>
                </shape>
            </item>
        </layer-list>
    </item>

    <item android:state_checked="false" >
        <layer-list >
            <item android:left="12dp" android:top="12dp" android:right="12dp" android:bottom="12dp">
                <shape android:shape="oval">
                    <solid android:color="@android:color/transparent"/>
                </shape>
            </item>
        </layer-list>
    </item>
</selector>
```

```java

public RadioButton getCircleRadioButton(int color) {
    Context context = getContext();
    int w = Uscreen.dp2Px(context, 48);
    RadioButton rbtn = new RadioButton(context);
    rbtn.setLayoutParams(new RadioGroup.LayoutParams(w, w));
    rbtn.setButtonDrawable(new ColorDrawable(Color.TRANSPARENT));
    rbtn.setBackgroundResource(R.drawable.selector_skin_color);

    // 动态修改颜色；
    Drawable drawable = rbtn.getBackground();
    if(drawable  instanceof StateListDrawable){
        StateListDrawable gradientDrawable = (StateListDrawable) drawable;
        ConstantState constantState = gradientDrawable.getConstantState();
        if(constantState instanceof DrawableContainerState){
            DrawableContainerState drawableContainerState = (DrawableContainerState)constantState;
            Drawable[] children = drawableContainerState.getChildren();
            for (int i = 0; i < children.length; i++) {
                if (children[i] instanceof LayerDrawable) {
                    LayerDrawable selectedItem = (LayerDrawable) children[i];
                    GradientDrawable selectedDrawable = (GradientDrawable) selectedItem.getDrawable(0);
                    selectedDrawable.mutate();
                    selectedDrawable.setColor(color);
                }
            }
        }
    }

    return rbtn;
}
```

具体应用参考：[【Android】自定义 View —— 设置中的选择皮肤项](http://blog.csdn.net/ly1414725328/article/details/51386418)

## 让 Selector 中的图片居右对齐

抛出问题：
实现如图的效果和功能，当选中时后面有一个对勾，当非选中时没有对勾，点击「发送」的时候给所有选中的 item 发送消息。
![让Selector中的图片居右对齐](https://github.com/lyloou/img/raw/develop/z/20191211143106.jpg)

复杂的做法是：
通过自定义一个实体类，每个对象都有一个名称属性和一个表示是否是选中状态属性；
给 ListView 设置 item 监听，点击 item 的时候，改变其状态然后刷新列表 ……

简单的做法：
因为这里只是为了获取到所有选中的 item，并没有其他的功能需求，我们可以充分利用 ListView 的 choice 功能，
（即通过设置 ListView 的多选模式`android:choiceMode="multipleChoice"`）；

为了使用简单的做法，我们可能会遇到这样的问题：在哪里设置选中和没选中两种状态；
解决办法就是给 item 的根布局设置 selector，根据是否处于激活状态来区分；

```xml
<!-- layout/item_lv-->
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@drawable/llyt_bg_selector"
    android:orientation="vertical"
    android:paddingBottom="8dp"
    android:paddingTop="8dp" >
    <TextView
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="浩南"/>
</LinearLayout>
```

如何让 selector 中的图片居右对齐：
简单来说，就是利用 bitmap 标签的 gravity 属性和 titleMode 属性来控制。

```xml
<!-- drawable/llyt_bg_selector.xml -->
<?xml version="1.0" encoding="utf-8"?>
<selector xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:state_activated="true">
        <bitmap android:src="@drawable/img_checked"
            android:tileMode="disabled"
            android:dither="true"
            android:antialias="true"
            android:gravity="end|center_vertical"/>
    </item>
</selector>
```

如何获取所有选中的条目：

```java
SparseBooleanArray sba = listView.getCheckedItemPositions();
ArrayList<Friend> checkedLists = new ArrayList<>();

for (int i = 0; i < friendAdapter.getCount(); i++) {
    if (sba.get(i)) {
        checkedLists.add(adapter.getItem(i));
    }
}
Log.e("Lou", "Get checked items :" + checkedLists);
```

还有一种思路：
通过「点 9」图来实现让图片居右对齐的目的；

外部链接：

- [Explanation of state_activated, state_selected, state_pressed, state_focused for ListView](http://stackoverflow.com/questions/13634259/explanation-of-state-activated-state-selected-state-pressed-state-focused-for)

## 背景图片平铺

```xml
<?xml version="1.0" encoding="utf-8"?>
<bitmap xmlns:android="http://schemas.android.com/apk/res/android"
    android:src="@drawable/stripes"
    android:tileMode="repeat" />
```

## 推荐教程

- [KStyle 是一个 Android 的样式开发的学习项目。](https://github.com/keeganlee/kstyle)

## 点 9 图-点九图

我们可以在图片的四个边框绘制一个个的小黑点，
在上边框和左边框绘制的部分就表示**当图片需要拉伸时就拉伸黑点标记的区域**，
在下边框和右边框绘制的部分则表示**内容会被放置的区域**。

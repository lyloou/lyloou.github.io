---
title: Android中巧用官方自带View
date: 2016-05-27 10:54:32
toc: true
tags:
  - android
---

## TextView

### 字符串资源里的变量替换

在 xml 中定位占位符（其中`1`表示第一个变量，多个变量递增表示）

```xml
<!-- values/strings.xml -->
<string name="replace_str">你好，%1$s：欢迎您！</string>
```

java 代码中动态指定`%1$s`处的值

```java
String str = getString(R.string.replace_str, "小明");
```

### 使用 HTML 格式化文本

```java
textView.setText(Html.fromHtml(HTML_STR));
```

### 跑马灯效果不生效

需要在代码中设置`tv.setSelected(true)`

> [TextView Marquee not working](http://stackoverflow.com/questions/3332924/textview-marquee-not-working)

### 外部链接

- [TextView 实战之你真的懂我么？](http://blog.csdn.net/sdkfjksf/article/details/51317204)

## TextView 设置空格

```
&#160;&#160;&#160;&#8201;&#160;&#160;&#8201;
```

### TextView html 渲染（注意：html 渲染的方式无法改变字体的大小，可以调整颜色、粗细、斜体等属性）

    ```java
    public static void renderWithHtml(final TextView tv, String data) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.N) {
            tv.setText(Html.fromHtml(data, Html.FROM_HTML_MODE_COMPACT));
        } else {
            tv.setText(Html.fromHtml(data));
        }
    }
    ```

## TextView 渲染字体

> [Android TextView 个别字体格式设置小结 - 简书](http://www.jianshu.com/p/2671e78089f9)

    ```java
    SpannableString msp = new SpannableString("字体测试字体大小一半两倍前景色背景色正常粗体斜体粗斜体下划线删除线x1x2电话邮件网站短信彩信地图X轴综合");

    //设置字体(default,default-bold,monospace,serif,sans-serif)
    msp.setSpan(new TypefaceSpan("monospace"), 0, 2, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
    msp.setSpan(new TypefaceSpan("serif"), 2, 4, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

    //设置字体大小（绝对值,单位：像素）
    msp.setSpan(new AbsoluteSizeSpan(20), 4, 6, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);
    msp.setSpan(new AbsoluteSizeSpan(20, true), 6, 8, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //第二个参数boolean dip，如果为true，表示前面的字体大小单位为dip，否则为像素，同上。

    //设置字体大小（相对值,单位：像素） 参数表示为默认字体大小的多少倍
    msp.setSpan(new RelativeSizeSpan(0.5f), 8, 10, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //0.5f表示默认字体大小的一半
    msp.setSpan(new RelativeSizeSpan(2.0f), 10, 12, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //2.0f表示默认字体大小的两倍

    //设置字体前景色
    msp.setSpan(new ForegroundColorSpan(Color.MAGENTA), 12, 15, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //设置前景色为洋红色

    //设置字体背景色
    msp.setSpan(new BackgroundColorSpan(Color.CYAN), 15, 18, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //设置背景色为青色

    //设置字体样式正常，粗体，斜体，粗斜体
    msp.setSpan(new StyleSpan(android.graphics.Typeface.NORMAL), 18, 20, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //正常
    msp.setSpan(new StyleSpan(android.graphics.Typeface.BOLD), 20, 22, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //粗体
    msp.setSpan(new StyleSpan(android.graphics.Typeface.ITALIC), 22, 24, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //斜体
    msp.setSpan(new StyleSpan(android.graphics.Typeface.BOLD_ITALIC), 24, 27, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);  //粗斜体

    //设置下划线
    msp.setSpan(new UnderlineSpan(), 27, 30, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

    //设置删除线
    msp.setSpan(new StrikethroughSpan(), 30, 33, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);

    //设置上下标
    msp.setSpan(new SubscriptSpan(), 34, 35, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);     //下标
    msp.setSpan(new SuperscriptSpan(), 36, 37, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);   //上标

    //超级链接（需要添加setMovementMethod方法附加响应）
    msp.setSpan(new URLSpan("tel:4155551212"), 37, 39, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);     //电话
    msp.setSpan(new URLSpan("mailto:webmaster@google.com"), 39, 41, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);     //邮件
    msp.setSpan(new URLSpan("http://www.baidu.com"), 41, 43, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);     //网络
    msp.setSpan(new URLSpan("sms:4155551212"), 43, 45, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);     //短信   使用sms:或者smsto:
    msp.setSpan(new URLSpan("mms:4155551212"), 45, 47, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);     //彩信   使用mms:或者mmsto:
    msp.setSpan(new URLSpan("geo:38.899533,-77.036476"), 47, 49, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE);     //地图

    //设置字体大小（相对值,单位：像素） 参数表示为默认字体宽度的多少倍
    msp.setSpan(new ScaleXSpan(2.0f), 49, 51, Spanned.SPAN_EXCLUSIVE_EXCLUSIVE); //2.0f表示默认字体宽度的两倍，即X轴方向放大为默认字体的两倍，而高度不变
    //SpannableString对象设置给TextView
    tokenTv.setText(msp);
    //设置TextView可点击
    tokenTv.setMovementMethod(LinkMovementMethod.getInstance());
    ```

### [Android 开发，你遇上 Emoji 头疼吗？ - 掘金](https://juejin.im/post/5a45b38451882512d823076a)

## ImageView

### 交叉使用 mipmap 和 drawable

钻牛角尖：先必须获取到之前的 Drawable，然后将这个 Drawable 进行转换，然后进行图片替换；
解决思路：通过覆盖的单向方式，而不用知道之前是图片资源还是 Drawable 资源。

```java
ImageView ivMain = findViewById(R.id.iv_main);
if(满足条件){
  ivMain.setBackgroundResource(R.id.selected);
} else {
  ivMain.setBackgroundResource(R.id.unselected);
}
```

### ImageView 加载 GIF 图片

代码

```java
ImageView iv = (ImageView) findViewById(R.id.vp_iv);
Glide
  .with(this)
  .load("https://i.imgur.com/l9lffwf.gif")
  .into(iv);
```

外部链接

- [Glide](https://github.com/bumptech/glide)

### 加载网络图片

代码

```java
Picasso
  .with(this)
  .load("https://i.imgur.com/l9lffwf.gif")
  .placeholder(R.mipmap.ic_launcher)
  .into(iv);
```

外部链接

- [Picasso](https://github.com/square/picasso)

---

## EditText

### 定位光标位置：

```java
String name = "Lou";
EditText et = (EditText)findViewById(R.id.et_name);
et.setSelection(name.length()); // 将光标至于文字最后
```

### 使光标颜色和文字颜色保持一致（EditText 不显示光标问题）：

```xml
<!-- 有的时候发现EditText里的光标无法显示的问题，很可能是光标的颜色和背景重合了，可以通过设置光标的颜色属性来让其显示 -->
<!-- 在EditText标签中添加如下属性 -->
android:textCursorDrawable="@null"
```

### 外部链接

- [修改 EditText 的光标颜色](http://www.jcodecraeer.com/a/anzhuokaifa/androidkaifa/2013/0216/858.html)
- [Set EditText cursor color](http://stackoverflow.com/questions/7238450/set-edittext-cursor-color)

---

## ListView

ListView 中不可见的元素，其对应的 view 为 null。这是容易理解的，性能优化。
（在 updateItem 的时候要做两方面的处理，即数据(updateItemData)和视图(updateItemView)）

### 添加空白

- 在 ListView 的顶部和底部添加空白（见外部链接）
- 在 Item 之间添加空白（通过 Divider 的方式）

#### 代码

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/alarm_bg"
    android:orientation="vertical">

    <ListView
        android:id="@+id/lv_main"
        android:layout_width="match_parent"
        android:layout_height="match_parent"

        android:paddingTop="16dp"
        android:paddingBottom="16dp"
        android:clipToPadding="false"

        android:scrollbars="none"
        android:divider="@android:color/transparent"
        android:dividerHeight="10dp"
        />
</LinearLayout>
```

#### 外部链接

- [Add margin above top ListView item (and below last) in Android](http://stackoverflow.com/questions/6288167/add-margin-above-top-listview-item-and-below-last-in-android)
- [Spacing between listView Items Android](http://stackoverflow.com/questions/4984313/spacing-between-listview-items-android)

---

## 修改 DatePicker 日期选择器默认样式（同理适用于 TimePicker）

### 效果图

![DatePicker](https://github.com/lyloou/hexo/blob/master/source/images/20160706/date_picker.jpg?raw=true)

### 代码

```xml
<!-- 使用Holo样式 -->
<DatePicker
        android:id="@+id/dialog_personal_birth_dp"
        style="@android:style/Widget.Holo.DatePicker"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"/>
```

```java
private String mBirth = "1981.12.11";
final DatePicker dp = dialogBirth.getView(R.id.dialog_personal_birth_dp);
dp.setCalendarViewShown(false); // 不要显示Calendar视图
Uview.changeTimePickerSepColor(dp, Color.DKGRAY); // 修改分割线样式
String[] birth = mBirth.split("\\.");
dp.init(Integer.parseInt(birth[0]),
        Integer.parseInt(birth[1]) - 1,
        Integer.parseInt(birth[2]),
        null);
```

```java
//: Uview.java
public static void changeTimePickerSepColor(ViewGroup group, int color) {
    for (NumberPicker np : getNumberPickers(group)) {
        changeNumberPickerSepColor(np, color);
    }
}


private static List<NumberPicker> getNumberPickers(ViewGroup group) {
    List<NumberPicker> lists = new ArrayList<NumberPicker>();
    if (group == null) {
        return lists;
    }

    for (int i = 0; i < group.getChildCount(); i++) {
        View v = group.getChildAt(i);
        if (v instanceof NumberPicker) {
            lists.add((NumberPicker) v);
        } else if (v instanceof LinearLayout) {
            List<NumberPicker> ls = getNumberPickers((ViewGroup) v);
            if (ls.size() > 0) {
                return ls;
            }
        }
    }
    return lists;
}

public static void changeNumberPickerSepColor(NumberPicker np, int color) {
    Field[] pickerFields = NumberPicker.class.getDeclaredFields();
    for (Field f : pickerFields) {
        if (f.getName().equals("mSelectionDivider")) {
            try {
                f.setAccessible(true);
                f.set(np, new ColorDrawable(color));
            } catch (Exception e) {
                e.printStackTrace();
            }
            break;
        }
    }

    // 分割线粗细
    for (Field f : pickerFields) {
        if (f.getName().equals("mSelectionDividerHeight")) {
            try {
                f.setAccessible(true);
                f.set(np, 1);
            } catch (Exception e) {
                e.printStackTrace();
            }
            break;
        }
    }
}
```

## 给 imageview 设置 tag 值来传值

ivSetting.setTag(room.getId());
这样在进入设置界面时，可以通过 getTag 的方式获取到 room 的 id。

> http://www.vogella.com/tutorials/Retrofit/article.html#create-activity

## 主题中使用 tint 会导致 imageview 显示空白

```xml
<item name="android:tint">#ffffff</item>
```

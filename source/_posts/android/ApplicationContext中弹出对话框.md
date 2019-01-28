---
title: Android中app响应浏览器链接
date: 2018-07-09 19:16:17
toc: true
tags:
- android
---

## ApplicationContext中弹出对话框

1. 添加权限
```
 <uses-permission android:name="android.permission.SYSTEM_ALERT_WINDOW" />
```

2. 显示对话框
```java
private static void showRestartDialog(final Context context) {
    AlertDialog.Builder builder = new AlertDialog.Builder(context, R.style.Theme_AppCompat_Light_Dialog);
    builder.setMessage("应用已更新完毕，是否立即重启 ?").setCancelable(false)
        .setPositiveButton("是", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                Intent intent = context.getPackageManager().getLaunchIntentForPackage(context.getPackageName());
                intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);
                context.startActivity(intent);
            }
        })
        .setNegativeButton("否", new DialogInterface.OnClickListener() {
            public void onClick(DialogInterface dialog, int id) {
                dialog.cancel();
            }
        });
    AlertDialog alert = builder.create();
    alert.setCancelable(false);
    alert.getWindow().setType(WindowManager.LayoutParams.TYPE_SYSTEM_ALERT); // Attention it!
    alert.show();
}
```

## 参考资料
- [Application中弹出Dialog - CSDN博客](https://blog.csdn.net/guchuanhang/article/details/44750545)
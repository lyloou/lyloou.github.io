---
title: Glide库
date: 2017-08-29 17:16:15
toc: true
comments: true
tags:
- android
---

## 根据图片的文件路径，显示给ImageView
原理：借助 Glide 库来实现；
    ```java
    String pathname = "/storage/emulated/0/lyloou/image/hello_world.png";
    File file = new File(pathname);
    Glide.with(mContext).load(file).asBitmap().into(mIvHi);
    ```


## 通过图像 URL 设置圆角图像：
    ```java
    private void setCircleIcon(ImageView view) {
        String url = "https://img.gcall.com/dca5/M00/10/8E/wKhoNlggetaENWylAAAAAAAAAAA457.jpg";
        final int w = Uscreen.dp2Px(mContext, 48);
        Glide.with(mContext)
                .load(url)
                .centerCrop()
                .fitCenter()
                .thumbnail(0.1f)
                .placeholder(R.mipmap.ic_launcher)
                .crossFade()
                .override(w, w)
                .transform(new BitmapTransformation(mContext) {
                    @Override
                    protected Bitmap transform(BitmapPool pool, Bitmap toTransform, int outWidth, int outHeight) {
                        return Uview.getBitmapByXfermode(mContext, toTransform,
                                Color.parseColor("#dddddd"),
                                w,
                                w, PorterDuff.Mode.SRC_IN);
                    }
    
                    @Override
                    public String getId() {
                        return getClass().getName();
                    }
                })
                .into(view);
    }
    ```
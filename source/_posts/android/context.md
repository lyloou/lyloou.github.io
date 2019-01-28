---
title: context上下文
date: 2016-06-02 09:10:02
toc: true
tags:
- android
---

## 添加`mContext`
- 在Activity和Fragment中，经常需要用到上下文信息；
虽然通过`类名.this`的方式虽然也可以，但是`mContext`将更方便易懂，尤其是将代码拷贝来拷贝去时；

- 将`mContext`声明在基类中（例如：`BaseActivity`、`BaseFragment`）：
``` java
protected Activity mContext;
```

在BaseActivity的`onCreate`方法中添加：
``` java
mContext = this;
```

或者在BaseFragment中的`onCreate`中添加：
``` java
mContext = getActivity();
```
这样所有继承自`BaseActivity`和`BaseFragment`的类，均可以直接使用`mContext`了；

- 扩展：类似的方法，可以让所有的子类直接使用`TAG`，而不需要在自己的类中声明和初始化；
在`BaseActivity`中添加：
``` java
protected final String TAG = getClass().getSimpleName();
```

### 外部链接
- [Context, What Context?](https://possiblemobile.com/2013/06/context/)


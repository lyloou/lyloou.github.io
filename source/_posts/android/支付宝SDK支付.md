---
title: 支付宝SDK支付
date: 2016-11-17 16:31:08
toc: true
comments: true
tags:
- android
---

通过本地安装的支付宝支付
======================
Android端的实现比较简单，
1. [下载SDK和DEMO](https://doc.open.alipay.com/docs/doc.htm?spm=a219a.7629140.0.0.8MZxo2&treeId=59&articleId=103662&docType=1)
1. 导入支付宝sdk后，需要注意权限、配置、混淆等；
1. 通过后台获取得到`orderInfo`字符串
1. 唤起支付宝：【需要在新线程中调用支付接口。（可参考alipay_demo实现）】

``` java
final String orderInfo = "从后台获取得到的orderInfo";

PayTask alipay = new PayTask(mActivity);
Map<String, String> result = alipay.payV2(orderInfo, true);
PayResult payResult = new PayResult(result);
/**
 对于支付结果，请商户依赖服务端的异步通知结果。同步通知结果，仅作为支付结束的通知。
 */
String resultInfo = payResult.getResult();// 同步返回需要验证的信息
String resultStatus = payResult.getResultStatus();

// 判断resultStatus 为9000则代表支付成功
if (TextUtils.equals(resultStatus, "9000")) {
    // 该笔订单是否真实支付成功，需要依赖服务端的异步通知。
    Toast.makeText(mActivity, "支付成功", Toast.LENGTH_SHORT).show();
} else {
    // 该笔订单真实的支付结果，需要依赖服务端的异步通知。
    Toast.makeText(mActivity, "支付失败", Toast.LENGTH_SHORT).show();
}
```


如果本地没有安装支付宝，就跳转到wap支付
======================
我相信在`PayTask.payV2`中，有对是否安装支付宝做判断，
我们需要在`Manifest`中注册`H5PayActivity`：
``` xml
<activity
    android:name="com.alipay.sdk.app.H5PayActivity"
    android:configChanges="orientation|keyboardHidden|navigation"
    android:exported="false"
    android:screenOrientation="behind"
    android:windowSoftInputMode="adjustResize|stateHidden" >
</activity>
```

参考资料
=======
- [Android 支付宝 SDK 无法跳转到wap支付](http://blog.csdn.net/u013067184/article/details/46922997)
- [蚂蚁金服-开发文档——修改Manifest](https://doc.open.alipay.com/doc2/detail.htm?treeId=59&articleId=103682&docType=1)
- [混淆出错-The same input jar is specified twice 解决办法](http://blog.csdn.net/ylbf_dev/article/details/50448727)

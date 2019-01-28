---
title: TBK
date: 2018-07-15 11:50:49
tags:
- android
---

## 集成依赖
```java
allprojects {
    repositories {
        mavenCentral();
        jcenter()
        maven {
            url "http://repo.baichuan-android.taobao.com/content/groups/BaichuanRepositories/"
        }
    }
}
```

```java
 //!+Baichuan

//fastjson
compile 'com.alibaba:fastjson:1.2.9'

//支付
compile 'com.alibaba.alipay:alipaySingle:20160825@jar'

//登陆
compile 'com.ali.auth.sdk:alibabauth_core:1.1.4@jar'
compile 'com.ali.auth.sdk:alibabauth_ui:1.1.4@aar'
compile 'com.ali.auth.sdk:alibabauth_ext:1.1.4@jar'

//【可选】仅供特殊合作伙伴使用

//compile 'com.ali.auth.sdk:alibabauth_accountlink:1.1.4@jar'

//安全基础
compile 'com.taobao.android:securityguardaar3:5.1.81@aar'

//【可选】安全高级，如使用了发放红包、优惠券高级功能，则必须引入

//compile 'com.taobao.android:securitybodyaar3:5.1.25@aar'

//Mtop网关
compile 'com.taobao.android:mtopsdk_allinone_open:1.2.2.4@jar'

//applink
compile 'com.taobao.android:alibc_applink:2.0.0.9@jar'

//UT
compile 'com.taobao.android:utdid4all:1.1.5.3_proguard@jar'
compile 'com.alibaba.mtl:app-monitor-sdk:2.5.1.3_for_bc_proguard@jar'

//电商SDK
compile 'com.alibaba.sdk.android:alibc_trade_sdk:3.1.1.11@aar'

//!-Baichuan
```

## 工具类
```java
//: Baichuan.java
public class Baichuan {

    public static void showDetailPage(Activity activity, String id, String pid, CallbackContext callbackContext) {
        AlibcBasePage alibcBasePage = new AlibcDetailPage(id);
        AlibcTaokeParams alibcTaokeParams = new AlibcTaokeParams(pid, "", "");
        if (!alibcTaokeParams.isValidPid()) {
            callbackContext.error("pid无效");
            return;
        }
        showPage(activity, alibcBasePage, alibcTaokeParams, callbackContext);
    }

    public static void showDetailPageWithUrl(Activity activity, String url, CallbackContext callbackContext) {
        AlibcBasePage alibcBasePage = new AlibcPage(url);
        showPage(activity, alibcBasePage, null, callbackContext);
    }


    private static void showPage(Activity activity, AlibcBasePage alibcBasePage, AlibcTaokeParams alibcTaokeParams, final CallbackContext callbackContext) {

        AlibcShowParams alibcShowParams = new AlibcShowParams(OpenType.Native, false);

        HashMap<String, String> exParams = new HashMap<>();
        exParams.put(AlibcConstants.ISV_CODE, "appisvcode");

        AlibcTrade.show(activity, alibcBasePage, alibcShowParams, alibcTaokeParams, exParams, new AlibcTradeCallback() {

            @Override
            public void onFailure(int i, String s) {
                callbackContext.error("导航失败：" + s);
            }

            @Override
            public void onTradeSuccess(TradeResult tradeResult) {
                switch (tradeResult.resultType) {
                    case TYPEPAY:
                        JSONObject jsonObject = new JSONObject();
                        try {
                            jsonObject.put("successArr", tradeResult.payResult.paySuccessOrders);
                            jsonObject.put("failureArr", tradeResult.payResult.payFailedOrders);
                            callbackContext.success(jsonObject);
                        } catch (JSONException e) {
                            e.printStackTrace();
                            callbackContext.error("json转换异常:" + e.getMessage());
                        }
                        break;
                    case TYPECART:
                        callbackContext.success("您已经将商品添加到购物车了，赶快去购买吧");
                        break;
                    default:
                        callbackContext.error("未知的结果类型");
                        break;
                }
            }
        });
    }

    public static void login(final Activity context) {

        final AlibcLogin alibcLogin = AlibcLogin.getInstance();

        alibcLogin.showLogin(context, new AlibcLoginCallback() {

            @Override
            public void onSuccess() {
                Toast.makeText(context, "登录成功 ", Toast.LENGTH_LONG).show();
                //获取淘宝用户信息
                Log.i("Baichuan", "获取淘宝用户信息: " + AlibcLogin.getInstance().getSession());

            }

            @Override
            public void onFailure(int code, String msg) {
                Toast.makeText(context, "登录失败 ", Toast.LENGTH_LONG).show();
            }
        });
    }
}
```

## cordova调用
```java
名称: MyPlugin.toDetailPage
描述: 跳转到淘宝商品详情页面
参数: 
   JSONParam ——  pid和isCounpons必传，goodsId和couponsUrl对应isCounpons选其一
    {
        pid: 'mm_131641132_33126906_320380416', // 用户对应pid，此参数必传！！！
        isCoupons: 0, // 是否有优惠券，传0（无）或者1（有）
        goodsId: '550548242323', // 商品id  
        couponsUrl: '优惠券地址' // 优惠券地址
     }
   onSuccess —— 成功时的回调，如用户进行购买，则返回{"successArr":paySuccessOrders, "failureArr":payFailedOrders}，Dictionary类型;如用户将商品加入购物车，则返回“您已经将商品添加到购物车了，赶快去购买吧”，String类型
   onError —— 失败时的回调，返回失败原因，String类型
使用方法：
MyPlugin.toDetailPage({goodsId: '550548242323', pid: 'mm_131641136_43126906_310380416', isCoupons: 0}, function (success){},function (error){})
```

```java
private boolean toDetailPage(CordovaArgs args, CallbackContext callbackContext) {
    try {
        JSONObject params = args.getJSONObject(0);

        if (params.has("isCoupons") && params.getInt("isCoupons") == 1) {
            String couponsUrl = params.has("couponsUrl") ? params.getString("couponsUrl") : "";
            Baichuan.showDetailPageWithUrl(mContext, couponsUrl, callbackContext);
            return true;
        }

        String pid = params.has("pid") ? params.getString("pid") : "";
        if (TextUtils.isEmpty(pid)) {
            callbackContext.error("获取PID参数失败");
            return true;
        }

        // use goodsId and pid
        String id = params.has("goodsId") ? params.getString("goodsId") : "";
        Baichuan.showDetailPage(mContext, id, pid, callbackContext);

    } catch (JSONException e) {
        e.printStackTrace();
        callbackContext.error("获取参数失败：" + e.getMessage());
    }
    return true;
}
```
---
title: jooq相关
date: 2018-08-03 18:17:54
toc: true
comments: true
tags:
- sql
---

https://www.jooq.org/doc/3.9/manual/#Overview

C

R

U

D

## **插入或更新**
如果没有就插入，如果有则更新
```java
// 工具方法 https://github.com/jOOQ/jOOQ/issues/2134
import org.jooq.Field;
import org.jooq.impl.DSL;

public class MyDSL {
    public static <T> Field<T> values(Field<T> field) {
        return DSL.field("VALUES({0})", field.getDataType(), field);
    }
}
```

```java
private void insertCouponItemsToDb(List<TbkDgItemCouponGetResponse.TbkCoupon> results) {

    dslContext.transaction((configuration) -> {

        InsertValuesStep19<TbkGoodsRecord, Long, Integer,
                String, Timestamp, Timestamp,
                String, Integer, Integer,
                String, String, Long,
                String, String, String,
                Byte, Integer, BigDecimal,
                String, BigDecimal> step =
                DSL.using(configuration).insertInto(TBK_GOODS,
                        TBK_GOODS.NUM_IID,
                        TBK_GOODS.CATEGORY,
                        TBK_GOODS.COUPON_CLICK_URL,
                        TBK_GOODS.COUPON_START_TIME,
                        TBK_GOODS.COUPON_END_TIME,
                        TBK_GOODS.COUPON_INFO,
                        TBK_GOODS.COUPON_REMAIN_COUNT,
                        TBK_GOODS.COUPON_TOTAL_COUNT,
                        TBK_GOODS.NICK,
                        TBK_GOODS.PICT_URL,
                        TBK_GOODS.SELLER_ID,
                        TBK_GOODS.SHOP_TITLE,
                        TBK_GOODS.SMALL_IMAGES,
                        TBK_GOODS.TITLE,
                        TBK_GOODS.USER_TYPE,
                        TBK_GOODS.VOLUME,
                        TBK_GOODS.ZK_FINAL_PRICE,
                        TBK_GOODS.ITEM_DESCRIPTION,
                        TBK_GOODS.TK_RATE
                );

        results.forEach(tbkCoupon -> {
            step.values(tbkCoupon.getNumIid(),
                    tbkCoupon.getCategory().intValue(),
                    tbkCoupon.getCouponClickUrl(),
                    formatTime(tbkCoupon.getCouponStartTime()),
                    formatTime(tbkCoupon.getCouponEndTime()),
                    tbkCoupon.getCouponInfo(),
                    tbkCoupon.getCouponRemainCount().intValue(),
                    tbkCoupon.getCouponTotalCount().intValue(),
                    tbkCoupon.getNick(),
                    tbkCoupon.getPictUrl(),
                    tbkCoupon.getSellerId(),
                    tbkCoupon.getShopTitle(),
                    StringUtil.convertListToArrayStringWithDoubleQuotation(tbkCoupon.getSmallImages()),
                    tbkCoupon.getTitle(),
                    tbkCoupon.getUserType().byteValue(),
                    tbkCoupon.getVolume().intValue(),
                    BigDecimal.valueOf(Double.parseDouble(tbkCoupon.getZkFinalPrice())),
                    tbkCoupon.getItemDescription(),
                    BigDecimal.valueOf(Double.parseDouble(tbkCoupon.getCommissionRate()))
            );
        });

        step.onDuplicateKeyUpdate()
                .set(TBK_GOODS.CATEGORY, MyDSL.values(TBK_GOODS.CATEGORY))
                .set(TBK_GOODS.COUPON_CLICK_URL, MyDSL.values(TBK_GOODS.COUPON_CLICK_URL))
                .set(TBK_GOODS.COUPON_START_TIME, MyDSL.values(TBK_GOODS.COUPON_START_TIME))
                .set(TBK_GOODS.COUPON_END_TIME, MyDSL.values(TBK_GOODS.COUPON_END_TIME))
                .set(TBK_GOODS.COUPON_INFO, MyDSL.values(TBK_GOODS.COUPON_INFO))
                .set(TBK_GOODS.COUPON_REMAIN_COUNT, MyDSL.values(TBK_GOODS.COUPON_REMAIN_COUNT))
                .set(TBK_GOODS.NICK, MyDSL.values(TBK_GOODS.NICK))
                .set(TBK_GOODS.PICT_URL, MyDSL.values(TBK_GOODS.PICT_URL))
                .set(TBK_GOODS.SELLER_ID, MyDSL.values(TBK_GOODS.SELLER_ID))
                .set(TBK_GOODS.SHOP_TITLE, MyDSL.values(TBK_GOODS.SHOP_TITLE))
                .set(TBK_GOODS.SMALL_IMAGES, MyDSL.values(TBK_GOODS.SMALL_IMAGES))
                .set(TBK_GOODS.TITLE, MyDSL.values(TBK_GOODS.TITLE))
                .set(TBK_GOODS.USER_TYPE, MyDSL.values(TBK_GOODS.USER_TYPE))
                .set(TBK_GOODS.VOLUME, MyDSL.values(TBK_GOODS.VOLUME))
                .set(TBK_GOODS.ZK_FINAL_PRICE, MyDSL.values(TBK_GOODS.ZK_FINAL_PRICE))
                .set(TBK_GOODS.ITEM_DESCRIPTION, MyDSL.values(TBK_GOODS.ITEM_DESCRIPTION))
                .set(TBK_GOODS.TK_RATE, MyDSL.values(TBK_GOODS.TK_RATE))
                .executeAsync(executorService);

    });

}


private Timestamp formatTime(String time) {

    if (Strings.isNullOrEmpty(time)) {
        return null;
    }
    return Timestamp.valueOf(time + " 00:00:00");
}
```

## 判断某个字段是否为空
```java
step.and(TbkGoods.TBK_GOODS.COUPON_INFO.length().notEqual(0));
```
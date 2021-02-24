---
title: K选择问题
date: 2021-02-24 11:00:12
toc: true
comments: true
tags:
  - 算法
---

## 问题描述

K 选择问题：给出 N 个数，找出其中第 K 小的元素。

## 方法 1

暴力法：
时间复杂度：O(K x N)

## 方法 2

二分法：
时间复杂度：O(N)

```java
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * K选择问题：给出N个数，找出其中第K小的元素。
 */
public class K {
    public static void main(String[] args) {
        // 1 2 3 4 5 6 7 8 9
        test(getList1());

        System.out.println("-----");

        // 7 8 11 22 33 44 55 66 99
        test(getList2());

    }

    private static void test(List<Integer> list) {
        System.out.printf("第%s小的元素是%s%n", 3, getNumK(list, 3));
        System.out.printf("第%s小的元素是%s%n", 2, getNumK(list, 2));
        System.out.printf("第%s小的元素是%s%n", 1, getNumK(list, 1));
        System.out.printf("第%s小的元素是%s%n", 5, getNumK(list, 5));
        System.out.printf("第%s小的元素是%s%n", 8, getNumK(list, 8));
        System.out.printf("第%s小的元素是%s%n", 9, getNumK(list, 9));
    }

    private static List<Integer> getList1() {
        return Arrays.asList(3, 7, 1, 2, 8, 9, 4, 5, 6);
    }

    private static List<Integer> getList2() {
        return Arrays.asList(33, 7, 11, 22, 8, 99, 44, 55, 66);
    }

    /**
     * 二分法：找一个枢轴，比枢轴小的放到s1，比枢轴大的放到s2，
     * 如果： k == s1.size+1，说明枢轴就是要找的元素（+1表示枢轴所在的位置）
     * 如果： k < s1.size+1，说明要找的元素在s1中
     * 否则：要找的元素在 s2 中（注意要将枢轴元素加回到s2中，因为有可能正好是这个枢轴元素）
     *
     * @param list 列表
     * @param k    第k小
     * @return 返回第k小的元素
     */
    private static Integer getNumK(List<Integer> list, int k) {
        if (list.isEmpty()) {
            return null;
        }

        if (list.size() < k) {
            return null;
        }

        if (list.size() == 1 && k == 1) {
            return list.get(0);
        }

        List<Integer> s1 = new ArrayList<>();
        List<Integer> s2 = new ArrayList<>();

        int p = list.get(0);
        for (int i = 1; i < list.size(); i++) {
            final Integer a = list.get(i);
            if (a < p) {
                s1.add(a);
            } else {
                s2.add(a);
            }
        }


        if (k == s1.size() + 1) {
            return p;
        }

        if (k < s1.size() + 1) {
            return getNumK(s1, k);
        } else {
            s1.add(p);
            return getNumK(s2, k - s1.size());
        }

    }
}
//~ output:
/*
 第3小的元素是3
 第2小的元素是2
 第1小的元素是1
 第5小的元素是5
 第8小的元素是8
 第9小的元素是9
 -----
 第3小的元素是11
 第2小的元素是8
 第1小的元素是7
 第5小的元素是33
 第8小的元素是66
 第9小的元素是99
 */
```

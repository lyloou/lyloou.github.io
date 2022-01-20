---
title: 【算法】链表中倒数最后k个结点
date: 2022-01-19 10:20:29
toc: true
comments: true
tags:
  - 算法
---

## 剑指 Offer 第 22 题-链表中倒数最后 k 个结点

输入一个长度为 n 的链表，设链表中的元素的值为 ai ，返回该链表中倒数第 k 个节点。
如果该链表长度小于 k，请返回一个长度为 0 的链表。

https://www.nowcoder.com/practice/886370fe658f41b498d40fb34ae76ff9

## 方法 1

先找总个数，再取第 n-k+1 个节点

```java
 public ListNode FindKthToTail(ListNode pHead, int k) {
        // 获取总个数n
        // 假设从1开始计数，则取的是第n-k+1个

        int count = 0;
        ListNode loopNode = pHead;
        while (loopNode != null) {
            count++;
            loopNode = loopNode.next;
        }
        if (k > count) {
            return null;
        }

        int index = 0;
        loopNode = pHead;
        while (loopNode != null) {
            index++;
            if (count - k + 1 == index) {
                break;
            }
            loopNode = loopNode.next;
        }

        // write code here
        return loopNode;
    }
```

## 方法 2

两个指针法

```java
    public ListNode FindKthToTail(ListNode pHead, int k) {
        // 两个指针，一个指针先行，当移动个数大于k个后，另一个指针才开始移动，一直到结束
        int right = 0;
        ListNode firstNode = pHead;
        ListNode secondNode = pHead;

        while (firstNode != null) {
            right++;
            if (right > k) {
                secondNode = secondNode.next;
            }
            firstNode = firstNode.next;
        }

        // 总数个数不足k的情况
        if (right < k) {
            return null;
        }

        // 第二个指针，即所要求的位置
        return secondNode;
    }
```

## 方法 3

栈，思路是：是入栈，再从栈中数 k 个数

```java
    public ListNode FindKthToTail(ListNode pHead, int k) {
        // 先入栈
        Stack<ListNode> stack = new Stack<>();
        while (pHead != null) {
            stack.push(pHead);
            pHead = pHead.next;
        }

        // 再从栈中数k个数
        if (stack.size() < k) {
            return null;
        }

        // 从栈中找第k个数
        ListNode result = null;
        while (k-- > 0) {
            result = stack.pop();
        }
        return result;
    }
```

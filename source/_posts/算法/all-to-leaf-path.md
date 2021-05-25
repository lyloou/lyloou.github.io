---
title: all root-to-leaf paths
date: 2021-05-25 00:32:24
toc: true
comments: true
tags:
  - 算法
---

## 遍历根到所有叶子节点的路径

```java
package com.lyloou.tool.tree;

import java.util.ArrayList;
import java.util.List;


/*
 *
 * **** 示例1 ****
         1
    2          3
  4   5      6   7

 输出如下：
 1 2 4
 1 2 5
 1 3 6
 1 3 7


 * **** 示例2 ****
       1
  2        3
     5
  a = TreeNode(1)
  b = TreeNode(2)
  c = TreeNode(3)
  d = TreeNode(5)
  a.left = b
  a.right =  c
  b.right = d

 输出如下：
 ['1->2->5', '1->3']
 */
public class Solution2 {
    public static void main(String[] args) {
        test1();
        test2();
    }

    private static void test1() {
        TreeNode a = new TreeNode(1);
        TreeNode b = new TreeNode(2);
        TreeNode c = new TreeNode(3);
        TreeNode d = new TreeNode(5);
        a.left = b;
        a.right = c;
        b.right = d;
        System.out.println(binaryTreePaths(a));
    }

    private static void test2() {
        TreeNode a1 = new TreeNode(1);
        TreeNode a2 = new TreeNode(2);
        TreeNode a3 = new TreeNode(3);
        TreeNode a4 = new TreeNode(4);
        TreeNode a5 = new TreeNode(5);
        TreeNode a6 = new TreeNode(6);
        TreeNode a7 = new TreeNode(7);
        a1.left = a2;
        a1.right = a3;
        a2.left = a4;
        a2.right = a5;
        a3.left = a6;
        a3.right = a7;
        System.out.println(binaryTreePaths(a1));
    }

    /**
     * @param root the root of the binary tree
     * @return all root-to-leaf paths
     */
    private static List<String> binaryTreePaths(TreeNode root) {
        if (root == null) {
            return new ArrayList<>();
        }
        // 有几个叶子节点，就有几条路径
        if (isLeaf(root)) {
            List<String> list = new ArrayList<>();
            list.add(root.val + "");
            return list;
        }

        // 获取左子树的列表，循环向元素前面追加当前值
        final List<String> leftList = binaryTreePaths(root.left);
        for (int i = 0; i < leftList.size(); i++) {
            leftList.set(i, root.val + "->" + leftList.get(i));
        }

        // 获取右子树的列表，循环向元素前面追加当前值
        final List<String> rightList = binaryTreePaths(root.right);
        for (int i = 0; i < rightList.size(); i++) {
            rightList.set(i, root.val + "->" + rightList.get(i));
        }

        // 拼接成一个列表返回
        List<String> result = new ArrayList<>(leftList.size() + rightList.size());
        result.addAll(leftList);
        result.addAll(rightList);
        return result;
    }


    /**
     * 判断node是否为叶子节点
     *
     * @param node 节点
     * @return true 为叶子节点，
     */
    private static boolean isLeaf(TreeNode node) {
        return node.left == null && node.right == null;
    }

    static class TreeNode {
        public int val;
        public TreeNode left, right;

        public TreeNode(int val) {
            this.val = val;
            this.left = this.right = null;
        }
    }
}
```

## 运行结果

![all-to-leaf-path-2021-05-25-00-35-39](http://cdn.lyloou.com/img/all-to-leaf-path-2021-05-25-00-35-39.png)

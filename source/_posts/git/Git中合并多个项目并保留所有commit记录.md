---
title: 【开发工具-Git】Git中合并多个项目并保留所有commit提交记录
date: 2021-12-22 18:35:06
toc: true
comments: true
tags:
  - git
  - tool
---

## 背景

通常的合并项目的做法是，将所有项目移动到一个新目录中，并重新生成纳入 git 管理（去掉了.git 文件夹），这样做的弊端是之前的历史提交记录都没有了，想要看之前的记录，还需要再回到旧项目中查看。
在本文中，我会介绍怎样完整地保留历史提交记录。

## 为什么保留提交记录？

1. 可以追踪文件修改历史，方便对比和还原历史。
2. 可以追责，知道之前是谁写的，什么时候写的。

拆分

## 怎样完整地保留提交记录？

假设有三个项目

```
A：远程地址为：git@github.com:lyloou/merge_a.git ，分支为master
B：远程地址为：git@github.com:lyloou/merge_b.git ，分支为master
C：远程地址为：git@github.com:lyloou/merge_c.git ，分支为master
```

合并结果为：git@github.com:lyloou/merge_all.git ，分支为 master

```sh
merge_all
  -- merge_a
  -- merge_b
  -- merge_c
```

**操作步骤**

1. 在本地新建 merge_all 目录，并初始化

```sh
cd merge_all
# 将当前目录初始化为git版本管理的目录
git init
```

2. 在 merge_all 中添加 merge_a，merge_b，merge_c 的远程分支。

```sh
git remote add origin_merge_a git@github.com:lyloou/merge_a.git
git remote add origin_merge_b git@github.com:lyloou/merge_b.git
git remote add origin_merge_c git@github.com:lyloou/merge_c.git
```

3. 可以验证是否添加成功`git remote -v`
4. 在 merge_all 目录下，获取 merge_a, merge_b,merge_c 的 master 分支数据

```sh
git fetch origin_merge_a master
git fetch origin_merge_b master
git fetch origin_merge_c master
```

5. 开始合并了，并移动到子目录中

```sh
# 合并，并保留历史
git merge origin_merge_a/master --allow-unrelated-histories
# 新建子文件夹，并移动到此文件中（排除需要忽略的文件夹）
mkdir merge_a
mv !(.|..|.git|merge_a) merge_a
# 生成一条commit日志
git add . && git commit -m "merge merge_a_master and mv to merge_a"

git merge origin_merge_b/master --allow-unrelated-histories
mkdir merge_b
mv !(.|..|.git|merge_b) merge_b
git add . && git commit -m "merge merge_b_master and mv to merge_b"

git merge origin_merge_c/master --allow-unrelated-histories
mkdir merge_c
mv !(.|..|.git|merge_c) merge_c
git add . && git commit -m "merge merge_c_master and mv to merge_c"
# 注意 1： `--allow-unrelated-histories` 的意思是，允许合并不相关历史
# 注意 2：执行 `mv !(.|..|.git|merge_a) merge_a` 的过程中可能会报错误 `-bash: !: event not`，执行一下命令 `shopt -s extglob`
```

6. 推送 merge_all 的 master 分支到远程

```sh
git remote add origin git@github.com:lyloou/merge_all.git
git push -u origin master
```

至此合并多项目操作就完成了。

## 参考资料

- [Wiz 原文](https://0f9de7f3.wiz06.com/wapp/pages/view/share/s/0fDuvP3SO4QS2Hb3sP2Di0ai2_-yc63ErkxP28a9kS3XUYgP)
- [git 合并两个项目 - 掘金](https://juejin.cn/post/6885549929960472590)
- [linux mv 命令排除某个文件或文件夹\_哪惧明天，风高路斜-CSDN 博客\_mv 排除文件](https://blog.csdn.net/m0_37586991/article/details/88617332)
- [command line - What is the purpose of shopt -s extglob - Ask Ubuntu](https://askubuntu.com/questions/889744/what-is-the-purpose-of-shopt-s-extglob)

> As you can guess, it stands for extended globbing. This option allows for more advanced pattern matching.

## 一键合并多个项目 shell 脚本

```sh
#!/usr/bin/env sh

#1. 在本地新建 merge_all 目录，并初始化
mkdir merge_all
cd merge_all
# 将当前目录初始化为git版本管理的目录
git init

#2. 在 merge_all 中添加 merge_a，merge_b，merge_c 的远程分支。
git remote add origin_a git@github.com:lyloou/merge_a.git
git remote add origin_b git@github.com:lyloou/merge_b.git
git remote add origin_c git@github.com:lyloou/merge_c.git

#3. 可以验证是否添加成功`git remote -v`
git remote -v

#4. 在 merge_all 目录下，获取 merge_a, merge_b,merge_c 的 master 分支数据
git fetch origin_a master
git fetch origin_b master
git fetch origin_c master

#5. 开始合并了，并移动到子目录中

# 注意 执行 `mv !(.|..|.git|merge_a) merge_a` 的过程中可能会报错误 `-bash: !: event not`，执行一下命令 `shopt -s extglob`
shopt -s extglob

# 合并，并保留历史
git merge origin_a/master --allow-unrelated-histories
# 新建子文件夹，并移动到此文件中（排除需要忽略的文件夹）
mkdir merge_a && mv !(.|..|.git|merge_a) merge_a
# 生成一条commit日志
git add . && git commit -m "merge and mv to merge_a"

git merge origin_b/master --allow-unrelated-histories
mkdir merge_b && mv !(.|..|.git|merge_a|merge_b) merge_b
git add . && git commit -m "merge and mv to merge_b"

git merge origin_c/master --allow-unrelated-histories
mkdir merge_c && mv !(.|..|.git|merge_a|merge_b|merge_c) merge_c
git add . && git commit -m "merge and mv to merge_c"

#6. 推送 merge_all 的 master 分支到远程
git remote add origin git@github.com:lyloou/merge_all.git
git push -u origin master

```

[阅读原文](http://lyloou.com/git/Git中合并多个项目并保留所有commit记录/)

---
title: 在github提交pr
date: 2018-07-9 21:38:25
toc: true
comments: true
tags:
- git
---

# 在github提交pr

- fork 一份到自己的仓库
- 设置本地的origin url: `git remote set-url origin https://github.com/lyloou/WeexErosFramework.git`

```
# 查看默认上游的远程信息
git remote show origin

# 添加多一个上游
git remote add upstream https://github.com/bmfe/WeexErosFramework.git

# 查看新上游的远程信息
git remote show upstream

# 将上游upstream的新内容拉取下来
git pull upstream master:master

# 修改提交
git add .
git commit -m "new feature"
git push
```

- 进入自己fork的项目

- 有个`new pull request`按钮，按照提示进行即可

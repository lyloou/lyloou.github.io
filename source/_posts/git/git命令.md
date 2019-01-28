---
title: git命令
date: 2016-07-12 08:17:25
toc: true
comments: true
tags:
- git
---

## 基本操作
### C
- 添加到版本控制: `git add filename.md`
- 添加描述并提交： `git commit -m "first init"`

### R 
- 查看图形log：`git log --graph`
- 查看单行log：`git log --pretty=oneline`
- 查看分支合并情况：`git log --graph --pretty=oneline --abbrev-commit`
- 查看工作区和版本库最新版本的区别： `git diff HEAD -- test.xml`
- [列出每个人的最近commit记录：`git shortlog`](#shortlog)
- 列出每个人的commit次数：`git shortlog -sne`

### U
- 修改提交信息：`git commit --amend`
- 取消添加（git add .）的命令：`git reset HEAD test.xml`

### D
- 移除工作空间的文件： `git rm test.xml`
- 丢弃工作区的修改： `git checkout -- test.xml`，其中`--`很重要，没有这个`--`，就变成了“切换到另一个分支”。

### RESET
- 将HEAD指向到某个版本： `git reset --hard commit_id`
- 重返未来，用`git reflog`查看命令历史，以便回到未来的那个版本。
- git reset 后丢弃远程的提交
  > [github - git 怎样删除远程仓库的某次错误提交？ - SegmentFault](https://segmentfault.com/q/1010000002898735)
    ```bash
    git log # 获取log的某次提交commit id
    git reset --hard 0301382 # 回退到0301382
    git push --force # 强制推送到服务器端
    ```
- Git撤销git commit 但是未git push的修改
  `git reset commit_id `
  > [Git撤销git commit 但是未git push的修改](https://blog.csdn.net/winceos/article/details/22797437)
- [撤销一次分支的合并Merge](https://blog.csdn.net/a478555/article/details/50970930)
  ```
  git reset --hard HEAD~
  ```


## 远程仓库
- 移除远程仓库： `git remote remove origin`
- 添加远程仓库： `git remote add origin git@github.com:lyloou/lou.git`
- [添加多个远程仓库： `git remote add jquery https://github.com/jquery/jquery.git`](https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/25.md#註冊遠端儲存庫)
- 远程主机改名： `git remote rename <原主机名> <新主机名>`
- 删除远程主机： `git remote rm <主机名>`
- 显示远程主机详细信息： `git remote show <主机名>`
- 提交到远程仓库： `git push -u origin master`
  > 由于远程库是空的，我们第一次推送master分支时，加上了-u参数，Git不但会把本地的master分支内容推送的远程新的
  master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令
  （`git push origin master`）。http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013752340242354807e192f02a44359908df8a5643103a000
- [拉取并且合并远程分支：`git pull origin master --allow-unrelated-histories`](https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/24.md#直接將現有的本地-git-儲存庫上傳到指定的-github-專案)  
- 删除远程文件夹或文件，但是本地还保留着： `git rm -r --cached dir2` (`-r`参数，表示递归删除文件夹的内容)
  > https://stackoverflow.com/questions/1274057/how-to-make-git-forget-about-a-file-that-was-tracked-but-is-now-in-gitignore
- 删除远程文件夹或文件，但是本地还保留着（展示要删除的文件，不是真的删除）： `git rm -r -n --cached dir2`
- `pull = fetch + merge`
  > [git pull 和 git fetch 有什么区别？](https://ruby-china.org/topics/15729)
  > [git查看远程版本库和本地库的差异 | 星辰](http://blog.kainaodong.com/?p=12)
- 直接修改远程仓库 url
  > `git remote set-url origin git:new.url.here`
  >  See this question: [Change the URI (URL) for a remote Git repository - Stack Overflow](http://stackoverflow.com/questions/16330404/how-to-remove-remote-origin-from-git-repo/16330439)
-  clone repo with its submodule (use the --recursive argument)
  > git clone --recursive git@github.com:rbind/yihui.git
  https://yihui.name/cn/2017/03/git-submodule/
    - 如果克隆库的时候要初始化子模块，请加上 --recursive 参数，如：
    git clone --recursive git@github.com:rbind/yihui.git
    - 如果已经克隆了主库但没初始化子模块，则用：
    git submodule update --init --recursive
    - 如果已经克隆并初始化子模块，而需要从子模块的源更新这个子模块，则：
    git submodule update --recursive --remote
    - 如果要向一个库中添加一个新的子模块，可以用 git submodule add
    git submodule add https://github.com/yihui/hugo-lithium-theme.git themes/hugo-lithium-theme


## 分支
### [创建空白分支](https://blog.csdn.net/playboyanta123/article/details/48975175)
```sh
git checkout --orphan gh-pages
```
### delete a git branch both locally and remotely.
```sh
$ git push --delete <remote_name> <branch_name>
$ git branch -d <branch_name>
# (https://stackoverflow.com/questions/2003505/how-do-i-delete-a-git-branch-both-locally-and-remotely)
```

### 本地分支
- 删除本地分支：`git branch -d {the_local_branch}`

### 远程分支
- 添加本地分支到远程分支，并关联：`git push -u origin develop`
  > https://stackoverflow.com/questions/2765421/how-do-i-push-a-new-local-branch-to-a-remote-git-repository-and-track-it-too
- 创建远程origin的dev分支到本地：`git checkout -b dev origin/dev`
- 指定本地dev分支与远程origin/dev分支的链接：`git branch --set-upstream dev origin/dev`
- `git clone`默认会把远程仓库整个克隆下来，但只会创建`master`分支，如果远程还有其他分支，可以通过下面的方式clone分支。
  * 将远程分支获取至本地仓库：git checkout -b python_mail.skin origin/python_mail.skin
  * 使用-t参数，它默认会在本地建立一个和远程分支名字一样的分支：git checkout -t origin/python_mail.skin
  * [git clone 远程分支 - xqs83的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/xqs83/article/details/7382074)
- 在`git pull`之前，本地分支关联远程分支：`git branch --set-upstream feature-A origin/feature-A`
  * [git新建本地分支自动与远程分支关联 - xqs83的专栏 - 博客频道 - CSDN.NET](http://blog.csdn.net/xqs83/article/details/17361201)
- 提交分支：`git push origin feature-A:feature-A`  
- 删除远程分支：`git push origin :feature-A`
- 删除远程分支：`git push --delete {the_remote_branch}` 
- 克隆指定分支：`git clone -b rryp https://github.com/bmfe/eros-nexus.git "nexus" --depth=1`

### 合并 merge & rebase
- [Git - git-merge Documentation](https://git-scm.com/docs/git-merge)
  > If there were uncommitted worktree changes present when the merge started, 
  > `git merge --abort` will in some cases be unable to reconstruct these changes
  > It is therefore recommended to always commit or stash your changes before running git merge.

- [Git merge 時使用 fast-forward 的差別](http://lemonup.logdown.com/posts/166352-git-merge-fast-forward-difference)
```sh
# 我要新增一個功能，所以在master上開一個branch叫feature1。
# 我在新增功能時，加了3個commit在feature1中。
# 當功能開發完成時，checkout回master，要將 feature1合併回master，這時可以有兩個選擇：

# 选择1：master會將feature1上的3個commit全視為master的commit，並將HEAD移到跟feature1的HEAD相同的commit上。
git merge --ff feature1

# 选择2：master會新增一個commit，內容為feature1上的改變，並將HEAD移到新的commit上。
git merge --no-ff feature1

# 至於該使用哪種方式，就要看個人需求了，如果是新增功能的branch，個人認為使用non-fast-forward的方式比較好。
# 這樣可以很清楚的看出哪些是新增功能用的commit，哪些是原本master的commit。master才不會有太多不相干的commit交錯在一起。
# 而且master要移除功能時，也只要處理一個commit就可以了。
```

- [分支的合并【分支】| 猴子都能懂的GIT入门 | 贝格乐（Backlog）](https://backlog.com/git-tutorial/cn/stepup/stepup1_4.html)


## remove untracked files
```bash
$ git clean -d -f
$ git clean --help
```
> [branch - How to remove local (untracked) files from the current Git working tree? - Stack Overflow](https://stackoverflow.com/questions/61212/how-to-remove-local-untracked-files-from-the-current-git-working-tree)

## git stash
- Git 还提供了一个 stash 功能，可以把当前工作状态“储藏”起来，等以后恢复现场后继续工作。
- 查看stash的列表：`git stash list`
- 恢复：`git stash pop` 或者 `git stash apply`
  > 一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；
  > 另一种方式是用git stash pop，恢复的同时把stash内容也删了：

- 参考资料：
 [Bug分支](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/00137602359178794d966923e5c4134bc8bf98dfb03aea3000)


## 添加注释的技巧
参考`golang.org/x/net`的提交日志：
```sh
* 92b859f - ipv6: update icmp parameters (4 days ago) <Mikio Hara>
* 344b2e3 - ipv4: update icmp parameters (4 days ago) <Mikio Hara>
* 08b7f81 - internal/iana: add address family number constants (4 days ago) <Mikio Hara>
* a4c73ec - icmp: use subtests (4 days ago) <Mikio Hara>
* 24dd378 - dns/dnsmessage: reject compressed SRV resource records (6 days ago) <Ian Gudger>
* e0c57d8 - CONTRIBUTING.md: remove note about not accepting Pull Requests (9 days ago) <Andrew Bonventre>
* 892bf7b - dns/dnsmessage: correctly handle multiple and >255 byte TXT records (10 days ago) <Ian Gudger>
* 803fdb9 - ipv4, ipv6, icmp, internal/socket: fix build on netbsd/arm (10 days ago) <Mikio Hara>
* ae89d30 - route: avoid unnecessary type conversions (12 days ago) <namusyaka>
* d0aafc7 - trace: fix races on concurrent Trace method calls (2 weeks ago) <David Howden>
```
名称最好简洁、准确，
可以总结：`模块: 动词 + 名词；`
动词：
```
- add 
- update
- fix
- remove
- simply 
- enable
- disable
- rename

```

## [delete all tags](https://stackoverflow.com/questions/19542301/delete-all-tags-from-a-git-repository)
To delete remote tags (before deleting local tags) simply do:
```
git tag -l | xargs -n 1 git push --delete origin
```
and then delete the local copies:
```
git tag | xargs git tag -d
```

## [How do you rename a Git tag?](https://stackoverflow.com/questions/1028649/how-do-you-rename-a-git-tag)
```sh
git tag new old
git tag -d old
git push origin :refs/tags/old
git push --tags

git pull --prune --tags # Finally, make sure that the other users remove the deleted tag. Please tell them (co-workers) to run the following command
```

## [Remove a file from a Git repository without deleting it from the local filesystem](https://stackoverflow.com/questions/1143796/remove-a-file-from-a-git-repository-without-deleting-it-from-the-local-filesyste)

``` sh
# For single file:
git rm --cached mylogfile.log

# For single directory:
git rm --cached -r mydirectory
```

## 参考链接
- 《GitHub入门与实践》
- [10组最常用Git命令](http://mp.weixin.qq.com/s?__biz=MzA4MjU5NTY0NA==&mid=401074259&idx=1&sn=6e69ce5338eb5d9212953068165c1cd0&mpshare=1&scene=23&srcid=1122laeBDuW58x2VncUQ44xs)
- [Git教程-廖雪峰](http://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000)
- [Git远程操作详解](http://www.ruanyifeng.com/blog/2014/06/git_remote.html)
<div id="shortlog">
- [第 30 天：分享工作中幾個好用的 Git 操作技巧](https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/30.md)
</div>
- [^和~的区别](http://www.cnblogs.com/hutaoer/archive/2013/05/14/3078191.html)

  ```sh
  - `^`代表父提交,当一个提交有多个父提交时，可以通过在`^`后面跟上一个数字，表示第几个父提交，`^`相当于`^1`
  - `~`<n>相当于连续的<n>个`^`.
  - checkout只会移动HEAD指针，reset会改变HEAD的引用值
  ```
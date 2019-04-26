---
title: git配置
date: 2016-07-12 08:17:25
toc: true
comments: true
tags:
- git
---

## 设置用户名和邮箱
```
$ git config --global user.name "Lou"
$ git config --global user.email "lyloou6@gmail.com"

// 查看用户的配置信息
$ git config user.name
$ git config user.email
```

## 保存push时的用户名和密码
针对http协议的也可以不用总是输入用户名密码那么麻烦，如：`https://github.com/lyloou/hexo.git`，
可以通过设置`credential.help`来保存。
```
git config --global credential.helper store
```

## 网络配置：
```
git config --global http.proxy 'socks5://127.0.0.1:1080'
git config --global https.proxy 'socks5://127.0.0.1:1080'
```
- [git 设置和取消代理](https://gist.github.com/laispace/666dd7b27e9116faece6)

或：
```
git config --global http.proxy http://127.0.0.1:8118
git config --global https.proxy https://127.0.0.1:8118
```
[Windows下使用Privoxy转换socks5代理为Http代理 | 小田的blog](https://tzrgaga.github.io/2017/04/12/forward-socks-by-privoxy/)

## 配置别名
``` js
// 显示漂亮的分支日志：git lg
git config --global alias.lg "log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit"
```

## 解除上传文件大小限制
```js
git config http.postBuffer 524288000  
```
https://blog.csdn.net/zhiyuan_x/article/details/72954729


## 行尾结束符自动转换问题
`warning: LF will be replaced by CRLF in xx.txt`
如果项目的文件是依照文件的md5来作为标识，那么提交代码到远程仓库，文件的行尾结束符会自动发生改变，那么之前的md5标识就发挥不到作用
（这样的bug很难找），这时候就需要取消git的行尾结束符自动转换功能；
```sh
$ git config --global core.autocrlf false
```
- [Git - 配置 Git](https://git-scm.com/book/zh/v1/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git#格式化与空白)
- https://stackoverflow.com/questions/5834014/lf-will-be-replaced-by-crlf-in-git-what-is-that-and-is-it-important

## .gitignore文件
### `package.json`和`/package.json`两种表示方式的区别
- 前者是所有目录中的 `package.json`文件都被忽略；
- 后者是只有当前目录的 `package.json`文件被忽略；


## [Prevent commits in master or develop branch](https://stackoverflow.com/questions/40462111/git-prevent-commits-in-master-branch)
1. Go to your repository.
2. Create file .git/hooks/pre-commit with following content:
```sh
#!/bin/sh
branch="$(git rev-parse --abbrev-ref HEAD)"

if [ "$branch" = "develop" -o "$branch" = "master" ]; then
  echo "You can't commit directly to master or develop branch"
  exit 1
fi
```
3. Make it executable (not required on Windows):
```
$ chmod +x .git/hooks/pre-commit
```

To disable fast-forwad merges you must also add following option to your .git/config file:
```
[branch "master"]
    mergeoptions = --no-ff
```
If you want also protect master branch on your remote, check this answer: [How to restrict access to master branch on git](https://stackoverflow.com/questions/38864405/how-to-restrict-access-to-master-branch-on-git)


## NOTE
- 配置Git的时候，加上--global是针对当前用户起作用的，如果不加，那只针对当前的仓库起作用。
- 可以通过配置`~/.gitconfig`文件来删除和修改配置

## 参考链接
- [git-ssh 配置和使用](https://segmentfault.com/a/1190000002645623)
- [Which remote URL should I use?](https://help.github.com/articles/which-remote-url-should-i-use/)
- [gitignore.io](gitignore.io)
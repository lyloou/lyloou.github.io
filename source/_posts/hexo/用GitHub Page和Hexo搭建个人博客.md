---
title: 用GitHub Page和Hexo搭建个人博客
date: 2016-05-08 17:09:10
toc: true
comments: true
tags:
- hexo
---

## 步骤
1. 安装[Node.js](https://nodejs.org/en/)
2. 安装[Git ](https://git-scm.com/)
3. 安装Hexo（所有操作均在Windows自带的cmd命令行中运行：`npm install -g hexo`）
4. 切换到博客目录并初始化：
``` js
# cd d:/w/hexo
# hexo init
```

## 基本命令
``` js
hexo generate  == hexo g
hexo server    == hexo s
hexo deploy    == hexo d
hexo new       == hexo n
```

## 部署到Github
配置_config.yml
``` js
deploy:
  type: git
  repo: git@github.com:lyloou/lyloou.github.io.git
  branch: master
```

安装部署
``` js
npm install hexo-deployer-git --save
hexo d
```

## 绑定独立域名
* 在Hexo项目的Source中新建文件CNAME
* 添加`lyloou.com`
* 然后`hexo d -g`上传即可

## 常见问题
* 执行了 `hexo d -g`后，未能成功部署到网站：请先clean一下，`hexo clean`

---
## 外部链接
* [在Github上搭建一个Hexo博客系统](http://wenjunoy.com/2016/hexo-github-blog/)
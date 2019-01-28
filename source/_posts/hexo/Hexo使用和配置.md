---
title: Hexo使用和配置
date: 2016-05-09 22:18:18
tags:
- hexo
---
## 摘要：
主要内容：
本文介绍我在搭建本博客平台时用到的工具、插件，以及遇到的问题；


## 文档管理工具
Android Studio | IDEA

### 通过template方便创建文档
`File -> Setting -> Editor -> File and Code Templates` 
    ```
    ---
    title: ${NAME}
    date: ${DATE} ${TIME}
    toc: true
    comments: true
    tags:
    - ${Tag}
    ---
    ```

## 教程、文档、API
网址：`https://hexo.io`
安装hexo教程：`https://hexo.io/zh-cn/docs/`


## 主题选择
网址：`https://hexo.io/themes/`

## 插入多媒体
#### 插入图片：
    ```
    // 方式1，加入本地图片：
    // 首先需要在source中加入文件夹images，并放入图片smile01.gif;
    ![](/images/smile01.gif)
    
    // 方式2，加入图床中的图片地址：
    ![](图片地址)
    
    // 方式3，获取到github的raw图片网址；
    ```

#### 插入音乐：
    ```
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 
        src="http://music.163.com/outchain/player?type=2&id=25706282&auto=0&height=66">
    </iframe>
    ```

#### 插入视频：
    ```
    <center>
    <iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 
        src="http://music.163.com/outchain/player?type=2&id=25706282&auto=0&height=66">
    </iframe>	
    </center>
    ```

外部链接：
* [Hexo博客添加图片、音乐、视频](http://blog.wleyuan.me/2015/07/18/Hexo-AddSoundPicMovie/)



---

## 问题列表

### Error Local hexo not found
具体描述：从github上直接克隆下来的源码，执行`hexo s`会出现错误：
```
Error Local hexo not found in /XXX
Error Try running: 'npm install hexo --save'
```

原因分析：
`.gitignore`文件中忽略了`node_modules`文件夹，所以从github上的克隆的源码中不存在此文件夹；

解决方案：
重新执行`npm install`命令即可；（用自带CMD）
执行 `npm install`可能会出现失败的警告，有可能是npm版本问题：
执行下面命令来降低npm的版本：
`npm install -g npm@3.3.12`


外部连接：
* [用Hexo写博客 - ERROR Local hexo not found in xxx](http://blog.csdn.net/burststar/article/details/45115905)
* [npm WARN optional dep failed, continuing fsevents@1.0.6](https://github.com/foreverjs/forever/issues/788)


### add Read More
方法：在需要截断的地方插入`<!--more-->`即可。
外部连接：[Hexo自动添加ReadMore标记](http://twiceyuan.com/2014/05/25/hexo%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0readmore%E6%A0%87%E8%AE%B0/)

> （解决问题的方法：将错误日志中的关键部分择取关键字交给Google；）
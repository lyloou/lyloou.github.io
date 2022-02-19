---
title: 【Windows】win11相关
date: 2022-02-03 18:32:15
toc: true
comments: true
tags:
  - windows
---

## 桌面

## 关闭弹性滚动

进入：`edge://flags/`

disable `Microsoft Edge scrolling personality`

## 恢复 win10 桌面右键菜单

[Win11 恢复 Win10 经典右键菜单 亲测有效\_admans 的专栏-CSDN 博客\_win11 换回 win10 右键](https://blog.csdn.net/admans/article/details/121302883)

管理员权限运行

```bat
reg.exe add "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /f /ve
```

重启资源管理器：
`taskkill /f /im explorer.exe&&explorer.exe`

> [cmd /c taskkill /f /im explorer.exe&&explorer.exe 这命令什么意思\_百度知道](https://zhidao.baidu.com/question/1365850274792601979.html?qbl=relate_question_2)

恢复 win11

```bat
reg.exe delete "HKCU\Software\Classes\CLSID\{86ca1aa0-34aa-4e8b-a509-50c905bae2a2}\InprocServer32" /va /f
```

其它方案：startAllback 软件

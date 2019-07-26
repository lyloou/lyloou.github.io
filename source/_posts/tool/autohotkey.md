---
title: autohotkey定制
sticky: 10
date: 2016-05-21 18:09:37
toc: true
comments: true
tags:
  - autohotkey
  - tool
---

## 摘要：

这里介绍了个人的 AutoHotKey 配置，包括它的便利性、用法说明等。在文章最后提供配置代码；

## 简单介绍

```
只要是可以编辑的地方，都用像vim一样的规则控制光标。
```

当我有了这样的想法时，我找到了`Autohotkey`。

**使用 Autohotkey 带来其他便利：**

```
* 一次按键，在浏览器中用指定搜索引擎搜索选中的文字。
* 一次按键，打开指定的某一个软件或同时打开几个软件。（开机后，一个按键打开所有必备软件）
* 一次按键，可以输入自定义的模板：例如输入`.dta`，就能达到输入`2017-01-11 18:57:55`的效果。
* 一次按键，快速输入特殊符号（●、★、×、√ 等等）。
```

## 举例说明

**光标控制**

```
* 光标左移一次：Alt+h
* 光标右移一次：Alt+l
* 光标上移一次：Alt+,
* 光标下移一次：Alt+i
* 光标置于行首：Alt+0
* 光标置于行尾：Alt+4
* 选中光标位置到行首的文字：Shift+Alt+0
* 选中光标位置到行尾的文字：Shift+Alt+4
* 删除右侧一个字符（同`Delete`按键）：Alt+'
* 无论光标在当前行何处，新起一行：Shift+Enter
```

**搜索**

```
* 选中文字，用谷歌搜索：alt+g
```

**导航标签**

```
* 下一个标签：Alt+k
* 上一个标签：Alt+j
* 新建标签：Alt+t
```

**控制窗口**
通过`MoveWindows.ahk`文件来启用。

```
* 按住alt键，左键拖拽窗口任意地方可以移动窗口；（非最大化模式）
* 按住alt键，右键拖拽窗口，可以调整窗口的对象；（非最大化模式）
```

## 小技巧

通过`#Include, MoveWindows.ahk`，这种方式可以加载配置文件。
这样就不用将所有文件都写在一个配置文件，而是放在不同的文件中，然后通过`#Include, MoveWindows.ahk`来加载。
模块化管理，更容易变更。（有些设置好像不能生效，让我又改回去了）

## 配置代码

```ini
#Include, Plugins/MoveWindows.ahk

#!p::suspend ;挂起所有autohotkey按键
#!o::Edit ;打开配置文件
Capslock::Enter ;大小写按键替换成Enter键

;LWin & WheelUp::Send ^#{left}
;LWin & WheelDown::Send ^#{right}

#m::WinMinimize, A ; 最小化当前窗口
#`::WinMinimize, A ; 最小化当前窗口

; 启动指定的bat文件（可以在bat文件中启动其他程序）
#a::run win_a
#c::run win_c
#g::run win_g
#q::run win_q
#s::run win_s
#t::run win_t
#w::run win_w

#n::run notepad

;光标方向控制
!i::Send {up} ;光标上移
!,::Send {down} ;光标下移
!h::Send {left} ;光标左移
!l::Send {right} ;光标右移
!4::Send, {end}  ;到行末
!0::Send, {home}  ;到行首



;编辑区域操作
Shift & enter::send {end}{enter} ;下起一行
+^!h::send,+^{left} ;选中左移一个单词
+^!l::send,+^{right} ;选中右移一个单词
+!i::send,{shiftdown}{up} ;选中上移
+!,::send,{shiftdown}{down} ;选中下移
+!h::send,{shiftdown}{left} ;选中左移
+!l::send,{shiftdown}{right} ;选中右移
+!4::send,+{end} ;选中当前光标位置到行末
+!0::send,+{home} ;选中当前光标位置到行首

;复制当前行到剪切板
+!c::
send,{home}{shiftdown}{end}{ShiftUp}
Send,^c
Send, {end}
Return



;替换按键
!n::Send ^n ;新建
!w::Send ^w ;关闭
!v::Send ^v ;粘贴
!x::Send ^x ;剪切
!c::Send ^c ;复制
!s::Send ^s ;保存
!'::Send {delete} ;删除光标后面的一个字母或汉字

;特殊符号
;「
![::
clipboard = 「
send ^v
return

;
!]::
clipboard = 」
send ^v
return

;时间输入
;如：14:19:59
::.tt::
d = %A_Hour%:%A_Min%:%A_Sec%
clipboard = %d%
Send ^v
return

;如：2016.01.16
::.dd::
d = %A_YYYY%.%A_MM%.%A_DD%
clipboard = %d%
Send ^v
return

;如：2016-05-08 17:09:10
::.dta::
d = %A_YYYY%-%A_MM%-%A_DD% %A_Hour%:%A_Min%:%A_Sec%
clipboard = %d%
Send ^v
return

;如：[01.06 14:00]
::.dt::
d =  [%A_MM%.%A_DD% %A_Hour%:%A_Min%]
clipboard = %d%
Send ^v
return


;用google搜索
!g::
Send ^c
Run http://www.google.com/search?q=%clipboard%
return


;for chrome
#IfWinActive ahk_class Chrome_WidgetWin_1
!j::Send ^+{Tab}
!k::Send ^{Tab}
!t::Send ^t
return
```

## 注意

**！！！** 如果要通过剪切板输出中文，不要将配置文件设置为 `UTF-8`,而是要设置为 `GBK`（坑了我好长时间呢）

## 参考

- [【Tool】使用 Autohotkey - 木子楼的专栏 - CSDN 博客](https://blog.csdn.net/ly1414725328/article/details/49641503)

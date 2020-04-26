---
title: firefox
date: 2019-09-04 22:29:25
toc: true
comments: true
tags:
  - tool
---

## 插件

- Adblock Plus
  > 拦截广告
- Auto Tab Discard
  > Auto Tab Discard a lightweight extension that uses the native method (tabs.discard) to unload or discard browser tabs which significantly reduces the memory footprint of your browser when many tabs are in use.
- Gesturefy
  > Navigate, operate and browse faster with mouse gestures! A customizable mouse gesture add-on with a variety of different commands.
- HightlightAll
  > Highlights all occurrences of the selected text.
- Markdown Link
  > Generates a markdown link from title and URI of the current page. (alt + insert)
- Octotree
  > Github code tree on steroids
- Proxy SwitchyOmega
  > proxy setting
- Remove Redirect
  > Remove intermediary pages that some pages use before redirecting to a final page.
- FeHelper
  > FE 助手：JSON 工具、代码美化、代码压缩、二维码工具、网页定制工具、便签笔记，等等
- ScrollAnywhere
  > Drag scrollbar with your middle mouse button anywhere on the page. Supports also "grab and drag" style and Momentum.
- Vimiue
  > The Hacker's Browser. Vimium provides keyboard shortcuts for navigation and control in the spirit of Vim.

## firefox 设置每次访问时检查缓存

1. 在 firefox 的地址栏上输入 about:config 回车
2. 找到 browser.cache.check_doc_frequency 选项，双击将
3. 改成 1 保存即可。

选项每个值都是什么含义的。请看下面的解释：
0: Once per session 每个进程一次 每次启动 Firefox 时检查
1: Each time 【开发人员强烈建议开这个】每次访问此页时检查
2: Never
3: When appropriate/automatically

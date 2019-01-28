---
title: atom定制
date: 2016/10/28 7:37
toc: true
comments: true
tags:
- editor
- tool
---

| [ubuntu 下 atom 禁用 alt+key 调出菜单](https://my.oschina.net/oldfeel/blog/530233)
> 打开 edit -> preference -> open config folder -> init.coffee, 添加
```js
# Get rid of the alt-menu shortcuts
atom.menu.template.forEach (t) ->
  t.label = t.label.replace("&", "")
atom.menu.update()
```

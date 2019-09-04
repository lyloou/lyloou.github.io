---
title: vscode定制
date: 2016/10/29 7:37
toc: true
comments: true
tags:
  - tool
  - editor
---

## 快捷键

- 同时选中所有匹配的 Ctrl+Shift+L
- 回退上一个光标操作 Ctrl+U
- 移动到定义处：F12 （或者：win+alt+left click）
- 找到所有的引用：Shift+F12

## [Snippets in Visual Studio Code](https://code.visualstudio.com/docs/editor/userdefinedsnippets)

## 配置编辑器的显示语言（菜单、控制台等）

1. Ctrl+Shift+P
2. Cofingure Language
3. https://code.visualstudio.com/docs/getstarted/locales

## 插件

- Git Blame
- beautify
- vscode-icons
- gitignore
- vscode-wechat
- code runner
  - [解决 VS Code 使用 code runner 开发 Python 乱码问题 - clemente - 博客园](https://www.cnblogs.com/clemente/archive/2018/12/clemente/p/10056838.html)
- vetur
- auto rename tag

## setting.json

```json
{
  "editor.fontSize": 15,
  "editor.fontFamily": "Fira Code, Monaco, Consolas, 'Courier New', monospace",
  "editor.fontLigatures": true,
  "files.autoGuessEncoding": true,
  "java.errors.incompleteClasspath.severity": "ignore",
  "window.menuBarVisibility": "default",
  "workbench.activityBar.visible": true,
  "terminal.integrated.shell.windows": "D:\\c\\git\\bin\\bash.exe",

  "window.openFoldersInNewWindow": "on",
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 2000,
  "window.zoomLevel": 0,
  "editor.minimap.enabled": false,
  "workbench.editor.enablePreview": false,
  // 控制编辑器是否在滚动时使用动画
  "editor.smoothScrolling": true,
  // 总是隐藏打开的文件
  "explorer.openEditors.visible": 0,
  "window.title": "${rootName}${separator}${activeEditorLong}",
  "workbench.iconTheme": "vscode-icons",
  "editor.accessibilitySupport": "off",
  "files.eol": "\n",
  "window.enableMenuBarMnemonics": false,
  "[markdown]": {
    "editor.quickSuggestions": true
  },
  "editor.tabCompletion": "on",
  "vetur.format.defaultFormatter": {
    "html": "prettier",
    "css": "prettier",
    "postcss": "prettier",
    "scss": "prettier",
    "less": "prettier",
    "js": "prettier",
    "ts": "prettier",
    "stylus": "stylus-supremacy"
  }
}
```

## keybindings.json

```json
// 将键绑定放入此文件中以覆盖默认值
[
  // =======> 方向
  // 上
  {
    "key": "alt+i",
    "command": "cursorUp",
    "when": "editorTextFocus"
  },
  // 下
  {
    "key": "alt+,",
    "command": "cursorDown",
    "when": "editorTextFocus"
  },
  // 左
  {
    "key": "alt+h",
    "command": "cursorLeft",
    "when": "editorTextFocus"
  },
  // 右
  {
    "key": "alt+l",
    "command": "cursorRight",
    "when": "editorTextFocus"
  },
  // 开始
  {
    "key": "alt+0",
    "command": "cursorHome",
    "when": "editorTextFocus"
  },
  // 结束
  {
    "key": "alt+4",
    "command": "cursorEnd",
    "when": "editorTextFocus"
  },
  // =======> 选择
  // 选中-上
  {
    "key": "shift+alt+i",
    "command": "cursorUpSelect",
    "when": "editorTextFocus"
  },
  // 选中-下
  {
    "key": "shift+alt+,",
    "command": "cursorDownSelect",
    "when": "editorTextFocus"
  },
  // 选中-左
  {
    "key": "shift+alt+h",
    "command": "cursorLeftSelect",
    "when": "editorTextFocus"
  },
  // 选中-右
  {
    "key": "shift+alt+l",
    "command": "cursorRightSelect",
    "when": "editorTextFocus"
  },
  // 选中-开始
  {
    "key": "shift+alt+0",
    "command": "cursorHomeSelect",
    "when": "editorTextFocus"
  },
  // 选中-结束
  {
    "key": "shift+alt+4",
    "command": "cursorEndSelect",
    "when": "editorTextFocus"
  },
  // 选中-左（单词）
  {
    "key": "ctrl+shift+alt+h",
    "command": "cursorWordStartLeftSelect",
    "when": "editorTextFocus"
  },
  // 选中-右（单词）
  {
    "key": "ctrl+shift+alt+l",
    "command": "cursorWordEndRightSelect",
    "when": "editorTextFocus"
  },
  // 扩选
  {
    "key": "alt+w",
    "command": "editor.action.smartSelect.grow",
    "when": "editorTextFocus"
  },
  // 缩选
  {
    "key": "alt+shift+w",
    "command": "editor.action.smartSelect.shrink",
    "when": "editorTextFocus"
  },
  // =======> 编辑
  // 复制
  {
    "key": "alt+c",
    "command": "editor.action.clipboardCopyAction",
    "when": "editorTextFocus"
  },
  // 粘贴
  {
    "key": "alt+v",
    "command": "editor.action.clipboardPasteAction",
    "when": "editorTextFocus && !editorReadonly"
  },
  // save
  {
    "key": "alt+s",
    "command": "workbench.action.files.save"
  },
  // 删除
  {
    "key": "alt+'",
    "command": "deleteRight",
    "when": "editorTextFocus && !editorReadonly"
  },
  // =======> 导航
  // 标签-左
  {
    "key": "alt+j",
    "command": "workbench.action.previousEditor"
  },
  // 标签-右
  {
    "key": "alt+k",
    "command": "workbench.action.nextEditor"
  }
]
```

## Snippets

```json
{
  // Place your snippets for markdown here. Each snippet is defined under a snippet name and has a prefix, body and
  // description. The prefix is what is used to trigger the snippet and the body will be expanded and inserted. Possible variables are:
  // $1, $2 for tab stops, $0 for the final cursor position, and ${1:label}, ${2:another} for placeholders. Placeholders with the
  // same ids are connected.
  // Example:
  "Add hexo header": {
    "prefix": "head",
    "body": [
      "---",
      "title: ${1:undefined}",
      "date: $CURRENT_YEAR-$CURRENT_MONTH-$CURRENT_DATE $CURRENT_HOUR:$CURRENT_MINUTE:$CURRENT_SECOND",
      "toc: true",
      "comments: true",
      "tags:",
      "  - ${2:undefined}",
      "---"
    ],
    "description": "Add hexo header"
  },
  "Add hexo image url": {
    "prefix": "img",
    "body": [
      "![${1:this is an image}](https://github.com/lyloou/img/raw/develop/z/${2:$CURRENT_YEAR$CURRENT_MONTH$CURRENT_DATE$CURRENT_HOUR$CURRENT_MINUTE$CURRENT_SECOND.png})"
    ],
    "description": "Add hexo image url"
  }
}
```

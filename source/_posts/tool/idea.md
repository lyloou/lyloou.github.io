---
title: idea定制
date: 2017.02.24 10:13
toc: true
comments: true
tags:
  - tool
  - idea
---

## 插件

- GitToolBox
- CamelCase: CamelCase, camelCase, snake_case and SNAKE_CASE
- Past Images into Markdown
- .ignore
- GsonFormat
- Markdown support
- GO
- Lombok plugin
- Mybatis plugin
- AceJump
- Key promoter X
- Alibaba Java Coding Guidelines
- Database navigator
- Rainbow Brackets 

- https://www.hollischuang.com/archives/3220

## THEME

http://ethanschoonover.com/solarized

## 取消折叠代码

Settings | Editor | General | Code Folding

- [editor - Intellij IDEA 2018.1 - Disable simple comment folding - Stack Overflow](https://stackoverflow.com/questions/49132093/intellij-idea-2018-1-disable-simple-comment-folding)

## set author and date

Settings -> Editor -> File and code templates -> Includes -> File Header

```java
/**
 * @author ${USER}
 * @date ${YEAR}/${MONTH}/${DAY}
 */
```

## 配置

```xml
<keymap version="1" name="louva" parent="Default for XWin">
  <action id="$Copy">
    <keyboard-shortcut first-keystroke="ctrl c" />
    <keyboard-shortcut first-keystroke="ctrl insert" />
    <keyboard-shortcut first-keystroke="alt c" />
  </action>
  <action id="$Cut">
    <keyboard-shortcut first-keystroke="ctrl x" />
    <keyboard-shortcut first-keystroke="shift delete" />
    <keyboard-shortcut first-keystroke="alt x" />
  </action>
  <action id="$Delete">
    <keyboard-shortcut first-keystroke="delete" />
    <keyboard-shortcut first-keystroke="alt quote" />
  </action>
  <action id="$Paste">
    <keyboard-shortcut first-keystroke="ctrl v" />
    <keyboard-shortcut first-keystroke="shift insert" />
    <keyboard-shortcut first-keystroke="alt v" />
  </action>
  <action id="ActivateRunToolWindow">
    <keyboard-shortcut first-keystroke="alt r" />
  </action>
  <action id="CloseContent">
    <keyboard-shortcut first-keystroke="ctrl f4" />
    <keyboard-shortcut first-keystroke="shift alt w" />
  </action>
  <action id="CodeInspection.OnEditor" />
  <action id="Console.Execute" />
  <action id="Editor Copy">
    <keyboard-shortcut first-keystroke="alt c" />
  </action>
  <action id="Editor Cut">
    <keyboard-shortcut first-keystroke="alt x" />
  </action>
  <action id="Editor Delete">
    <keyboard-shortcut first-keystroke="alt quote" />
  </action>
  <action id="Editor Paste">
    <keyboard-shortcut first-keystroke="alt v" />
  </action>
  <action id="EditorDown">
    <keyboard-shortcut first-keystroke="down" />
    <keyboard-shortcut first-keystroke="alt comma" />
  </action>
  <action id="EditorDownWithSelection">
    <keyboard-shortcut first-keystroke="shift down" />
    <keyboard-shortcut first-keystroke="shift alt comma" />
  </action>
  <action id="EditorLeft">
    <keyboard-shortcut first-keystroke="left" />
    <keyboard-shortcut first-keystroke="alt h" />
  </action>
  <action id="EditorLeftWithSelection">
    <keyboard-shortcut first-keystroke="shift left" />
    <keyboard-shortcut first-keystroke="shift alt h" />
  </action>
  <action id="EditorLineEnd">
    <keyboard-shortcut first-keystroke="end" />
    <keyboard-shortcut first-keystroke="alt 4" />
  </action>
  <action id="EditorLineEndWithSelection">
    <keyboard-shortcut first-keystroke="shift end" />
    <keyboard-shortcut first-keystroke="shift alt 4" />
  </action>
  <action id="EditorLineStart">
    <keyboard-shortcut first-keystroke="home" />
    <keyboard-shortcut first-keystroke="alt 0" />
  </action>
  <action id="EditorLineStartWithSelection">
    <keyboard-shortcut first-keystroke="shift home" />
    <keyboard-shortcut first-keystroke="shift alt 0" />
  </action>
  <action id="EditorNextWordWithSelection">
    <keyboard-shortcut first-keystroke="shift ctrl right" />
    <keyboard-shortcut first-keystroke="shift ctrl alt l" />
  </action>
  <action id="EditorPreviousWordWithSelection">
    <keyboard-shortcut first-keystroke="shift ctrl left" />
    <keyboard-shortcut first-keystroke="shift ctrl alt h" />
  </action>
  <action id="EditorRight">
    <keyboard-shortcut first-keystroke="right" />
    <keyboard-shortcut first-keystroke="alt l" />
  </action>
  <action id="EditorRightWithSelection">
    <keyboard-shortcut first-keystroke="shift right" />
    <keyboard-shortcut first-keystroke="shift alt l" />
  </action>
  <action id="EditorSelectWord">
    <keyboard-shortcut first-keystroke="ctrl w" />
    <keyboard-shortcut first-keystroke="alt w" />
  </action>
  <action id="EditorUp">
    <keyboard-shortcut first-keystroke="up" />
    <keyboard-shortcut first-keystroke="alt i" />
  </action>
  <action id="EditorUpWithSelection">
    <keyboard-shortcut first-keystroke="shift up" />
    <keyboard-shortcut first-keystroke="shift alt i" />
  </action>
  <action id="NextSplitter">
    <keyboard-shortcut first-keystroke="shift alt n" />
  </action>
  <action id="NextTab">
    <keyboard-shortcut first-keystroke="alt right" />
    <keyboard-shortcut first-keystroke="alt equals" />
  </action>
  <action id="PopupHector" />
  <action id="PrevSplitter">
    <keyboard-shortcut first-keystroke="shift alt p" />
  </action>
  <action id="PreviousTab">
    <keyboard-shortcut first-keystroke="alt left" />
    <keyboard-shortcut first-keystroke="alt minus" />
  </action>
  <action id="ShowReformatFileDialog" />
  <action id="Annotate">
      <keyboard-shortcut first-keystroke="ctrl alt 0" />
    </action>
  <action id="SplitHorizontally">
    <keyboard-shortcut first-keystroke="shift alt o" />
  </action>
  <action id="SplitVertically">
    <keyboard-shortcut first-keystroke="shift alt e" />
  </action>
  <action id="TabShiftActions.ShiftUp" />
  <action id="hg4idea.QPushAction" />
</keymap>
```

## [IntelliJ IDEA: change open with (associated application) preference - Stack Overflow](https://stackoverflow.com/questions/44699658/intellij-idea-change-open-with-associated-application-preference)

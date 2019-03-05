---
title: Java日志
date: 2019-01-18 19:34:03
toc: true
comments: true
tags:
- java
---


- [SLF4j Vs Log4j - Which one is better? - HowToDoInJava](https://howtodoinjava.com/log4j/slf4j-vs-log4j-which-one-is-better/)
- [https://www.hollischuang.com/archives/3000](https://www.hollischuang.com/archives/3000)
- [Top 10 Tips on Logging in Java - Tutorial](https://javarevisited.blogspot.com/2011/05/top-10-tips-on-logging-in-java.html#axzz5dIpc21eU)


- [Intellij IDEA live template for SLF4J logger | chhh, quiet plxplx...](http://3rdaftergod.blogspot.com/2017/01/intellij-idea-live-template-for-slf4j.html)

How to define a live template

    Go to File->Settings->Editor->Live Templates.
    In the right panel tree select category other.
    Click the plus (+) sign on the top right, select Live Template.
    Set
        Abbreviation: log
        Description: Inserts private static Logger for slf4j
        Template text: private static final org.slf4j.Logger logger = org.slf4j.LoggerFactory.getLogger($CLASS_NAME$.class);$END$
    Now click the Edit Variables button, we will tell the IDE what $CLASS_NAME$ means here. $END$ means where to place the cursor after template expansion.
        Name: CLASS_NAME
        Expression: className()
        Default value: leave empty
        Skip if defined: true (check the checkbox)
    At the very bottom look for text Applicable in with a link Change next to it, click it. Select Java->declaration.

Congratulations, you're done! Just type log and press Tab anywhere in the class declaration.
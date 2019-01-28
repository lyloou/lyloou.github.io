---
title: Command Editing Shortcuts
date: 2018-10-24 10:12:15
toc: true
comments: true
tags:
- linux
---

移除一句话中的某个单词的词尾：
如: select key<cursour_is_here>_error from table1;
如果想要删除`_error`，可以按`Alt+D`;


Bash Shortcuts For Maximum Productivity
https://www.skorks.com/2009/09/bash-shortcuts-for-maximum-productivity/

SKORKS
Bash Shortcuts For Maximum Productivity
September 15, 2009 By Alan Skorkin 82 Comments

MaximumIt may or may not surprise you to know that the bash shell has a very rich array of convenient shortcuts that can make your life, working with the command line, a whole lot easier. This ability to edit the command line using shortcuts is provided by the GNU Readline library. This library is used by many other *nix application besides bash, so learning some of these shortcuts will not only allow you to zip around bash commands with absurd ease :), but can also make you more proficient in using a variety of other *nix applications that use Readline. I don’t want to get into Readline too deeply so I’ll just mention one more thing. By default Readline uses emacs key bindings, although it can be configured to use the vi editing mode, I however prefer to learn the default behavior of most applications (I find it makes my life easier not having to constantly customize stuff). If you’re familiar with emacs then many of these shortcuts will not be new to you, so these are mostly for the rest of us :).
Command Editing Shortcuts

    Ctrl + a – go to the start of the command line
    Ctrl + e – go to the end of the command line
    Ctrl + k – delete from cursor to the end of the command line
    Ctrl + u – delete from cursor to the start of the command line
    Ctrl + w – delete from cursor to start of word (i.e. delete backwards one word)
    Ctrl + y – paste word or text that was cut using one of the deletion shortcuts (such as the one above) after the cursor
    Ctrl + xx – move between start of command line and current cursor position (and back again)
    Alt + b – move backward one word (or go to start of word the cursor is currently on)
    Alt + f – move forward one word (or go to end of word the cursor is currently on)
    Alt + d – delete to end of word starting at cursor (whole word if cursor is at the beginning of word)
    Alt + c – capitalize to end of word starting at cursor (whole word if cursor is at the beginning of word)
    Alt + u – make uppercase from cursor to end of word
    Alt + l – make lowercase from cursor to end of word
    Alt + t – swap current word with previous
    Ctrl + f – move forward one character
    Ctrl + b – move backward one character
    Ctrl + d – delete character under the cursor
    Ctrl + h – delete character before the cursor
    Ctrl + t – swap character under cursor with the previous one

Command Recall Shortcuts

    Ctrl + r – search the history backwards
    Ctrl + g – escape from history searching mode
    Ctrl + p – previous command in history (i.e. walk back through the command history)
    Ctrl + n – next command in history (i.e. walk forward through the command history)
    Alt + . – use the last word of the previous command

Command Control Shortcuts

    Ctrl + l – clear the screen
    Ctrl + s – stops the output to the screen (for long running verbose command)
    Ctrl + q – allow output to the screen (if previously stopped using command above)
    Ctrl + c – terminate the command
    Ctrl + z – suspend/stop the command

Bash Bang (!) Commands

Bash also has some handy features that use the ! (bang) to allow you to do some funky stuff with bash commands.

    !! – run last command
    !blah – run the most recent command that starts with ‘blah’ (e.g. !ls)
    !blah:p – print out the command that !blah would run (also adds it as the latest command in the command history)
    !$ – the last word of the previous command (same as Alt + .)
    !$:p – print out the word that !$ would substitute
    !* – the previous command except for the last word (e.g. if you type ‘find some_file.txt /‘, then !* would give you ‘find some_file.txt‘)
    !*:p – print out what !* would substitute

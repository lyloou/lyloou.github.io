---
title: vim
date: 2018-07-30 09:07:15
toc: true
comments: true
tags:
- linux
- vim
---

## Vim-Plug
https://github.com/junegunn/vim-plug
```
curl -fLo ~/.vim/autoload/plug.vim --create-dirs \
    https://raw.githubusercontent.com/junegunn/vim-plug/master/plug.vim
```

## 用vim编辑上一次输入的命令
```sh
fc 
```

## [当你在vi中修改了半天配置文件,然后发现没有写权限,没有比这更令人感到挫败了,此时你需要这条命令。](http://mingxinglai.com/cn/2012/08/you-had-better-know-instruction/)
```sh
:w !sudo tee %
# or
:w ! sudo tee %

# occur error 
:w! sudo tee %
```

## [Alternative tab navigation | Vim Tips Wiki | FANDOM powered by Wikia](http://vim.wikia.com/wiki/Alternative_tab_navigation)
```sh
" Tab navigation like Firefox.
nnoremap <C-S-tab> :tabprevious<CR>
nnoremap <C-tab>   :tabnext<CR>
inoremap <C-S-tab> <Esc>:tabprevious<CR>i
inoremap <C-tab>   <Esc>:tabnext<CR>i

nnoremap <C-PageDown> :tabprevious<CR>
nnoremap <C-PageUp>   :tabnext<CR>
inoremap <C-PageDown> <Esc>:tabprevious<CR>i
inoremap <C-PageUp>   <Esc>:tabnext<CR>i

nnoremap <C-t>     :tabnew<CR>
inoremap <C-t>     <Esc>:tabnew<CR>

```


## [vim插件: delimitmate[符号自动补全] ](http://www.wklken.me/posts/2015/06/07/vim-plugin-delimitmate.html)
> 触发后, 假设你要跳到补全后的符号后面继续编辑, 按Shift-Tab

## [You don’t need more than one cursor in vim](https://medium.com/@schtoeffel/you-don-t-need-more-than-one-cursor-in-vim-2c44117d51db)

## [vim插件: easy-align[快速对齐] ](http://www.wklken.me/posts/2015/06/07/vim-plugin-easyalign.html)
## [[分享]关于vim ](http://www.wklken.me/posts/2016/07/24/about-vim.html)
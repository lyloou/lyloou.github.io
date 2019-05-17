---
title: vim定制
date: 2018/1/29 20:37
toc: true
comments: true
tags:
- tool
- editor
---

## [command line - How to change visudo editor from nano to vim? - Ask Ubuntu](https://askubuntu.com/questions/539243/how-to-change-visudo-editor-from-nano-to-vim/539265)
```sh
sudo update-alternatives --config editor
```
	
## Ubuntu修改locale问题解决-Cannot set language to "zh_CN.utf-8"
```sh
sudo dpkg-reconfigure locales
```

```sh
" Vim-Plug {{{
call plug#begin('~/.vim/plugged')
Plug 'junegunn/vim-easy-align'
Plug 'valloric/youcompleteme'
Plug 'altercation/vim-colors-solarized'
Plug 'https://github.com/junegunn/vim-github-dashboard.git'
Plug 'SirVer/ultisnips' | Plug 'honza/vim-snippets'
Plug 'scrooloose/nerdtree', {'on': 'NERDTreeToggle'}
Plug 'tpope/vim-fireplace', {'for': 'clojure'}
Plug 'rdnetto/YCM-Generator', {'branch': 'stable'}
Plug 'fatih/vim-go', {'tag': '*'}
Plug 'nsf/gocode', {'tag': 'v.20150303', 'rtp':'vim'}
call plug#end()
" }}}

" General {{{
set nocompatible   
set nobackup
set noswapfile
set history=1024
set autochdir
set whichwrap=b,s,<,>,[,]
set nobomb
set backspace=indent,eol,start whichwrap+=<,>,[,]
set clipboard+=unnamed " Vim的默认寄存器和系统剪贴板共享
set winaltkeys=no
" }}}

" GUI {{{
"colorscheme tomorrow-night
set cursorline
set hlsearch
set incsearch
set number
set splitbelow
set splitright
"set guifont=Inconsolata:h20
" }}}

" Format {{{
set autoindent
set smartindent
set tabstop=4
set expandtab
set softtabstop=4
"set foldmethod=indent
set shiftwidth=4
set ls=2
syntax on
" }}}

" Keymap {{{
let mapleader=","

" 标签操作
map <leader>tn :tabnew<cr>
map <leader>tc :tabclose<cr>
map <leader>th :tabp<cr>
map <leader>tl :tabn<cr>

" 移动分割窗口
nmap <C-j> <C-w>j
nmap <C-k> <C-w>k
nmap <C-h> <C-w>h
nmap <C-l> <C-w>l 

" }}}
set completeopt-=preview

```
#!/bin/bash
echo """
自动更新目录文件：
获取当前目录。

获取所有文件，排序：目录、文件，
1. 如果是目录：生成【目录名/index.md链接】
2. 如果是文件：生成【文件名.md链接】

将1、2拼接后，放入本目录的index.md中。
如果是目录，递归操作。
"""

create_md_link() {
    path=$(pwd)

    files=$(ls $path)

    # 当前文件
    title="#### ${path##*/}\n"
    echo -e $title >index.md

    echo -e '\n###### 文件列表\n' >>index.md

    # 输出文件
    for filename in $files; do
        if [[ -f "$filename" && $filename =~ .*md$ ]]; then
            md_link=$(echo $filename | sed 's/\.[^.]*$//')
            md_link="- [$md_link]($md_link.md)"
            echo $md_link >>index.md
        fi
    done

    echo -e '\n###### 子目录列表\n' >>index.md

    # 输出目录
    for filename in $files; do
        if [ -d "$filename" ]; then
            md_link="- [$filename](./$filename/index.md)"
            echo $md_link >>index.md
            cd $filename
            create_md_link
            cd ..
        fi
    done
    echo "create md_files link success: $path"
}

create_md_link

# current_path=$(pwd)
# file_list=$(ls $current_path)
# for file in $file_list; do
#     child_dir=$current_path/$file
#     if [ -d "$child_dir" ]; then
#         cd $child_dir
#         create_md_link
#     fi
# done

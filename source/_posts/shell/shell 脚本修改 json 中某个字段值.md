---
title: shell 脚本修改 json 中某个字段值
date: 2019-11-18 11:34:52
toc: true
comments: true
tags:
  - shell
---

## shell 脚本修改 json 中某个字段的值

- 思路：通过 awk 来找到旧数据，然后用 sed 来替换旧数据

## 源码

config.json

```json
{
  "name": "the_name",
  "id": "132869",
  "content_url": "https://hot.example.com/",
  "enable_feature1": "true",
  "enable_feature2": "false"
}
```

config/mode1.sh

```sh
#!bin/bash
content_url_new="https://hot1.example.com/"
enable_feature1_new="true"
enable_feature2_new="true"
```

config/mode2.sh

```sh
#!bin/bash
content_url_new="https://hot2.example.com/"
enable_feature1_new="false"
enable_feature2_new="false"
```

main.sh

```sh
#!bin/bash

if [ "$1" != "mode1" -a "$1" != "mode2" ];then
    echo "tip:─┬─────── 您输入参数不对，请重试："
    echo "     │─────── 'mode1', 使用config/mode1.sh的配置"
    echo "     └─────── 'mode2', 使用config/mode2.sh的配置"
    exit 0
fi

case $1 in
mode1)
    . config/mode1.sh
;;
mode2)
    . config/mode2.sh
;;
*)
    echo "Usage: sh main.sh [mode1|mode2]"
    exit;
esac

# 如果要修改的内容在文档中唯一，可以做全局修改
content_url_old=$(awk -F"\"" '/content_url/{print $4}' example.json)
sed -e "s@$content_url_old@$content_url_new@g" -i example.json


# 如果要修改的内容在文档中不唯一，就需要针对那一行做修改。（例如，这个例子中有两个布尔类型的值）
enable_feature1_line=$(awk -F"\"" '/enable_feature1/{print NR}' example.json) # 记住行号
enable_feature1_old=$(awk -F"\"" '/enable_feature1/{print $4}' example.json)  # 获取旧数据
sed -e "$enable_feature1_line s@$enable_feature1_old@$enable_feature1_new@" -i example.json # 替换所在行的老数据

enable_feature2_line=$(awk -F"\"" '/enable_feature2/{print NR}' example.json) # 记住行号
enable_feature2_old=$(awk -F"\"" '/enable_feature2/{print $4}' example.json)  # 获取旧数据
sed -e "$enable_feature2_line s@$enable_feature2_old@$enable_feature2_new@" -i example.json # 替换所在行的老数据
```

运行

```sh
sh main.sh mode1
sh main.sh mode2
```

---
title: Hexo集成travis
date: 2019-01-28 14:13:14
tags:
- hexo
---

## 自动化前VS后
### 没有travis的流程
每次写完文章后，要手动运行以下命令部署
```sh
hexo clean --config source/_data/next.yml &&
hexo g --config source/_data/next.yml &&
hexo d --config source/_data/next.yml
```

### 基于travis的自动部署流程
有了travis，写好文章后，只需推送代码到GitHub仓库。其他的部署操作都由travis自动完成：
1. 提交并推送代码到GitHub；
2. Travis Ci 监听到 GitHub 仓库发生变化，开始依据 `.travis.yml` 脚本构建项目；
3. Travis Ci 构建完成后将生成的最终文件推送到GitHub；


## 可能遇到的问题

### Permission denied
原因：脚本没有运行权限
```sh
$ ./run_d.sh
/home/travis/.travis/job_stages: line 104: ./run_d.sh: Permission denied
The command "./run_d.sh" exited with 126.
```
在 `.travis.yml`的 `before_install:`阶段添加`x`权限：
```yml
- chmod +x ./run_d.sh
```

### Permission denied (publickey)
Q:
> fatal: Could not read from remote repository.
> Please make sure you have the correct access rights

A:
> If you want to push via ssh then travis needs to have access to the private part of the ssh key you generated. What you want to do is use the travis cli gem to encrypt the private key, add it to your repo and during the deploy stage decrypt it again and use it. Here's a [step-by-step](https://github.com/dwyl/learn-travis/blob/master/encrypted-ssh-keys-deployment.md)

为了能将travis构建后的文件推送到github，需要：
```sh
＃ 以下操作匀在客户端
sudo apt install ruby
sudo apt install ruby​​-dev
sudo gem install tr​​avis

# 1. 生成ssh密钥
ssh-keygen -C "lyloou@qq.com" -t rsa -b 2048 -f ~/.ssh/hexo
# 2. 将公钥内容贴到Github上项目的 「Settings -> Deploy keys -> Add deploy key」
# 3. 登录travis（会自动生成 ~/.travis/config.yml 文件）
travis login --auto
# 4. 在你的项目中运行以下命令，加密刚才生成的私钥，生成 hexo.enc 文件。 （注意提示内容，不要把密钥给提交到仓库了）
travis encrypt-file ~/.ssh/hexo --add
```

上面的第4步，做了这几件事：
```ini
- 加密ssh私钥, 生成一个hexo.enc。这个文档需要放到项目里，上面的输出已经提示了，千万别把原始的私钥放进去了~~
- 相应的解密k/v值以环境变量方式存在Travis CI上, 见Travis CI上项目的「More options -> Settings -> Environment Variables」
- 将解密命令自动写入到本地项目的 .travis.yml 里
```
加密之后的`hexo.enc`文件，只有 travis 能解密使用。
因为在login的时候，将解密的密钥存放到`Environment Variables`中了，拿不到这个就无法解密还原了。

接着通过 ssh_agent 的方式配置`ssh client`：
```yml
before_install:
  - openssl aes-256-cbc -K $encrypted_f9a8a4d68f34_key -iv $encrypted_f9a8a4d68f34_iv
    -in wiki.enc -out ~/.ssh/id_rsa -d
  - chmod 600 ~/.ssh/id_rsa
  - eval $(ssh-agent)
  - ssh-add ~/.ssh/id_rsa
```

## 最终配置
```yml
language: node_js
node_js: stable
branches:
  only:
    - source
cache:
  apt: true
  yarn: true
  directories:
    - node_modules
before_install:
  - openssl aes-256-cbc -K $encrypted_a685f241ac15_key -iv $encrypted_a685f241ac15_iv
    -in hexo.enc -out ~/.ssh/id_rsa -d
  - chmod 600 ~/.ssh/id_rsa
  - eval $(ssh-agent)
  - ssh-add ~/.ssh/id_rsa
  - export TZ='Asia/Shanghai'
  - git config --global user.name "$USER_NAME"
  - git config --global user.email "$USER_EMAIL"
  - curl -o- -L https://yarnpkg.com/install.sh | bash
  - export PATH=$HOME/.yarn/bin:$PATH
  - npm install -g hexo-cli
  - chmod +x ./run_d.sh
install:
  - yarn
script:
  - ./run_d.sh
after_success:
  - echo "oked!"
env:
  global:
    - USER_NAME: lyloou
    - USER_EMAIL: lyloou@qq.com
```

## 其他
在GitHub的`Readme.md`中显示构建结果
```md
[build-info](https://travis-ci.org/userName/repoName.svg)
```

## QA
Q: travis-ci node-sass: Command failed.
A: https://github.com/travis-ci/travis-ci/issues/9561

## 参考资料
- [使用 Travis 自动部署 Hexo 到 Github 与 自己的服务器 - 我的儿子叫酸奶 - SegmentFault 思否](https://segmentfault.com/a/1190000009054888)
- [Simiki基于Github Pages配合Travis CI做持续集成 - 扫文资讯](https://hk.saowen.com/a/8edd77efe1c7f306f67e7c71e764ad76184d9ff3675d6dcfc9913d913be24cbd)
- [用 Travis CI 自动部署 hexo - ac黄博客精选 - SegmentFault 思否](https://segmentfault.com/a/1190000004667156)

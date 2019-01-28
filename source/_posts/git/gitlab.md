---
title: gitlab
date: 2018-07-12 08:17:25
toc: true
comments: true
tags:
- git
---

## CI & CD

### .gitlab-ci.yml
- [Readme · Quick start · Ci · Help · GitLab](http://gitlab.renrenyoupin.com/help/ci/quick_start/README)
- [Configuration of your jobs with .gitlab-ci.yml](http://gitlab.renrenyoupin.com/help/ci/yaml/README.md)
- [Gitlab CI yaml官方配置文件翻译](https://segmentfault.com/a/1190000010442764)
- [用 GitLab CI 进行持续集成 | Scarletsky](https://scarletsky.github.io/2016/07/29/use-gitlab-ci-for-continuous-integration/)

### Runner
- [Install GitLab Runner using the official GitLab repositories | GitLab](https://docs.gitlab.com/runner/install/linux-repository.html)
```
curl -L https://packages.gitlab.com/install/repositories/runner/gitlab-runner/script.deb.sh | sudo bash

apt-cache madison gitlab-runner
sudo apt-get install gitlab-runner=10.8.0
```

- [Registering Runners | GitLab](https://docs.gitlab.com/runner/register/index.html)
```sh
sudo gitlab-runner register \
  --non-interactive \
  --url "http://gitlab.lyloou.com/" \
  --registration-token "xxxxxxxxxxxxx" \
  --executor "shell" \
  --description "shell-runner" \
  --tag-list "shell" \
  --run-untagged="true" \
  --locked="false" 
```

-[【GITLAB】 服务配置可持续集成部署的项目案例 - 安装篇 - 个人文章 - SegmentFault 思否](https://segmentfault.com/a/1190000013362589)
```
sudo gitlab-runner list
gitlab-runner unregister --url http://gitlab.example.com/ --token t0k3n
gitlab-runner unregister --name test-runner
gitlab-runner unregister --all-runners
```
# !!#ff0000
Runner的大版本号要和gitlab的在版本号保持一致。
如：Runner 10.8.0 ~ gitlab 10.2.4

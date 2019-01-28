---
title: vue相关
date: 2017.10.18 17:12
toc: true
comments: true
tags:
- js
---

## 官方文档：https://cn.vuejs.org

## [Uploading Files With VueJS and Axios](https://serversideup.net/uploading-files-vuejs-axios/)

## 读懂原理：
- [Vue.js——60分钟快速入门 - keepfool - 博客园](http://www.cnblogs.com/keepfool/p/5619070.html)
- [Vue.js——60分钟组件快速入门（上篇） - keepfool - 博客园](http://www.cnblogs.com/keepfool/p/5625583.html)
- [Vue.js——60分钟组件快速入门（下篇） - keepfool - 博客园](http://www.cnblogs.com/keepfool/p/5637834.html)
- [Vue.js——60分钟webpack项目模板快速入门 - keepfool - 博客园](http://www.cnblogs.com/keepfool/p/5678427.html)
- [Vue.js——vue-router 60分钟快速入门 - keepfool - 博客园](http://www.cnblogs.com/keepfool/p/5690366.html)

## 视频教程：[vue.js入门教程](http://www.imooc.com/learn/694)

## 注意事项
- webpack结合vue的时候，less中的元素重名会导致渲染错误。可以通过添加前缀来区别：
```less
.a{
    .container {
        background:#fff;
    }

    .nihao {
        color:#2f0;
        background:#c38;
    }
}

.b{
    .container {
        background:#000;
    }

    .nihao {
        color: #333;
    }
}
```

## 通过`scoped`来避免全局污染
```less
<style lang="less" scoped>
  @import "../../styles/product-list.less";
</style>

```

## [Vue 固定滚动位置的处理办法. - 前端 - 掘金](https://juejin.im/entry/5966372251882568d546f51d)

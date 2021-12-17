---
title: Spring 的生命周期
date: 2021-12-16 11:41:27
toc: true
comments: true
tags:
  - spring
  - java
---

#### Spring 的生命周期

1. 实例化（Instanctiation）
2. 属性填充（Populate）
3. 初始化（Initialization）
4. 销毁（Destruction）

> org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#doCreateBean
> ![img](C:\Users\lilou\Documents\My Knowledge\temp\6a48485b-33c7-453e-b9b5-86feb5152495\128\index_files\1b022eef-895d-4f8e-bd1b-a67bd8740a74.png)
> ![img](https://raw.githubusercontent.com/lyloou/img/develop/img/d0cd34bf-96d8-4a56-ae66-e41c3bac6c5d_20211216114015327_6687b3.jpg)

###### 1. 实例化

判断是否存在方法覆盖，如果有，使用 JDK 的反射机制来实例化。
如果没有，使用 CGLib 技术实例化。
![img](C:\Users\lilou\Documents\My Knowledge\temp\6a48485b-33c7-453e-b9b5-86feb5152495\128\index_files\d4ee5cad-5b5e-440a-8a3f-865cf5f10ab3.png)

###### 2.属性填充

分为：按名称填充、和按类型填充
![img](https://raw.githubusercontent.com/lyloou/img/develop/img/37667b6c-c43d-48ad-b7ce-e7d3123ed12c_20211216114015366_6bdf8b.png)

###### 3.初始化

1. Aware 相关回调
2. 初始化前置处理
3. 初始化
4. 初始化后置处理

> org.springframework.beans.factory.support.AbstractAutowireCapableBeanFactory#initializeBean
> ![img](https://raw.githubusercontent.com/lyloou/img/develop/img/ca4cb8e0-2c87-4d94-9db6-eaa6f38d4665_20211216114015353_f375f6.png)

###### 销毁

从容器中，移除 beanName
调用 DesposableBean.distroy 接口
![img](C:\Users\lilou\Documents\My Knowledge\temp\6a48485b-33c7-453e-b9b5-86feb5152495\128\index_files\faefd2dc-114c-4dbb-9850-99598310a635.png)

###### 参考资料

- 附件 1：Spring 生命周期-创建和初始化.pdf

- [Spring 源码解析](https://0f9de7f3.wiz06.com/wapp/pages/view/share/s/0fDuvP3SO4QS2Hb3sP2Di0ai1Gi4xr0PNQk-2VJor-2R5iil)
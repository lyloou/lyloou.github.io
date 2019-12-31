---
title: JetPack
date: 2018-11-08 14:54:29
toc: true
comments: true
tags:
  - android
---

- [Android 开发基础教程（2019）第 10 集 ViewModel\_哔哩哔哩 (゜-゜)つロ 干杯~-bilibili](https://www.bilibili.com/video/av53400133/?spm_id_from=333.788.videocard.12)

- [android/sunflower: A gardening app illustrating Android development best practices with Android Jetpack.](https://github.com/android/sunflower)

https://mp.weixin.qq.com/s?__biz=MzAxMTI4MTkwNQ==&mid=2650826588&idx=1&sn=21288ece071c7c0d1ead1d4cd8a95c67&chksm=80b7b3c2b7c03ad4877d1204f27734b7b5f13990d2af774df5b96f699cc28778e43843d007b2&scene=0#rd

```ini
1. Android Jetpack 架构组件之 Lifecycle（使用篇）
https://blog.csdn.net/Alexwll/article/details/80638905

2. Android Jetpack 架构组件之 Lifecycle（源码篇）
https://blog.csdn.net/Alexwll/article/details/82491901

3. Android Jetpack 架构组件之 ViewModel （源码篇）
https://blog.csdn.net/Alexwll/article/details/82459614

4. Android Jetpack 架构组件之 LiveData（使用、源码篇）
https://blog.csdn.net/Alexwll/article/details/82996003

5. Android Jetpack架构组件之 Paging（使用、源码篇）
https://blog.csdn.net/Alexwll/article/details/83246201

6. Android Jetpack 架构组件之 Room（使用、源码篇）
https://blog.csdn.net/Alexwll/article/details/83033460

7. Android Jetpack 架构组件之Navigation
https://blog.csdn.net/Alexwll/article/details/83244004

8. Android Jetpack架构组件之WorkManger
https://blog.csdn.net/Alexwll/article/details/83244871

```

[即学即用 Android Jetpack - ViewModel & LiveData - 简书](https://www.jianshu.com/p/81a284969f03)

> LiveData is an observable data holder class. Unlike a regular observable, LiveData is lifecycle-aware, meaning it respects the lifecycle of other app components, such as activities, fragments, or services.

> The ViewModel class is designed to store and manage UI-related data in a lifecycle conscious way. The ViewModel class allows data to survive configuration changes such as screen rotations.

可以通过下面的图来看 `ViewModel` 和 `LiveData` 之间的关系
![](https://upload-images.jianshu.io/upload_images/9271486-93980cb4a2458d6d.png?imageMogr2/auto-orient/strip|imageView2/2/w/803)
还可以通过下面的代码来看 `ViewModel` 和 `LiveData` 之间的关系

```kotlin
class ShoeModel constructor(shoeRepository: ShoeRepository) : ViewModel() {

    // 品牌的观察对象 默认观察所有的品牌
    private val brand = MutableLiveData<String>().apply {
        value = ALL
    }

    // 鞋子集合的观察类
    val shoes: LiveData<List<Shoe>> = brand.switchMap {
        // Room数据库查询，只要知道返回的是LiveData<List<Shoe>>即可
        if (it == ALL) {
            shoeRepository.getAllShoes()
        } else {
            shoeRepository.getShoesByBrand(it)
        }
    }

    fun setBrand(brand:String){
        this.brand.value = brand

        this.brand.map {

        }
    }

    fun clearBrand(){
        this.brand.value = ALL
    }

    companion object {
        private const val ALL = "所有"
    }
}
```

## 验证 LiveData 的在两个 fragments 上共享数据

- [即学即用 Android Jetpack - ViewModel & LiveData - 简书](https://www.jianshu.com/p/81a284969f03)

**源码**

```kotlin
// LoginLiveData
class LoginLiveData : MutableLiveData<LoginInfo>() {

    companion object {
        private lateinit var sInstance: LoginLiveData

        @MainThread
        fun get(): LoginLiveData {
            sInstance = if (::sInstance.isInitialized) sInstance else LoginLiveData()
            return sInstance
        }
    }
}

// LoginFragment.onViewCreated
Log.e("TTAG", "from LoginFragment, the init liveData is: ${LoginLiveData.get().value}")
LoginLiveData.get().observe(viewLifecycleOwner, Observer {
    Log.e("TTAG", "from LoginFragment, the liveData changed: $it")
})
Handler().postDelayed({
    LoginLiveData.get().apply {
        value = LoginInfo("login", "login", "login@qq.com")
    }
}, 2000)

// WelcomeFragment.onViewCreated
Log.e("TTAG", "from LoginFragment, the init liveData is: ${LoginLiveData.get().value}")
LoginLiveData.get().observe(viewLifecycleOwner, Observer {
    Log.e("TTAG", "from LoginFragment, the liveData changed: $it")
})
Handler().postDelayed({
    LoginLiveData.get().apply {
        value = LoginInfo("login", "login", "login@qq.com")
    }
}, 2000)
```

**日志**

```ini
# 首次进入welcome
E/TTAG: from WelcomeFragment, the init liveData is: null
E/TTAG: from WelcomeFragment, the liveData changed:LoginInfo(account=welcome, pwd=welcome, email=welcome@qq.com)
# 点击进入login
E/TTAG: from LoginFragment, the init liveData is: LoginInfo(account=welcome, pwd=welcome, email=welcome@qq.com)
E/TTAG: from LoginFragment, the liveData changed: LoginInfo(account=welcome, pwd=welcome, email=welcome@qq.com)
E/TTAG: from LoginFragment, the liveData changed: LoginInfo(account=login, pwd=login, email=login@qq.com)
```

## Room

[即学即用 Android Jetpack - Room - 简书](https://www.jianshu.com/p/815c7db24b6d)

[Android Room 框架学习 - 简书](https://www.jianshu.com/p/3e358eb9ac43)

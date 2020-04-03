---
title: 基于委托的SharedPreference封装
date: 2020-04-03 14:05:05
toc: true
comments: true
tags:
  - android
  - kotlin
---

## 委托教程

- [委托属性 - Kotlin 语言中文站](https://www.kotlincn.net/docs/reference/delegated-properties.html)

关于委托的教程，具体参考上面链接即可，下面直接给出`SharedPreferences`封装的代码。

## SharedPreference 封装

```kotlin
class DefaultSPreference<T>(key: String, defaultValue: T) :
    SPreference<T>("default", key, defaultValue)

open class SPreference<T>(
    private val spName: String,
    private val key: String,
    private val defaultValue: T
) : ReadWriteProperty<Any?, T> {
    val prefs: SharedPreferences by lazy {
        App.instance.getSharedPreferences(spName, Context.MODE_PRIVATE)
    }

    override fun getValue(thisRef: Any?, property: KProperty<*>): T {
        return findPreference(key, defaultValue)
    }

    override fun setValue(thisRef: Any?, property: KProperty<*>, value: T) {
        putPreference(key, value)
    }

    private fun <T> findPreference(name: String, default: T): T = with(prefs) {
        val res: Any = when (default) {
            is Long -> getLong(name, default)
            is String -> getString(name, default) ?: default
            is Int -> getInt(name, default)
            is Boolean -> getBoolean(name, default)
            is Float -> getFloat(name, default)
            else -> throw IllegalArgumentException("This type can not be resolved in SpPreferences")
        }
        @Suppress("UNCHECKED_CAST")
        res as T
    }

    private fun <U> putPreference(name: String, value: U) = with(prefs.edit()) {
        when (value) {
            is Long -> putLong(name, value)
            is String -> putString(name, value)
            is Int -> putInt(name, value)
            is Boolean -> putBoolean(name, value)
            is Float -> putFloat(name, value)
            else -> throw IllegalArgumentException("This type can not be saved into SpPreferences")
        }.apply()
    }
}

fun <T> SPreference<T>.remove(key: String) {
    prefs.edit().remove(key).apply()
}

fun <T> SPreference<T>.clear() {
    prefs.edit().clear().apply()
}
```

## 用法

```kotlin
var a: String by DefaultSPreference(Key.SCHEDULE_ITEM_A.name, "")
```

通过上面的委托，给 `a` 赋值就直接保存到 SharedPreferences 文件中了。

```kotlin
a = "your value here"
```

当获取 `a` 的值时，实际调用的就是 SharedPreferences 中`key`对应的值

```kotlin
toast(a)
```

如果使用了 data-binding，可以直接把 `a`，传递给 `EditText`，
当页面加载后， `EditText` 中的值就会被 `a` 填充；
当 `EditText` 中的文字变化时，就会存到 SharedPreferences 中。

```xml
<EditText
    android:id="@+id/editTextA"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:inputType="none"
    android:padding="10dp"
    android:text="@={data.a}"/>
```

## 更多

可以在`flow`项目中查看更多细节 `https://github.com/lyloou/flow`

参考资料：《kotlin for android developers》中文版——泛型 preference 委托

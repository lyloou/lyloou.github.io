---
title: 【Java】通过 getter 方法引用，来比较两个对象是否相等
date: 2022-04-09 18:52:50
toc: true
comments: true
tags:
  - java
---

#### 背景

编写代码时，会经常需要编写两个对象是否相等的逻辑，一般会有如下做法

1. 直接写在业务代码中；
2. 单独写个方法，业务代码中调用；
3. 重写 equals 方法；

上面这些做法，都比较复杂，如果属性太多或复杂点（如果是 list 和 map 就更复杂了），就需要编写更多的判断逻辑代码了。

#### 想法

如果能只需要提供比较的方法引用列表，有个地方能自动方法引用取值，并比较就好了。

#### 思路 1

1. 在 java8 中可以使用方法引用，如：People::getName；
2. 可以将所有要比较的 Getter 保存到列表中；
3. 在 比较的时候，根据 方法引用获取具体的值进行比较；
4. 全部比较都相等了，就认为是相等的。

#### 思路 2

1. 思路 1 适用于需要比较的字段少时，有一种情况是，需要比较的字段多，只想排除掉少量字段
2. 通过注解来忽略指定的字段
3. 获取全部字段，过滤掉忽略的字段，通过反射比较字段对应的值。

#### 举个例子 1(改造前)

```java
@Getter
@Setter
public class EqualDemo implements Equable {

    private Integer id;
    private Integer age;
    private String username;
    private Date createTime;
    private Date updateTime;
    private List<EqualDemo> list;
    private Map<String, EqualDemo> map;

    @Override
    public boolean equals(Object obj) {
        if (obj instanceof EqualDemo) {
            if (!Objects.equals(((EqualDemo) obj).getId(), this.getId())) {
                return false;
            }

            if (!Objects.equals(((EqualDemo) obj).getAge(), this.getAge())) {
                return false;
            }

            if (!Objects.equals(((EqualDemo) obj).getUsername(), this.getUsername())) {
                return false;
            }
            final List<EqualDemo> list1 = ((EqualDemo) obj).getList();
            final List<EqualDemo> list2 = this.getList();
            // todo 比较 list1 和 list2

            final Map<String, EqualDemo> map1 = ((EqualDemo) obj).getMap();
            final Map<String, EqualDemo> map2 = this.getMap();
            // todo 比较 map1 和 map2


            return true;
        }
        return Objects.equals(this, obj);
    }
}

// 使用
public class EqualDemoTest {
    @Test
    public void testSimpleTrue() {
        final EqualDemo s1 = new EqualDemo();
        s1.setId(1);
        s1.setUsername("bob");

        final EqualDemo s2 = new EqualDemo();
        s2.setId(1);
        s2.setUsername("bob");

        // // s1 和 s2 相等
        assert s1.equals(s2);
    }
}
```

#### 举个例子 2(改造后-指定需要比较的字段的 Getter 方法引用)

```java
@Getter
@Setter
public class OnlyEqualDemo implements Equable {

    private Integer id;

    private Integer age;

    private String username;
    private Date createTime;
    private Date updateTime;
    private List<OnlyEqualDemo> list;
    private Map<String, OnlyEqualDemo> map;


    @SuppressWarnings("unchecked")
    @Override
    public List<EqualGetter<OnlyEqualDemo>> listOnlyEqualsToGetter() {
        final EqualGetter<OnlyEqualDemo> getId = OnlyEqualDemo::getId;
        return Arrays.asList(
                getId,
                OnlyEqualDemo::getAge,
                OnlyEqualDemo::getUsername,
                OnlyEqualDemo::getList,
                OnlyEqualDemo::getMap
        );
    }
}


// 使用
public class OnlyEqualDemoTest {


    @Test
    public void testSimpleTrue() {
        final OnlyEqualDemo s1 = new OnlyEqualDemo();
        s1.setId(1);
        s1.setUsername("bob");

        final OnlyEqualDemo s2 = new OnlyEqualDemo();
        s2.setId(1);
        s2.setUsername("bob");

        // // s1 和 s2 相等
        assert s1.onlyEqualsTo(s2);
    }
}
```

#### 举个例子 3(改造后-排除少量字段)

```java
@Getter
@Setter
public class IgnoreEqualDemo implements Equable {

    private Integer id;

    @EqualIgnored
    private Integer age;

    private String username;

    @EqualIgnored
    private Date createTime;

    @EqualIgnored
    private Date updateTime;

    private List<IgnoreEqualDemo> list;
    private Map<String, IgnoreEqualDemo> map;
}

// 使用
public class IgnoreEqualDemoTest {


    @Test
    public void testSimpleTrue() {
        final IgnoreEqualDemo s1 = new IgnoreEqualDemo();
        s1.setId(1);
        s1.setUsername("bob");
        s1.setCreateTime(new Date());

        final IgnoreEqualDemo s2 = new IgnoreEqualDemo();
        s2.setId(1);
        s2.setUsername("bob");

        // // s1 和 s2 相等
        assert s1.ignoreEqualsTo(s2);
    }
}
```

这样就简洁很多了，由于 ignoreEqualsTo 和 onlyEqualsTo 方法是 Equable 接口中的默认方法，具体逻辑全封装起来了（包括 object, collection 和 map 的处理），不需要重写就可以直接使用，具体实现看下面的源码。

#### 源码

```java

import lombok.SneakyThrows;

import java.beans.PropertyDescriptor;
import java.io.Serializable;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;
import java.util.function.BiFunction;
import java.util.stream.Collectors;

/**
 * 比较两个对象是否相等
 *
 * @author lilou
 * @date 2022/4/9 9:30
 * <p>
 * @see Equable#onlyEqualsTo(Equable) 方法1：通过 Getter方法引用 来指定需要比较的字段（场景：字段总量多，但是只需要比较少量字段时）
 * @see Equable#ignoreEqualsTo(Equable) 方法2：通过忽略注解({@code EqualIgnored})来指定忽略比较的字段，未标识的字段会全部参与比较（场景：字段总量多，但是只需要排除少量字段时）
 * 注意：onlyEqualsTo 和 ignoreEqualsTo 不要混用
 */
public interface Equable extends Serializable {
    long serialVersionUID = 1L;

    /**
     * 使用方法引用来比较，只比较指定的 Getter 方法引用。
     * 使用此方法：重写 listOnlyEqualsToGetter 方法，指定需要比较的字段的Getter方法引用
     *
     * @param other 另一个 model
     * @return 结果
     */
    default boolean onlyEqualsTo(Equable other) {
        final List<EqualGetter<Equable>> getterList = listOnlyEqualsToGetter();

        // getter方法引用列表中没有需要比较的 getter，直接比较对象
        if (getterList == null || getterList.isEmpty()) {
            return Objects.equals(other, this);
        }

        // 列表有值，计算两个对象在列表中 getter 值，并比较是否相等
        for (EqualGetter<Equable> equalGetter : getterList) {
            Object o1 = equalGetter.apply(this);
            Object o2 = equalGetter.apply(other);

            // 对于属性中也有实现了 Equable 接口的，递归调用
            if (o1 instanceof Equable && o2 instanceof Equable) return ((Equable) o1).onlyEqualsTo((Equable) o2);

            // equalTo collection
            if (o1 instanceof Collection && o2 instanceof Collection) {
                // 判断不相等
                if (notEqualsCollection((Collection<?>) o1, (Collection<?>) o2, Equable::onlyEqualsTo)) return false;

                // 列表已经判断完了，开始下一个属性
                continue;
            }

            // equalTo map
            if (o1 instanceof Map && o2 instanceof Map) {
                if (notEqualsMap((Map<?, ?>) o1, (Map<?, ?>) o2, Equable::onlyEqualsTo)) return false;
                // 列表已经判断完了，开始下一个属性
                continue;
            }

            if (!Objects.equals(o1, o2)) {
                return false;
            }
        }
        return true;
    }

    default boolean notEqualsMap(Map<?, ?> o1, Map<?, ?> o2, BiFunction<Equable, Equable, Boolean> biFunc) {
        // 比较 key
        final Collection<?> set1 = o1.keySet();
        final Collection<?> set2 = o2.keySet();
        if (notEqualsCollection(set1, set2, biFunc)) return true;

        // 比较 value
        final Collection<?> values1 = o1.values();
        final Collection<?> values2 = o2.values();
        return notEqualsCollection(values1, values2, biFunc);
    }

    /**
     * 判断 collection 是否不相等
     *
     * @param o1 第一个 collection
     * @param o2 第二个 collection
     * @return 是否不相等
     */
    default boolean notEqualsCollection(Collection<?> o1, Collection<?> o2, BiFunction<Equable, Equable, Boolean> biFunc) {
        if (Objects.isNull(o1) && Objects.isNull(o2)) {
            return false;
        }

        if (Objects.isNull(o1) || Objects.isNull(o2)) {
            return true;
        }

        if (o1.isEmpty() && o2.isEmpty()) {
            return false;
        }

        if (o1.size() != o2.size()) {
            return true;
        }

        // 根据 hashCode 来排序
        o1 = o1.stream().sorted(Comparator.comparingInt(Object::hashCode)).collect(Collectors.toList());
        o2 = o2.stream().sorted(Comparator.comparingInt(Object::hashCode)).collect(Collectors.toList());


        // 逐个比较
        final Iterator<?> iterator1 = o1.iterator();
        final Iterator<?> iterator2 = o2.iterator();
        while (iterator1.hasNext() && iterator2.hasNext()) {
            final Object next1 = iterator1.next();
            final Object next2 = iterator2.next();
            if (next1 instanceof Equable && next2 instanceof Equable) {
                if (!biFunc.apply((Equable) next1, (Equable) next2)) {
                    return true;
                }
            } else {
                return !Objects.equals(next1, next2);
            }
        }
        return false;
    }

    /**
     * 需重写
     * <p>
     * 需要比较的 Getter 方法列表（原理是通过Getter 的 apply 方法得到实际的值，再进行比较）
     *
     * @param <T> 泛型
     * @return getter 方法列表
     */
    default <T extends Equable> List<EqualGetter<T>> listOnlyEqualsToGetter() {
        return Collections.emptyList();
    }

    /**
     * getter方法接口定义
     */
    @FunctionalInterface
    interface EqualGetter<T extends Equable> extends Serializable {
        Object apply(T source);
    }


    /**
     * IgnoreEqual 注解+反射来实现 equal 逻辑
     *
     * @param other 另一个 model
     * @return 结果
     */
    @SneakyThrows
    default boolean ignoreEqualsTo(Equable other) {
        if (Objects.equals(this, other)) {
            return true;
        }

        final Class<? extends Equable> aClass1 = this.getClass();
        final Class<? extends Equable> aClass2 = other.getClass();
        if (!Objects.equals(aClass1, aClass2)) {
            return false;
        }

        final Field[] declaredFields = aClass1.getDeclaredFields();
        for (Field declaredField : declaredFields) {

            // 字段是否被标记忽略
            final EqualIgnored isIgnored = declaredField.getAnnotation(EqualIgnored.class);
            if (Objects.nonNull(isIgnored)) {
                continue;
            }

            final PropertyDescriptor propertyDescriptor = new PropertyDescriptor(declaredField.getName(), aClass1);
            final Method readMethod = propertyDescriptor.getReadMethod();

            final Object o1 = readMethod.invoke(this);
            final Object o2 = readMethod.invoke(other);

            // 对于属性中也有实现了 Equable 接口的，递归调用
            if (o1 instanceof Equable && o2 instanceof Equable) return ((Equable) o1).ignoreEqualsTo((Equable) o2);

            // equalTo collection
            if (o1 instanceof Collection && o2 instanceof Collection) {
                // 判断不相等
                if (notEqualsCollection((Collection<?>) o1, (Collection<?>) o2, Equable::ignoreEqualsTo)) return false;

                // 列表已经判断完了，开始下一个属性
                continue;
            }

            // equalTo map
            if (o1 instanceof Map && o2 instanceof Map) {

                if (notEqualsMap((Map<?, ?>) o1, (Map<?, ?>) o2, Equable::ignoreEqualsTo)) return false;

                // 列表已经判断完了，开始下一个属性
                continue;
            }

            if (!Objects.equals(o1, o2)) {
                return false;
            }
        }

        return true;
    }

}


@Target({ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface EqualIgnored {
}

```

#### 单元测试

**方法 1：**

https://github.com/lyloou/component/blob/master/component-dto/src/test/java/com/lyloou/component/dto/OnlyEqualDemoTest.java
![Equable_20220410103323_2022-04-10-10-33-24](https://raw.githubusercontent.com/lyloou/img/develop/Equable_20220410103323_2022-04-10-10-33-24.png)

**方法 2：**

https://github.com/lyloou/component/blob/master/component-dto/src/test/java/com/lyloou/component/dto/IgnoreEqualDemoTest.java
![Equable_20220410103408_2022-04-10-10-34-09](https://raw.githubusercontent.com/lyloou/img/develop/Equable_20220410103408_2022-04-10-10-34-09.png)

## 参考资源

- https://github.com/lyloou/component/blob/master/component-dto/src/main/java/com/lyloou/component/dto/Equable.java
- https://github.com/lyloou/component/blob/master/component-dto/src/main/java/com/lyloou/component/dto/field/FieldUtil.java

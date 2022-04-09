---
title: 【Java】通过 getter 方法引用，来比较两个对象是否相等
date: 2022-04-09 18:52:50
toc: true
comments: true
tags:
  - java
---

#### 背景

如果能确定指定的全量属性都是相等的，就可以认为这两个对象是相等的。
一般的做法是重写 equal 方法，会比较复杂，需要手动获取属性内容，并比较，如果是 list 和 map 就更复杂了。

#### 想法（需求）

如果能只提供需要比较的方法引用列表，就好了。

#### 思路

1. 将所有要比较的 Getter 保存到列表中。
2.

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

#### 举个例子 2(改造后)

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

    @SuppressWarnings("unchecked")
    @Override
    public List<EqualGetter<EqualDemo>> listEqualToGetter() {
        return Arrays.asList(
                EqualDemo::getId,
                EqualDemo::getAge,
                EqualDemo::getUsername,
                EqualDemo::getList,
                EqualDemo::getMap
        );
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
        assert s1.equalTo(s2);
    }
}
```

这样就简洁很多了，由于 equalTo 方法是 Equable 接口中的默认方法，具体逻辑全封装起来了（包括 object, collection 和 map 的处理），不需要重写就可以直接使用，具体实现看下面的源码。

#### 源码

```java

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

/**
 * 通过 getter 方法引用，来比较两个对象是否相等
 *
 * @author lilou
 * @date 2022/4/9 9:30
 */
public interface Equable extends Serializable {
    long serialVersionUID = 1L;

    /**
     * 默认使用 Objects.equals 方法比较
     *
     * @param other 另一个 model
     * @return 结果
     */
    default boolean equalTo(Equable other) {
        final List<EqualGetter<Equable>> getterList = listEquableGetter();

        // getter方法引用列表中没有需要比较的 getter，直接比较对象
        if (getterList == null || getterList.isEmpty()) {
            return Objects.equals(other, this);
        }

        // 列表有值，计算两个对象在列表中 getter 值，并比较是否相等
        for (EqualGetter<Equable> equalGetter : getterList) {
            Object o1 = equalGetter.apply(this);
            Object o2 = equalGetter.apply(other);

            // 对于属性中也有 实现 Equable 接口的，递归调用
            if (o1 instanceof Equable && o2 instanceof Equable) {
                return ((Equable) o1).equalTo((Equable) o2);
            }

            // equalTo collection
            if (o1 instanceof Collection && o2 instanceof Collection) {
                if (((Collection<?>) o1).size() != ((Collection<?>) o2).size()) {
                    return false;
                }

                if (((Collection<?>) o1).isEmpty() && ((Collection<?>) o2).isEmpty()) {
                    return true;
                }

                // 判断不相等
                if (notEqualCollection((Collection<?>) o1, (Collection<?>) o2)) return false;

                // collection 已经判断完了，开始下一个属性
                continue;
            }

            // equalTo map
            if (o1 instanceof Map && o2 instanceof Map) {

                // 比较 key
                final Collection<?> set1 = ((Map<?, ?>) o1).keySet();
                final Collection<?> set2 = ((Map<?, ?>) o2).keySet();
                if (notEqualCollection(set1, set2)) return false;

                // 比较 map
                final Collection<?> values1 = ((Map<?, ?>) o1).values();
                final Collection<?> values2 = ((Map<?, ?>) o2).values();
                if (notEqualCollection(values1, values2)) return false;

                // map 已经判断完了，开始下一个属性
                continue;
            }

            if (!Objects.equals(o1, o2)) {
                return false;
            }
        }
        return true;
    }

    /**
     * 判断 collection 是否不相等
     *
     * @param o1 第一个 collection
     * @param o2 第二个 collection
     * @return 是否不相等
     */
    default boolean notEqualCollection(Collection<?> o1, Collection<?> o2) {
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
                if (!((Equable) next1).equalTo((Equable) next2)) {
                    return true;
                }
            } else {
                return !Objects.equals(next1, next2);
            }
        }
        return false;
    }

    /**
     * 需要比较的 Getter 方法列表（原理是通过Getter 的 apply 方法得到实际的值，再进行比较）
     *
     * @param <T> 泛型
     * @return getter 方法列表
     */
    default <T extends Equable> List<EqualGetter<T>> listEquableGetter() {
        return Collections.emptyList();
    }

    /**
     * getter方法接口定义
     */
    @FunctionalInterface
    interface EqualGetter<T extends Equable> extends Serializable {
        Object apply(T source);
    }
}

```

#### 单元测试

```java

import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;

/**
 * @author lilou
 * @date 2022/4/9 9:24
 */
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
        assert s1.equalTo(s2);
    }

    @Test
    public void testSimpleFalse() {
        final EqualDemo s1 = new EqualDemo();
        s1.setId(1);
        s1.setUsername("bob");

        final EqualDemo s3 = new EqualDemo();
        s3.setId(1);
        s3.setUsername("bob");
        s3.setAge(18);

        // // s1 和 s2 相等
        assert !s1.equalTo(s3);
    }

    @Test
    public void testCollectionTrue() {
        final EqualDemo s1 = new EqualDemo();
        s1.setId(1);
        s1.setUsername("bob");

        final EqualDemo s2 = new EqualDemo();
        s2.setId(1);
        s2.setUsername("bob");

        final EqualDemo s3 = new EqualDemo();
        s3.setId(1);
        s3.setUsername("bob");
        s3.setAge(18);


        final EqualDemo s11 = new EqualDemo();
        s11.setId(1);
        s11.setUsername("bob");
        final ArrayList<EqualDemo> list11 = new ArrayList<>();
        list11.add(s2);
        list11.add(s3);
        s11.setList(list11);

        final EqualDemo s12 = new EqualDemo();
        s12.setId(1);
        s12.setUsername("bob");
        final ArrayList<EqualDemo> list12 = new ArrayList<>();
        list12.add(s2);
        list12.add(s3);
        s12.setList(list12);

        assert s12.equalTo(s11);
    }

    @Test
    public void testCollectionFalse() {
        final EqualDemo s1 = new EqualDemo();
        s1.setId(1);
        s1.setUsername("bob");

        final EqualDemo s2 = new EqualDemo();
        s2.setId(1);
        s2.setUsername("bob");

        final EqualDemo s3 = new EqualDemo();
        s3.setId(1);
        s3.setUsername("bob");
        s3.setAge(18);


        final EqualDemo s11 = new EqualDemo();
        s11.setId(1);
        s11.setUsername("bob");
        final ArrayList<EqualDemo> list11 = new ArrayList<>();
        list11.add(s2);
        list11.add(s3);
        s11.setList(list11);


        // s11 和 s13 数量不相等
        final EqualDemo s13 = new EqualDemo();
        s13.setId(1);
        s13.setUsername("bob");
        final ArrayList<EqualDemo> list13 = new ArrayList<>();
        list13.add(s2);
        s13.setList(list13);

        // s11 和 s14 数据不相等
        final EqualDemo s14 = new EqualDemo();
        s14.setId(1);
        s14.setUsername("bob");
        final ArrayList<EqualDemo> list14 = new ArrayList<>();
        list14.add(s2);
        list14.add(new EqualDemo());
        s14.setList(list14);

        assert !s13.equalTo(s11);
        assert !s14.equalTo(s11);
    }

    @Test
    public void testMapTrue() {
        final EqualDemo s1 = new EqualDemo();
        s1.setId(1);
        s1.setUsername("bob");

        final EqualDemo s2 = new EqualDemo();
        s2.setId(1);
        s2.setUsername("bob");

        final EqualDemo s3 = new EqualDemo();
        s3.setId(1);
        s3.setUsername("bob");
        s3.setAge(18);
        s3.setMap(new HashMap<String, EqualDemo>() {{
            put("key", s1);
        }});

        final EqualDemo s4 = new EqualDemo();
        s4.setId(1);
        s4.setUsername("bob");
        s4.setAge(18);
        s4.setMap(new HashMap<String, EqualDemo>() {{
            put("key", s2);
        }});


        assert s3.equalTo(s4);
    }

    @Test
    public void testMapFalse() {
        final EqualDemo s1 = new EqualDemo();
        s1.setId(1);
        s1.setUsername("bob");

        final EqualDemo s2 = new EqualDemo();
        s2.setId(1);
        s2.setUsername("bob1");

        final EqualDemo s3 = new EqualDemo();
        s3.setId(1);
        s3.setUsername("bob");
        s3.setAge(18);
        s3.setMap(new HashMap<String, EqualDemo>() {{
            put("key", s1);
        }});

        final EqualDemo s4 = new EqualDemo();
        s4.setId(1);
        s4.setUsername("bob");
        s4.setAge(18);
        s4.setMap(new HashMap<String, EqualDemo>() {{
            put("key", s2);
        }});


        assert !s3.equalTo(s4);
    }

}

```

![Equable_20220409191807_2022-04-09-19-18-08](https://raw.githubusercontent.com/lyloou/img/develop/Equable_20220409191807_2022-04-09-19-18-08.png)

## 参考资源

https://github.com/lyloou/component/blob/master/component-dto/src/main/java/com/lyloou/component/dto/Equable.java

---
title: mybatis
date: 2018-09-12 19:47:02
toc: true
comments: true
tags:
  - sql
  - spring
  - java
---

## 资料

- [mybatis-spring – MyBatis-Spring | SqlSessionFactoryBean](http://www.mybatis.org/spring/factorybean.html)

  > In normal MyBatis-Spring usage, you will not need to use SqlSessionFactoryBean or the corresponding SqlSessionFactory directly. Instead, the session factory will be injected into MapperFactoryBeans or other DAOs that extend SqlSessionDaoSupport .

- [Myibatis 和 spring(mvc)的集成 - CSDN 博客](https://blog.csdn.net/techbirds_bao/article/details/9235547)

## nested exception is org.apache.ibatis.reflection.ReflectionException: There is no getter for property named

2020-01-02 19:01:21 [WARN] ExceptionHandlerExceptionResolver:194 - Resolved [org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.reflection.ReflectionException: There is no getter for property named 'is_disabled' in 'class com.lyloou.flow.model.flow.Flow']

```java
// 错误的
@Update("insert into flow (day,item,is_disabled,is_archived) values (#{day},#{item},#{is_disabled},#{is_archived}) on duplicate key update" +
            " item=values(item),is_disabled=values(is_disabled),is_archived=values(is_archived)")
int insertOrUpdateFlow(Flow flow);

// 正确的
@Update("insert into flow (day,item,is_disabled,is_archived) values (#{day},#{item},#{isDisabled},#{isArchived}) on duplicate key update" +
            " item=values(item),is_disabled=values(is_disabled),is_archived=values(is_archived)")
int insertOrUpdateFlow(Flow flow);
```

```java
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Flow {
    private Long id;

    private Date gmtCreate;

    private Date gmtModified;

    private String day;

    private String item;

    private Boolean isArchived;

    private Boolean isDisabled;

}
```

```md
2020-01-02 19:01:21 [WARN] ExceptionHandlerExceptionResolver:194 - Resolved [org.mybatis.spring.MyBatisSystemException: nested exception is org.apache.ibatis.reflection.ReflectionException: There is no getter for property named 'is_disabled' in 'class com.lyloou.flow.model.flow.Flow']

答案：因为解决的时候用到的是 `flow.isDisabled` 属性，因为传递的是 `flow.is_disabled` 所以不行
```

## 按照输入 id 顺序来返回数据

```xml
<select id="queryOrderedAuthorByauthorIds" resultMap="BaseResultMap">
  select * from video_author a
  where a.user_id in
    <foreach collection="authorIds" item="item" index="index" separator="," open="(" close=")">
      #{item}
    </foreach>
  and a.user_status=0
  -- 按照输入的顺序来返回排序
  order by field(a.user_id,
    <foreach collection="authorIds" item="item" index="index" separator=",">
      #{item}
    </foreach>
  )
</select>
```

## 自动填充字段

```java
// Person.java
@Data
@Accessors(chain = true)
public class Person  implements Serializable {
    private static final long serialVersionUID = 1L;

    @TableId(type = IdType.AUTO)
    @ApiModelProperty(value = "实体ID")
    private Integer id;

    @ApiModelProperty(value = "创建时间")
    @TableField(fill = FieldFill.INSERT)
    private Date createdTime;

    @ApiModelProperty(value = "更新时间")
    @TableField(fill = FieldFill.INSERT_UPDATE)
    private Date updatedTime;

    @ApiModelProperty(value = "创建人")
    @TableField(value = "creator", fill = FieldFill.INSERT)
    private String creator;

    @ApiModelProperty(value = "修改人")
    @TableField(value = "modifier", fill = FieldFill.INSERT_UPDATE)
    private String modifier;
}

// MybatisObjectHandler.java
// [自动填充功能 | MyBatis-Plus](https://baomidou.com/guide/auto-fill-metainfo.html)
@Component
public class MybatisObjectHandler implements MetaObjectHandler {
    @Override
    public void insertFill(MetaObject metaObject) {
        Integer userId = AuthenticationService.getUserId();
        if (userId != null) {
            Stream.of("createdBy", "updatedBy", "modifier", "creator")
                    .forEach(s -> setFieldValIfNull(s, userId.toString(), metaObject));
        }

        Stream.of("createdTime", "updatedTime")
                .forEach(s -> setFieldValIfNull(s, new Date(), metaObject));
    }

    private void setFieldValIfNull(String field, Object fieldVal, MetaObject metaObject) {
        final Object value = getFieldValByName(field, metaObject);
        if (value != null) {
            setFieldValByName(field, fieldVal, metaObject);
        }
    }

    @Override
    public void updateFill(MetaObject metaObject) {
        //更新时 需要填充字段
        Stream.of("updatedTime")
                .forEach(s -> setFieldValIfNull(s, new Date(), metaObject));
        setFieldValByName("updatedTime", new Date(), metaObject);
        Integer userId = AuthenticationService.getUserId();
        if (userId != null) {
            //更新时填充的字段
            Stream.of("updatedBy", "modifier")
                    .forEach(s -> setFieldValIfNull(s, userId.toString(), metaObject));
        }
    }
}
```

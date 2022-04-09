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

## [mybatis 深入理解(一)之 # 与 $ 区别以及 sql 预编译 - SegmentFault 思否](https://segmentfault.com/a/1190000004617028)

mybatis 中使用 sqlMap 进行 sql 查询时，经常需要动态传递参数，例如我们需要根据用户的姓名来筛选用户时，sql 如下：

```pgsql
select * from user where name = "ruhua";
```

上述 sql 中，我们希望 name 后的参数 "ruhua" 是动态可变的，即不同的时刻根据不同的姓名来查询用户。在 sqlMap 的 xml 文件中使用如下的 sql 可以实现动态传递参数 name：

```pgsql
select * from user where name = #{name};
```

或者

```pgsql
select * from user where name = '${name}';
```

对于上述这种查询情况来说，使用 #{ } 和 ${ } 的结果是相同的，但是在某些情况下，我们只能使用二者其一。

## '#' 与 '$'

### 区别

**动态 SQL** 是 mybatis 的强大特性之一，也是它优于其他 ORM 框架的一个重要原因。mybatis 在对 sql 语句进行预编译之前，会对 sql 进行动态解析，解析为一个 BoundSql 对象，也是在此处对动态 SQL 进行处理的。

在动态 SQL 解析阶段， #{ } 和 ${ } 会有不同的表现：

> **#{ } 解析为一个 JDBC 预编译语句（prepared statement）的参数标记符。**

例如，sqlMap 中如下的 sql 语句

```pgsql
select * from user where name = #{name};
```

解析为：

```pgsql
select * from user where name = ?;
```

一个 #{ } 被解析为一个参数占位符 `?` 。

而，

> **${ } 仅仅为一个纯碎的 string 替换，在动态 SQL 解析阶段将会进行变量替换**

例如，sqlMap 中如下的 sql

```pgsql
select * from user where name = '${name}';
```

当我们传递的参数为 "ruhua" 时，上述 sql 的解析为：

```pgsql
select * from user where name = "ruhua";
```

预编译之前的 SQL 语句已经不包含变量 name 了。

综上所得， ${ } 的变量的替换阶段是在动态 SQL 解析阶段，而 #{ }的变量的替换是在 DBMS 中。

### 用法 tips

> 1、能使用 #{ } 的地方就用 #{ }

首先这是为了性能考虑的，相同的预编译 sql 可以重复利用。

其次，**${ } 在预编译之前已经被变量替换了，这会存在 sql 注入问题**。例如，如下的 sql，

```pgsql
select * from ${tableName} where name = #{name}
```

假如，我们的参数 tableName 为 `user; delete user; --`，那么 SQL 动态解析阶段之后，预编译之前的 sql 将变为

```sql
select * from user; delete user; -- where name = ?;
```

`--` 之后的语句将作为注释，不起作用，因此本来的一条查询语句偷偷的包含了一个删除表数据的 SQL！

> 2、表名作为变量时，必须使用 ${ }

这是因为，表名是字符串，使用 sql 占位符替换字符串时会带上单引号 `''`，这会导致 sql 语法错误，例如：

```pgsql
select * from #{tableName} where name = #{name};
```

预编译之后的 sql 变为：

```pgsql
select * from ? where name = ?;
```

假设我们传入的参数为 tableName = "user" , name = "ruhua"，那么在占位符进行变量替换后，sql 语句变为

```pgsql
select * from 'user' where name='ruhua';
```

上述 sql 语句是存在语法错误的，表名不能加单引号 `''`（注意，反引号 ``是可以的）。

## sql 预编译

### 定义

> sql 预编译指的是数据库驱动在发送 sql 语句和参数给 DBMS 之前对 sql 语句进行编译，这样 DBMS 执行 sql 时，就不需要重新编译。

### 为什么需要预编译

JDBC 中使用对象 PreparedStatement 来抽象预编译语句，使用预编译

1. **预编译阶段可以优化 sql 的执行**。
   预编译之后的 sql 多数情况下可以直接执行，DBMS 不需要再次编译，越复杂的 sql，编译的复杂度将越大，预编译阶段可以合并多次操作为一个操作。
2. **预编译语句对象可以重复利用**。
   把一个 sql 预编译后产生的 PreparedStatement 对象缓存下来，下次对于同一个 sql，可以直接使用这个缓存的 PreparedState 对象。

mybatis 默认情况下，将对所有的 sql 进行预编译。

### mysql 预编译源码解析

mysql 的预编译源码在 `com.mysql.jdbc.ConnectionImpl` 类中，如下：

```kotlin
public synchronized java.sql.PreparedStatement prepareStatement(String sql,
            int resultSetType, int resultSetConcurrency) throws SQLException {
        checkClosed();

        //
        // FIXME: Create warnings if can't create results of the given
        // type or concurrency
        //
        PreparedStatement pStmt = null;

        boolean canServerPrepare = true;

        // 不同的数据库系统对sql进行语法转换
        String nativeSql = getProcessEscapeCodesForPrepStmts() ? nativeSQL(sql): sql;

        // 判断是否可以进行服务器端预编译
        if (this.useServerPreparedStmts && getEmulateUnsupportedPstmts()) {
            canServerPrepare = canHandleAsServerPreparedStatement(nativeSql);
        }

        // 如果可以进行服务器端预编译
        if (this.useServerPreparedStmts && canServerPrepare) {

            // 是否缓存了PreparedStatement对象
            if (this.getCachePreparedStatements()) {
                synchronized (this.serverSideStatementCache) {

                    // 从缓存中获取缓存的PreparedStatement对象
                    pStmt = (com.mysql.jdbc.ServerPreparedStatement)this.serverSideStatementCache.remove(sql);

                    if (pStmt != null) {
                        // 缓存中存在对象时对原 sqlStatement 进行参数清空等
                        ((com.mysql.jdbc.ServerPreparedStatement)pStmt).setClosed(false);
                        pStmt.clearParameters();
                    }

                    if (pStmt == null) {
                        try {
                            // 如果缓存中不存在，则调用服务器端(数据库)进行预编译
                            pStmt = ServerPreparedStatement.getInstance(getLoadBalanceSafeProxy(), nativeSql,
                                    this.database, resultSetType, resultSetConcurrency);
                            if (sql.length() < getPreparedStatementCacheSqlLimit()) {
                                ((com.mysql.jdbc.ServerPreparedStatement)pStmt).isCached = true;
                            }

                            // 设置返回类型以及并发类型
                            pStmt.setResultSetType(resultSetType);
                            pStmt.setResultSetConcurrency(resultSetConcurrency);
                        } catch (SQLException sqlEx) {
                            // Punt, if necessary
                            if (getEmulateUnsupportedPstmts()) {
                                pStmt = (PreparedStatement) clientPrepareStatement(nativeSql, resultSetType, resultSetConcurrency, false);

                                if (sql.length() < getPreparedStatementCacheSqlLimit()) {
                                    this.serverSideStatementCheckCache.put(sql, Boolean.FALSE);
                                }
                            } else {
                                throw sqlEx;
                            }
                        }
                    }
                }
            } else {

                // 未启用缓存时，直接调用服务器端进行预编译
                try {
                    pStmt = ServerPreparedStatement.getInstance(getLoadBalanceSafeProxy(), nativeSql,
                            this.database, resultSetType, resultSetConcurrency);

                    pStmt.setResultSetType(resultSetType);
                    pStmt.setResultSetConcurrency(resultSetConcurrency);
                } catch (SQLException sqlEx) {
                    // Punt, if necessary
                    if (getEmulateUnsupportedPstmts()) {
                        pStmt = (PreparedStatement) clientPrepareStatement(nativeSql, resultSetType, resultSetConcurrency, false);
                    } else {
                        throw sqlEx;
                    }
                }
            }
        } else {
            // 不支持服务器端预编译时调用客户端预编译（不需要数据库 connection ）
            pStmt = (PreparedStatement) clientPrepareStatement(nativeSql, resultSetType, resultSetConcurrency, false);
        }

        return pStmt;
    }
```

流程图如下所示：

![图片描述](https://segmentfault.com/img/bVtwuY)

## mybatis 之 sql 动态解析以及预编译源码

### mybatis sql 动态解析

mybatis 在调用 connection 进行 sql 预编译之前，会对 sql 语句进行动态解析，动态解析主要包含如下的功能：

- 占位符的处理
- 动态 sql 的处理
- 参数类型校验

mybatis 强大的动态 SQL 功能的具体实现就在此。动态解析涉及的东西太多，以后再讨论。

## 批量处理示例（修复歌手名称）

```java
   public void fixSongSingleName() {
        // 从0开始
        int id = 0;
        // 每次查询100条
        int limit = 100;
        List<CcMusicInfoEntity> list;
        do {
            list = ccMusicInfoMapper.queryListByLastIdWithLimit(id, limit);
            if (CollUtil.isEmpty(list)) {
                break;
            }

            // 记录下一次的开始的id
            id = list.get(list.size() - 1).getId();

            // 找到需要更新的实体
            final List<CcMusicInfoEntity> needUpdateList = list.stream()
                    .filter(Objects::nonNull)
                    .filter(it -> SingerNameUtil.isContainCombinedSeparator(it.getSingerName()))
                    .collect(Collectors.toList());

            // 在db中更新实体
            if (CollUtil.isNotEmpty(needUpdateList)) {
                final List<String> originSingerNameList = needUpdateList.stream().map(CcMusicInfoEntity::getSingerName).collect(Collectors.toList());
                updateSongSingerInfo(needUpdateList);

                Map<Integer, String> map = new HashMap<>(needUpdateList.size());
                for (int i = 0; i < needUpdateList.size(); i++) {
                    final CcMusicInfoEntity entity = needUpdateList.get(i);
                    final String originSingerName = originSingerNameList.get(i);
                    map.put(entity.getId(), StrUtil.format("更新前:{}，更新后:{}", originSingerName, entity.getSingerName()));
                }
                logger.info(StrUtil.format("fixSongSingleName 本次更新数量，{}，修改数据：{}", needUpdateList.size(), map));
            }
            logger.info("fixSongSingleName: 本次更新到ID，" + id);
            // break;
        } while (CollUtil.isNotEmpty(list));
        logger.info("fixSongSingleName: 本次更新完成");
    }

    private void updateSongSingerInfo(List<MusicInfoEntity> needUpdateList) {
        List<MusicInfoEntity> list = new ArrayList<>(needUpdateList.size());
        for (MusicInfoEntity entity : needUpdateList) {
            final String originSingerName = entity.getSingerName();
            final String calculateSingerName = SingerNameUtil.calculate(originSingerName);

            // 一样的情况，不用处理
            if (Objects.equals(originSingerName, calculateSingerName)) {
                continue;
            }
            MusicInfoEntity newCcMusicInfoEntity = new MusicInfoEntity();
            newCcMusicInfoEntity.setId(entity.getId());
            newCcMusicInfoEntity.setLastUpdateDate(new Date());
            newCcMusicInfoEntity.setSingerName(calculateSingerName);
            list.add(newCcMusicInfoEntity);
        }
        if (CollUtil.isNotEmpty(list)) {
            musicInfoMapper.updateByList(list);
        }
    }
```

**批量查询：**

```java
// MusicInfoMapper.java
List<MusicInfoEntity> queryListByLastIdWithLimit(@Param("id") int id, @Param("limit") int limit);
void updateByList(List<MusicInfoEntity> list);
```

```xml
<!-- MusicInfoMapper.xml -->
<select id="queryListByLastIdWithLimit" resultMap="BaseResultMap">
    SELECT
    <include refid="Base_Column_List" />
    FROM t_music_info a
    where a.id > #{id} limit #{limit}
</select>
```

**批量插入：**

[mysql 一条语句 update 多条记录\_chijiaodaxie 的博客-CSDN 博客\_mysql update 多条数据](https://blog.csdn.net/chijiaodaxie/article/details/50210337)

```xml
<!--    原文链接：https://blog.csdn.net/u013506626/article/details/121229892 -->
<update id="updateByList" parameterType="object">
    update music_info
    <trim prefix="set" suffixOverrides=",">
        <trim prefix="singer_name=case" suffix="end,">
            <foreach collection="list" item="item" index="index">
                WHEN id=#{item.id} THEN #{item.singerName}
            </foreach>
        </trim>
        <trim prefix="last_update_date=case" suffix="end,">
            <foreach collection="list" item="item" index="index">
                WHEN id=#{item.id} THEN #{item.lastUpdateDate}
            </foreach>
        </trim>
    </trim>

    WHERE id IN
    <foreach collection="list" item="item" open="(" close=")" separator=",">
        #{item.id}
    </foreach>
</update>
```

## 总结

本文主要深入探究了 mybatis 对 #{ } 和 ${ }的不同处理方式，并了解了 sql 预编译。

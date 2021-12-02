---
title: springboot
date: 2018-10-11 11:29
toc: true
comments: true
tags:
  - java
---

maven: http://wiki.jikexueyuan.com/project/maven/
spring: https://wiki.jikexueyuan.com/project/spring

## Spring

注解仅仅是对类加上了一些元信息，如果不使用反射等 API 对其进行探测、处理，和不加注解没有任何区别。
https://course.tianmaying.com/web-development+form-validation#

任何一个标注了@Bean 的方法，其返回值将作为一个 bean 定义注册到 Spring 的 IoC 容器，方法名将默认成该 bean 定义的 id。
http://tengj.top/2017/03/09/springboot3/

Spring Boot 常用注解（一） - 声明 Bean 的注解 - CSDN 博客
https://blog.csdn.net/lipinganq/article/details/79155072

## JOOQ

https://www.jooq.org/doc/3.10/manual/

JOOQ 3.8.2 使用 教程：从入门到提高
https://amao12580.github.io/post/2016/04/JOOQ-from-entry-to-improve/

## spring-boot-devtools

Spring Boot 1.3 has introduced devtools, a module to improve the development-time experience when working on Spring Boot applications. To enable it, just add the following dependency to your project:
(https://docs.spring.io/spring-boot/docs/current/maven-plugin/usage.html)

```
<dependencies>
  <dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <version>2.1.1.RELEASE</version>
    <optional>true</optional>
  </dependency>
</dependencies>
```

When devtools is running, it detects change when you recompile your application and automatically refreshes it. This works for not only resources but code as well. It also provides a LiveReload server so that it can automatically trigger a browser refresh whenever things change.
Devtools can also be configured to only refresh the browser whenever a static resource has changed (and ignore any change in the code). Just include the following property in your project:

```
spring.devtools.remote.restart.enabled=false
```

## 配置

```sh
   _____
  /  _  \__  _  __ ____   __________   _____   ____
 /  /_\  \ \/ \/ // __ \ /  ___/  _ \ /     \_/ __ \
/    |    \     /\  ___/ \___ (  <_> )  Y Y  \  ___/
\____|__  /\/\_/  \___  >____  >____/|__|_|  /\___  >
        \/            \/     \/            \/     \/

// spring banner
// file name: src/main/resources/banner.txt
// design by http://patorjk.com/software/taag
// [18-SpringBoot——核心-基本配置 - https://github.com/Wang-Jun-Chao - CSDN博客](https://blog.csdn.net/DERRANTCM/article/details/77284924)
```

## 下面这两种有什么区别呢

```xml
<!-- 1 -->
<parent>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-parent</artifactId>
    <version>2.3.1.RELEASE</version>
    <relativePath/>
</parent>
```

```xml
<!-- 2  -->
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-dependencies</artifactId>
            <version>${spring-boot.version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>
```

参照[spring.profiles.active=@profiles.active@的含义 - 毛会懂 - 博客园](https://www.cnblogs.com/maohuidong/p/11507362.html)
在动态配置环境的过程中，如果用了 2（新建项目时自动生成的） 而没有用 1，就会导致报一个错误
@profiles.active@ IllegalStateException: Failed to load property source from spring.profile.active

## 参数验证

```java
// controller
@RestController
@Api(tags = "[管理后台]-[放映厅]-片单管理API")
@RequestMapping("/playlist")
@RequiredArgsConstructor(onConstructor = @__(@Autowired))
@Validated
public class PlaylistController extends BaseController {
    // ...
    @ApiOperation(value = "列出片单", notes = "根据参数列出符合要求的片单")
    @GetMapping("list")
    public ResultMsg<PageInfo<PlaylistCo>> listPlaylist(@Valid PlaylistListQry qry) {
        return renderSuccessData(playlistAdminService.listPlaylistByPage(qry));
    }
}

// PlaylistListQry.java
@EqualsAndHashCode(callSuper = true)
@Data
@ApiModel(value = "列出片单列表参数实体")
public class PlaylistListQry extends CommonCommand {

    @ApiModelProperty(value = "放映状态")
    private Integer playStatus;

    @NotNull(message = "页码不能为空") @Min(value = 1, message = "页码要大于0")
    Integer pageNo;

    @NotNull(message = "每页大小不能为空") @Min(value = 1, message = "每页大小要大于0")
    Integer pageSize;
}

// 错误统一处理
@ControllerAdvice
@Order(value = Ordered.HIGHEST_PRECEDENCE)
@Slf4j
public class GlobalExceptionHandler {
    @ExceptionHandler(ValidationException.class)
    @ResponseBody
    public ResponseVO handle(ValidationException exception) {
        String message = null;
        if (exception instanceof ConstraintViolationException) {
            ConstraintViolationException exs = (ConstraintViolationException) exception;

            Set<ConstraintViolation<?>> violations = exs.getConstraintViolations();
            for (ConstraintViolation<?> item : violations) {
                //打印验证不通过的信息
                message = item.getMessage();
                break;
            }
        }

        // 处理实体字段验证不通过异常
        if( exception instanceof  MethodArgumentNotValidException){
          message = getDefaultMessageStr((MethodArgumentNotValidException) e);
        }

        return ResponseVO.buildIllegalMsg(message);

    }

    private String getDefaultMessageStr(MethodArgumentNotValidException e) {
        BindingResult result = e.getBindingResult();
        final List<FieldError> fieldErrors = result.getFieldErrors();
        String defaultMessageStr = "";
        if (!CollectionUtil.isEmpty(fieldErrors)) {
            final List<String> msgList = fieldErrors.stream().map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());
            defaultMessageStr = StrUtil.join(", ", msgList);
        }
        return defaultMessageStr;
    }
}
```

## 分页处理

```java
// controller
  @ApiOperation(value = "列出片单", notes = "根据参数列出符合要求的片单")
  @GetMapping("list")
  public ResultMsg<PageInfo<PlaylistCo>> listPlaylist(@Valid PlaylistListQry qry) {
    return renderSuccessData(playlistAdminService.listPlaylistByPage(qry));
  }
// serviceImpl
    @Override
    public PageInfo<PlaylistCo> listPlaylistByPage(PlaylistListQry qry) {
        List<PlaylistCo> playlistCoList = new ArrayList<>();
        // https://pagehelper.github.io/docs/howtouse/
        // https://github.com/pagehelper/Mybatis-PageHelper/blob/master/wikis/en/HowToUse.md
        // com.github.pagehelper.PageHelper
        PageHelper.startPage(qry.getPageNo(), qry.getPageSize());
        // 根据状态获取片单
        final List<PlaylistEntity> playlistEntityList = playlistService.lambdaQuery()
                .eq(qry.getPlayStatus() != null, PlaylistEntity::getPlayStatus, qry.getPlayStatus())
                .eq(PlaylistEntity::getDeleted, DeleteType.NOT_DELETE.getCode())
                .eq(PlaylistEntity::getCheckStatus, CheckStatusType.APPROVED.getCode())
                .list();

        if (playlistEntityList.isEmpty()) {
            return PageHelpUtils.getPageInfoFromView(playlistEntityList, playlistCoList);
        }
        // 转换片单实体
        playlistCoList = playlistEntityList.stream().map(playlistConvertor::toCo).collect(Collectors.toList());
        return PageHelpUtils.getPageInfoFromView(playlistEntityList, playlistCoList);
    }
// [Mybatis3.4.x技术内幕（二十）：PageHelper分页插件源码及原理剖析 - 祖大俊的个人页面 - OSCHINA - 中文开源技术交流社区](https://my.oschina.net/zudajun/blog/745232)
// PageHelpUtils.java
public class PageHelpUtils {
    /**
     * 转换数据list为带分页格式
     *
     * @param dataList 数据list
     * @return pageinfo格式的数据list
     */
    public static <T> PageInfo<T> getPageInfo(List<T> dataList) {
        return new PageInfo<T>(dataList);
    }

    /**
     * 转换数据list为带分页格式，并替换数据为viewlist
     *
     * @param sourceDataList 数据库对应list
     * @param viewList       展现层list
     * @return 带分页格式的展现层list
     */
    @SuppressWarnings("all")
    public static <T> PageInfo<T> getPageInfoFromView(List sourceDataList, List<T> viewList) {
        PageInfo pageInfo = new PageInfo(sourceDataList);
        pageInfo.setList(viewList);
        return pageInfo;
    }
}
```

**效果**

```json
{
  "code": "00000",
  "msg": "success",
  "data": {
    "total": 12,
    "list": [
      {
        "id": 2,
        "roomId": 1,
        "playlistName": "片单2",
        "playStatus": 1,
        "memo": "备注"
      },
      {
        "id": 3,
        "roomId": 1,
        "playlistName": "片单3",
        "playStatus": 1,
        "memo": "备注"
      },
      {
        "id": 4,
        "roomId": 1,
        "playlistName": "片单4",
        "playTime": "2021-03-18 17:53:38",
        "playStatus": 1,
        "checkStatus": 1,
        "checkTime": "2021-03-25 16:18:56"
      },
      {
        "id": 5,
        "roomId": 1,
        "playlistName": "片单5",
        "playStatus": 1,
        "memo": "备注"
      }
    ],
    "pageNum": 1,
    "pageSize": 4,
    "size": 4,
    "startRow": 1,
    "endRow": 4,
    "pages": 3,
    "prePage": 0,
    "nextPage": 2,
    "isFirstPage": true,
    "isLastPage": false,
    "hasPreviousPage": false,
    "hasNextPage": true,
    "navigatePages": 8,
    "navigatepageNums": [1, 2, 3],
    "navigateFirstPage": 1,
    "navigateLastPage": 3
  }
}
```

## 数据转换

[RestTemplate 交换，未为带下划线的字段映射值 - Javaer101](https://www.javaer101.com/article/2490162.html)

使用 `@JsonProperty` 注解

```java
@JsonProperty("Test_Id")
private String Test_Id; // prefer rename to testId
```

## CROS 跨域处理

```java
@Configuration
public class CorsConfiguration {
    @Bean
    public FilterRegistrationBean<CorsFilter> corsFilter() {
        CorsConfiguration config = new CorsConfiguration() {{
            setAllowCredentials(true);
            addAllowedOrigin("*");
            addAllowedHeader("*");
            addAllowedMethod("*");
        }};

        final CorsFilter corsFilter = new CorsFilter(new UrlBasedCorsConfigurationSource() {{
            registerCorsConfiguration("/**", config);
        }});

        return new FilterRegistrationBean<CorsFilter>(corsFilter) {{
            setOrder(0);
        }};
    }
}
```

## [Spring-Boot 之@Enable\*注解的工作原理 - 简书](https://www.jianshu.com/p/3da069bd865c)

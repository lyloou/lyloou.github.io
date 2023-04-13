https://docs.starrocks.io/zh-cn/latest/introduction/StarRocks_intro

StarRocks 是一款高性能分析型的数据仓库。可实现多维、实时和高并发的数据分析。支持多种格式的离线和实时数据导入，兼容mysql协议（目前只能用mysql客户端或BI客户端操作使用，他们自己的客户端还在开发中...）

适用于实时数仓、OLAP、数据湖分析等场景。

  

下面从使用者的角度来介绍一下导入和分析UGC的内容，还会提及一些注意事项。

  

之所以使用这个仓库，主要有三个原因：

1.  ugc数据量大（5KW以上）；
    
2.  需要快速的分析查询能力（如 like 左右查询）；
    
3.  需要支持增量更新能力；
    

  

![image.png](https://raw.githubusercontent.com/lyloou/img/develop/v3/202304131527279.png)


  

## 表结构设计

  

```SQL
-- 建表的时候指定主键索引持久化

show create table ugc_movie_v3;
show create table ugc_video_v3;

CREATE TABLE `ugc_movie_v3`
(
    `avid`         bigint(14)     NOT NULL COMMENT "稿件id",
    `cid`          bigint(14)     NOT NULL COMMENT "视频id",
    `page`         int(11)        NULL COMMENT "稿件内顺序",
    `description`  varchar(65535) NULL COMMENT "描述",
    `title`        varchar(500)   NULL COMMENT "标题",
    `duration`     int(11)        NOT NULL COMMENT "片长，秒",
    `autorised`    int(11)        NOT NULL COMMENT "是否可播，1可播 0不可播",
    `mtime`        bigint(20)     NOT NULL COMMENT "最近修改时间 时间戳",
    `deleted`      int(11)        NULL COMMENT "0为删除；1已删除",
    `created_time` datetime       NOT NULL COMMENT "创建时间",
    `modify_time`  datetime       NOT NULL COMMENT "更新时间"
) PRIMARY KEY(`avid`, `cid`)
COMMENT " ugc movie"
DISTRIBUTED BY HASH(`cid`) BUCKETS 10
PROPERTIES (
"replication_num" = "3",
"in_memory" = "false",
"storage_format" = "DEFAULT",
"enable_persistent_index" = "true"
);

CREATE TABLE `ugc_video_v3`
(
    `avid`         bigint(14)     NOT NULL COMMENT "稿件id",
    `cover`        varchar(500)   NOT NULL COMMENT "封面",
    `description`  varchar(65535) NULL COMMENT "描述",
    `title`        varchar(500)   NULL COMMENT "标题",
    `play_time`    varchar(128)   NULL COMMENT "发布时间",
    `view`         bigint(20)     NULL COMMENT "展示次数",
    `category_1`   varchar(64)    NULL COMMENT "一级分区名",
    `category_2`   varchar(64)    NULL COMMENT "二级分区名",
    `hot`          tinyint(4)     NOT NULL COMMENT "是否热片",
    `tag`          varchar(100)   NULL COMMENT "单一标签",
    `tags`         varchar(500)   NULL COMMENT "标签数组",
    `autorised`    tinyint(4)     NOT NULL COMMENT "是否可播，1可播 0不可播",
    `mtime`        bigint(20)     NOT NULL COMMENT "更新时间戳",
    `deleted`      int(11)        NOT NULL COMMENT "0为删除；1已删除",
    `created_time` datetime       NOT NULL COMMENT "创建时间",
    `modify_time`  datetime       NOT NULL COMMENT "更新时间"
) PRIMARY KEY(`avid`)
COMMENT " ugc video"
DISTRIBUTED BY HASH(`avid`) BUCKETS 10
PROPERTIES (
"replication_num" = "3",
"in_memory" = "false",
"storage_format" = "DEFAULT",
"enable_persistent_index" = "true"
);
```

如果设置了主键模式，注意需要开启主键索引持久化功能，否则可能会导致占用内存较多（下图15点左右在跑数据，内存空闲量立即减少。后面停止任务开启主键索引持久化后逐渐恢复）

![image.png](https://raw.githubusercontent.com/lyloou/img/develop/v3/202304131527428.png)


  

```SQL
-- 修改主键索引持久化的模式
alter table table_name set ("enable_persistent_index"="true")
```

### 参考资料：

-   [如何设置SR建表的默认属性？](https://forum.mirrorship.cn/t/topic/3075)
    
-   [数据模型 @ Data_model#主键模型](https://docs.starrocks.io/zh-cn/latest/table_design/Data_model#%E4%B8%BB%E9%94%AE%E6%A8%A1%E5%9E%8B)
    

## StreamLoad同步步骤

1.  将数据缓存起来（如：加入 redis queue）
    
2.  每隔一段时间从缓存中获取一批数据（如：每隔30s获取20000）
    
3.  将这批数据通过 stream load 导入到 starrocks
    

  

### 示例：

```Java

/**
 * stream load 的方式导入 starRocks中
 * https://www.cnblogs.com/Springmoon-venn/p/16723663.html
 *
 * @author lilou
 * @since 2023/3/20 13:55
 */

@Slf4j
public class StarRocksStreamLoadService {

    private String labelPrefix = "label-";
    @SuppressWarnings("HttpUrlsUsage")
    private String url = "http://127.0.0.1:8030";
    private String format = "json";
    private String user = "root";
    private String pass = "root";
    private String rowSep = "\n";

    public StarRocksStreamLoadService() {

    }

    public StarRocksStreamLoadService(StarRocksProperties properties) {
        initProperties(properties);
    }

    public void initProperties(StarRocksProperties properties) {
        this.labelPrefix = properties.getLabelPrefix();
        this.url = properties.getUrl();
        this.format = properties.getFormat();
        this.user = properties.getUser();
        this.pass = properties.getPass();
        this.rowSep = properties.getRowSep();
    }

    public Map<String, Object> write(String database, String table, List<String> records, String columns) throws Exception {

        // 转 byte
        StarRocksSinkBufferEntity bufferEntity = new StarRocksSinkBufferEntity(database, table, labelPrefix);
        for (String record : records) {
            byte[] bts = record.getBytes(StandardCharsets.UTF_8);
            bufferEntity.addToBuffer(bts);
        }

        // 多行合并
        byte[] data = joinRows(bufferEntity.getBuffer(), (int) bufferEntity.getBatchSize());

        // 导入的 url
        String loadUrl = new StringBuilder(url)
                .append("/api/")
                .append(bufferEntity.getDatabase())
                .append("/")
                .append(bufferEntity.getTable())
                .append("/_stream_load")
                .toString();

        // random load label
        String label = createBatchLabel();

        // do http
        Map<String, Object> map = null;
        try {
            map = RetryUtil.call(StrUtil.format("StarRocksStreamLoadService-{}-{}", database, table),
                    () -> doHttpPut(loadUrl, label, data, columns));
        } catch (Exception e) {
            final String message = StrUtil.format("[StarRocksStreamLoadService#write]: 请求发生异常, database:{}, table:{}, records:{}",
                    database, table, records);
            log.warn(message, e);
            RobotNotifyService.send(message, e);
        }

        if (Objects.isNull(map)) {
            return null;
        }

        return map;
    }

    protected boolean isSuccess(Map<String, Object> map) {
        if (Objects.isNull(map)) {
            return false;
        }

        return Objects.equals(map.get("Status"), "Success");
    }

    protected String createBatchLabel() {
        StringBuilder sb = new StringBuilder();
        if (!Strings.isNullOrEmpty(labelPrefix)) {
            sb.append(labelPrefix);
        }
        return sb.append(UUID.randomUUID()).toString();
    }

    protected Map<String, Object> doHttpPut(String loadUrl, String label, byte[] data, String columns) throws IOException {
        log.debug(String.format("Executing stream load to: '%s', size: '%s', thread: %d",
                loadUrl, data.length, Thread.currentThread().getId()));
        final HttpClientBuilder httpClientBuilder = HttpClients.custom()
                .setRedirectStrategy(new DefaultRedirectStrategy() {
                    @Override
                    protected boolean isRedirectable(String method) {
                        return true;
                    }
                })
                // 解决 Content-Length bug : Caused by: org.apache.http.ProtocolException: Content-Length header already present at
                .addInterceptorFirst(new ContentLengthHeaderRemover());
        try (CloseableHttpClient httpclient = httpClientBuilder.build()) {
            HttpPut httpPut = new HttpPut(loadUrl);
            // 指定列名
            httpPut.setHeader("columns", columns);

            if (!httpPut.containsHeader("timeout")) {
                httpPut.setHeader("timeout", "60");
            }
            if ("json".equals(format)) {
                httpPut.setHeader("strip_outer_array", "true");
                httpPut.setHeader("format", "json");
            } else {
                // 行、列分隔符
                httpPut.setHeader("row_delimiter", "\\\\x02");
                httpPut.setHeader("column_separator", "\\\\x01");
            }
            httpPut.setHeader("Expect", "100-continue");
            httpPut.setHeader("label", label);

            // 用户名、密码
            httpPut.setHeader("Authorization", getBasicAuthHeader(user, pass));
            httpPut.setEntity(new ByteArrayEntity(data));
            httpPut.setConfig(RequestConfig.custom().setRedirectsEnabled(true).build());
            try (CloseableHttpResponse resp = httpclient.execute(httpPut)) {
                HttpEntity respEntity = getHttpEntity(resp);
                if (respEntity == null)
                    return null;
                return JSON.parseObject(EntityUtils.toString(respEntity));
            }
        }
    }

    protected String getBasicAuthHeader(String username, String password) {
        String auth = username + ":" + password;
        byte[] encodedAuth = Base64.encodeBase64(auth.getBytes(StandardCharsets.UTF_8));
        return "Basic " + new String(encodedAuth);
    }

    protected HttpEntity getHttpEntity(CloseableHttpResponse resp) {
        int code = resp.getStatusLine().getStatusCode();
        if (200 != code) {
            log.warn("Request failed with code:{}", code);
            return null;
        }
        HttpEntity respEntity = resp.getEntity();
        if (null == respEntity) {
            log.warn("Request failed with empty response.");
            return null;
        }
        return respEntity;
    }

    protected static class ContentLengthHeaderRemover implements HttpRequestInterceptor {
        @Override
        public void process(HttpRequest request, HttpContext context) throws HttpException, IOException {
            // fighting org.apache.http.protocol.RequestContent's ProtocolException("Content-Length header already present");
            request.removeHeaders(HTTP.CONTENT_LEN);
        }
    }

    protected byte[] joinRows(List<byte[]> rows, int totalBytes) {
        if ("csv".equals(format)) {
            // csv
            byte[] lineDelimiter = rowSep.getBytes(StandardCharsets.UTF_8);
            ByteBuffer bos = ByteBuffer.allocate(totalBytes + rows.size() * lineDelimiter.length);

            for (byte[] row : rows) {
                bos.put(row);
                bos.put(lineDelimiter);
            }

            return bos.array();
        } else {
            // json
            ByteBuffer bos = ByteBuffer.allocate(totalBytes + (rows.isEmpty() ? 2 : rows.size() + 1));
            bos.put("[".getBytes(StandardCharsets.UTF_8));
            byte[] jsonDelimiter = ",".getBytes(StandardCharsets.UTF_8);
            boolean isFirstElement = true;
            for (byte[] row : rows) {
                if (!isFirstElement) {
                    bos.put(jsonDelimiter);
                }
                bos.put(row);
                isFirstElement = false;
            }
            bos.put("]".getBytes(StandardCharsets.UTF_8));
            return bos.array();
        }

    }


}

/**
 *  ugc starRocks 通过 stream load 的方式批量导入数据
 *
 * @author lilou
 * @since 2023/3/22 10:38
 */
@Service
@Slf4j
public class UgcStarRocksStreamLoadService extends StarRocksStreamLoadService {

    /**
     * 从缓存拉取周期
     */
    private static final int POLL_PERIOD = 30;

    /**
     * 每次从缓存拉取数量
     */
    private static final int POLL_LIMIT = 20000;

    @Autowired
    private RedissonClient redissonClient;

    private RQueue<String> movieDataQueue;
    private RQueue<String> videoDataQueue;

    @PostConstruct
    private void init() {
        initProperties(new StarRocksProperties());

        movieDataQueue = redissonClient.getQueue("UgcStarRocksStreamLoadService::movieData");
        videoDataQueue = redissonClient.getQueue("UgcStarRocksStreamLoadService::videoData");

        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor(runnable -> {
            Thread thread = new Thread(runnable, "starrocks-streamload");
            thread.setDaemon(true);
            return thread;
        });

        scheduler.scheduleAtFixedRate(() -> {
            if (scheduler.isShutdown()) {
                log.warn("[UgcStarRocksStreamLoadService#init]: 定时注册延迟消费者线程池已中断");
                return;
            }
            writeFromCacheToStarRocks();
        }, 5, POLL_PERIOD, TimeUnit.SECONDS);
    }

    private final AtomicBoolean isWriting = new AtomicBoolean(false);

    private void writeFromCacheToStarRocks() {
        if (isWriting.get()) {
            log.info("[UgcStarRocksStreamLoadService#writeFromCacheToStarRocks]: 正在写，稍等片刻");
            return;
        }

        isWriting.set(true);

        try {
            writeMovieListFromCacheToStarRocks();
            writeVideoListFromCacheToStarRocks();
        } finally {
            isWriting.set(false);
        }

    }

    private void writeMovieListFromCacheToStarRocks() {
        final List<String> result = new ArrayList<>();
        List<String> wrapperList = null;
        try {
            wrapperList = movieDataQueue.poll(POLL_LIMIT);
        } catch (Exception e) {
            final String message = "[UgcStarRocksStreamLoadService#writeMovieListFromCacheToStarRocks]: 从缓存中获取数据发生异常";
            log.warn(message, e);
            RobotNotifyService.send(message, e);
        }

        if (CollUtil.isEmpty(wrapperList)) {
            return;
        }

        try {

            for (String movieAll : wrapperList) {
                final List<String> itemList = JSON.parseArray(movieAll, String.class);
                result.addAll(itemList);
            }
            final String database = "gaoqi_test";
            final String table = "ugc_movie_v3";
            final String columns = "`avid`,`cid`,`page`,`description`,`title`,`duration`,`autorised`,`mtime`,`deleted`,`created_time`,`modify_time`";
            final Map<String, Object> map = write(database, table, result, columns);
            if (isSuccess(map)) {
                log.info("[UgcStarRocksStreamLoadService#writeMovieListFromCacheToStarRocks]: 插入movie成功 ==> 数量：" + wrapperList.size());
            } else {
                movieDataQueue.addAll(wrapperList);
                final String message = StrUtil.format("[UgcStarRocksStreamLoadService#writeMovieListFromCacheToStarRocks]: 插入movie异常 ==>:size-{}, result:{}", wrapperList.size(), map);
                log.warn(message);
                RobotNotifyService.send(message);
            }
        } catch (Exception e) {
            final String message = "[UgcStarRocksStreamLoadService#writeMovieListFromCacheToStarRocks]: 添加到 starrocks 仓库异常，data-size：" + result.size();
            log.error(message, e);
            RobotNotifyService.send(message, e);
        }
    }

    private void writeVideoListFromCacheToStarRocks() {

        final List<String> result = new ArrayList<>();
        List<String> wrapperList = null;
        try {
            wrapperList = videoDataQueue.poll(POLL_LIMIT);
        } catch (Exception e) {
            final String message = "[UgcStarRocksStreamLoadService#writeVideoListFromCacheToStarRocks]: 从缓存中获取数据发生异常";
            log.warn(message, e);
            RobotNotifyService.send(message, e);
        }

        if (CollUtil.isEmpty(wrapperList)) {
            return;
        }

        try {


            for (String wrapper : wrapperList) {
                final List<String> itemList = JSON.parseArray(wrapper, String.class);
                result.addAll(itemList);
            }
            final String database = "gaoqi_test";
            final String table = "ugc_video_v3";
            final String columns = "`avid`,`cover`,`description`,`title`,`play_time`,`view`,`category_1`,`category_2`,`hot`,`tag`,`tags`,`autorised`,`mtime`,`deleted`,`created_time`,`modify_time`";
            final Map<String, Object> map = write(database, table, result, columns);
            if (isSuccess(map)) {
                log.info("[UgcStarRocksStreamLoadService#writeVideoListFromCacheToStarRocks]: 插入video成功 ==>" + wrapperList.size());
            } else {
                // 失败后，回填到队列
                videoDataQueue.addAll(wrapperList);
                final String message = StrUtil.format("[UgcStarRocksStreamLoadService#writeVideoListFromCacheToStarRocks]: 插入video异常 ==>:size-{}, result:{}", wrapperList, map);
                log.warn(message);
                RobotNotifyService.send(message);
            }
        } catch (Exception e) {
            final String message = "[UgcStarRocksStreamLoadService#writeVideoListFromCacheToStarRocks]: 添加到 starrocks 仓库异常，data-size：" + result.size();
            log.error(message, e);
            RobotNotifyService.send(message, e);
        }
    }

    public void writeMovieListToCache(List<UgcMovieEntity> list) {
        if (CollUtil.isEmpty(list)) {
            return;
        }

        final List<String> itemList = list.stream()
                .map(JSON::toJSONString)
                .collect(Collectors.toList());
        final String wrapper = JSON.toJSONString(itemList);
        movieDataQueue.add(wrapper);
    }

    public void writeVideoListToCache(List<UgcVideoEntity> list) {
        if (CollUtil.isEmpty(list)) {
            return;
        }

        final List<String> itemList = list.stream()
                .map(JSON::toJSONString)
                .collect(Collectors.toList());
        final String wrapper = JSON.toJSONString(itemList);
        videoDataQueue.add(wrapper);
    }
}


public class StarRocksSinkBufferEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    private ArrayList<byte[]> buffer = new ArrayList<>();
    private int batchCount = 0;
    private long batchSize = 0;
    private String label;
    private String database;
    private String table;
    private boolean EOF;
    private String labelPrefix;

    public StarRocksSinkBufferEntity(String database, String table, String labelPrefix) {
        this.database = database;
        this.table = table;
        this.labelPrefix = labelPrefix;
        label = createBatchLabel();
    }

    public StarRocksSinkBufferEntity asEOF() {
        EOF = true;
        return this;
    }

    public boolean EOF() {
        return EOF;
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public String getLabel() {
        return label;
    }

    public ArrayList<byte[]> getBuffer() {
        return buffer;
    }

    public void addToBuffer(byte[] bts) {
        incBatchCount();
        incBatchSize(bts.length);
        buffer.add(bts);
    }

    public int getBatchCount() {
        return batchCount;
    }

    private void incBatchCount() {
        this.batchCount += 1;
    }

    public long getBatchSize() {
        return batchSize;
    }

    private void incBatchSize(long batchSize) {
        this.batchSize += batchSize;
    }

    public synchronized void clear() {
        buffer.clear();
        batchCount = 0;
        batchSize = 0;
        label = createBatchLabel();
    }

    public String reGenerateLabel() {
        return label = createBatchLabel();
    }

    public String createBatchLabel() {
        StringBuilder sb = new StringBuilder();
        if (!Strings.isNullOrEmpty(labelPrefix)) {
            sb.append(labelPrefix);
        }
        return sb.append(UUID.randomUUID()).toString();
    }
}
```

## Kafka同步步骤

### 添加监控

```SQL

-- 显示全部 LOAD
SHOW ALL ROUTINE LOAD;

-- 显示指定表的 LOAD
SHOW ALL ROUTINE LOAD
 FOR routine_load_stream_test_v3;

STOP ROUTINE LOAD FOR routine_load_stream_test_v5;

-- 创建 csv 序列化的主题
CREATE ROUTINE LOAD routine_load_stream_test_v4 ON stream_test
COLUMNS TERMINATED BY ",",
COLUMNS (id, id2, username)
PROPERTIES
(
    "desired_concurrent_number" = "5"
)
FROM KAFKA
(
    "kafka_broker_list"= "172.20.154.101:9092,172.20.154.103:9092,172.20.154.104:9092",
    "kafka_topic" = "topic_starrocks_stream_test4" ,
    "kafka_partitions" ="0,1,2,3,4,5,6,7,8,9",
    "property.kafka_default_offsets" = "OFFSET_BEGINNING"
);

-- 创建 json 序列化的主题
CREATE ROUTINE LOAD routine_load_stream_test_v5 ON stream_test
COLUMNS (id, id2, username)
PROPERTIES (
    "desired_concurrent_number"="5",
    "format"="json",
    "jsonpaths" ="[\"$.id\",\"$.id2\",\"$.username\"]",
    "max_error_number"="1000"
)
FROM KAFKA (
    "kafka_broker_list"= "172.20.154.101:9092,172.20.154.103:9092,172.20.154.104:9092",
    "kafka_topic" = "topic_starrocks_stream_test5" ,
    "kafka_partitions" ="0,1,2,3,4,5,6,7,8,9",
    "property.kafka_default_offsets" = "OFFSET_BEGINNING"
);
```

### 参考资料

-   [从 Apache Kafka® 持续导入 @ RoutineLoad](https://docs.starrocks.io/zh-cn/latest/loading/RoutineLoad)
    

### 测试发送

```Java
/**
 * @author lilou
 * @since 2023/3/20 15:14
 */
@Component
@Profile({"dev", "beta"})
@Slf4j
public class StarRocksKafkaApi implements Api {
    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    // http://localhost:8084/api/starRocksKafka/sendJsonMessage/invoke?id=13
    @ApiOperation(value = "发送测试接口", notes = "")
    public Map<String, Object> sendJsonMessage(Map<String, Object> parameterMap) throws ExecutionException, InterruptedException {
        final Integer id = requestParamValueByParameterMap(parameterMap, "id", Integer.class);
        final ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send("topic_starrocks_stream_test5", 0, "id1", getJsonData(id, 2, "username:" + id));
        final SendResult<String, String> stringStringSendResult = future.get();
        return MapUtil.<String, Object>builder()
                .put("value", stringStringSendResult.getRecordMetadata().toString())
                .build();
    }

    private static String getJsonData(int id, int id2, String username) {
        final JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", id);
        jsonObject.put("id2", id2);
        jsonObject.put("username", username);
        return jsonObject.toString();
    }

    @KafkaListener(topicPartitions = {@TopicPartition(topic = "topic_starrocks_stream_test5", partitions = {"0"})})
    public void consumeJsonMessage(ConsumerRecord<String, String> record, Acknowledgment ack) {
        log.info("[StarRocksKafkaApi#consumerDownVideoFinish]: 5 ==>" + record.value());
        ack.acknowledge();
    }

    // http://localhost:8084/api/starRocksKafka/sendCsvMessage/invoke?id=13
    @ApiOperation(value = "发送测试接口", notes = "")
    public Map<String, Object> sendCsvMessage(Map<String, Object> parameterMap) throws ExecutionException, InterruptedException {
        final Integer id = requestParamValueByParameterMap(parameterMap, "id", Integer.class);
        final ListenableFuture<SendResult<String, String>> future = kafkaTemplate.send("topic_starrocks_stream_test4", 0, "id1", getData(id, 2, "username:" + id));
        final SendResult<String, String> stringStringSendResult = future.get();
        return MapUtil.<String, Object>builder()
                .put("value", stringStringSendResult.getRecordMetadata().toString())
                .build();
    }

    private static String getData(int id, int id2, String username) {
        return StrUtil.format("{},{},{}", id, id2, username);
    }

    @KafkaListener(topicPartitions = {@TopicPartition(topic = "topic_starrocks_stream_test4", partitions = {"0"})})
    public void consumerDownVideoFinish(ConsumerRecord<String, String> record, Acknowledgment ack) {
        log.info("[StarRocksKafkaApi#consumerDownVideoFinish]: 4 ==>" + record.value());
        ack.acknowledge();
    }
}
```

starrocks 监控链接：http://123.207.16.222:8081/screen/1705?start=-10800

## 参考链接

https://www.cnblogs.com/Springmoon-venn/p/16723663.html

https://www.cnblogs.com/itxiaoshen/p/16290641.html
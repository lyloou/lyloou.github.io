---
title: 【business】 ID设计
date: 2019-07-18 17:00:10
toc: true
comments: true
tags:
  - business
---

## 参考资料

- [分布式系统里用户 ID 生成有什么好的方法和规则能满足“唯一、尽量短、不能直接看出规则”这几个条件? - 知乎](https://www.zhihu.com/question/20180484)
- [Leaf——美团点评分布式 ID 生成系统 - 美团技术团队](https://tech.meituan.com/2017/04/21/mt-leaf.html)

## 雪花生成器

- [Twitter 的分布式自增 ID 算法 snowflake (Java 版) - relucent - 博客园](https://www.cnblogs.com/relucent/p/4955340.html)
- [Mybatis-Plus 雪花 id 的使用以及解析机器 ID 和数据标识 ID\_摩羯座 de 杰杰陆的博客-CSDN 博客](https://blog.csdn.net/weixin_38657051/article/details/94713695?utm_medium=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase&depth_1-utm_source=distribute.pc_relevant.none-task-blog-BlogCommendFromMachineLearnPai2-2.nonecase)
- https://github.com/lyloou/spring-boot-web/

#### 根据不同业务配置成多个生成器

```java
package com.lyloou.demo.config;

import com.lyloou.common.util.SnowflakeIdWorker;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SnowflakeConfig {

    @Value("${snowflake.workerId}")
    private Long workerId;

    public enum Type {
        ORDER("ORD", 0),
        REFUND("REF", 1),
        RETURN("RET", 2);

        private String prefix;
        private long datacenterId;

        Type(String prefix, long datacenterId) {
            this.prefix = prefix;
            this.datacenterId = datacenterId;
        }

        public String getPrefix() {
            return prefix;
        }
    }

    @Bean
    SnowflakeIdWorker orderWorker() {
        return new SnowflakeIdWorker(workerId, Type.ORDER.datacenterId);
    }

    @Bean
    SnowflakeIdWorker refundWorker() {
        return new SnowflakeIdWorker(workerId, Type.REFUND.datacenterId);

    }

    @Bean
    SnowflakeIdWorker returnWorker() {
        return new SnowflakeIdWorker(workerId, Type.RETURN.datacenterId);

    }
}

```

#### 生成器的生成逻辑

依据类型来生成（如，订单流水 ID、退款流水 ID、退货流水 ID）
这里，将 dataCenterId 当做类型来使用（还可以再拆分下，适用不同场景）；

```java
package com.lyloou.demo.util;

import com.lyloou.common.exception.CommonException;
import com.lyloou.common.util.SnowflakeIdWorker;
import com.lyloou.demo.config.SnowflakeConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class SnowflakeIdGenerator {
    @Autowired
    SnowflakeIdWorker orderWorker;
    @Autowired
    SnowflakeIdWorker refundWorker;
    @Autowired
    SnowflakeIdWorker returnWorker;

    public String genId(SnowflakeConfig.Type type) {
        return type.getPrefix() + getId(type);
    }

    private long getId(SnowflakeConfig.Type type) {
        switch (type) {
            case ORDER:
                return orderWorker.nextId();
            case REFUND:
                return refundWorker.nextId();
            case RETURN:
                return returnWorker.nextId();
            default:
                throw new CommonException("无效的类型");
        }
    }
}

```

#### 配置 workerId

```yml
# application.yml
snowflake:
  workerId: 1
```

或者配置成启动参数： -Dsnowflake.workerId=3

#### 测试

```java
// 测试
package com.lyloou.demo;

import cn.hutool.core.util.RandomUtil;
import com.lyloou.demo.config.SnowflakeConfig;
import com.lyloou.demo.util.SnowflakeIdGenerator;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@SpringBootTest
public class ConfigTest {

    @Autowired
    SnowflakeIdGenerator generator;

    @Test
    public void testSnowflake() {
        for (int i = 0; i < 1000; i++) {
            System.out.println(generator.genId(SnowflakeConfig.Type.values()[RandomUtil.randomInt(0, 3)]));
        }
    }
}
/**
REF722513947651084288
ORD722513947650953217
ORD722513947650953218
RET722513947651215361
REF722513947651084289
ORD722513947650953219
REF722513947651084290
RET722513947651215362
ORD722513947650953220
REF722513947651084291
ORD722513947650953221
RET722513947651215363
REF722513947651084292
*/
```

#### 雪花算法实现

```java
package com.lyloou.common.util;

import cn.hutool.json.JSONObject;

/**
 * Twitter_Snowflake<br>
 * SnowFlake的结构如下(每部分用-分开):<br>
 * 0 - 0000000000 0000000000 0000000000 0000000000 0 - 00000 - 00000 - 000000000000 <br>
 * 1位标识，由于long基本类型在Java中是带符号的，最高位是符号位，正数是0，负数是1，所以id一般是正数，最高位是0<br>
 * 41位时间截(毫秒级)，注意，41位时间截不是存储当前时间的时间截，而是存储时间截的差值（当前时间截 - 开始时间截)
 * 得到的值），这里的的开始时间截，一般是我们的id生成器开始使用的时间，由我们程序来指定的（如下下面程序IdWorker类的startTime属性）。41位的时间截，可以使用69年，年T = (1L << 41) / (1000L * 60 * 60 * 24 * 365) = 69<br>
 * 10位的数据机器位，可以部署在1024个节点，包括5位datacenterId和5位workerId<br>
 * 12位序列，毫秒内的计数，12位的计数顺序号支持每个节点每毫秒(同一机器，同一时间截)产生4096个ID序号<br>
 * 加起来刚好64位，为一个Long型。<br>
 * SnowFlake的优点是，整体上按照时间自增排序，并且整个分布式系统内不会产生ID碰撞(由数据中心ID和机器ID作区分)，并且效率较高，经测试，SnowFlake每秒能够产生26万ID左右。
 */
public class SnowflakeIdWorker {

    // ==============================Fields===========================================
    /**
     * 开始时间截 (2015-01-01)
     */
    private final long twepoch = 1420041600000L;

    /**
     * 机器id所占的位数
     */
    private final long workerIdBits = 5L;

    /**
     * 数据标识id所占的位数
     */
    private final long datacenterIdBits = 5L;

    /**
     * 支持的最大机器id，结果是31 (这个移位算法可以很快的计算出几位二进制数所能表示的最大十进制数)
     */
    private final long maxWorkerId = -1L ^ (-1L << workerIdBits);

    /**
     * 支持的最大数据标识id，结果是31
     */
    private final long maxDatacenterId = -1L ^ (-1L << datacenterIdBits);

    /**
     * 序列在id中占的位数
     */
    private final long sequenceBits = 12L;

    /**
     * 机器ID向左移12位
     */
    private final long workerIdShift = sequenceBits;

    /**
     * 数据标识id向左移17位(12+5)
     */
    private final long datacenterIdShift = sequenceBits + workerIdBits;

    /**
     * 时间截向左移22位(5+5+12)
     */
    private final long timestampLeftShift = sequenceBits + workerIdBits + datacenterIdBits;

    /**
     * 生成序列的掩码，这里为4095 (0b111111111111=0xfff=4095)
     */
    private final long sequenceMask = -1L ^ (-1L << sequenceBits);

    /**
     * 工作机器ID(0~31)
     */
    private long workerId;

    /**
     * 数据中心ID(0~31)
     */
    private long datacenterId;

    /**
     * 毫秒内序列(0~4095)
     */
    private long sequence = 0L;

    /**
     * 上次生成ID的时间截
     */
    private long lastTimestamp = -1L;

    //==============================Constructors=====================================

    /**
     * 构造函数
     *
     * @param workerId     工作ID (0~31)
     * @param datacenterId 数据中心ID (0~31)
     */
    public SnowflakeIdWorker(long workerId, long datacenterId) {
        if (workerId > maxWorkerId || workerId < 0) {
            throw new IllegalArgumentException(String.format("worker Id can't be greater than %d or less than 0", maxWorkerId));
        }
        if (datacenterId > maxDatacenterId || datacenterId < 0) {
            throw new IllegalArgumentException(String.format("datacenter Id can't be greater than %d or less than 0", maxDatacenterId));
        }
        this.workerId = workerId;
        this.datacenterId = datacenterId;
    }

    // ==============================Methods==========================================

    /**
     * 获得下一个ID (该方法是线程安全的)
     *
     * @return SnowflakeId
     */
    public synchronized long nextId() {
        long timestamp = timeGen();

        //如果当前时间小于上一次ID生成的时间戳，说明系统时钟回退过这个时候应当抛出异常
        if (timestamp < lastTimestamp) {
            throw new RuntimeException(
                    String.format("Clock moved backwards.  Refusing to generate id for %d milliseconds", lastTimestamp - timestamp));
        }

        //如果是同一时间生成的，则进行毫秒内序列
        if (lastTimestamp == timestamp) {
            sequence = (sequence + 1) & sequenceMask;
            //毫秒内序列溢出
            if (sequence == 0) {
                //阻塞到下一个毫秒,获得新的时间戳
                timestamp = tilNextMillis(lastTimestamp);
            }
        }
        //时间戳改变，毫秒内序列重置
        else {
            sequence = 0L;
        }

        //上次生成ID的时间截
        lastTimestamp = timestamp;

        //移位并通过或运算拼到一起组成64位的ID
        return ((timestamp - twepoch) << timestampLeftShift) //
                | (datacenterId << datacenterIdShift) //
                | (workerId << workerIdShift) //
                | sequence;
    }

    /**
     * 阻塞到下一个毫秒，直到获得新的时间戳
     *
     * @param lastTimestamp 上次生成ID的时间截
     * @return 当前时间戳
     */
    protected long tilNextMillis(long lastTimestamp) {
        long timestamp = timeGen();
        while (timestamp <= lastTimestamp) {
            timestamp = timeGen();
        }
        return timestamp;
    }

    /**
     * 返回以毫秒为单位的当前时间
     *
     * @return 当前时间(毫秒)
     */
    protected long timeGen() {
        return System.currentTimeMillis();
    }

    // 原文链接：https://blog.csdn.net/jiangzeyin_/article/details/80784979
    // SELECT (1146667501642584065>>12)&0x1f as workerId,(1146667501642584065>>17)&0x1f as datacenterId;
    public JSONObject parseInfo(String id) {
        id = Long.toBinaryString(Long.parseLong(id));
        int len = id.length();
        JSONObject jsonObject = new JSONObject();
        int sequenceStart = len < workerIdShift ? 0 : (int) (len - workerIdShift);
        int workerStart = len < datacenterIdShift ? 0 : (int) (len - datacenterIdShift);
        int timeStart = len < timestampLeftShift ? 0 : (int) (len - timestampLeftShift);
        String sequence = id.substring(sequenceStart, len);
        String workerId = sequenceStart == 0 ? "0" : id.substring(workerStart, sequenceStart);
        String dataCenterId = workerStart == 0 ? "0" : id.substring(timeStart, workerStart);
        String time = timeStart == 0 ? "0" : id.substring(0, timeStart);
        int sequenceInt = Integer.valueOf(sequence, 2);
        jsonObject.put("sequence", sequenceInt);
        int workerIdInt = Integer.valueOf(workerId, 2);
        jsonObject.put("workerId", workerIdInt);
        int dataCenterIdInt = Integer.valueOf(dataCenterId, 2);
        jsonObject.put("dataCenter", dataCenterIdInt);
        long diffTime = Long.parseLong(time, 2);
        long timeLong = diffTime + timeStart;

        jsonObject.put("date", timeLong);
        return jsonObject;
    }


    //==============================Test=============================================

    /**
     * 测试
     */
    public static void main(String[] args) {
        SnowflakeIdWorker idWorker = new SnowflakeIdWorker(10, 20);
        long start = System.currentTimeMillis();
        int count = 0;
        for (; System.currentTimeMillis() - start < 1000; ) {
            idWorker.nextId();
            count++;
        }
        System.out.println(count);
        long nextId = idWorker.nextId();
        System.out.println(nextId);
        System.out.println(idWorker.parseInfo(nextId + ""));
    }
}
```

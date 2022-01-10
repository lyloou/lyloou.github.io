---
title: ElasticSearch 知多少-进阶篇
date: 2021-12-30 18:00:02
toc: true
comments: true
tags:
  - search
  - 知多少
---

## 进阶篇

![ElasticSearch-m](https://raw.githubusercontent.com/lyloou/img/develop/img/ElasticSearch-m_20211229152234503_cbd78a.png)

#### 聚合分析

聚合，即将一组查询的数据集中在一起做聚合计算。可以用来分析各种指标，如平均值，总和，排名，最大值，最小值等。

聚合分为三大类：

Bucket 聚合（分桶聚合）：根据字段值、范围等将文档分组为桶，类似 sql 中的`goup by`。

Metric 聚合（指标聚合）： 从字段值，计算出来指标，如：总和、平均值。

Pipeline 聚合（管道聚合）： 子聚合，从其它聚合（非文档或字段）中获取输入。

**聚合的语法**

```javascript
"aggregations": { # aggregations 也可以缩写为 aggs
   "<aggregation_name1>": { # 聚合的名称
      <aggregation_body> {# 聚合体：对哪些字段做聚合
      }
      [,"meta": {[<meta_data_body>]}]? # 元数据
      [,"aggregations": {[<sub_aggregation>]+}]? # 定义的子聚合
   },
   "<aggregation_name2>": {} # 聚合的名称
}
```

**数据准备**

```js
DELETE /book/
PUT /book
PUT /book/_mapping
{
  "properties": {
    "_class": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "author": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "createTime": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "id": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "price": {
      "type": "float"
    },
    "title": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "updateTime": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    }
  }
}

DELETE /book/
PUT /book
PUT /book/_mapping
{
  "properties": {
    "_class": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "author": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "createTime": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "id": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "price": {
      "type": "float"
    },
    "title": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    },
    "updateTime": {
      "type": "text",
      "fields": {
        "keyword": {
          "type": "keyword",
          "ignore_above": 256
        }
      }
    }
  }
}
```

**指标聚合-「max」**

```js
# 统计最大价格，size=0表示不获取数据，只获取指标数据
POST /book/_search
{
   "size": 0,
   "aggs": {
      "max_price": {
         "max": {
            "field": "price"
         }
      }
   }
}
```

**指标聚合-「count」**

```js
# 统计价格大于0.2的书数量
POST /book/_count
{
   "query": {
      "range": {
         "price": {
            "gt": 0.2
         }
      }
   }
}
```

**指标聚合-「value_count」**

```js
# 统计某字段有值的文档数量，size=0表示不获取数据，只获取指标数据
POST /book/_search?size=0
{
   "aggs": {
      "price_count": {
         "value_count": {
            "field": "price"
         }
      }
   }
}
```

**指标聚合-「cardinality」**

```js
# cardinality 去重计数，size=0表示不获取数据，只获取指标数据
POST /book/_search?size=0
{
   "aggs": {
      "_id_count": {
         "cardinality": {
            "field": "_id"
         }
      },
      "price_count": {
         "cardinality": {
            "field": "price"
         }
      }
   }
}
```

**指标聚合-「stats」**

```js
# 统计count,min,max,avg,sum这5个值，size=0表示不获取数据，只获取指标数据
POST /book/_search?size=0
{
   "aggs": {
      "price_stats": {
         "stats": {
            "field": "price"
         }
      }
   }
}
```

**指标聚合-「extended_stats」**

```js
# 统计比 stats多4个结果：平方和，方差，标准差，标准差区间
# size=0表示不获取数据，只获取指标数据
POST /book/_search?size=0
{
   "aggs": {
      "price_stats": {
         "extended_stats": {
            "field": "price"
         }
      }
   }
}
```

**指标聚合-「percentiles」**

```js
# 占比百分位对应的值统计
POST /book/_search?size=0
{
   "aggs": {
      "price_percents": {
         "percentiles": {
            "field": "price"
         }
      }
   }
}

# 占比百分位对应的值统计，指定分位值
POST /book/_search?size=0
{
   "aggs": {
      "price_percents": {
         "percentiles": {
            "field": "price",
            "percents": [75,99,99.9]
         }
      }
   }
}
```

**指标聚合-「percentile_ranks」**

```js
# 统计值小于等于指定值的的文档占比
# 分别统计价格小于等于0.2和0.3的文档占比
POST /book/_search?size=0
{
   "aggs":{
      "gge_perc_rank": {
         "percentile_ranks": {
            "field": "price",
            "values": [0.2,0.3]
         }
      }
   }
}
```

**桶聚合-「rang」**

```js
# 区间平均值
POST /book/_search
{
   "size": 0,
   "aggs": {
      "group_by_price": {
         "range": {
            "field": "price",
            "ranges": [
               {"from":0, "to": 0.2},
               {"from":0.2, "to": 0.3},
               {"from":0.3, "to": 0.5}
            ]
         },
         "aggs": {
            "average_price": {
               "avg": {"field": "price"}
            }
         }
      }
   }
}

# 区间数量
POST /book/_search
{
   "size": 0,
   "aggs": {
      "group_by_price": {
         "range": {
            "field": "price",
            "ranges": [
               {"from":0, "to": 0.2},
               {"from":0.2, "to": 0.3},
               {"from":0.3, "to": 0.5}
            ]
         },
         "aggs": {
            "count_price": {
               "value_count": {"field": "price"}
            }
         }
      }
   }
}

# having操作
POST /book/_search
{
  "size": 0,
  "aggs": {
    "group_by_price": {
      "range": {
        "field": "price",
        "ranges": [
          {
            "from": 0,
            "to": 0.2
          },
          {
            "from": 0.2,
            "to": 0.3
          },
          {
            "from": 0.3,
            "to": 0.5
          }
        ]
      },
      "aggs": {
        "average_price": {
          "avg": {
            "field": "price"
          }
        },
        "having": {
          "bucket_selector": {
            "buckets_path": {
              "avg_price": "average_price"
            },
            "script": {
              "source": "params.avg_price >= 0.2 "
            }
          }
        }
      }
    }
  }
}
```

#### ES 是如何知道将文档放在哪个分片中

肯定不能是随机的，不然将来获取的时候，无法知道从哪里获取。

是通过公式来决定的：

> shard = hash(routing) % number_of_primary_shards
> 说明：
> routing 是一个可变值，默认是文档的`_id`，可以自定义。
> number_of_primary_shards 是主分片的数量。
> shard 就是我们要找的分片位置。是 0 ~ number_of_primary_shards-1 之间的一个数。

注意： 由于公式中使用了 number_of_primary_shards，所以在创建索引的时候，就需要确定好分片的数量。
因为中途修改分片数量，就会让之前路由的值都失效，导致找不到文档。
（虽然可以通过分片来扩容，但是还有「[其它扩容设计方案](https://www.elastic.co/guide/cn/elasticsearch/guide/2.x/scale.html)」来扩容）

#### how - es 写入流程是怎样的

新建、索引和删除这些请求都是「写操作」，必须在主分片上面完成之后才能复制到副本分片。

根据下面这个集群来介绍下流程

![Elasticsearch-2进阶_20211231163100_2021-12-31-16-31-00](https://raw.githubusercontent.com/lyloou/img/develop/Elasticsearch-2%E8%BF%9B%E9%98%B6_20211231163100_2021-12-31-16-31-00.png)
写操作步骤顺序：

1. 客户端向 Node1 发送新建、索引或删除请求。
2. Node1 节点根据文档`_id`计算得到分片为 0，请求被转发到 0 的主分片所在的节点 Node3
3. Node3 执行请求，执行成功后，将请求转发到 Node1 和 Node2 副本上执行。当所有副本执行成功后，Node3 向协调节点 Node1 报告执行成功，协调节点 Node1 向客户端返回成功结果。

另，可以通过一些设置来「干预」写操作，以提高性能。

比如，调整一致性配置（consistency）consistency 的属性值有:

- one： 只要主分片状态 ok，就允许执行写操作。
- all：必须要主分片和所有副本分片全部成功，才允许写操作。
- quorum（默认值）：即大多数分片副本状态没问题就允许写操作。
  quorum_value = int((primary+number_of_replicas)/2) + 1，number_of_replicas 指的是索引中设定的副本数量，而不是活动的副本数量，
  也就是说，你配置了 5 个副本，但是只启动了 2 个副本，那么就无法完成写操作。
  由于新索引默认有 1 个副本分片，如果按这个公式来计算就无法执行写操作，所以 number_of_replicas 大于 1 时，此公式才适用。

再比如，设置 timeout 默认超时时间来减少等待或延长等待，默认值 1 分钟。如：`100ms`，`1s`

- [新建、索引和删除文档 | Elasticsearch: 权威指南 | Elastic](https://www.elastic.co/guide/cn/elasticsearch/guide/2.x/distrib-write.html)

#### how - es 写数据的底层原理

[持久化变更 | Elasticsearch: 权威指南 | Elastic](https://www.elastic.co/guide/cn/elasticsearch/guide/2.x/translog.html)

#### how - es 的更新和删除流程是怎样的

#### es 的搜索流程是怎样的

#### 部署 ES 时，对 Linux 的配置有哪些优化方法

#### ES 是如何索引文档的（建立索引的过程）

#### how - es 扩容设计方案

#### 如何分片，分多少？

#### lucence 内部结构是什么

#### es 中的相关性和得分是什么

#### 精准匹配检索和全文检索匹配

#### Spring boot 访问 ES

#### ELK 如何搭建和使用

#### 资料

【金山文档】 ElasticSearch [https://kdocs.cn/l/cpGSu8K35cQk](https://kdocs.cn/l/cpGSu8K35cQk)
[Elasticsearch: 权威指南 | Elastic](https://www.elastic.co/guide/cn/elasticsearch/guide/2.x/index.html)

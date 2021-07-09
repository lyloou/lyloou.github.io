---
title: ElasticSearch 相关
date: 2019-07-24 15:30:56
toc: true
comments: true
tags:
  - es
---

## 字段类型

https://www.elastic.co/guide/en/elasticsearch/reference/current/mapping-types.html

## 解决 ElasticSearch ClusterBlockException[blocked by: [FORBIDDEN/12/index read-only / allow delete (api)];

1. 查看硬盘是否足够：`df -h`
2. 如果不够的话：可以调整 es 设置：

```ini
# 控制洪水阶段水印。它默认为95％
cluster.routing.allocation.disk.watermark.flood_stage: 99%

或者
cluster.routing.allocation.disk.threshold_enabled: false
```

磁盘够了之后需要手动释放 3.

```sh
curl -XPUT -H "Content-Type: application/json" http://node.com:9200/_all/_settings -d '{"index.blocks.read_only_allow_delete": null}'
```

或者

```ini
PUT /all/_settings
{
  "index.blocks.read_only_allow_delete"：null
}
```

- [ElasticSearch 常见的报错及解决\_彭世瑜的博客-CSDN 博客](https://blog.csdn.net/mouday/article/details/86557744)
- [解决：ElasticSearch ClusterBlockException[blocked by: [FORBIDDEN/12/index read-only / allow delete (api)]; - 东北小狐狸 - 博客园](https://www.cnblogs.com/hellxz/p/11532652.html)

---
title: curl
date: 2020-07-29 10:20:48
toc: true
comments: true
tags:
  - tool
  - linux
---

- [使用 curl 发送 POST 请求的几种方式 - 自由人的 BLOG](https://ifttl.com/send-http-post-request-with-curl/)
- [http - What is the cURL command-line syntax to do a POST request? - Super User](https://superuser.com/questions/149329/what-is-the-curl-command-line-syntax-to-do-a-post-request)

```sh
curl -X POST -H "Accept-Language:zh-CN" -H 'x-auth-token:09ef4702-578e-408b-91b2-a40393dfc996' -F 'symbol=BTC/USDT' -F 'price=76.00000' -F 'amount=1002' -F 'direction=BUY' -F 'type=LIMIT_PRICE' http://192.168.1.22:8091/exchange/order/add
```

```sh
curl -X GET --data '{"album_id": "4510261846343990"}' -H "Content-Type:application/json"  http://localhost:6004/media/output/materiellist
```

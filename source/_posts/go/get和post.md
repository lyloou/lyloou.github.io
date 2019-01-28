---
title: Go中的网络请求和数据转发
date: 2017.11.18 17:12
toc: true
comments: true
tags:
- go
- beego
---


## GET & POST 请求和转发
```go
var cfg = beego.AppConfig

type AddressController struct {
        baseController
}

func (ac AddressController) Address() {
    userId := ac.GetString("user_id")
    var url = cfg.String("third::user_url") + "/user/address?user_id=" + userId
    body, err := get(url)
    if err != nil {
        logs.Error("get Address error:", err)
        return
    }
    ac.Data["json"] = string(body)
    ac.ServeJSON()
}

func (ac AddressController) AddAddress() {
    userId := ac.GetString("user_id")
    var url = cfg.String("third::user_url") + "/user/add_address?user_id=" + userId

    body, err := post(url, ac.Ctx.Input.RequestBody)
    if err != nil {
        logs.Error("post AddAddress error:", err)
        return
    }
    ac.Data["json"] = string(body)
    ac.ServeJSON()
}

func get(url string) ([]byte, error) {
    resp, err := http.Get(url)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return ioutil.ReadAll(resp.Body)
}

func post(url string, data []byte) ([]byte, error) {
    body := bytes.NewBuffer(data)
    resp, err := http.Post(url, "application/json;charset=utf-8", body)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return ioutil.ReadAll(resp.Body)
}

```

## 参考资料
- [Golang Web编程的Get和Post请求发送与解析](http://blog.csdn.net/typ2004/article/details/38669949)
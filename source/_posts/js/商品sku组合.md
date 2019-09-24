---
title: 商品多规格组合成单个SKU
date: 2019-09-19 19:47:37
toc: true
comments: true
tags:
  - javascript
---

```js
function compose(a, b) {
  let arr = [];
  if (!a || a.length == 0) {
    return b;
  }

  for (let i in a) {
    for (let j in b) {
      arr.push(a[i] + "," + b[j]);
    }
  }
  return arr;
}

function getComposeResult(d) {
  let result = compose([]);
  for (let i = 0; i < d.length; i++) {
    result = compose(
      result,
      d[i]
    );
  }
  return result;
}

let a = [1, 2];
let b = [3, 4];
let c = [5, 6];
let d = [a, b, c];
// let d = [[1,2], [3,4], [5,6]]
console.log(getComposeResult(d));

// output: ["1,3,5", "1,3,6", "1,4,5", "1,4,6", "2,3,5", "2,3,6", "2,4,5", "2,4,6"]
```

## 扩展

```js
let products = [{
    "18547,49234,48480": 947858
}, {
    "18547,49234,48481": 947859
}, {
    "18547,49235,48480": 947860
}, {
    "18547,49235,48481": 947861
}, {
    "19167,49234,48480": 947862
}, {
    "19167,49234,48481": 947863
}, {
    "19167,49235,48480": 947864
}, {
    "19167,49235,48481": 947865
}]

let spec = [{
    "spec_name": "颜色",
    "children": [{
        "spec_value_name": "红",
        "spec_value_image": "",
        "spec_value_id": 18547,
        "active": "selected",
        "disabled": "false"
    }, {
        "spec_value_name": "白",
        "spec_value_image": "",
        "spec_value_id": 19167,
        "disabled": "false"
    }],
    "spec_id": 4
}, {
    "spec_name": "重量",
    "children": [{
        "spec_value_name": "1吨",
        "spec_value_image": "",
        "spec_value_id": 49234,
        "active": "selected",
        "disabled": "false"
    }, {
        "spec_value_name": "2吨",
        "spec_value_image": "",
        "spec_value_id": 49235,
        "disabled": "false"
    }],
    "spec_id": 113
}, {
    "spec_name": "大小",
    "children": [{
        "spec_value_name": "L",
        "spec_value_image": "",
        "spec_value_id": 48480,
        "active": "selected",
        "disabled": "false"
    }, {
        "spec_value_name": "M",
        "spec_value_image": "",
        "spec_value_id": 48481,
        "disabled": "false"
    }],
    "spec_id": 742
}]

function getNumberArray(spec) {
    let arr1 = []
    for (let i in spec) {
        let arr2 = [];
        let children = spec[i].children;
        for (let j in children) {
            let child = children[j].spec_value_id;
            arr2.push(child);
        }
        arr1.push(arr2);
    }
    return arr1;
}

function compose(a, b) {
    let arr = [];
    if (!a || a.length == 0) {
        return b;
    }

    for (let i in a) {
        for (let j in b) {
            arr.push(a[i] + ',' + b[j])
        }
    }
    return arr;
}

function getComposeSpecArray(numArr) {
    let result = compose([])
    for (let i = 0; i < numArr.length; i++) {
        result = compose(result, numArr[i])
    }
    return result;
}

function getSelectSkuBySelectedStatus(spec) {
    let arr = [];
    for (let i in spec) {
        for (let j in spec[i].children) {
            let child = spec[i].children[j];
            if (child.active && child.active == 'selected') {
                arr.push(child.spec_value_id);
                break;
            }
        }
    }
    return arr.join(',');
}

let arr = getNumberArray(spec);
console.log(arr)
// output: [[18547,19167],[49234,49235],[48480,48481]]

let specArr = getComposeSpecArray(arr)
console.log(specArr);
// output: ["18547,49234,48480", "18547,49234,48481", "18547,49235,48480", "18547,49235,48481", "19167,49234,48480", "19167,49234,48481", "19167,49235,48480", "19167,49235,48481"]

let sku = getSelectSkuBySelectedStatus(spec);
console.log(sku)
// output: '18547,49234,48480'
function getProductId(products, sku) {
    for (let i in products) {
        for (let j in products[i]) {
            if (j == sku) {
                return products[i][j];
            }
        }
        return -1;
    }
}
let productId = getProductId(products, sku)
console.log(productId)
// output: 947858
```

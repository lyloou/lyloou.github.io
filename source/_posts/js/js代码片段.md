---
title: js代码片段
date: 2017.10.18 17:12
toc: true
comments: true
tags:
  - js
---

## 身份证验证

```js
const isIDCard = function(str) {
  // 验证是否身份证号
  var city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江 ',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北 ',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏 ',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };

  // 基础验证，长度验证
  if (!str || !/^\d{17}(\d|x)$/i.test(str)) {
    return false;
  }

  // 验证地址编码
  if (!city[parseInt(str.substr(0, 2))]) {
    return false;
  }

  // 验证出生日期
  var birthdayStr =
    str.substr(6, 4) + '/' + str.substr(10, 2) + '/' + str.substr(12, 2);
  var birthday = new Date(birthdayStr);
  if (!birthday) return false;
  var transBirthdayStr =
    birthday.getFullYear() +
    '/' +
    (birthday.getMonth() >= 9
      ? birthday.getMonth() + 1
      : '0' + (birthday.getMonth() + 1)) +
    '/' +
    (birthday.getDate() >= 10 ? birthday.getDate() : '0' + birthday.getDate());
  if (birthdayStr != transBirthdayStr) {
    // 日期有误
    return false;
  }

  // 验证长度和校验位
  if (str.length == 18) {
    str = str.split('');
    //∑(ai×Wi)(mod 11)
    //加权因子
    var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    //校验位
    var parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
    var sum = 0;
    var ai = 0;
    var wi = 0;
    for (var i = 0; i < 17; i++) {
      ai = str[i];
      wi = factor[i];
      sum += ai * wi;
    }
    var last = parity[sum % 11];
    if (parity[sum % 11] != str[17].toUpperCase()) {
      return false;
    }
  }

  return true;
};
```

## [设定参数必须传递](http://es6.ruanyifeng.com/#docs/function#应用)

```js
function throwIfMissing() {
  throw new Error('Missing parameter');
}

function foo(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}

foo();
// Error: Missing parameter
```

## [为浮点数运算部署一个误差检查函数](http://es6.ruanyifeng.com/#docs/number#Number-EPSILON)

```js
function withinErrorMargin(left, right) {
  return Math.abs(left - right) < Number.EPSILON * Math.pow(2, 2);
}

0.1 + 0.2 === 0.3; // false
withinErrorMargin(0.1 + 0.2, 0.3); // true

1.1 + 1.3 === 2.4; // false
withinErrorMargin(1.1 + 1.3, 2.4); // true
```

## [正确返回字符串长度的函数（Unicode 字符）](http://es6.ruanyifeng.com/#docs/regex#u-修饰符)

```js
function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = '𠮷𠮷';

s.length; // 4
codePointLength(s); // 2
```

## apply & call

```js
var a = { x: 1 };
var b = { x: 2 };
function f() {
  console.log(this.x);
}
a.f = f;
b.f = f;
f.apply(a); //1
f.apply(b); //2
```

## 返回对象的类

```js
// p214
function classof(o) {
  return Object.prototype.toString.call(o).slice(8, -1);
}
```

## 输出对象的类：Object.prototype.toString.call

```js
Object.prototype.toString.call(1);
('[object Number]');

Object.prototype.toString.call(function() {});
('[object Function]');
```

typeof 得到的是类型；

## [How to pass url query params](https://github.com/github/fetch/issues/256)

```js
function getUrl(url, options) {
  if (!isEmptyObject(options)) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + queryParams(options);
  }
  return url;
}

function queryParams(params) {
  return Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
}

// 判断对象是否为空 https://stackoverflow.com/questions/4994201/is-object-empty
function isEmptyObject(obj) {
  if (obj == null) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  if (typeof obj != 'object') return true;

  for (var name in obj) {
    if (obj.hasOwnProperty(name)) {
      return false;
    }
  }
  return true;
}

var url = getUrl('http://lyloou.com', {});
console.log(url);
```

## 对象转数组

```js
json2array = function(json) {
  let result = [];
  let keys = Object.keys(json);
  keys.forEach(function(key) {
    result.push(json[key]);
  });
  return result;
};

arr2Obj = function(array) {
  var obj = new Object();
  if (typeof array == 'object') {
    for (var i in array) {
      var thisEle = convArrToObj(array[i]);
      obj[i] = thisEle;
    }
  } else {
    obj = array;
  }
  return obj;
};
```

## 输入银行卡号，4位自动加上空格分隔
```html
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>

    <title>test</title>
    <script type="text/javascript">
        window.onload =function() {
            document.getElementById("test").onkeyup =function() {
                  this.value =this.value.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");;
            };
        };
    </script>
</head>
<body>
    <input type="text" id="test"/>
</body>

</html>
```

在前台读取数字时自动忽略空格
```js
// 这样的话会把a b c d读取为abc
String newStr = "a b c".replaceAll(" ","");
```
- [JS控制文本框：输入银行卡号，4位自动加上空格分隔 - 别在熬夜了！ - CSDN博客](https://blog.csdn.net/happy_jijiawei/article/details/22850839)

## 正则摘取文字
```javascript
// var input = "'Warehouse','Local Release','Local Release DA'";
var input = '【丝路亚心】250gX4<font color="red">核桃仁</font> 原味生<font color="red">核桃核桃仁</font> 新疆特产, <font color="red">123445</font>bcdef';
var regex = /<font[^>]+?>(.*?)<\/font>/g;

var matches, output = [];
while (matches = regex.exec(input)) {
    output.push(matches[1]);
}
console.log(matches)
console.log(output)

function  replaceText (text) {
  return text.replace(/<font[^>]*>/g, '').replace(/<\/font>/g, '')
}

var newStr = replaceText(input)
console.log(newStr)

var arr = [];
for(let i in output){
    let val = output[i];
    console.log(val)
    let index = newStr.indexOf(val)
    arr.push({type:'normal', value: newStr.substring(0, index)})
    arr.push({type:'highlight', value: val})
    newStr = newStr.substring(index+val.length)
}

if(newStr){
    arr.push({type:'normal', value: newStr})
}

console.log(arr)
// [{"type":"normal","value":"【丝路亚心】250gX4"},{"type":"highlight","value":"核桃仁"},{"type":"normal","value":" 原味生"},{"type":"highlight","value":"核桃核桃仁"},{"type":"normal","value":" 新疆特产, "},{"type":"highlight","value":"123445"},{"type":"normal","value":"bcdef"}]
```
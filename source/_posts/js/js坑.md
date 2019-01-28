---
title: js坑
date: 2018.07.18 17:12
toc: true
comments: true
tags:
- js
---


## 使用for in 循环Object会有个问题，会loop来自prototype的属性，使用的时候要小心；
```javascript
for (var key in validation_messages) {
    // skip loop if the property is from prototype
    if (!validation_messages.hasOwnProperty(key)) continue;

    var obj = validation_messages[key];
    for (var prop in obj) {
        // skip loop if the property is from prototype
        if(!obj.hasOwnProperty(prop)) continue;

        // your code
        alert(prop + " = " + obj[prop]);
    }
}
```

或者：
```javascript

var obj = {
  first: "John",
  last: "Doe"
};

//
//	Visit non-inherited enumerable keys
//
Object.keys(obj).forEach(function(key) {

  console.log(key, obj[key]);

});
```
## 参考资料
https://stackoverflow.com/questions/921789/how-to-loop-through-a-plain-javascript-object-with-the-objects-as-members

---
title: ES6
date: 2017.02.17 17:12
toc: true
comments: true
tags:
- js
---


## [函数](http://es6.ruanyifeng.com/#docs/function)
### 箭头函数
如果箭头函数只有一行语句，且不需要返回值，可以采用下面的写法，就不用写大括号了。
```js
let fn = () => void doesNotReturn();
```

> 箭头函数有几个使用注意点。  
（1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。  
（2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。  
（3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用 rest 参数代替。  
（4）不可以使用yield命令，因此箭头函数不能用作 Generator 函数。  

### [定义时所在的作用域 & 运行时所在的作用域](http://es6.ruanyifeng.com/#docs/function#使用注意点)
```js
// 箭头函数可以让setTimeout里面的this，绑定定义时所在的作用域，而不是指向运行时所在的作用域。下面是另一个例子。

function Timer() {
  this.s1 = 0;
  this.s2 = 0;
  // 箭头函数
  setInterval(() => this.s1++, 1000);
  // 普通函数
  setInterval(function () {
    this.s2++;
  }, 1000);
}

var timer = new Timer();

setTimeout(() => console.log('s1: ', timer.s1), 3100);
setTimeout(() => console.log('s2: ', timer.s2), 3100);
// s1: 3
// s2: 0

// 上面代码中，Timer函数内部设置了两个定时器，分别使用了箭头函数和普通函数。前者的this绑定定义时所在的作用域（即Timer函数），后者的this指向运行时所在的作用域（即全局对象）。所以，3100 毫秒之后，timer.s1被更新了 3 次，而timer.s2一次都没更新。
```

> 箭头函数里面根本没有自己的this，而是引用外层的this。  
> 除了this，以下三个变量在箭头函数之中也是不存在的，指向外层函数的对应变量：arguments、super、new.target。  
> 另外，由于箭头函数没有自己的this，所以当然也就不能用call()、apply()、bind()这些方法去改变this的指向。

### [尾调用](http://es6.ruanyifeng.com/#docs/function#尾调用优化)
只有不再用到外层函数的内部变量，内层函数的调用帧才会取代外层函数的调用帧，否则就无法进行“尾调用优化”。


### 空位
for...of并没有忽略它们；
entries()、keys()、values()、find()和findIndex()会将空位处理成undefined；
由于空位的处理规则非常不统一，所以建议避免出现空位。


## [对象](http://es6.ruanyifeng.com/#docs/object)

Object.assign拷贝的属性是有限制的，
只拷贝源对象的自身属性（不拷贝继承属性），也不拷贝不可枚举的属性（enumerable: false）。

### 有四个操作会忽略enumerable为false的属性。
- for...in循环：只遍历对象自身的和继承的可枚举的属性。
- Object.keys()：返回对象自身的所有可枚举的属性的键名。
- JSON.stringify()：只串行化对象自身的可枚举的属性。
- Object.assign()： 忽略enumerable为false的属性，只拷贝对象自身的可枚举的属性。

for...in会返回继承的属性，可以通过配置`enumerable`为`false`来避免`toString`和`length`属性被遍历。
总的来说，操作中引入继承的属性会让问题复杂化，大多数时候，我们只关心对象自身的属性。所以，尽量不要用for...in循环，而用Object.keys()代替。


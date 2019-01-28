---
title: 《JavaScript权威指南》笔记
date: 2017.02.16 17:12
toc: true
comments: true
tags:
- js
---

> 注：笔记是倒序排列的。



| node的helloworld程序：
```js
//! program.js
// 通过在命令行输入`node program.js`来运行，然后在浏览器中打开网址`127.0.0.1:8080`来访问
var http = require('http');

var server = new http.Server();
server.listen(8080);
server.on('request', function(request, response){
  console.log(request.url); //打印请求网址
  response.write("Hello World!");
  response.end();
});

```
| Rhino，一种用Java编写的JavaScript解释器。在[mozilla/rhino: Rhino is an open-source implementation of JavaScript written entirely in Java](https://github.com/mozilla/rhino)中具体研究。

| Web浏览器之外的两种运行环境
- [下载 Rhino - Mozilla 产品与私有技术 | MDN](https://developer.mozilla.org/zh-CN/docs/Mozilla/Projects/Rhino/Download_Rhino)
- node

## 第十二章：服务器端JavaScript

| 解构赋值右侧的数组所包含的元素不必和左侧的变量一一对应，左侧多余的变量的赋值为`undefined`，右侧多于的值则会被忽略。左侧的变量列表可以包含连续的逗号用以跳过右侧对应的值。--p275

| 通过var声明的变量在函数内都是可用的，而通过let声明的变量则只属于就近的花括号括起来的语句块。--p272

## 第十一章：JavaScript的子集和扩展

| RegExp方法
- `exec()`：exec()方法对一个指定的字符串执行一个正则表达式。lastIndex属性会在设置了`g`修饰符后起作用。 --p264 --p265
- `test(字符串)`：对字符串进行检测，如果包含有一个匹配，则返回true；

| String支持4种正则表达式用法。--p262
- String.search(/正则/); 如果参数不是正则，则通过RegExp构造正则对象；
- String.replace(/正则/, "代替换文本"); 如果第一个参数是字符串，则直接搜索该字符串而不是构造成正则表达式。第二个参数可以是函数，该函数能够动态地计算替换字符串；
- String.match(/正则/); 最常用的正则方法；
- String.split(/正则/); 参数可以是字符串也可以是正则；


| 正则表达式修饰符：出现在第二条斜线之外的字符。 --p261
```
i 不区分大小写
g 全局匹配
m 多行模式的匹配
```

| 锚字符：--p261
```
^ 匹配字符串开头
$ 匹配字符串结尾
\b 匹配单词的边界
\B 匹配非单词边界
(?=p) 零宽正向先行断言，要求接下来字符都与p匹配
(?!p) 零宽负向先行断言，要求接下来字符不与p匹配
```

| 非贪婪匹配（尽可能少地匹配）：在匹配的字符后跟随一个问号。--p257

| 重复：--p257
```
{n, m} （至少n次，不能超过m次）
{n, } （匹配前一项n次到多次）
{n} 匹配前一项n次
? 0次或多次
+ 1次或多次
* 0次或多次
```

| 字符类：将直接量字符单独放进方括号`[]`内就组成了字符类。 --p256

| 在正则表达式中，具有特殊含义的标点符号：--p255
```js
^ $ . * + ? = ! : | \ / ( ) [ ] { }
```

| ECMAScript 5 规范做了同ECMAScript 3相反的规定，同一段代码所表示的正则表达式直接量的每次运算都返回新的对象。--p254

| 创建正则表达式：
- 使用`RegExp()`构造函数来创建；
- 使用正则表达式直接量语法（包含在一对斜杠之间的字符）；

## 第十章：正则表达式


| 模块，导出API：
1. 返回构造函数； --p251
2. 通过new来直接调用模块函数； --p252
3. 框架提供的导出模块API方法； --p252

| 模块化，实现代码的重用。--p248

| 锁定原型对象的一个使用场合：阻止枚举类型`enumeration()`属性的变化（修改和删除）。在`Object.freeze()`方法调用之前所做的设置都是生效可用的。 --p244

| `Object.freeze()`和`Object.seal`的功能一样，都会把对象的属性设置为只读和不可配置的。--p244

| `Object.defineProperty()`和`Object.defineProperties()`可以用来创建新特性，也可以用来修改已有属性的特性。 --p242

| ECMAScript 5给对象的扩展性增加了限制（方法支持：setter、getter、可枚举性、可写性、可配置性），其新特性使类更加健壮。 --p239
```js
Object.defineProperty();
Object.defineProperties();
Object.seal();
Object.preventExtensions();
Object.create();
Object.freeze();
Object.getOwnPropertyDescriptor();
```


| `var str = JSON.stringify(o);`将对象转化为json字符串，
`JSON.parse(str)`，将字符串转化为对象，但是该对象不具有和o对象相同的继承结构。 --p222

| 鸭式辨型不能应用于内置类，比如不能通过`quacks(o, Array)`来检测o是否实现了Array中的所有同名方法。原因是内置类的方法都是不可枚举的（for/in操作无法遍历）。--p217

| 在JavaScript中，类的实现是基于其原型继承机制的。--p201

## 第九章：类和模块

| 需要给`f()`传入一个参数，所以使用`f()`的` ()`方法；
  需要给`g()`传入多个参数，所以使用`g()`的`apply()`方法； --p197 --p189

| 可以通过`new Function()`构造方法的方式来定义函数（另外两种定义方式：1.函数定义语句；2. 函数直接量表达式）。`Function`构造函数创建的是一个匿名函数，不需要指定函数名。--p192

| 书写闭包的时候还需要注意一件事，this是JavaScript的关键字，而不是变量。

| 函数的执行依赖于变量作用域，这个作用域是在函数定义时决定的，而不是函数调用时。 --p182

| 直接调用匿名函数
```js
(function(){console.log("我是匿名函数，我被调用")}());
(function(x){console.log("我是匿名函数，我被调用=>" + x)})(3);
```
注意：`function`之前的左圆括号是必需的，如果不写这个左圆括号，JavaScript解释器会视图将关键字function解析为函数定义表达式。

| 调用函数中的函数：
```js
// 函数中的函数
function a(){
  console.log("我是a");
  return b;
}

function b(){
  console.log("我是b");
  return c;
}

function c(){
  console.log("我是c");
}

a()()(); // => 我是a /n 我是b /n 我是c
```

| `argument[]`对象适用场合：函数包含固定个数的命名和必须的参数，以及随后个数不定的可选实参。--p175

| JavaScript针对实参的默认检查行为：省略的实参都是`undefined`，多出的实参会自动省略。--p174

| 标识符`arguments`是指向实参对象的引用，实参对象是一个类数组对象。可以通过下标来访问传入的实参值。例如：`argeuments[0]`表示第一个参数，`arguments.length()`表示实参数组的长度。--p174

| this是一个关键字，不是变量，也不是属性名。JavaScript的语法不允许给this赋值。--p171

| 任何函数只要作为方法调用实际上都会传入一个隐士的实参——这个实参是个对象，方法调用的母体就是这个对象。--p170

| 函数定义表达式/函数声明语句
函数声明语句：ECMAScript规范只是允许它们作为顶级语句。可以出现在全局代码里，或者内嵌在其他函数中，不能出现在循环，条件判断，或者try/catch/finally中。
函数定义表达式：可以出现在JavaScript代码的任何地方。 --p168

# 第八章：函数

| 对于字符串`var a = "test"`虽然可以通过`a[0]`的方式获取字符（很类似于数组的获取方式），但是字符串不是数组：`Array.isArray(a) === false`。

| `Array.indexOf()`和`Array.lastIndexOf()`：
参数1：需要搜索的值。
参数2：指定数组中的一个索引，从那里开始搜索。（可选的，如果省略则从头开始搜索；如果是负数，则表示相对末尾的偏移量） --p160

| `Array.reduce()`需要两个参数：
参数1： 执行化简操作的函数。
参数2： 传递给函数的初始值（可选的）。

| forEach无法在所有元素都传递给调用的函数之前终止遍历。可以通过抛异常的方式来中断。--p156

| [JavaScript中函数和方法的区别](http://www.cnblogs.com/moltboy/archive/2013/04/24/3040450.html)
函数：是可执行的JavaScript代码块，由JavaScript程序定义或JavaScript实现预定义。
方法：是通过对象调用的JavaScript函数。
（一个方法无非是个保存在一个对象的属性里的JavaScript。--p169）
（如果函数挂载在一个对象上，作为对象的一个属性，就称它为对象的一个方法。当通过这个对象来调用函数时，该对象就是此次调用的上下文，也就是该函数的this值--p165）
方法是用来对this对象进行操作的，this对象是方法的一个重要属性，当this对象出现在方法主体内部，this值就指向调用该方法的对象。而函数通常是独立的，并不需要经常使用this对象。

| `Array.push(a)`和`Array.pop()`，均修改原数组本身。 --p154

|`Array.splice()`，对元素本身做修改。
- 参数1：指定插入或删除的起始位置；
- 参数2：指定了应该从数组中删除的元素个数。（为0时不删除任何元素）
- 后续参数：要插入的元素；

| `Array.concat()`不会递归扁平化数组的数组。`concat()`也不会修改调用的数组。

| `Array.reverse()`操作的是原数组，对原数组进行重新排列。
例如：
```js
var a = [1, 2, 3];
a.reverse().join("-"); // => 1-2-3
a // =>[3, 2, 1]
```

| `Array.join()`，用什么字符来拼接数组中的元素。例如：`[1, 2, 3].join(-)`的结果是`1-2-3`；

| 在数组尾部压入一个元素，与给数组a[a.length]赋值是一样的。
```js
var a = [];
a.push("one"); // ["one"]
a[a.length] = "two"; // ["one", "two"]
```

| 在数组直接量中省略值时不会创建稀疏数组。省略的元素在数组中是存在的，其值为`undefined`。 --p147
```js
var a1 = [,,,]; // 数组是[undefined, undefined, undefined]
var a2 = new Array(3); // 该数组根本没有元素
0 in a1 // => true: a1在索引0处有一个元素——undefined。？？？，在Chrome56.0中，其值为false；而如果a1=[undefined, undefined, undefined]，该结果是true
0 in a2 // => false: a2在索引0处没有元素
```

| 数组最大能容纳`2^32-1=4 294 967 295`个元素。

| 非标准的方法：以两条下划线作前缀，两条下划线做后缀的方法。例如：`__lookupGetter__()、__lookupSetter__()`。--p138

# 第七章

| 基于兼容性考虑，不推荐使用`__proto__`，IE和Opera尚未实现它。 --p139

| `Object.defineProperty(对象, 要创建或修改的属性名称, 属性描述符对象)`方法可以用来设置属性的特性、新建属性的某种特性。
属性描述符：`{value: 1, writable: true, enumerable: false, configurable: true}`，不必包含所有4个特性，例如:`{value:2}`；
对于新创建的属性来说，默认的特性值是`false`或`undefined`。 --p136


| 对象直接量:var a = {x:1, y:2}
对象直接量是一个表达式，每次运算都创建并初始化一个新对象，如果在一个重复调用的函数中的循环体内使用了对象直接量，它将会创建很多新对象；--p
120
http://www.cnblogs.com/jiuyi/p/4226903.html

| 严格模式（"use strict"是ECMAScript 5引入的一条指令）
```js
// c = "dd"; // 在`use strict`之前没有任何表达式
"use strict" // 被当作指令
d = "d1"
```

```js
c = "dd";
"use strict" // 被当作普通的表达式语句对待。
d = "d1";
```

| 严格模式存在的意义：修正了语言的重要缺陷，并提供健壮的查错功能和增强的安全机制。 --p115


| with的用法
```js
// ==> with测试
var o = {x:1};
console.log(o); // => {x:1}
with(o) x = 12;
console.log(o); // => {x: 12}: with语句可以用来修改对象中属性的值。

var o = {};
with(o) x = 13;
console.log(o); // => {}:with提供了一种读取o的属性的快捷方式，但是不能创建o的属性。
console.log(x); // => 13:如果o没有属性x, 则相当于这段代码相当于`x=13`
```

| 在严格模式下是禁止使用`with`语句的，并且在非严格模式下也是不推荐的，尽量避免使用`with`语句。(难优化，运行的慢) --p113

| 通过`prompt("msg")`的方式，从浏览器客户端获取用户输入。
 通过`alert("msg")`的方式弹出消息。

| 如果抛出异常的函数没有处理它的`try/catch/finally`语句，异常将向上传播到调用该函数的代码。如果没有找到任何异常处理程序，JavaScript将把异常当作程序错误来处理。--p110

| return语句只能在函数体内出现，否则会报语法错误。 --p109

| 函数，可以通过两种方式来定义： --p62, p57，p95


```js
// 方式1--函数定义表达式：
var square = function(x){ return x * x;}
// 方式2--函数声明语句：
function square(x){
  return x * x;
}
```

两者的区别是：
- 使用var，只有变量声明提前了--变量的初始化代码仍然在原来的位置。
- 使用函数声明语句的话，函数名称和函数体均提前。

举个例子：

```js
// ==>函数声明提前测试；
// 在函数初始化之前调用
console.log("代码定义之前调用=============");
// f1(); // =>TypeError: f1 is not a function
f2(); // => f2

// 函数定义的地方
var f1 = function(){console.log("f1")}
function f2(){console.log("f2")}

console.log("代码定义之后调用=============");
f1(); // => f1
f2(); // => f2
```

整体被显示地“提前”到了脚本或函数的顶部。

| 函数体内局部变量会声明提前，并且会覆盖同名的全局变量 --p58
> 将函数内的变量声明“提前”至函数体顶部，同时变量初始化留在原来的位置。

| JavaScript中，if,else的匹配规则是，else总是和就近的if语句匹配。 --p97

JavaScript中没有块级作用域。 --p93

delete:一些内置核心和客户端属性是不能删除的，用户通过var语句声明的变量不能删除。--p89

三元运算符的使用场合： --87
如果有定义就使用定义过的，如果没有定义则使用默认值。
```js
var greeting = "hello" + (username ? username : "there");
```

为什么会有下面这种用法？p.x的执行依赖于p，如果不使用这种“&&”的方式，那么会抛出类型错误异常。--p80
```js
var p = null;
p && p.x
```

假值是`false, null, undefined, 0, -0, NaN和""`，所有其他的值包括对象都是真值。 --p79

所有小写的ASCII字母都“大于”大写的ASCII字母。 -- p77

数组也是对象
```js
typeof [] === "object"; // =>true
```

只有在`x`等于`NaN`时，表达式`x!==x`成立。 --p75

true在比较的过程中会转换为1.
```js
1 == true // => true
2 == true // => false
```

NaN和其他任何值都是不相等的（包括它本身）。 --p75

位操作移动的位数的范围是：0-31.
为什么？因为位运算符要求它的操作数是整数，这些整数表示为32位整型而不是64位浮点型； -p73

在JavaScript中，所有的数字都是浮点型的，除法运算的结果也是浮点型的。--p70

如果操作数是NaN，那么操作结果也是NaN。--p70

所有无法转换成数字的操作数在进行算术运算时，都转换成NaN。 --p70

结合性：一元运算符，赋值和三元条件运算符都具有从右至左的结合性。 --p69

注意：当属性名是通过运算得出的值而不是固定的值的时候，使用方括号写法。 --p64

点式的写法更简单（相比较于方括号），但是访问的属性名称必须是合法的标识符，并且需要知道属性的名字。 --p63

对于属性名称中包含空格的情况，可以通过`[]`来表示，例如：
```js
var p = {"ni hao" : "hello"};
p["ni hao"] // => hello
```

对象直接量中的属性名称可以是字符串而不是标识符。--p62

数组直接量中的列表逗号之间的元素可以省略，省略的空位会填充 `undefined`。
数组直接量的元素列表结尾可以留下单个逗号，这时并不创建一个新的`undefined`对象。 --p62

在开头添加一行字符串`use strict;`可以开启严格模式；

同名的变量名，局部的会覆盖全局的。注意声明提前。

始终使用`var`来声明变量（不要隐藏var）。 --p56

`new Boolean(false)`是一个对象，而不是原始值。所以以下代码会打印出`1`:
```js
var c = new Boolean(false);
if(c){
  console.log(1);
} else {
  console.log(2);
}
```

依照术语的叫法，对象值都是引用，对象的比较均是引用的比较：当且仅当他们引用同一个基对象时，他们才相等。--p48

JavaScript中的字符串相等：
当且仅当他们的长度相等，且每个索引的字符都相等时. --p47

JavaScript对象是一种复合值：它是属性或已命名值的集合。 --p46
属性值可以是方法名。通过`o.m()`的方式进行调用。

任意JavaScript的值都可以转换成布尔值。
```js
undefined
null
0
-0
NaN
"" // 空字符串
```
所有其他值，包括所有对象（数组）都会转换成true. --p43

在两条斜线之间的文本构成了一个正则表达式直接量。

舍入误差的解决方案：使用整数“分”而不要使用小数“元”进行基于货币单位的运算。 --p38

二进制浮点数表示法并不能精确表示类似0.1这样的简单数字。 --p37

除了作为除数外`0`和`-0`是一模一样的。
```js
var zero = 0;
var negz = -0;
zero === negz; // => true
1/zero === 1/negz; // => false: 正无穷大和负无穷大不一样
```
-- p37


当且仅当x为`NaN`时，表达式`x != x`为`true`；--p37

无穷大值在进行加减乘除运算后，结果还是无穷大。

JavaScript中的算术运算在溢出、下溢、被零整除时不会报错：
```js
3 / 0 = Infinity;
-3 / 0 = -Infinity;
```
--p36

八进制（不推荐使用八进制，在ECMAScript 6的严格模式下  ，8进制是明令禁止的）：
0377是八进制；
0378是十进制；（可以通过console来验证） --p35

浮点数范围（采用IEEE 754标准）：
最大值（无限远离0）：+- 1.7976931348623157 x 10^308
最小值（无限接近0）：+- 5.0 x 10^-324
--p34

数字直接量：一个数字直接出现在JavaScript程序中。
在任何数字直接量前添加`-`符号，可以得到它们的负值。但负号是一元求反运算符，并不是数字直接量语法的组成部分。p34

JavaScript中的所有数字均用浮点数值表示。


不在任何函数内声明的变量称作全局变量，它在JavaScript程序中的任何地方都是可见的。
在函数内声明的变量具有函数作用域，并且只在函数内可见。 --p34


### 可选的分号
在JavaScript中，分割语句的分号是可选的。
JavaScript并不是在所有换行处都填补分号：只有在缺少了分号就无法正确解析代码的情况下，JavaScript才会填补分号；
例外1：注意：在`return`, `break`, `continue`和随后的表达式之间不能换行（会自动添加分号）。
例外2：在涉及`++`, `--`的时候，既可以作为前缀也可以作为后缀。如果作为后缀表达式，则应当放在同一行。


### 数据类型
在编程语言中，能够表示并操作的值的类型称作数据类型。

在技术上讲，只有JavaScript对象才能拥有方法。然而数字，字符串和布尔值也可以拥有自己的方法。
在JavaScript中只有`null`和`undefined`是无法拥有方法的；


本书的风格和《Effective Java》很类似

# 《JavaScript权威指南》笔记
2012年4月第1版 2016年9月第17次印刷。


### 书中的错误
| p75
结果应该是相等，这条和第四条关于NaN的描述存在矛盾。
> 如果两个值都是null或者都是undefined，则它们不相等。 => 则他们相等

| p77
> 则需要首先将字符串转全部换为小写字母 => 则需要首先将字符串全部转换为小写字母

| p113
> width、debugger和use strict => with、debugger和use strict

| p159
> 为了简单起见，到目前位置 => 到目前为止

| p168
> try/cache/finally => try/catch/finally

| p177
> 数组a中必须为数字、null和undefined的元素都将忽略。 => `、`修改为`,`

| p203
> prototye属性 => prototype

| p204
> var r = range(1, 3); => var r = new Range(1, 3);

| p205
> 冠以关键字mew => 冠以关键字new


| p213
> 但我们常常会忽觉原型上的constructor属性。 => 但我们常常会忽略原型上的constructor属性。

| p260
> /\s\Javas/ => /\sJava\s/

| p260
>  带有“(?!”的断言是负向先行断言，用以指定接下来的字符都不必匹配。
=> 带有“(?!”的断言是负向先行断言，用以指定接下来的字符都不匹配。


| p263
>  接下来对exec()方法的讨论中会提到：
=> 接下来对exec()方法的讨论中会提到。

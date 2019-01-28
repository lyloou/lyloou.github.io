---
title: JQuery学习笔记.md
date: 2017.02.17 13:58
toc: true
comments: true
tags:
- js
---

重难点：
[Promise](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/0014345008539155e93fc16046d4bb7854943814c4f9dc2000#0)

jQuery
======

组合查找
--------
### tag和属性
$('input[name="email"]'); // 找到input下的name="email"的标签；

### tag和class
$('tr.red'); // 找出<tr class="red ...">...</tr>


多项选择器
----------
用符号","隔开
$('p,div'); // 把<p>、<div>都选择出来。
注意选择出来的元素按照在HTML中的顺序排列的，不会有重复的元素。


层级选择器
----------
如果两个DOM元素据有层级关系，就用`$('parent child')`来选择，层级之间用空格隔开。
其中，parent和child可以是父子关系，也可以是祖孙关系。

好处：缩小了选择的范围，因为首先要定位父节点，才能选择相应的子节点。


子选择器
---------
$('parent>child')
其中，parent和child必须是父子关系（直属父子关系）；


查找和过滤
----------
向下层查找： 使用`find()`函数，其中的参数表示同上面的选择器所需要的一样；
向上层查找： 使用`parent()`函数。
同层查找： 使用`next()`或者`prev()`方法。可以包含参数，也可以不要参数。





操作DOM
-------
$('#id').text() 获取节点文本
$('#id').html() 获取原始HTML

### 传入参数直接修改内容
$('#id').text('new');
$('#id').html('<span>new</span>');

###  获取class
$('#id').css('color');

### 设置class
$('#id').css('color', 'red');
$('#id').css('backgroundColor', 'red');
$('#id').css('background-color', 'red');


$('#id').hasClass('hightlight');
$('#id').addClass('hightlight');
$('#id').removeClass('hightlight');

### 显示和隐藏DOM
$('#id').hide(); // 隐藏
$('#id').show(); // 显示

### 获取DOM信息
$('#id').width();
$('#id').height();

### 操作属性:
$('#id').attr('name'); // 获取属性
$('#id').attr('name', 'hello'); // 设置属性
$('#id').removeAttr('name'); // 移除属性

注意：针对radio 和 selected 要区别处理（例如使用prop），最好使用`is(':selected')`这样的方式；
http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/001434500494451273e6b3dec9d411d9ba841dee8caec45000

### 操作表单
获取value: input.val();
设置value: input.val('newValue');


修改DOM结构
-----------

### 添加子节点
在子节点最后添加：
$('#div').append('<li>Lua</li>');

在子节点前面添加：
$('#div').append('<li>Lua</li>');

在同级节点添加：
$('#div').after('<p>Java</p>');
$('#div').before('<p>Java</p>');

### 删除节点
$('#div').remove(); // 删除了id为div的节点



事件
====
http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143564690172894383ccd7ab64669b4971f4b03fa342d000#0

* 鼠标事件
* 键盘事件
* 其他事件（focus, blur, change, submit, ready）
在head中的script中设置了DOM的事件监听，却没有生效，原因是：
因为JavaScript在此执行的时候，设置的对象尚未载入浏览器，所以获取的DOM为`[]`，所以事件并没有绑定到任何DOM上。
解决办法是：
将绑定事件的过程放在document的ready中执行
```js
<script>
    $(document).on('ready', function(){
        $('#testForm').on('submit', function(){
            alert('Submit');
        });
    })
</script>
```
另一种简单处理方式（上面的代码简写）：
```js
$(function(){
    $('#testForm').on('submit', function(){
        alert('Submit');
    });
})
```


### 事件触发条件

例如：监听文本框的内容变动
``` js
var input = $('#test-input');
input.change(function () {
    console.log('changed...');
});
```

通过js代码改变其值，并不会触发事件，我们可以通过手动调用change()方法来触发；
``` js
var input = $('#test-input');
input.val('change it!');
input.change();
```
`input.change()`相当于`input.trigger('change')`


### 浏览器安全限制
只有用户触发才能执行
``` js
// 无法弹出新窗口，将被浏览器屏蔽
$(function(){
    window.open('/');
})

// 正常执行
var button1 = $('#testPopupButton1');
function popupTestWindow() {
    window.open('/');
}
button1.click(function () {
    // 正常执行
    popupTestWindow();

    // 延迟执行的`window.open()`方法会被浏览器限制；
    setTimeout(popupTestWindow, 100);
});
```

jQuery动画
==========

常用动画
------

- div.show(300);
- div.hide(300);
- div.toggle(300);
- div.slideDown(300);
- div.slideUp(300);
- div.slideToggle(300);
- div.fadeIn(300);
- div.fadeOut(300);
- div.fadeToggle(300);

自定义动画
--------
``` js
div.animate({
        // 最后的状态
    }, 300, function(){
        // 动画结束后的操作
});
```

jQuery扩展
=========

编写jQuery插件原则：
1. 给`$.fn`绑定函数，实现插件的代码逻辑；
2. 插件函数最后要`return this`, 以支持链式调用；
3. 插件函数要有默认值，绑定在`$.fn.<pluginName>.defaults`上；
4. 用户在调用时可传入设定值以便覆盖默认值；

错误处理
=======

对于 try catch finally结构的处理方式，需要注意：
一旦错误发生，就不再向后进行，但是前面已经执行成功的，则保持住了，如下代码；
``` js
<script type="text/javascript">
    var r1=0;
    var r2=null;
    var r3=0;
    var r4=0;
    try{
        r1 = 1;
        r2.kk;
        r3 = 3;
    } catch (e) {
        console.log(e);
    } finally {
        r4 = 4;
    }

    console.log('r1=' + r1);
    console.log('r2=' + r2);
    console.log('r3=' + r3);
    console.log('r4=' + r4);
</script>>
```
输出结果是：
``` js
r1=1 // r1已经执行成功了，（注意：不像java中的处理方式，如果出错了所有的都失效）
r2=null
r3=0
r4=4
```
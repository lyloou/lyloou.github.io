---
title: javascript的全选、全不选、反选逻辑实现
date: 2016.12.28 18:04
toc: true
comments: true
tags:
- js
- jQuery
---



实现目标
=======
```
当用户勾上“全选”时，自动选中所有语言，并把“全选”变成“全不选”；

当用户去掉“全不选”时，自动不选中所有语言；

当用户点击“反选”时，自动把所有语言状态反转（选中的变为未选，未选的变为选中）；

当用户把所有语言都手动勾上时，“全选”被自动勾上，并变为“全不选”；

当用户手动去掉选中至少一种语言时，“全不选”自动被去掉选中，并变为“全选”。
```

代码实现
=======
``` html
<html>
<head>
	<script src="http://code.jquery.com/jquery-3.1.1.js">
	</script>
    <script type="text/javascript">
        'use strict';
        $(function () {
            var
                form = $('#test-form'),
                langs = form.find('[name=lang]'),
                selectAll = form.find('label.selectAll :checkbox'),
                selectAllLabel = form.find('label.selectAll span.selectAll'),
                deselectAllLabel = form.find('label.selectAll span.deselectAll'),
                invertSelect = form.find('a.invertSelect');

            // 重置初始化状态:
            form.find('*').show().off();
            form.find(':checkbox').prop('checked', false).off();
            deselectAllLabel.hide();
            // 拦截form提交事件:
            form.off().submit(function (e) {
                e.preventDefault();
                alert(form.serialize());
            });

            selectAll.on('change', function(e){

                langs.get().map(function(x){$(x).prop('checked', this.checked);});

                if(this.checked){
                    selectAllLabel.hide();
                    deselectAllLabel.show();
                } else {
                    selectAllLabel.show();
                    deselectAllLabel.hide();
                }
            });

            // 校验所有的 input
            function checkAll(){
              // 获取所有input的checked个数
              var count = 0;
              langs.get().map(function(x){
                if($(x).prop('checked')){
                  count = count+1;
                }
              });
              if(count === 0) {
              } else if (count === inputs.length){
                // 当用户把所有语言都手动勾上时，“全选”被自动勾上，并变为“全不选”；
                selectAll.prop('checked', true);

                selectAllLabel.hide();
                deselectAllLabel.show();
              } else {
                // 当用户手动去掉选中至少一种语言时，“全不选”自动被去掉选中，并变为“全选”。
                selectAll.prop('checked', false);

                selectAllLabel.show();
                deselectAllLabel.hide();
              }
            }
            invertSelect.click(function(x){
                langs.get().map(function(x){
                    $(x).prop('checked', !($(x).prop('checked')));
                    checkAll();
                });
            });

            // 设置所有input的监听事件
            var inputs = langs.get();
            inputs.map(function(x){
                $(x).change(function(){
                  checkAll();
                });
            });

        });
    </script>>
</head>

<body>
  Hello, Lou!
  <br/><br/><br/><br/>

 <!-- HTML结构 -->
<form id="test-form" action="test">
    <legend>请选择想要学习的编程语言：</legend>
    <fieldset>
        <p>
        <label class="selectAll">
            <input type="checkbox">
            <span class="selectAll">全选</span>
            <span class="deselectAll">全不选</span>
        </label>
        <a href="#0" class="invertSelect">反选</a>
        </p>
        <p><label><input type="checkbox" name="lang" value="javascript"> JavaScript</label></p>
        <p><label><input type="checkbox" name="lang" value="python"> Python</label></p>
        <p><label><input type="checkbox" name="lang" value="ruby"> Ruby</label></p>
        <p><label><input type="checkbox" name="lang" value="haskell"> Haskell</label></p>
        <p><label><input type="checkbox" name="lang" value="scheme"> Scheme</label></p>
        <p><button type="submit">Submit</button></p>
    </fieldset>
</form>


</body>

</html>

```


参考资料
=======
- [事件 - 廖雪峰的官方网站](http://www.liaoxuefeng.com/wiki/001434446689867b27157e896e74d51a89c25cc8b43bdb3000/00143564690172894383ccd7ab64669b4971f4b03fa342d000#0)
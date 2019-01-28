---
title: grunt相关
date: 2017.10.18 17:12
toc: true
comments: true
tags:
- js
---

| How do I uninstall or remove unwanted plugins?
- `npm uninstall [GRUNT_PLUGIN] --save-dev`, this will remove the plugin from
  your `package.json` and from `node_module`
- delete the dependencies in `package.json` mannually and run `npm prune`

| 异步任务,需要在task body中调用`this.async()`来开启。
`var done = this.async()`
Note that passing `false` to the `done()` function tells Grunt that the task has
failed.

| 获取configuration中的属性值
`grunt.config('meta.name')`
or
`grunt.config(['meta', 'name'])`

| 验证configuration中是否存在property:
`grunt.config.requires('meta.name')`
or
`grunt.config.requires(['meta', 'name'])`

| Tasks can be dependent on the successful execution of other tasks.
`grunt.task.requires('foo')`

| Inside a task, you can run other tasks.
`grunt.task.run('bar', 'baz')`
or
`grunt.task.run(['bar', 'baz'])`

| 一旦一个任务返回了false，就会abort了。通过添加参数`--force`来强制向后继续执行。

| 执行多个任务用空格分开：
`grunt foo bar` 和下面的代码一样
```sh
grunt foo
grunt bar
```
- https://gruntjs.com/creating-tasks

| Creating Tasks
- Alias Task;
```js
grunt.registerTask(taskName, [description, ], taskList);
// eg.
grunt.registerTask("default", ['jshint', 'qunit', 'concat:dist', 'uglify:dist']);
```
- Multi Task;
When a multi task is run, Grunt looks for a property of the same in the Grunt Configuration.
```js
grunt.registerMultiTask(taskName, [description, ], taskFunction);

// eg.
grunt.registerMultiTask('log', 'log stuff.', function(){
    grunt.log.write(this.target + ":" + this.data);
});
```

- Basic Task;
When a basic task is run, Grunt doesn't looks at the configuration and environment.
通过冒号来传递参数:例如针对下面的声明，通过`grunt log:ARG1:ARG2`来调用。
```js
grunt.registerTask(taskName, [description, ], taskFunction);

// eg.
grunt.registerTask('foo', 'A sample task that logs stuff.', function(arg1, arg2){
    if(arguments.length === 0) {
        grunt.log.write(this.name + ", no args.");
    } else {
        grunt.log.write(this.name + ", arg1=" + arg1 + ", arg2=" + arg2);
    }
});
```

- Custom Task;


| eg.
```js
module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>*/\n'
            },
            build: {
                src: 'src/<%= pkg.name %>.js',
                dest: 'build/<%= pkg.name %>.min.js'
            }
        },
        concat: {
            options: {
                separator: ";"
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: true,
                    module: true
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'qunit']
        }

    });

    // grunt.loadNpmTasks('grunt-contrib-uglify');
    // grunt.loadNpmTasks('grunt-contrib-concat');
    // grunt.loadNpmTasks('grunt-contrib-qunit');
    // grunt.loadNpmTasks('grunt-contrib-jshint');
    // grunt.loadNpmTasks('grunt-contrib-watch');

    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('test', ['jshint', 'qunit']);
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

    grunt.registerTask('log', 'log some stuff', function() {
        grunt.log.write('Logging some stuff ...').error();
    });
};

```

| importing external data
- `grunt.file.readJSON()`
- `grunt.file.readYAML()`

| Template
- `<%= prop.subprop %>` Expand to the value of `prop.subprop` in the config,
regardless of type. Templates like this can be used to reference not only  
String values, but also arrays and other objects.
- `<% %>` Execute arbitrary inline JavaScript code. This is useful with control
flow or looping.
https://gruntjs.com/configuring-tasks#templates

| Global Patterns.
All most people need to know is that `foo/*.js` will match all files
ending with `.js` in the `foo/` subdirectory, but `foo/**/*.js` will match
all files ending with `.js` in the `foo/` subdirectory and all of its
subdirectories.

| Specifying both a task and target like `grunt concat:foo` or `grunt concat:bar`
will process just the specified target's configuration, while run `grunt concat`
will iterate over all targets, processing each in turn.
```js
grunt.initConfig({
  concat: {
    foo: {
    },
    bar: {
    }
  }
});
```

| Define a configuration for each of the tasks we mentioned.
  Note: The configuration object for a plugins lives as a property on the
  configuration object, that offen shares the same name as its plugin.
  eg. `grunt-contrib-concat` => `concat`

| 5个插件
- grunt-contrib-watch: check the code at every change you perform；
- grunt-contrib-jshint: ensure best practices, or check the code behaviors；
- grunt-contrib-uglify: 创建一个minified的version；
- grunt-contrib-qunit: 测试你的project；
- grunt-contrib-concat: 多个文件合并成一个文件；


| The typical folder structure features the following folders: src, dist, and test.
- The src folder (sometimes called app) contains the source code of the library as you author it.
- The dist folder (sometimes called build) contains the distribution, a minified version of the source code.
- the test folder contains the code to test the project.
https://gruntjs.com/sample-gruntfile

| Grunt and Grunt plugins should be defined as devDependencies in your project's
`package.json`.
please use: `npm install $package --save-dev`
https://gruntjs.com/installing-grunt


| load all grunt tasks
```js
// load all grunt tasks
require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

// 上面的一句话就替代了很多次的类似下面的调用
grunt.loadNpmTasks('grunt-contrib-jshint');
grunt.loadNpmTasks('grunt-contrib-watch');
```
注意：`matchdep`需要在`package.json`中的`devDependencies`中添加：
`"matchdep": "latest"`

| A GruntFile is comprised of the following parts:
- The `wrapper` function
- Project and task configuration
- Loading Grunt plugins and tasks
- Custom tasks


| Because `<% %>` template strings may reference any config properties,
configuration data like filepaths and file lists may be specified this way
to reduce repetition.
- https://gruntjs.com/getting-started

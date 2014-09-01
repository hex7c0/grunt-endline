# [grunt-endline](http://supergiovane.tk/#/grunt-endline)

[![NPM version](https://badge.fury.io/js/grunt-endline.svg)](http://badge.fury.io/js/grunt-endline)
[![Build Status](https://travis-ci.org/hex7c0/grunt-endline.svg)](https://travis-ci.org/hex7c0/grunt-endline)
[![Dependency Status](https://david-dm.org/hex7c0/grunt-endline/status.svg)](https://david-dm.org/hex7c0/grunt-endline)

> Newline at end of file

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-endline --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-endline');
```

## The "endline" task

### Overview
In your project's Gruntfile, add a section named `endline` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  endline: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.footer
Type: `String | Number`
Default value: `\n`

Write newline at the end of file.
If is set a Number, replace `footer` X times.

#### options.src
Type: `String | Array`

Source path

#### options.dest
Type: `String | Array`
Default value: `false`

Destination path.

#### options.except
Type: `String | Array`
Default value: `false`

Except path from parsing.
Can hide "node_modules" from here.

### Usage Examples

#### Default Options
In this example, the default options are used.

```js
grunt.initConfig({
    endline: {
        default_options: {
            files: [ {
                src: 'test/target/with',
                dest: 'tmp/object'
            }, {
                src: 'test/target/without',
                dest: 'tmp/object'
            } ]
        }
    },
});

```

#### Custom Options
In this example, custom options are used to do save 5 newlines.

```js
grunt.initConfig({
    custom_options: {
        options: {
            footer: 5
        },
        files: {
            'tmp/multiple': [ 'test/target/*' ]
        }
    }
});
```

### [License GPLv3](http://opensource.org/licenses/GPL-3.0)

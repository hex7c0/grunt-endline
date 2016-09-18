'use strict';
/**
 * @file gruntfile
 * @subpackage main
 * @version 0.0.1
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

module.exports = function(grunt) {

  grunt.initConfig({

    clean: {
      tests: [ 'tmp' ]
    },

    jshint: {
      all: [ 'Gruntfile.js', 'tasks/*.js', '<%= nodeunit.tests %>' ],
      options: {
        curly: true,
        indent: 2,
        quotmark: 'single',
        undef: true,
        unused: true,
        strict: true,
        node: true,
        // relax
        laxbreak: true,
        loopfunc: true,
        shadow: true
      }
    },

    endline: {

      object_with_dest: {
        files: [ {
          src: 'test/target/with',
          dest: 'tmp/object'
        }, {
          src: 'test/target/without',
          dest: 'tmp/object'
        } ]
      },

      object_without_dest: {
        files: [ {
          src: 'tmp/with',
        }, {
          src: 'tmp/without',
        } ]
      },

      object_with_exception: {
        options: {
          except: 'node_modules'
        },
        files: [ {
          src: './**/*.json'
        } ]
      },

      array_with_dest: {
        files: {
          'tmp/array': [ 'test/target/*' ]
        }
      },

      array_with_multiple: {
        options: {
          footer: 5
        },
        files: {
          'tmp/multiple': [ 'test/target/*' ]
        }
      }

    },

    nodeunit: {
      tests: [ 'test/*_test.js' ]
    }
  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  grunt.registerTask('test', [ 'clean', 'lint', 'endline', 'nodeunit' ]);
  grunt.registerTask('lint', [ 'jshint' ]);
  grunt.registerTask('default', [ 'endline' ]);

};

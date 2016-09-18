'use strict';
/**
 * @file grunt-endline main
 * @module grunt-endline
 * @subpackage main
 * @version 0.6.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * functions
 */
function endline(grunt) {

  var join = require('path').join;

  grunt.registerMultiTask('endline', 'Newline at end of _file', function() {

    var done = this.async();

    var options = this.options({
      footer: '\n',
      dest: false,
      except: false,
      replaced: false
    });

    var ii = Number(options.footer);
    if (ii) {
      options.footer = '';
      for (var i = 0; i < ii; i++) {
        options.footer += '\n';
      }
    }

    var exc, jj;
    if (options.except) {
      if (Array.isArray(options.except)) {
        jj = options.except.length;
        exc = function(path) {

          for (var j = 0; j < jj; ++j) {
            if (path.indexOf(options.except[j]) >= 0) {
              return true;
            }
          }
          return false;
        };
      } else {
        exc = function(path) {

          if (path.indexOf(options.except) >= 0) {
            return true;
          }
          return false;
        };
      }
    }

    var footer = grunt.template.process(options.footer);
    var except = options.except;
    var counter = 0;
    var dest = '';

    this.files.forEach(function(file) {

      file.src.filter(function(filepath) {

        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        }
        return true;
      }).map(function(filepath) {

        if (except && exc(filepath)) {
          grunt.log.debug('skipped', filepath);
          return;
        }

        var _file = filepath;
        var readed = grunt.file.read(filepath);
        var lastChar = readed[readed.length - 1];

        if (lastChar !== footer) { // no footer

          if (file.dest) {
            ++counter;
            if (dest !== '') {
              dest += ', ' + file.dest;
            } else {
              dest = ' in ' + file.dest;
            }

            if (file.dest === _file) { // destination
              // pass
            } else if (grunt.file.isFile(file.dest)) {
              _file = file.dest;
            } else {
              _file = join(file.dest, filepath);
            }

          } else if (options.replaced) {
            grunt.log.writeln('replace', filepath);
          }

          if (lastChar === '\n') { // skip one
            readed += footer.substr(1);
          } else {
            readed += footer;
          }
          grunt.file.write(_file, readed);
          grunt.log.debug('replaced', filepath);

        } else if (file.dest) { // already has footer
          ++counter;

          if (dest !== '') {
            dest += ', ' + file.dest;
          } else {
            dest = ' in ' + file.dest;
          }

          if (file.dest === filepath) {
            grunt.file.write(filepath, readed);
          } else if (grunt.file.isFile(file.dest)) {
            grunt.file.write(file.dest, readed);
          } else {
            grunt.file.write(join(file.dest, filepath), readed);
          }
        }

        return readed;
      });
    });

    counter = counter <= 0 ? 0 : counter;
    var plu = counter === 1 ? 'file' : 'files';
    grunt.log.ok(counter, plu, 'edited' + dest + '.');
    done(counter);
  });
}
module.exports = endline;

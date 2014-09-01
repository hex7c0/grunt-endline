"use strict";
/**
 * @file grunt-endline main
 * @module grunt-endline
 * @package grunt-endline
 * @subpackage main
 * @version 0.1.0
 * @author hex7c0 <hex7c0@gmail.com>
 * @copyright hex7c0 2014
 * @license GPLv3
 */

/*
 * initialize module
 */
// import
try {
    var path = require('path');
} catch (MODULE_NOT_FOUND) {
    console.error(MODULE_NOT_FOUND);
    process.exit(1);
}

/*
 * functions
 */
module.exports = function(grunt) {

    grunt.registerMultiTask('endline', 'Newline at end of file', function() {

        var options = this.options({
            footer: '\n',
            dest: false
        });

        var ii;
        if (ii = Number(options.footer)) {
            options.footer = '';
            for (var i = 0; i < ii; i++) {
                options.footer += '\n';
            }
        }

        var footer = grunt.template.process(options.footer);
        var counter = 0;
        var dest = '';

        this.files.forEach(function(f) {

            f.src.filter(function(filepath) {

                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                }
                return true;
            }).map(function(filepath) {

                if (grunt.file.isDir(filepath)) {
                    return;
                }

                var file = filepath;
                var readed = grunt.file.read(filepath);
                if (readed[readed.length - 1] !== footer) {
                    counter++;
                    if (f.dest) {
                        if (dest === '') {
                            dest = ' in ' + f.dest;
                        } else {
                            dest += ', ' + f.dest;
                        }
                        if (f.dest === file) {
                            // pass
                        } else if (grunt.file.isFile(f.dest)) {
                            file = f.dest;
                        } else {
                            file = path.join(f.dest, filepath);
                        }
                    } else {
                        counter--;
                        grunt.log.writeln('replace ' + filepath);
                    }
                    if (readed[readed.length - 1] === '\n') { // skip one
                        readed += footer.substr(1);
                    } else {
                        readed += footer;
                    }
                    grunt.file.write(file, readed);
                } else if (f.dest) { // already n
                    counter++;
                    if (dest === '') {
                        dest = ' in ' + f.dest;
                    } else {
                        dest += ', ' + f.dest;
                    }
                    if (f.dest === filepath) {
                        grunt.file.write(filepath, readed);
                    } else if (grunt.file.isFile(f.dest)) {
                        grunt.file.write(f.dest, readed);
                    } else {
                        grunt.file.write(path.join(f.dest, filepath), readed);
                    }
                }
                return readed;
            });
            return;
        });

        counter = counter < 0 ? 0 : counter;
        var plu = counter == 1 || 0 ? 'file' : 'files';
        grunt.log.ok(counter + ' ' + plu + ' edited' + dest + '.');
        return;
    });

    return;
};

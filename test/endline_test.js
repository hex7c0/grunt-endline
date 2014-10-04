'use strict';

var grunt = require('grunt');

/*
 * ======== A Handy Little Nodeunit Reference ========
 * https://github.com/caolan/nodeunit
 * 
 * Test methods: test.expect(numAssertions) test.done() Test assertions:
 * test.ok(value, [message]) test.equal(actual, expected, [message])
 * test.notEqual(actual, expected, [message]) test.deepEqual(actual, expected,
 * [message]) test.notDeepEqual(actual, expected, [message])
 * test.strictEqual(actual, expected, [message]) test.notStrictEqual(actual,
 * expected, [message]) test.throws(block, [error], [message])
 * test.doesNotThrow(block, [error], [message]) test.ifError(value)
 */

exports.endline = {
    setUp: function(done) {

        grunt.file.write('tmp/with', 'with\n');
        grunt.file.write('tmp/without', 'without\n');
        done();
    },

    object_with_dest: function(test) {

        test.expect(2);

        var actual = grunt.file.read('tmp/object/test/target/with');
        var expected = grunt.file.read('test/expected/with');
        test.equal(actual, expected, 'should write file with "\n" inside dest');

        var actual = grunt.file.read('tmp/object/test/target/without');
        var expected = grunt.file.read('test/expected/without');
        test.equal(actual, expected, 'should write file without "\n" inside dest');

        test.done();
    },

    object_without_dest: function(test) {

        test.expect(2);

        var actual = grunt.file.read('tmp/with');
        var expected = grunt.file.read('test/expected/with');
        test.equal(actual, expected, 'should replace file with "\n"');

        var actual = grunt.file.read('tmp/without');
        var expected = grunt.file.read('test/expected/without');
        test.equal(actual, expected, 'should replace file without "\n"');

        test.done();
    },

    array_with_dest: function(test) {

        test.expect(2);

        var actual = grunt.file.read('tmp/array/test/target/with');
        var expected = grunt.file.read('test/expected/with');
        test.equal(actual, expected, 'should write file with "\n" inside dest');

        var actual = grunt.file.read('tmp/array/test/target/without');
        var expected = grunt.file.read('test/expected/without');
        test.equal(actual, expected, 'should write file without "\n" inside dest');

        test.done();
    },

    array_with_multiple: function(test) {

        test.expect(4);

        var actual = grunt.file.read('tmp/multiple/test/target/with');
        var expected = grunt.file.read('test/expected/with');
        test.equal(actual, expected + '\n\n\n\n',
                'should write file with "\n" inside dest');
        test.notEqual(actual, expected);

        var actual = grunt.file.read('tmp/multiple/test/target/without');
        var expected = grunt.file.read('test/expected/without');
        test.equal(actual, expected + '\n\n\n\n',
                'should write file without "\n" inside dest');
        test.notEqual(actual, expected);

        test.done();
    },
};

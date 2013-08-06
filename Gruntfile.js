module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        'uglify': {
            'options': {
                'mangle': false
            },
            'default': {
                'files': {
                    'jquery.simplemodal.min.js': ['jquery.simplemodal.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.registerTask('default', ['uglify']);
};
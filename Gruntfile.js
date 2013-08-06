module.exports = function(grunt) {
    'use strict';

    grunt.initConfig({
        'pkg': grunt.file.readJSON('package.json'),

        'uglify': {
            'options': {
                'report': 'gzip',
                'preserveComments':'some'
            },
            'default': {
                'files': {
                    'jquery.simplemodal-<%= pkg.version %>.min.js': ['jquery.simplemodal.js']
                }
            }
        },
        
        'string-replace': {
            'default': {
                'files': {
                    'README.md' : 'README.md',
                    'simpleModal.jquery.json' : 'simpleModal.jquery.json',
                    'jquery.simplemodal.js' : 'jquery.simplemodal.js'
                },
                
                'options': {
                    'replacements':[
                        {
                            'pattern': /v[0-9]+\.[0-9]+\.[0-9]+/, // is this too permissive?
                            'replacement': 'v<%= pkg.version %>'
                        },
                        {
                            'pattern': /"version": "[0-9]+\.[0-9]+\.[0-9]+",/,
                            'replacement': '"version": "<%= pkg.version %>",'
                        },
                        {
                            'pattern': / \* Version [0-9]+\.[0-9]+\.[0-9]+/,
                            'replacement': ' * Version <%= pkg.version %>'
                        }
                    ]
                }
            }
        },

        'clean': {
            'default': {
                'src': ['jquery.simplemodal-*.min.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-string-replace');

    grunt.registerTask('default', ['clean', 'string-replace', 'uglify']);
};
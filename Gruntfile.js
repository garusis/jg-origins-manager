/**
 * Created by Marcos J on 05/09/2015.
 * @author Marcos J. Alvarez
 * @email marcosalvarez@kubesoft.com
 * @version 0.0.1
 */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            dist: {
                files: {
                    'dist/jg-request-origins.js': ['src/*.js']
                },
                options: {
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %>\n */\n'
            },
            build: {
                src: 'dist/*.js',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.registerTask('default', ['browserify:dist', 'uglify']);
};
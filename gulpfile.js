(function () {
    'use strict';

    var gulp = require('gulp'),

        mocha = require('gulp-mocha'),
        jslint = require('gulp-jslint');

    gulp.task('test', function () {
        return gulp.src('tests/mirror.js')
            .pipe(mocha());
    });

    gulp.task('lint', function() {
        return gulp.src(['src/mirror.js'])
            .pipe(jslint({
                node: true,
                unparam: true,
                nomen: true
            }))
            .on('error', function (err) {
                console.error(String(err));
            });
    });

    gulp.task('watch', function () {

        return gulp.watch(['src/mirror.js', 'tests/mirror.js'], ['lint', 'test'])
            .on('change', function (e) {
                console.log('File ' + e.path + ' was ' + e.type + ', running tasks...');
            });

    });

    gulp.task('default', ['lint', 'test'], function () {
        console.log('Gulp loaded !');
    })
    
}());
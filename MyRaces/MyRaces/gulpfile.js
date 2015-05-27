/**
 * Created by smoseley on 5/18/2015.
 */
/// <vs BeforeBuild='build' SolutionOpened='watch' />
'use strict';

var gulp = require('gulp');
var webserver = require('gulp-webserver');


require('require-dir')('./gulp');


gulp.task('webserver', function() {
    gulp.src('.')
        .pipe(webserver({
            livereload: true,
            directoryListing: true,
            open: true
        }));
});

gulp.task('default', ['help']);



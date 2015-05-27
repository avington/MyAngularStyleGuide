/**
 * Created by smoseley on 5/20/2015.
 */
require('require-dir')(__dirname);
var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var logger = require("./log.js");
var clean = require("./clean.js");
var settings = require("./settings.js")();
var browserSync = require('browser-sync');


var startBrowserSync = function (serveSpecRunner) {
    var options = settings.browserSync

    if (browserSync.active) {
        return;
    }

    //if serve spec change the proxy
    if (serveSpecRunner){
        options.proxy = 'https://localhost:44303/src/specs.html';
    }

    browserSync(options);
};

gulp.task('reload', function() {
    browserSync.reload({ stream: false });
});

gulp.task('watch', function() {
    gulp.watch(settings.paths.source.sass, ['styles']);
    gulp.watch(settings.paths.source.jshint, ['jshint']);
});

gulp.task('serv-dev', function () {

    gulp.watch([
        settings.app + '**/*.js',
        settings.app + '**/*.html',
        settings.src + 'less/**/*.less'
    ], ['build', 'reload']);
    startBrowserSync(false);
});

gulp.task('serv-spec',['build-specs'], function () {

    gulp.watch([
        settings.app + '**/*.js',
        settings.app + '**/*.html',
        settings.src + 'less/**/*.less'
    ], ['build-specs', 'reload']);
    startBrowserSync(true);
});



/**
 * Created by smoseley on 5/18/2015.
 */
'use strict';
require('require-dir')(__dirname);
var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var logger = require("./log.js");
var settings = require("./settings.js")();
var injector = require('./injector.js');


/**
 * @desc Wire-up the bower dependencies
 * @return {Stream}
 */
gulp.task('wiredep', function () {
    logger.log('starting the wiredep process');
    var wiredep = require('wiredep').stream;

    var options = settings.getWiredepDefaultSettings(true);

    // Only include stubs if flag is enabled
    var js = args.stubs ? [].concat(settings.js, settings.stubsjs) : settings.js;

    return gulp
        .src(settings.index)
        .pipe(wiredep(options))
        .pipe(injector.inject(settings.js, ''))
        .pipe(gulp.dest(settings.src));
});

/**
 * @desc Wire-up the css references
 * @return {Stream}
 */
gulp.task('inject-styles', ['styles'], function () {
    logger.log('inject CSS on to the index.html page');

    return gulp
        .src(settings.index)
        .pipe(injector.inject(settings.styles, '', settings.stylesOrder))
        .pipe(gulp.dest(settings.src));

});


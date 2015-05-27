/**
 * Created by smoseley on 5/19/2015.
 */
require('require-dir')(__dirname);
var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var logger = require("./log.js");
var settings = require("./settings.js")();


/***
 *  @desc Cache the angular templates into an AngularJs TemplateCache module
 */
gulp.task('templatecache', ['clean-code'], function(){
    logger.log('Generate the Angular JS Template cache');

    var noDebug = function(){
        return !args.debug;
    }

    return gulp
        .src(settings.htmltemplates)
        .pipe($.if(args.verbose, $.bytediff.start()))
        .pipe($.if(noDebug, $.minifyHtml({empty: true})))
        .pipe($.if(args.verbose, $.bytediff.stop(bytediffFormatter)))
        .pipe($.angularTemplatecache(
            settings.templateCache.file,
            settings.templateCache.options
        ))
        .pipe(gulp.dest(settings.temp));
});

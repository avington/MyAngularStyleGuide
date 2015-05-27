/**
 * Created by smoseley on 5/18/2015.
 */
require('require-dir')(__dirname);
var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var logger = require("./log.js");
var clean = require("./clean.js");
var settings = require("./settings.js")();


/**
 * @desc Remove all styles from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-styles', function(done) {
    var files = [].concat(
        settings.temp + '**/*.css',
        settings.build + 'styles/**/*.css'
    );
    clean(files, done);
});

/**
 * @desc Compile less to css
 * @return {Stream}
 */
gulp.task('styles', ['clean-styles' ], function(){
   logger.log('compiling LESS to CSS');

    return gulp
        .src(settings.less)
        .pipe($.plumber()) // exit gracefully if something fails after this
        .pipe($.if(args.verbose, $.debug()))
        .pipe($.less())
        .pipe($.autoprefixer({browsers: ['last 2 version', '> 5%']}))
        .pipe(gulp.dest(settings.temp))
        .pipe(gulp.dest(settings.stylesFolder));
});


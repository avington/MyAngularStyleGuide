require('require-dir')(__dirname);
var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var logger = require("./log.js");
var clean = require("./clean.js");
var settings = require("./settings.js")();

/**
 * vet the code and create coverage report
 * This task will crash if a JSHINT warning is found.
 * @return {Stream}
 */
gulp.task('vet', function() {
    logger.log('Analyzing source with JSHint and JSCS - Fail on warning');

    return gulp
        .src(settings.app + '**/*.js')
        .pipe($.if(args.verbose, $.debug()))
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe($.jshint.reporter('fail'))
        .pipe($.jscs());
});

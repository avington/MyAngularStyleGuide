/**
 * Created by smoseley on 5/19/2015.
 */
require('require-dir')(__dirname);
var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var logger = require("./log.js");
var clean = require("./clean.js");
var settings = require("./settings.js")();
var injector = require('./injector.js');

/**
 * Format and return the header for files
 * @return {String}           Formatted file header
 */
function getHeader() {
    var pkg = require('../package.json');
    var template = ['/**',
        ' * <%= pkg.name %> - <%= pkg.description %>',
        ' * @authors <%= pkg.authors %>',
        ' * @version v<%= pkg.version %>',
        ' * @link <%= pkg.homepage %>',
        ' * @license <%= pkg.license %>',
        ' */',
        ''
    ].join('\n');
    return $.header(template, {
        pkg: pkg
    });
}

/**
 * @desc Remove all js from the build and temp folders
 * @param  {Function} done - callback when complete
 */
gulp.task('clean-code', function (done) {
    var files = [].concat(
        settings.temp + '**/*.js',
        settings.build + 'js/**/*.js'
    );
    clean(files, done);
});

/**
 * Remove all fonts from the build folder
 * @return (Stream)
 */
gulp.task('clean-fonts', function (done) {
    clean(settings.build + 'fonts/**/*.*', done);
});

/**
 * Remove all images from the build folder
 * @return (Stream)
 */
gulp.task('clean-images', function (done) {
    clean(settings.build + 'images/**/*.*', done);
});

/**
 * Copy fonts to the build/font folder
 * @return (Stream)
 */
gulp.task('fonts', ['clean-fonts'], function (done) {
    logger.log('Copying the fonts to the build directory');
    logger.log(settings.fonts);
    return gulp
        .src(settings.fonts)
        .pipe($.if(args.verbose, $.debug()))
        .pipe(gulp.dest(settings.build + 'fonts'));
});


/**
 * Shrink images then copy them to the build/images folder
 * @return (Stream)
 */
gulp.task('images', ['clean-images'], function () {
    return gulp
        .src(settings.images)
        .pipe($.imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(settings.build + 'images'));
});

gulp.task('inject-template',['templatecache'], function () {
    logger.log('Injecting the template cache file into index.html')

    var templateCache = settings.temp + settings.templateCache.file;
    logger.log(templateCache);

    return gulp
        .src(settings.index)
        .pipe($.plumber())
        .pipe(injector.inject(templateCache, 'templates'))
        .pipe(gulp.dest(settings.src))

});

gulp.task('optimize', ['clean-code', 'inject-template'], function () {
    logger.log('Optimizing the js, css, and the html.');

    var assets = $.useref.assets({searchPath: '.,vendor'});


    var cssFilter = $.filter('**/*.css');
    var jsAppFilter = $.filter('**/' + settings.optimized.app);
    var jslibFilter = $.filter('**/' + settings.optimized.lib);

    return gulp
        .src(settings.index)
        .pipe($.plumber())
        .pipe(assets) // Gather all assets from the html with useref
        // Get the css
        .pipe(cssFilter)
        .pipe($.csso())
        .pipe(cssFilter.restore())
        // Get the custom javascript
        .pipe(jsAppFilter)
        .pipe($.ngAnnotate({add: true}))
        .pipe($.uglify())
        .pipe(getHeader())
        .pipe(jsAppFilter.restore())
        // Get the vendor javascript
        .pipe(jslibFilter)
        .pipe($.uglify()) // another option is to override wiredep to use min files
        .pipe(jslibFilter.restore())
        // Take inventory of the file names for future rev numbers
        .pipe($.rev())
        // Apply the concat and file replacement with useref
        .pipe(assets.restore())
        .pipe($.useref())
        // Replace the file names in the html with rev numbers
        .pipe($.revReplace())
        .pipe(gulp.dest(settings.build));
});
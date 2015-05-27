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
var karma = require('karma').server;



/**
 * Start the tests using karma.
 * @param  {boolean} singleRun - True means run once and end (CI), or keep running (dev)
 * @param  {Function} done - Callback to fire when karma is done
 * @return {undefined}
 */
function startTests(singleRun, done) {
    karma.start({
        configFile: __dirname + '\\karma.conf.js',
        singleRun: singleRun
    }, done);
}

/**
 * @desc Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc(src, order) {
    console.log(order);

    return gulp
        .src(src)
        .pipe($.if(args.verbose, $.debug()))
        .pipe($.if(order, $.order(order)))
        .pipe($.debug());
}


/**
 * @desc Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
var inject = function(src, label, order) {
    var options = {read: false};
    if (label) {
        options.name = 'inject:' + label;
    }

    return $.inject(orderSrc(src, order), options);
};

gulp.task('build-specs', ['wiredep', 'inject-styles', 'templatecache'], function(done){
   logger.log('Building the spec runner...');

    var wiredep = require('wiredep').stream;
    var templateCache = settings.temp + settings.templateCache.file;
    var options = settings.getWiredepDefaultSettings(false);
    var specs = settings.specs;

    if (args.startServers){
        specs = [].concat(specs, settings.serverIntegrationSpecs)
    }

    options.devDependencies = true;

    logger.log(settings.specRunner);

    return gulp
        .src(settings.specRunner)
        .pipe(wiredep(options))
        .pipe(inject(settings.js, '', settings.jsOrder))
        .pipe(inject(settings.testlibraries, 'testlibraries'))
        .pipe(inject(settings.specHelpers, 'spechelpers'))
        .pipe(inject(specs, 'specs', ['**/*']))
        .pipe(inject(templateCache, 'templates'))
        .pipe(gulp.dest(settings.src));
});


/**
 * Run specs once and exit
 * To start servers and run midway specs as well:
 *    gulp test --startServers
 * @return {Stream}
 */
gulp.task('test', ['vet', 'templatecache'], function(done) {
    startTests(true /*singleRun*/ , done);
});

/**
 * Run specs and wait.
 * Watch for file changes and re-run tests on each change
 * To start servers and run midway specs as well:
 *    gulp autotest --startServers
 */
gulp.task('autotest', function(done) {
    startTests(false /*singleRun*/ , done);
});
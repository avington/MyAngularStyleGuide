/**
 * Created by smoseley on 5/18/2015.
 */
module.exports = function () {

    var src = 'src/';
    var app = src + 'app/';
    var vendor = 'vendor/';
    var temp = './.tmp/';
    var stylesFolder = src + 'styles/';
    var nodeModules = 'node_modules';
    var specRunnerFile = 'specs.html';
    var report = './report/';

    var wiredep = require('wiredep');
    var bowerFiles = wiredep({devDependencies: true})['js'];

    var bower = {
        json: require('../bower.json'),
        directory: './vendor/',
        ignorePath: '../..'
    };

    var config = {
        bower: bower,
        build: './build/',
        src: src,
        app: app,
        fonts: 'vendor/fontawesome/fonts/**/*.*',
        images: src + 'images/**/*.*',
        htmltemplates: app + '**/*.html',
        js: [
            app + '**/*.module.js',
            app + '**/*.js',
            '!' + app + '**/*.spec.js'
        ],
        jsOrder: [
            '**/app.module.js',
            '**/*.module.js',
            '**/*.js'
        ],
        index: src + 'index.html',
        stubsjs: [
            bower.directory + 'angular-mocks/angular-mocks.js',
            src + 'stubs/**/*.js'
        ],
        temp: temp,
        /**
         * optimized files
         */
        optimized: {
            app: 'app.js',
            lib: 'lib.js'
        },
        less: [
            vendor + 'bootstrap/less/bootstrap.less',
            src + 'less/app.less'],
        stylesFolder: stylesFolder,
        styles: [
            stylesFolder + 'bootstrap.css',
            stylesFolder + 'app.css'
        ],
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'core',
                root: 'app/',
                standAlone: false
            }
        },
        /**
         * specs.html, our HTML spec runner
         */
        specRunner: src + specRunnerFile,
        specRunnerFile: specRunnerFile,

        /**
         * The sequence of the injections into specs.html:
         *  1 testlibraries
         *      mocha setup
         *  2 bower
         *  3 js
         *  4 spechelpers
         *  5 specs
         *  6 templates
         */
        testlibraries: [
            nodeModules + '/mocha/mocha.js',
            nodeModules + '/chai/chai.js',
            nodeModules + '/mocha-clean/index.js',
            nodeModules + '/sinon-chai/lib/sinon-chai.js'
        ],
        specHelpers: [src + 'test-helpers/**/*.js'],
        specs: [app + '**/*.spec.js'],
        serverIntegrationSpecs: [src + '/tests/server-integration/**/*.spec.js']

    };

    /**
     * wiredep and bower settings
     */
    config.getWiredepDefaultSettings = function (isIndex) {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        //we don't want the testing scripts on the index page
        if (isIndex) {
            options.exclude = [
                vendor + 'bootstrap/dist/css/bootstrap.css',
                vendor + 'fontawesome/css/font-awesome.css',
                vendor + 'bardjs/dist/bard.js',
                vendor + 'angular-mocks/angular-mocks.js',
                vendor + 'sinon/index.js',
                vendor + 'bardjs/dist/bard-ngRouteTester.js'

            ]
        }

        return options;
    };

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                config.specHelpers,
                app + '**/*.module.js',
                app + '**/*.js',
                temp + config.templateCache.file,
                config.serverIntegrationSpecs
            ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    // reporters not supporting the `file` property
                    {type: 'html', subdir: 'report-html'},
                    {type: 'lcov', subdir: 'report-lcov'},
                    {type: 'text-summary'} //, subdir: '.', file: 'text-summary.txt'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[app + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }

    function getBrowserSyncOptions() {

        var filesToWatch = [].concat(
            config.js,
            config.less,
            config.htmltemplates
        );
        var options = {
            proxy: 'https://localhost:44303/src/index.html',
            port: 44303,
            ghostMode: {
                clicks: true,
                location: false,
                forms: true,
                scroll: true
            },
            files: filesToWatch,
            injectChanges: true,
            logFileChanges: true,
            logLevel: 'debug',
            logPrefix: 'gulp-patterns',
            notify: true,
            reloadDelay: 1000
        };

        return options;
    }

    config.karma = getKarmaOptions();
    config.browserSync = getBrowserSyncOptions();

    return config;
};

// Karma configuration
// Generated on Wed May 20 2015 13:01:12 GMT-0400 (Eastern Daylight Time)

module.exports = function(config) {
  var settings = require("./settings.js")();

  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '../',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha', 'chai', 'sinon', 'chai-sinon'],


    // list of files / patterns to load in the browser
    files: settings.karma.files,


    // list of files to exclude
    exclude: settings.karma.exclude,

    proxies: {
      '/': 'http://localhost:8888'
    },


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: settings.karma.preprocessors,


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS' /* , 'Chrome' */],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

/**
 * Created by smoseley on 5/20/2015.
 */
'use strict';
require('require-dir')(__dirname);
var args = require('yargs').argv;
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({lazy: true});
var logger = require("./log.js");
var settings = require("./settings.js")();

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


module.exports = {
    inject: inject
};
/**
 * Created by smoseley on 5/18/2015.
 */
var del = require('del');
var logger = require("./log.js");
var $ = require('gulp-load-plugins')({lazy: true});

/***
 * @desc Utility function to delete files
 * @param (String) path file path of the file(s) to be deleted
 * @param done The callback function that fires when the deletion completes
 */
module.exports =  function clean(path, done) {
    logger.log('Cleaning: ' + $.util.colors.blue(path));
    del(path, done);
}

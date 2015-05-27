var util = require('gulp-util');
/***
 * @desc private function that does the deleting
 * @param (String) msg The message to log
 * @param (Bool) isError inidicates the message is an error message
 */
var thisLog = function(msg, isError) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.yellow(msg[item]));
            }
        }
    } else {
        util.log(util.colors.yellow(msg));
    }
};

/*
* @desc Logging utility to conveniently write messages to the console
 */
module.exports = {
    log: function (msg) {
        thisLog(msg);
    },

    error: function(error) {
        thisLog('*** start of error ***');
        thisLog(error);
        thisLog('*** end of error ***');
        this.emit('end');
    }

};
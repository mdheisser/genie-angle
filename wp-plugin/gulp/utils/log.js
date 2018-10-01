const $ = require('gulp-load-plugins')();

module.exports = function (msg) {
    $.util.log($.util.colors.blue(msg));
}
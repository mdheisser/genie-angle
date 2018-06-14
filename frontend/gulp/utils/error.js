const $ = require('gulp-load-plugins')();

module.exports = function (err) {
	$.util.log($.util.colors.red(err.toString()));
    this.emit('end');
}
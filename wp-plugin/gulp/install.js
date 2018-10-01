const gulp = require('gulp'),
  install = require("gulp-install"),
  log = require('./utils/log');

module.exports = function (opt) {
  return function () {
    log('Installing Bower Pakages..');
    return gulp.src(['./bower.json'])
      .pipe(install());
  }
};
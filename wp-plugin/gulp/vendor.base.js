const gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  handleError = require('./utils/error'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  log = require('./utils/log');

module.exports = function (opt) {
  return function () {
    log('Copying base vendor assets..');

    var jsFilter = $.filter('**/*.js', {
      restore: true
    });
    var cssFilter = $.filter('**/*.css', {
      restore: true
    });

    return gulp.src(opt.vendor.base.source)
      .pipe($.expectFile(opt.vendor.base.source))
      .pipe(jsFilter)
      .pipe($.concat(opt.vendor.base.js))
      .pipe($.if(opt.config.isProduction, $.uglify()))
      .pipe(gulp.dest(opt.build.scripts))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.concat(opt.vendor.base.css))
      .pipe($.if(opt.config.isProduction, $.cssnano(opt.cssnanoOpts)))
      .pipe(gulp.dest(opt.build.styles))
      .pipe(cssFilter.restore);

  }
};
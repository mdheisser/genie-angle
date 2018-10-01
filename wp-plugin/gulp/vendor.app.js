const gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  log = require('./utils/log');

module.exports = function (opt) {
  return function () {
    log('Copying vendor assets..');

    var jsFilter = $.filter('**/*.js', {
      restore: true
    });
    var cssFilter = $.filter('**/*.css', {
      restore: true
    });

    return gulp.src(opt.vendor.app.source, {
        base: 'bower_components'
      })
      .pipe($.expectFile(opt.vendor.app.source))
      .pipe(jsFilter)
      .pipe($.if(opt.config.isProduction, $.uglify(opt.vendorUglifyOpts)))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.if(opt.config.isProduction, $.cssnano(opt.cssnanoOpts)))
      .pipe(cssFilter.restore)
      .pipe(gulp.dest(opt.vendor.app.dest));
  }
};
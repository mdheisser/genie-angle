const gulp = require('gulp'),
  $ = require('gulp-load-plugins')(),
  handleError = require('./utils/error'),
  browserSync = require('browser-sync'),
  reload = browserSync.reload,
  log = require('./utils/log');

module.exports = function (opt) {
  return function () {
    log('Building application styles..');
    return gulp.src(opt.source.styles.app)
      .pipe($.if(opt.config.useSourceMaps, $.sourcemaps.init()))
      .pipe($.less({
        plugins: [require('less-plugin-glob')]
      }))
      .on('error', handleError)
      .pipe($.if(opt.config.isProduction, $.cssnano(opt.cssnanoOpts)))
      .pipe($.if(opt.config.useSourceMaps, $.sourcemaps.write()))
      .pipe(gulp.dest(opt.build.styles))
      .pipe(reload({
        stream: true
      }));
  };
}
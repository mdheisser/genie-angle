const gulp = require("gulp"),
  $ = require("gulp-load-plugins")(),
  handleError = require("./utils/error"),
  browserSync = require("browser-sync"),
  reload = browserSync.reload,
  log = require("./utils/log");

module.exports = function (opt) {
  return function () {
    log("Building scripts..");
    // Minify and copy all JavaScript (except vendor scripts)
    if (!opt.config.isProduction || opt.config.useMock) {
      let mockLocation = `${opt.dir.mock}/_mocks/**/*.js`;

      opt.source.scripts.push(`${opt.dir.mock}/emulator/sinon.js`);
      opt.source.scripts.push(`${opt.dir.mock}/emulator/server.js`);
      opt.source.scripts.push(mockLocation);
      log(`Mocks Injected from: ${mockLocation}`);
    }

    opt.source.scripts.unshift(`${opt.dir.rest}/**/*.js`);

    return gulp
      .src(opt.source.scripts)
      .pipe($.jsvalidate())
      .on("error", handleError)
      .pipe($.if(opt.useSourceMaps, $.sourcemaps.init()))
      .pipe($.concat("app.js"))
      .pipe($.ngAnnotate())
      .on("error", handleError)
      .pipe(
        $.if(
          opt.config.isProduction,
          $.uglify({
            preserveComments: "some"
          })
        )
      )
      .on("error", handleError)
      .pipe($.if(opt.config.useSourceMaps, $.sourcemaps.write()))
      .pipe(gulp.dest(opt.build.scripts))
      .pipe(
        reload({
          stream: true
        })
      );
  };
};
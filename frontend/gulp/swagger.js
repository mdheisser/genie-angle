const gulp = require("gulp"),
    swagger = require("gulp-swagger"),
    log = require("./utils/log");

module.exports = function(opt) {
    return function() {
        log("Generating REST Client from: " + opt.src);
        return gulp
            .src(opt.src)
            .pipe(
                swagger({
                    filename: "DefaultApi.js",
                    codegen: {
                        type: "angular" // type can be 'angular', 'node' or 'custom' (default).
                    }
                })
            )
            .pipe(gulp.dest(opt.dest));
    };
};
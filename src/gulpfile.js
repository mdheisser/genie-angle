var args = require("yargs").argv,
    path = require("path"),
    gulp = require("gulp"),
    $ = require("gulp-load-plugins")(),
    gulpsync = $.sync(gulp),
    browserSync = require("browser-sync"),
    reload = browserSync.reload,
    PluginError = $.util.PluginError,
    del = require("del"),
    install = require("gulp-install"),
    uuidv = require("uuid/v4");

var config = {
    // production mode (see build task)
    isProduction: false,
    // styles sourcemaps
    useSourceMaps: true,
    //    gulp --usecache
    useCache: args.usecache,
    //    gulp --mock
    useMock: args.mock,
    // ignore everything that begins with underscore
    hidden_files: "**/_*.*",
    ignored_files: "!**/_*.*",
    taskLocation: "./gulp/",
    devServer: {
        port: 8080
    }
};

// MAIN PATHS
var dir = {
    dist: "../dist",
    mock: "./api/rest",
    rest: "./api/rest/generated"
};

var paths = {
    dist: dir.dist,
    app: dir.dist + "/app/",
    markup: "templates/",
    styles: "less/",
    scripts: "app/",
    server: ["server"],
    static: ["img", "i18n"]
};

// VENDOR CONFIG
var vendor = {
    // vendor scripts required to start the app
    base: {
        source: require("./vendor.base.json"),
        js: "base.js",
        css: "base.css"
    },
    // vendor scripts to make the app work. Usually via lazy loading
    app: {
        source: require("./vendor.json"),
        dest: paths.dist + "/vendor"
    }
};

// SOURCES CONFIG
var source = {
    scripts: [
        paths.scripts + "app.module.js",
        // template modules
        paths.scripts + "modules/**/*.module.js",
        paths.scripts + "modules/**/*.js",
        // custom modules
        paths.scripts + "components/**/*module.js",
        paths.scripts + "components/**/*.js"
    ],
    templates: {
        index: [`${paths.markup}index.*`],
        views: [
            `${paths.markup}**/*.*`,
            `${paths.scripts}**/*.jade`,
            `!${paths.markup}index.*`
        ]
    },
    styles: {
        app: [paths.styles + "*.*"],
        themes: [paths.styles + "themes/*", `${paths.scripts}**/*.less`],
        watch: [
            paths.styles + "**/*",
            `${paths.scripts}**/*.less`,
            "!" + paths.styles + "themes/*"
        ]
    },
    swagger: {
        src: "./api/swagger/swagger.yaml",
        dest: "./rest/generated/Client"
    }
};

// BUILD TARGET CONFIG
var build = {
    scripts: paths.app + "js",
    styles: paths.app + "css",
    templates: {
        index: paths.dist,
        views: paths.app,
        cache: paths.app + "js/" + "templates.js"
    }
};

// PLUGINS OPTIONS

var prettifyOpts = {
    indent_char: " ",
    indent_size: 3,
    unformatted: ["a", "sub", "sup", "b", "i", "u", "pre", "code"]
};

var vendorUglifyOpts = {
    mangle: {
        except: ["$super"] // rickshaw requires this
    }
};

var tplCacheOptions = {
    root: "/app",
    filename: "templates.js",
    module: "app.core",
    base: function (file) {
        return file.path.split("templates")[1];
    }
};

var injectOptions = {
    name: "templates",
    transform: function (filepath) {
        return `script(src=\'${filepath.substr(
      filepath.indexOf("app")
    )}?v=${uuidv()}\')`;
    }
};

var cssnanoOpts = {
    safe: true,
    discardUnused: false, // no remove @font-face
    reduceIdents: false, // no change on @keyframes names
    zindex: false // no change z-index
};

//---------------
// TASKS
//---------------

// JS APP
gulp.task(
    "scripts:app",
    getTask("scripts.app", {
        config: config,
        source: source,
        build: build,
        dir: dir
    })
);

// VENDOR BUILD
gulp.task("vendor", gulpsync.sync(["install", "vendor:base", "vendor:app"]));
gulp.task("install", getTask("install"));
gulp.task("scripts:swagger", getTask("swagger", source.swagger));

// Build the base script to start the application from vendor assets
gulp.task(
    "vendor:base",
    getTask("vendor.base", {
        config: config,
        build: build,
        vendor: vendor,
        cssnanoOpts: cssnanoOpts
    })
);

// copy file from bower folder into the app vendor folder
gulp.task(
    "vendor:app",
    getTask("vendor.app", {
        config: config,
        build: build,
        vendor: vendor,
        cssnanoOpts: cssnanoOpts,
        vendorUglifyOpts: vendorUglifyOpts
    })
);

// APP LESS
gulp.task(
    "styles:app",
    getTask("styles.app", {
        config: config,
        source: source,
        build: build,
        cssnanoOpts: cssnanoOpts
    })
);

// APP RTL
gulp.task(
    "styles:app:rtl",
    getTask("styles.app.rtl", {
        config: config,
        source: source,
        build: build,
        cssnanoOpts: cssnanoOpts
    })
);

// LESS THEMES
gulp.task("styles:themes", function () {
    log("Building application theme styles..");
    return gulp
        .src(source.styles.themes)
        .pipe($.less())
        .on("error", handleError)
        .pipe(gulp.dest(build.styles))
        .pipe(
            reload({
                stream: true
            })
        );
});

// JADE
gulp.task("templates:index", ["templates:views"], function () {
    log("Building index..");

    var tplscript = gulp.src(build.templates.cache, {
        read: false
    });
    const printError = error =>
        `<h1 style="color:#c00">Error</h1><pre style="text-align:left">${
      error.message
    }</pre>`;

    return gulp
        .src(source.templates.index)
        .pipe($.if(config.useCache, $.inject(tplscript, injectOptions))) // inject the templates.js into index
        .pipe($.pug())
        .on("error", handleError)
        .pipe($.htmlPrettify(prettifyOpts))
        .pipe(gulp.dest(build.templates.index))
        .pipe(
            reload({
                stream: true
            })
        );
});

// JADE
gulp.task("templates:views", function () {
    log("Building views.. " + (config.useCache ? "using cache" : ""));

    if (config.useCache) {
        return gulp
            .src(source.templates.views)
            .pipe($.pug())
            .on("error", handleError)
            .pipe($.angularTemplatecache(tplCacheOptions))
            .pipe(
                $.if(
                    config.isProduction,
                    $.uglify({
                        preserveComments: "some",
                        output: {
                            max_line_len: 120000 // cached html can reach default limit easily
                        }
                    })
                )
            )
            .pipe(gulp.dest(build.scripts))
            .pipe(
                reload({
                    stream: true
                })
            );
    } else {
        return gulp
            .src(source.templates.views)
            .pipe(
                $.if(!config.isProduction,
                    $.changed(build.templates.views, {
                        extension: ".html"
                    })
                )
            )
            .pipe($.pug())
            .on("error", handleError)
            .pipe($.htmlPrettify(prettifyOpts))
            .pipe(gulp.dest(build.templates.views))
            .pipe(
                reload({
                    stream: true
                })
            );
    }
});

//---------------
// WATCH
//---------------

// Rerun the task when a file changes
gulp.task("watch", function () {
    log("Watching source files..");
    gulp.watch(source.scripts, ["scripts:app"]);
    gulp.watch(source.swagger.src, ["scripts:swagger"]);
    gulp.watch(source.styles.watch, ["styles:app", "styles:app:rtl"]);
    gulp.watch(source.styles.themes, ["styles:themes"]);
    gulp.watch(source.templates.views, ["templates:views"]);
    gulp.watch(source.templates.index, ["templates:index"]);
    gulp.watch(
        paths.static,
        gulpsync.sync(["assets:static:app:clean", "assets:static:app"])
    );
});

// Serve files with auto reaload
gulp.task("browsersync", function () {
    log("Starting BrowserSync..");

    browserSync({
        notify: false,
        server: {
            baseDir: paths.dist
        },
        port: config.devServer.port
    });
});

// lint javascript
gulp.task("lint", function () {
    return gulp
        .src(source.scripts)
        .pipe($.jshint())
        .pipe(
            $.jshint.reporter("jshint-stylish", {
                verbose: true
            })
        )
        .pipe($.jshint.reporter("fail"));
});

// Remove all files from the build paths
gulp.task("clean", function (done) {
    var delconfig = [].concat(
        build.styles,
        build.scripts,
        build.templates.index + "index.html",
        build.templates.views + "views",
        build.templates.views + "pages",
        vendor.app.dest,
        source.swagger.dest
    );

    log("Cleaning: " + $.util.colors.blue(delconfig));
    // force: clean files outside current directory
    del(delconfig, {
        force: true
    }).then(function () {
        done();
    });
});

//---------------
// MAIN TASKS
//---------------

// build for production (minify)
gulp.task("build", gulpsync.sync(["prod", "vendor", "assets"]));

gulp.task("prod", function () {
    log("Starting production build...");
    config.isProduction = true;
});

gulp.task("assets:static:app:clean", function (done) {
    var oldStatic = paths.static.map(i => `${paths.app}${i}`);
    del(oldStatic, {
        force: true
    }).then(function () {
        done();
    });
});

gulp.task("assets:static:app", function () {
    if (!paths.staticMapped) {
        paths.static = paths.static.map(i => `${i}/**/*.*`);
        paths.staticMapped = true;
    }
    gulp
        .src(paths.static, {
            base: "."
        })
        .pipe(gulp.dest(paths.app));
});

gulp.task("assets:static:serve", function () {
    paths.server = paths.server.map(i => `${i}/**/*.*`);
    gulp
        .src(paths.server, {
            base: "."
        })
        .pipe(gulp.dest(paths.dist));
});

// Server for development
gulp.task("serve", gulpsync.sync(["default", "browsersync"]), done);

// Server for production
gulp.task("serve:prod", gulpsync.sync(["build", "browsersync"]), done);

// build with sourcemaps (no minify)
gulp.task("sourcemaps", ["usesources", "default"]);
gulp.task("usesources", function () {
    config.useSourceMaps = true;
});

// default (no minify)
gulp.task("default", gulpsync.sync(["vendor", "assets", "watch"]));

gulp.task("assets", [
    "assets:static:app",
    "assets:static:serve",
    "scripts:app",
    "scripts:swagger",
    "styles:app",
    "styles:app:rtl",
    "styles:themes",
    "templates:index",
    "templates:views"
]);

/////////////////////

function done() {
    log("************");
    log("* All Done * You can start editing your code.");
    log("************");
}

// Error handler
function handleError(err) {
    const printError = error =>
        `<h1 style="color:#c00">Error</h1><pre style="text-align:left">${
      error.message
    }</pre>`;

    browserSync.notify(printError(err), 25000);
    log(err.toString());
    this.emit("end");
}

// log to console using
function log(msg) {
    $.util.log($.util.colors.blue(msg));
}

//gulp.task('e2e:debug', getTask('e2e_debug', argv));
function getTask(task, opts) {
    opts = opts || {};
    return require(config.taskLocation + task)(opts);
}
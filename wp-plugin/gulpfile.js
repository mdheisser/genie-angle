/* -------------------------------------------------------------------------------------------------

Build Configuration
Contributors: Luan Gjokaj, Adam McKenna, Mehdi Rezaei, Sören Wrede, Saneef Ansari

-------------------------------------------------------------------------------------------------- */
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const concat = require('gulp-concat');
const connect = require('gulp-connect-php');
const cssnano = require('cssnano');
const cssnext = require('postcss-cssnext');
const del = require('del');
const fs = require('fs');
const gulp = require('gulp');
const gutil = require('gulp-util');
const imagemin = require('gulp-imagemin');
const inject = require('gulp-inject-string');
const partialimport = require('postcss-easy-import');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const remoteSrc = require('gulp-remote-src');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const unzip = require('gulp-unzip');
const zip = require('gulp-zip');

var args = require("yargs").argv,
    path = require("path"),
    $ = require("gulp-load-plugins")(),
    PluginError = $.util.PluginError,
    install = require("gulp-install"),
    reload = browserSync.reload,
    gulpsync = $.sync(gulp),
    rename = require('gulp-rename');
    merge = require('merge-stream');
    uuidv = require("uuid/v4");

/* -------------------------------------------------------------------------------------------------
Theme Name
-------------------------------------------------------------------------------------------------- */
const themeName = 'wordpressify';

/* -------------------------------------------------------------------------------------------------
PostCSS Plugins
-------------------------------------------------------------------------------------------------- */
const pluginsDev = [
	partialimport,
	cssnext({
		features: {
			colorHexAlpha: false
		}
	})
];
const pluginsProd = [
	partialimport,
	cssnext({
		features: {
			colorHexAlpha: false
		}
	})
];

/* -------------------------------------------------------------------------------------------------
Header & Footer JavaScript Boundles
-------------------------------------------------------------------------------------------------- */
const headerJS = [
	'node_modules/jquery/dist/jquery.js',
	'node_modules/nprogress/nprogress.js',
	'node_modules/aos/dist/aos.js',
	'node_modules/isotope-layout/dist/isotope.pkgd.js'
];
const footerJS = [
	'src/js/**'
];

/* -------------------------------------------------------------------------------------------------
MAIN PATHS For SEOgenie plugin
-------------------------------------------------------------------------------------------------- */
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

var dir = {
    dist: "./build/wordpress/wp-content/plugins/seo-genie/admin/app/dist",
    swagger: " ../backend/api/swagger/swagger.yaml",
    rest: "../backend/api/swagger/generated",
    mock: "../backend/api/mocks"
};

var paths = {
    dist: dir.dist,
    app: dir.dist + "/app/",
    markup: "src/plugins/seo-genie/admin/app/templates/",
    styles: "src/plugins/seo-genie/admin/app/less/",
    scripts: "src/plugins/seo-genie/admin/app/app/",
    server: ["src/plugins/seo-genie/admin/app/server"],
    static: ["src/plugins/seo-genie/admin/app/img", "src/plugins/seo-genie/admin/app/i18n"]
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
        src: dir.swagger,
        dest: dir.rest
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

/* -------------------------------------------------------------------------------------------------
Installation Tasks
-------------------------------------------------------------------------------------------------- */
gulp.task('default');

gulp.task('cleanup', () => {
	del(['build/**']);
	del(['dist/**']);
});

gulp.task('download-wordpress', () => {
	remoteSrc(['latest.zip'], {
		base: 'https://wordpress.org/'
	})
		.pipe(gulp.dest('build/'));
});

gulp.task('setup', [
	'unzip-wordpress',
	'copy-config'
]);

gulp.task('unzip-wordpress', () => {
	gulp.src('build/latest.zip')
		.pipe(unzip())
		.pipe(gulp.dest('build/'))
});

gulp.task('copy-config', () => {
	gulp.src('wp-config.php')
		.pipe(inject.after('define(\'DB_COLLATE\', \'\');', '\ndefine(\'DISABLE_WP_CRON\', true);'))
		.pipe(gulp.dest('build/wordpress'))
		.on('end', () => {
				gutil.beep();
				gutil.log(devServerReady);
				gutil.log(thankYou);
			});
});

gulp.task('disable-cron', () => {
	fs.readFile('build/wordpress/wp-config.php', (err, data) => {
		if (err) {
			gutil.log(wpFy + ' - ' + errorMsg + ' Something went wrong, WP_CRON was not disabled!');
			process.exit(1);
		}
		if (data.indexOf('DISABLE_WP_CRON') >= 0) {
			gutil.log('WP_CRON is already disabled!');
		} else {
			gulp.src('build/wordpress/wp-config.php')
				.pipe(inject.after('define(\'DB_COLLATE\', \'\');', '\ndefine(\'DISABLE_WP_CRON\', true);'))
				.pipe(gulp.dest('build/wordpress'));
		}
	});
});

gulp.task('fresh-install', () => {
	del(['src/**']).then(() => {
		gulp.src('tools/fresh-theme/**')
		.pipe(gulp.dest('src'))
	});
});

/* -------------------------------------------------------------------------------------------------
Development Tasks
-------------------------------------------------------------------------------------------------- */
gulp.task('build-dev', [
	'copy-theme-dev',
	'copy-fonts-dev',
	'style-dev',
	'header-scripts-dev',
	'footer-scripts-dev',
	'plugins-dev',
	'vendor',
	'assets',
	'watch'

], () => {
	connect.server({
		base: 'build/wordpress',
		port: '3020'
	}, () => {
		browserSync({
			proxy: '127.0.0.1:3020'
		});
	});
});

gulp.task('copy-theme-dev', () => {
	if (!fs.existsSync('./build')) {
		gutil.log(buildNotFound);
		process.exit(1);
	} else {
		gulp.src('src/theme/**')
			.pipe(gulp.dest('build/wordpress/wp-content/themes/' + themeName));
	}
});

gulp.task('copy-fonts-dev', () => {
	gulp.src('src/fonts/**')
		.pipe(gulp.dest('build/wordpress/wp-content/themes/' + themeName + '/fonts'))
});

gulp.task('style-dev', () => {
	return gulp.src('src/style/style.css')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sourcemaps.init())
		.pipe(postcss(pluginsDev))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/wordpress/wp-content/themes/' + themeName))
		.pipe(browserSync.stream({ match: '**/*.css' }));
});

gulp.task('header-scripts-dev', () => {
	return gulp.src(headerJS)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sourcemaps.init())
		.pipe(concat('header-bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/wordpress/wp-content/themes/' + themeName + '/js'));
});

gulp.task('footer-scripts-dev', () => {
	return gulp.src(footerJS)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(sourcemaps.init())
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('footer-bundle.js'))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest('build/wordpress/wp-content/themes/' + themeName + '/js'));
});

gulp.task('plugins-dev', () => {
	return gulp.src('src/plugins/**')
		.pipe(gulp.dest('build/wordpress/wp-content/plugins'));
});

gulp.task('reload-js', ['footer-scripts-dev', 'header-scripts-dev'], (done) => {
	browserSync.reload();
	done();
});

gulp.task('reload-fonts', ['copy-fonts-dev'], (done) => {
	browserSync.reload();
	done();
});

gulp.task('reload-theme', ['copy-theme-dev'], (done) => {
	browserSync.reload();
	done();
});

gulp.task('reload-plugins', ['plugins-dev'], (done) => {
	browserSync.reload();
	done();
});

gulp.task('watch', () => {
	gulp.watch(['src/style/**/*.css'], ['style-dev']);
	gulp.watch(['src/js/**'], ['reload-js']);
	gulp.watch(['src/fonts/**'], ['reload-fonts']);
	gulp.watch(['src/theme/**'], ['reload-theme']);
	gulp.watch(['src/plugins/**'], ['reload-plugins']);
	gulp.watch('build/wordpress/wp-config*.php', (event) => {
		if (event.type === 'added') { 
			gulp.start('disable-cron');
		}
	});
	gulp.watch(source.scripts, ["scripts:app"]);
    gulp.watch(source.swagger.src, ["vendor:swagger"]);
    gulp.watch(source.styles.watch, ["styles:app", "styles:app:rtl"]);
    gulp.watch(source.styles.themes, ["styles:themes"]);
    gulp.watch(source.templates.views, ["templates:views"]);
    gulp.watch(source.templates.index, ["templates:index"]);
    gulp.watch(
        paths.static,
        gulpsync.sync(["assets:static:app:clean", "assets:static:app"])
    );
});

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
gulp.task("vendor:swagger", getTask("swagger", source.swagger));
gulp.task("vendor", gulpsync.sync(["vendor:base", "vendor:app", "vendor:swagger"]));

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

gulp.task("assets:static:app:clean", function (done) {
    var oldStatic = paths.static.map(i => `${paths.app}${i}`);
    del(oldStatic, {
        force: true
    }).then(function () {
        done();
    });
});

gulp.task("assets:static:app", function () {
    // if (!paths.staticMapped) {
    //     paths.static = paths.static.map(i => `${i}/**/*.*`);
    //     paths.staticMapped = true;
    // }
    // gulp.src(paths.static[0], {base: 'src/plugins/seo-genie/admin/app/img/'})
    //     .pipe(gulp.dest(paths.app + 'img/'));
    // gulp.src(paths.static[1], {base: 'src/plugins/seo-genie/admin/app/i18n/'})
    //     .pipe(gulp.dest(paths.app + 'i18n/'));
});

gulp.task("assets:static:serve", function () {
    paths.server = paths.server.map(i => `${i}/**/*.*`);
    gulp
        .src(paths.server, {
            base: "."
        })
        .pipe(rename({dirname: 'server'}))
        .pipe(gulp.dest(paths.dist));
});

gulp.task("assets", [
    "assets:static:app",
    "assets:static:serve",
    "scripts:app",
    "styles:app",
    "styles:app:rtl",
    "styles:themes",
    "templates:index",
    "templates:views"
]);


/* -------------------------------------------------------------------------------------------------
Production Tasks
-------------------------------------------------------------------------------------------------- */
gulp.task('build-prod', [
	'copy-theme-prod',
	'copy-fonts-prod',
	'style-prod',
	'header-scripts-prod',
	'footer-scripts-prod',
	'plugins-prod',
	'zip-theme'
]);

gulp.task('copy-theme-prod', () => {
	gulp.src(['src/theme/**', '!src/theme/img/**'])
		.pipe(gulp.dest('dist/themes/' + themeName))
});

gulp.task('copy-fonts-prod', () => {
	gulp.src('src/fonts/**')
		.pipe(gulp.dest('dist/themes/' + themeName + '/fonts'))
});

gulp.task('process-images', ['copy-theme-prod'], () => {
	return gulp.src('src/theme/img/**')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(imagemin([
			imagemin.svgo({ plugins: [{ removeViewBox: true }] })
		], {
			verbose: true
		}))
		.pipe(gulp.dest('dist/themes/' + themeName + '/img'));
});

gulp.task('style-prod', () => {
	return gulp.src('src/style/style.css')
		.pipe(plumber({ errorHandler: onError }))
		.pipe(postcss(pluginsProd))
		.pipe(gulp.dest('dist/themes/' + themeName))
});

gulp.task('header-scripts-prod', () => {
	return gulp.src(headerJS)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(concat('header-bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/themes/' + themeName + '/js'));
});

gulp.task('footer-scripts-prod', () => {
	return gulp.src(footerJS)
		.pipe(plumber({ errorHandler: onError }))
		.pipe(babel({
			presets: ['env']
		}))
		.pipe(concat('footer-bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/themes/' + themeName + '/js'));
});

gulp.task('plugins-prod', () => {
	return gulp.src('src/plugins/**')
		.pipe(gulp.dest('dist/plugins'));
});

gulp.task('zip-theme', ['copy-theme-prod', 'copy-fonts-prod', 'process-images', 'style-prod', 'header-scripts-prod', 'footer-scripts-prod', 'plugins-prod'], () => {
	gulp.src('dist/themes/' + themeName + '/**')
		.pipe(zip(themeName + '.zip'))
		.pipe(gulp.dest('dist'))
		.on('end', () => {
			gutil.beep();
			gutil.log(pluginsGenerated);
			gutil.log(filesGenerated);
			gutil.log(thankYou);
		});
});

/* -------------------------------------------------------------------------------------------------
Utility Tasks
-------------------------------------------------------------------------------------------------- */
const onError = (err) => {
	gutil.beep();
	gutil.log(wpFy + ' - ' + errorMsg + ' ' + err.toString());
	this.emit('end');
};

const date = new Date().toLocaleDateString('en-GB').replace(/\//g, '.');
const errorMsg = '\x1b[41mError\x1b[0m';
const devServerReady = 'Your development server is ready, start the workflow with the command: $ \x1b[1mnpm run dev\x1b[0m';
const buildNotFound = errorMsg + ' ⚠️　- You need to install WordPress first. Run the command: $ \x1b[1mnpm run install:wordpress\x1b[0m';
const filesGenerated = 'Your ZIP template file was generated in: \x1b[1m' + __dirname + '/dist/' + themeName + '.zip\x1b[0m - ✅';
const pluginsGenerated = 'Plugins are generated in: \x1b[1m' + __dirname + '/dist/plugins/\x1b[0m - ✅';
const backupsGenerated = 'Your backup was generated in: \x1b[1m' + __dirname + '/backups/' + date + '.zip\x1b[0m - ✅';
const wpFy = '\x1b[42m\x1b[1mWordPressify\x1b[0m';
const wpFyUrl = '\x1b[2m - http://www.wordpressify.co/\x1b[0m';
const thankYou = 'Thank you for using ' + wpFy + wpFyUrl;

gulp.task('backup', () => {
	if (!fs.existsSync('./build')) {
		gutil.log(buildNotFound);
		process.exit(1);
	} else {
		gulp.src('build/wordpress/**')
			.pipe(zip(date + '.zip'))
			.pipe(gulp.dest('backups'))
			.on('end', () => {
				gutil.beep();
				gutil.log(backupsGenerated);
				gutil.log(thankYou);
			});
	}
});

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

/* -------------------------------------------------------------------------------------------------
End of all Tasks
-------------------------------------------------------------------------------------------------- */

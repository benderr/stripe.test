/**
 * Created by RobertSabiryanov on 22.06.15.
 */
var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var gIf = require('gulp-if');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require("babelify");
var assign = require('lodash.assign');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var preprocessify = require('preprocessify');

function bundle(option) {
    var customOpts = {
        debug: option.map,
        entries: option.entryPoint,
        ignoreWatch: ['**/node_modules/**', '**/bower_components/**', '**/bower_modules/**'],
        poll: true
    };
    var opts = assign({}, watchify.args, customOpts);

    var bfy = browserify(opts);
    if (option.watch) {
        bfy = watchify(browserify(opts));

        console.log("Watching ES6 modules".yellow);
        bfy.on('update', function (ids) {
            var logText = ('Watchify. Updated files ' + ids).yellow;
            gutil.log(logText);
            return processBundle(bfy, option);
        }).on('time', function (time) {
            gutil.log(('Rebuilded time:' + time).green);
        });
    }

    option.preprocessingFlags.DEBUG = option.debug || false;
    bfy
        .transform(preprocessify(option.preprocessingFlags))
        .transform(babelify.configure({
            ignore: ['**/node_modules/**', '**/bower_components/**', '**/bower_modules/**', 'common.min.js']
        }));

    return processBundle(bfy, option);
}

function processBundle(bfy, option) {
    return bfy.on('error', error)
        .bundle()
        .on('error', error)
        .pipe(source(option.bundleName))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gIf(option.minify, rename(option.bundleNameMin)))
        .pipe(gIf(option.minify, uglify()))
        .pipe(gIf(option.debug, sourcemaps.write()))
        .pipe(gIf(!option.debug, sourcemaps.write('./', {
            sourceMappingURLPrefix: option.sourceMappingURLPrefix
        })))
        .pipe(gulp.dest(option.destPathName));
}

function error(a) {
    gutil.log('Bundle ES6 error'.red, a.toString().red);
}

module.exports = bundle;

/**
 * Created by RobertSabiryanov on 19.06.15.
 */
var gulp = require('gulp');
var config = require('./configurationManager').get();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var gIf = require('gulp-if');
var sourcemaps = require('gulp-sourcemaps');
var vendorJs = require('../vendor.json');
var injectString = require('gulp-inject-string');
var util = require('gulp-util');
var fs = require('fs');
var runSequence = require('run-sequence').use(gulp);


/** Config variables **/
var destPathName = config.destPathName,
    destDir = destPathName,
    appDir = config.appDir;

var buildNumber = util.env.buildNumber || '0.0.0.0';

function minify(stream, fileName, dest, map) {
    if (config.minify) {
        return stream.pipe(gIf(map, sourcemaps.init()))
            .pipe(concat(fileName))
            .pipe(uglify())
            .pipe(gIf(map, sourcemaps.write()))
            .pipe(gulp.dest(dest));
    }
}


/**
 * Перенос index.html
 */
gulp.task('appHtml', function () {
    var buildDate = (new Date()).toLocaleString();
    return gulp.src([appDir + '/index.html'])
        .pipe(injectString.after('<head>', '<meta build-number="' + buildNumber + '" build-date="' + buildDate + '">\n'))
        .pipe(gulp.dest(destDir))
});

gulp.task('bootstrap', function () {
    return gulp.src(['./node_modules/bootstrap/dist/**/*.*'])
        .pipe(gulp.dest(destDir + '/bootstrap'))
});


gulp.task('static', ['appHtml', 'vendors-js', 'bootstrap']);


gulp.task('vendors-js', function () {
    minify(gulp.src(vendorJs.vendors), 'vendors.min.js', destDir + '/vendors/', false);

    return gulp.src(vendorJs.vendors)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(destDir + '/vendors'));
});
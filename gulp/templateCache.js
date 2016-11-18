var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var config = require('./configurationManager').get();
var preprocess = require('gulp-preprocess');
var util = require('gulp-util');
var src = config.appDir + '/js/**/*.html';
var gIf = require('gulp-if');
var dist = config.destPathName;

gulp.task('templateCache', function () {

    var preprocessingFlags={
        SIGNUP: config.preprocessingFlags.SIGNUP.toString(),
        EXCHANGE_CURRENCY: config.preprocessingFlags.EXCHANGE_CURRENCY,
        INVITE_FRIEND_FEATURE: config.preprocessingFlags.INVITE_FRIEND_FEATURE,
        COLLECTING_ANALYTICS: config.preprocessingFlags.COLLECTING_ANALYTICS
    };
    return gulp.src(src)
        .pipe(gIf(config.preprocessHtml, preprocess({context: preprocessingFlags})))
        .pipe(templateCache('main.templates.js', {
            module: 'rad.main.templates'
        }))
        .pipe(gulp.dest(dist + '/js'));
});
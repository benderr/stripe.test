/**
 * Created by rsabiryanov on 18.03.2015.
 */
'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var angularFilesort = require('gulp-angular-filesort');
var config = require('./configurationManager').get();
var destPathName = config.destPathName;
var gIf = require('gulp-if');

/**
 * Определение порядка загрузки js файлов
 */

gulp.task('injectJs', function () {

    var mainTemplates = [destPathName + '/js/main.templates.js'];
    mainTemplates.injectPlaceholder = 'mainTemplates';

    var bundle = [destPathName + '/bootstrap/js/bootstrap.min.js',
        destPathName + '/js/bundle.js'];

    if (config.minify) {
        var bundle = [destPathName + '/js/bundle.min.js',
            destPathName + '/bootstrap/js/bootstrap.min.js'];
    }
    bundle.injectPlaceholder = 'bundle';

    return gulp.src(destPathName + '/index.html')
        .pipe(inject(gulp.src(mainTemplates), {
                read: false,
                ignorePath: 'dist',
                name: mainTemplates.injectPlaceholder,
                relative: true,
                addPrefix: config.prefix
            }
        ))
        .pipe(inject(gulp.src(bundle), {
                read: false,
                ignorePath: 'dist',
                name: bundle.injectPlaceholder,
                relative: true,
                addPrefix: config.prefix
            }
        ))
        .pipe(gulp.dest(destPathName));

});

/**
 * Created by rsabiryanov on 18.03.2015.
 */
'use strict';

var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('./configurationManager').get();
var gIf = require('gulp-if');
var destPathName = config.destPathName;

gulp.task('injectCss', function () {
	var cssFiles = [destPathName + '/bootstrap/css/bootstrap.min.css'];

	var cssStream = gulp.src(cssFiles);

	return gulp.src(destPathName + '/index.html')
		.pipe(inject(cssStream, {
			name: 'customCss',
			ignorePath: 'dist',
			loadCss: true,
			relative: true,
			addPrefix: config.prefix
		}))
		.pipe(gulp.dest(destPathName));
});



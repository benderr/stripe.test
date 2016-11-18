/**
 * Created by rsabiryanov on 18.03.2015.
 */
'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);

gulp.task('injects', function (done) {
	runSequence('injectJs', 'injectCss', 'injectVendors', done);
});
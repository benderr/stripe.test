/**
 * Created by rsabiryanov on 18.03.2015.
 */
var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('./configurationManager').get();
var vendorJs = require('../vendor.json');

var destPathName = config.destPathName;
/**
 * Инжектирование скриптов bower в index.html
 */
gulp.task('injectBower', function () {
	var src = vendorJs.bower;
	var ignorePath= 'src/app';
	if (config.minify) {
		src = destPathName + '/bower_components/' + config.minifiedBower;
		ignorePath= 'dist';
	}
	return gulp.src(destPathName + '/index.html')
		.pipe(inject(gulp.src(src, {
				read: false
			}
		), {
			ignorePath: ignorePath,
			name: 'bower'
		}))
		.pipe(gulp.dest(destPathName + ''));
});




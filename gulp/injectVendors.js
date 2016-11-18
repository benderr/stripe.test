var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('./configurationManager').get();

var destPathName = config.destPathName; // ./dist
/**
 * Инжектирование файла с либами из vendor.json в index.html
 */
gulp.task('injectVendors', function () {
	var src = destPathName + '/vendors/vendors.js';
	ignorePath= 'dist';
	if (config.minify) {
		src = destPathName + '/vendors/vendors.min.js';
	}
	return gulp.src(destPathName + '/index.html')
		.pipe(inject(gulp.src(src, {
				read: false
			}
		), {
			ignorePath: ignorePath,
			name: 'vendors',
			relative: true,
			addPrefix: config.prefix
		}))
		.pipe(gulp.dest(destPathName + ''));


});





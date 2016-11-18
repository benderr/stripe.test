/**
 * Created by RobertSabiryanov on 25.06.15.
 */
var gulp = require('gulp');
var inject = require('gulp-inject');
var config = require('./configurationManager').get();


var destPathName = config.destPathName;

gulp.task('injectThirdParty', function () {
	var src = [destPathName + '/thirdparty/**/*.js', '!' + config.minifiedThirdparty];
	if (config.minify)
		src = destPathName + '/thirdparty/' + config.minifiedThirdparty;
	return gulp.src(destPathName + '/index.html')
		.pipe(inject(gulp.src(src), {
			ignorePath: 'dist',
			name: 'thirdparty',
			relative: true,
			addPrefix: config.prefix
		}))
		.pipe(gulp.dest(destPathName + ''));
});

//gulp.task('injectThirdPartyCss', function () {
//	return gulp.src(destPathName + '/index.html')
//		.pipe(inject(gulp.src(destPathName + '/thirdparty/**/*.css'), {
//			ignorePath: 'dist',
//			name: 'thirdPartyCss'
//		}))
//		.pipe(gulp.dest(destPathName + ''));
//});
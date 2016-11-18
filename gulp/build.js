/**
 * Created by rsabiryanov on 17.03.2015.
 */
var path = require('path');
var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);
var del = require('del');
var util = require('gulp-util');
var fs = require('fs');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var extend = require('gulp-extend');
var wrap = require('gulp-wrap');

var concat = require('gulp-concat');
var through = require('through2');
var underscore = require('underscore');

var bundler = require('./es6bundler');
var config = require('./configurationManager').get();
var shell = require('gulp-shell');
var os = require('os');

/** Config variables **/
var tmpDir = config.tmp,
    destPathName = config.destPathName,
    destDir = destPathName,
    appDir = config.appDir,
    sourceMaps = 'sourceMaps.zip';


var env = util.env.server || 'dev';

/**
 * Отчет о завершении
 */
gulp.task('afterBuild', function () {
    util.log('----------------'.green);
    util.log('Build finished:');
    util.log('----------------'.green);
});

/**
 * Очистка папки
 */
gulp.task('clean', del.bind(null, [tmpDir, destDir, sourceMaps], {force: true}));


gulp.task('app-js', function () {
    return gulp.src([appDir + '/js/app.js'])
        .pipe(gulp.dest(destDir + '/js/'))
});

gulp.task('config-for-es6', function () {
    return configPipe('config.es6.js', 'config.js')
});


function configPipe(configTemplate, name) {
    var configDir = appDir + '/js/config';
    var area = util.env.server || 'dev';

    return gulp.src([configFilePath(), configFilePath(area)])
        .pipe(extend(name))
        .pipe(wrap({src: configDir + '/' + configTemplate}))
        .pipe(gulp.dest(tmpDir + "/js/"));

    function configFilePath(env) {
        env = env ? '.' + env + '.' : '.';
        return configDir + '/' + 'config' + env + 'json';
    }
}

function importES6Modules(prefix) {
    return through.obj(function (file, enc, callback) {
        if (file.isNull() || file.isDirectory()) {
            return callback();
        }
        // No support for streams
        if (file.isStream()) {
            this.emit('error', new PluginError({
                plugin: 'modules-configs',
                message: 'Streams are not supported.'
            }));
            return callback();
        }
        if (file.isBuffer()) {
            var regexp = new RegExp('\\' + path.sep, 'ig');
            var regexp2 = new RegExp('\\.', 'ig');

            var filePath = path.normalize(prefix + '/' + file.relative).replace(/\\/ig, '/');
            var varName = file.relative.replace(regexp, '_').replace(regexp2, '_').replace('.js', '');
            var content = 'import ' + varName + ' from "' + filePath + '";' + os.EOL;
            file.contents = new Buffer(content);

            this.push(file);
            callback();
        }
    });
}


gulp.task('build-es6', ['config-for-es6'], function () {
    config.entryPoint = appDir + '/js/main.js';
    config.bundleName = 'bundle.js';
    config.bundleNameMin = 'bundle.min.js';
    config.destPathName = destPathName + '/js';
    return bundler(config);
});


gulp.task('build', ['clean'], function (done) {
    runSequence(['templateCache', 'build-es6', 'app-js', 'static'], done);
});
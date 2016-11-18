'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence').use(gulp);


require('require-dir')('./gulp');

/**
 * Задача сборки проекта.
 * В режиме разработки происходит сжатие скриптов без их контактенации с генерацией sourcemap.
 * С параметром --production запускается в режиме подготовки к выкладыванию с объединенными и сжатыми скриптами.
 */
gulp.task('default', ['clean'], function () {
    runSequence('build');
});


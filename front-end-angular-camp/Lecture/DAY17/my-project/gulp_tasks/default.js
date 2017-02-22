/*! default.js © yamoo9.net, 2016 */
'use strict';

var gulp = require('gulp');

gulp.task('default', [
  'browserify:watch',
  'sass:watch'
]);
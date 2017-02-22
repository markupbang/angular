/*! default.js © markupbang.com, 2016 */
'use strict';

var gulp     = require('gulp');
var gulpsync = require('gulp-sync')(gulp);

gulp.task('default', gulpsync.sync([
  'clear',
  //'modernizr',
  ['browserify', 'sass'],
  ['wiredep','inject'],
  'watch',
  'serve:dev'
]));

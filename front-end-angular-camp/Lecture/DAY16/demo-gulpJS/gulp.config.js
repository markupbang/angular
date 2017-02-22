/*! gulp.config.js © yamoo9.net, 2016 */
'use strict';

// 프로젝트 경로
var src   = './src/';
var dist  = './dist/';
var build = './build/';
var tmp   = './.tmp';
var test  = './test/';

// 공개 모듈 등록
var config = {

  // 경로
  'src'   : src,
  'dist'  : dist,
  'build' : build,
  'tmp'   : tmp,
  'test'  : test,

  // Browserify 설정
  'browserify': {
    'options': {
      // 진입 파일 (번들링 시작 파일)
      'entries': [ test + 'app.js'],
      // 소스맵을 번들링된 파일에 포함
      // 'debug': false,
      // 번들링 속도 향상 (다만 파일 크기가 커짐)
      // 'insertGlobals': true
    },
    // 번들링 위치 설정
    'output': tmp,
    // 생성되는 번들링 파일 이름 설정
    'output_filename': 'app.bundle.js',
    // 분리된 소스맵 파일 위치 설정
    'sourcemaps': './',
    // 이미 존재하는 소스맵 파일 읽기 설정
    'read_sourcemap': true
  }

};

// 모듈 공개
module.exports = config;
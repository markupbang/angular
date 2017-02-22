'use strict';

// --------------------------------------------------
// 의존 모듈 로드
// --------------------------------------------------
var config = require('./gulp.config');
var gulp   = require('gulp');
var yargs  = require('yargs').argv;
var log    = require('./gulp_tasks/utils/log');
// --------------------------------------------------
// Browserify 사용을 위한 모듈 로드
// Watchify, lodash.assign
// --------------------------------------------------
var browserify = require('browserify');
var watchify   = require('watchify');
var assign     = require('lodash.assign');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
// --------------------------------------------------
// Gulp 플러그인 모듈 로더
// --------------------------------------------------
var $ = require('gulp-load-plugins')({'lazy': true});



// --------------------------------------------------
// 기본 업무 등록
// --------------------------------------------------
gulp.task('default', ['bundle:js', 'sass:watch']);



// --------------------------------------------------
// 번들링(Bundling): Javascript 업무 등록
// --------------------------------------------------
// 번들러 정의
var bundler = browserify(config.browserify.options);
// Bundle 업무를 수행하는 함수
var bundleHandler = (message) => {
  log(message);
  return bundler
    .bundle()
    .pipe(source(config.browserify.output_filename))
    .pipe(buffer())
      // 오류 발생 시, 콘솔에 오류 메시지 출력
      .on('error', $.util.log.bind($.util, 'Browserify 오류'))
      // 조건 --min 옵션 값(true, false)에 따라 압축(Uglify) 처리
      .pipe($.if(yargs.min, $.uglify()))
    // 소스맵 초기화 (이미 소스맵 파일 존재하면 해당 파일을 읽어서 속도를 향상)
    .pipe($.sourcemaps.init({'readMaps': config.browserify.read_sourcemap}))
    // 소스맵 쓰기
    .pipe($.sourcemaps.write(config.browserify.sourcemaps))
    .pipe(gulp.dest(config.browserify.output));
};

// browserify 업무
gulp.task('browserify', bundleHandler.bind(gulp, 'Javascript 번들링'));

// browserify 관찰 업무
gulp.task('browserify:watch', function() {
  // 옵션 덮어쓰기
  var opts = assign({}, watchify.args, config.browserify.options);
  // Watchify 래핑된 Browserify 객체
  bundler = watchify(browserify(opts));
  bundleHandler.call(gulp, '번들링 관찰 중...');
  // 이벤트 처리(감지)
  bundler.on('update', bundleHandler);
  bundler.on('log', $.util.log);
});


// --------------------------------------------------
// 프리프로세싱(Pre-Processing): Sass → CSS 업무 등록
// --------------------------------------------------
gulp.task('sass', ()=> {
  log('Sass → CSS 변환');
  return gulp
    .src('./test/*.s+(a|c)ss')
    // 소스맵 초기화
    .pipe( $.sourcemaps.init({'readMaps':true}) )
    // Sass 컴파일
    .pipe( $.sass({
      'outputStyle': 'expanded', // nested, compact, expanded, compressed
      'indentType': 'space', // 'tab', 'space'
      'indentWidth': 2,
      // 수치 정확도 (소수점 이하 자리 수)
      'precision'   : 4,
      // 소스맵 작성 설정
      'sourceMap'   : true
    }).on('error', $.sass.logError) )
    // 벤더 프리픽스 자동으로 처리
    .pipe( $.autoprefixer({'browselist': ['> 5% in KR', 'ff ESR']}) )
    // 소스맵 쓰기
    .pipe( $.sourcemaps.write('./') )
    // 스트림 데이터 파일을 목적지에 실제 파일로 쓰기
    .pipe( gulp.dest('./.tmp/css') );

});

gulp.task('sass:lint', ()=> {
  log('Sass 문법 검수');
  return gulp.src('./test/*.{sass,scss}')
    .pipe($.sassLint())
    .pipe($.sassLint.format())
    .pipe($.sassLint.failOnError());
});

gulp.task('sass:watch', ['sass'], ()=> {
  log('Sass 관찰 업무');
  gulp.watch(['./test/*.{sass,scss}'], ['sass']);
});



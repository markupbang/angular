'use strict';

/**
 * --------------------------------
 * Gulp API
 * --------------------------------
 * .task()
 * .src()
 * .dest()
 * .watch()
 * .start()
 * ----------------------------- */

// 의존 모듈 로드
var gulp       = require('gulp'),
    $          = require('gulp-load-plugins')({'lazy': true}),
    js_stylish = require('jshint-stylish'),
    yargs      = require('yargs').argv;

    // gulp-load-plugins으로 게으른 호출이 되는 모듈들
    // util       = require('gulp-util'),
    // print      = require('gulp-print'),
    // gulp_if    = require('gulp-if'),

    // jshint     = require('gulp-jshint'),
    // jscs       = require('gulp-jscs'),

    // yargs 모듈은 gulp 명령을 실행할 경우, 옵션을 전달
    // var condition = true;

/**
 * --------------------------------
 * 업무 등록
 * ----------------------------- */

// --------------------------------------------------
// 기본 업무 등록
// () => {}, ES2015의 함수(단축 표현식)
//
// CLI에서 명령 수행 방법
// $ gulp {task_name}
// $ gulp default
// $ gulp
gulp.task('default', function() {
    log('업무 자동화 시작! ... ', 'red');
});

// --------------------------------------------------
// 업무 테스트
gulp.task('showMeTheMoney', function() {
    log('대가를 치뤄!!');
});

// --------------------------------------------------
// Javascript 코드 분석 업무
gulp.task('lint-js', function() {
    log('Javascript 코드 분석 검증 시작! ....');
    // 어떤 파일을 검증할 것인가?
    gulp.src('./test/*.js')
        // 프린트
        // 조건이 참일 경우, 프린트
        .pipe( $.if( yargs.print, $.print() ) )
        // 스트림 데이터에 어떤 업무를 적용할 것인가?
        .pipe( $.jscs() ) // Javascript Coding Style
        // fix 수정된 파일 생성 (gulp.dest() 사용 요구!)
        // .pipe( jscs({'fix': true}) )
        .pipe( $.jscs.reporter() )
        .pipe( $.jshint() ) // JS Hinting
        // 오류/경고가 발생했을 경우 리포트를 작성하라.
        // jshint-stylish 모듈 설치(의존)
        .pipe( $.jshint.reporter('jshint-stylish') );
        // .pipe( $.jshint.reporter(js_stylish) )
        // 수정된 파일을 생성하고자 하는 위치 지정
        // .pipe( gulp.dest('./test/fix/') );
});


/**
 * --------------------------------
 * 재사용 가능한 함수
 * --------------------------------
 */
function log(msg, color) {
    color = color || 'blue'
    if (msg) {
        $.util.log( $.util.colors[color]('───────────────────────────────') );
        $.util.log( ' ' + $.util.colors[color](msg) );
        $.util.log( $.util.colors[color]('───────────────────────────────') );
    }
}
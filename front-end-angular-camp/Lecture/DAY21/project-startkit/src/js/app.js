/*! app.js © yamoo9.net, 2016 */
'use strict';

/**
 * --------------------------------
 * 모듈 로드
 * ----------------------------- */
require('./modernizr-custom');

// -----------------------------------------------------
// AngularJS 모듈 정의
// -----------------------------------------------------
.module('DemoApp',['ngAria', 'jcs-autoValidate', 'angular-ladda'])
// https://docs.angularjs.org/guide/module#module-loading-dependencies
// 모듈은 부트스트랩 과정에서 애플리케이션에 적용되는 구성(Configuration), 실행(Run) 블록의 모음이다.
//
// 1. 구성블록 config()
// 프로바이더를 등록하거나 구성 단계가 실행되는 동안 처리된다.
// 오직 프로바이더/상수 만이 구성 블록에 삽입될 수 있다.
// 이유는 서비스 구성이 이루어지기 이전에 돌발적으로 발생하는 오류를 방지하기 위함이다.
//
// 2. 실행블록 run()
// 인젝터(Injector)가 실행된 이후 애플리케이션이 킥 스타트하는데 사용된다.
// 오직 인스턴스/상수 만이 실행 블록에 삽입될 수 있다.
// 이유는 애플리케이션 실행 중 시스템 변경을 방지하기 위함이다.

// 국제화 i18n(Internationalization): http://jonsamwell.github.io/angular-auto-validate/#i18n
// 사용자 정의 오류 메시지: http://jonsamwell.github.io/angular-auto-validate/#error_message_resolver
.run([
  'defaultErrorMessageResolver',
  function(defaultErrorMessageResolver) {
    defaultErrorMessageResolver.setI18nFileRootPath('js/lang');
    defaultErrorMessageResolver.setCulture('ko-KR');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages['badID'] = '잠깐! 영문과 숫자로만 구성된 아이디를 사용해주세요.';
      errorMessages['tooYoung'] = '안타깝네요. {0}세 이상 가입이 가능합니다';
      errorMessages['tooOld'] = '죄송합니다. {0}세를 초과할 경우, 가입이 제한됩니다.';
      errorMessages['patternPassword'] = '대문자, 소문자, 특수기호, 숫자만 사용하여 8자 이상 입력해주세요.';
    });
  }
]);


// -----------------------------------------------------
// 컨트롤러 모듈 호출
// -----------------------------------------------------
require('./controllers/AutoRegisterController');
// require('./controllers/RegisterController');
// require('./controllers/OnepieceController');
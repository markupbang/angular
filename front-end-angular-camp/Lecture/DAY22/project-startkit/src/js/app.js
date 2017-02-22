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
angular.module('PersonListApp', [])
.controller('PersonListController',
  ['$scope','$http', function($scope, $http){

    // 모델(데이터) 초기 값 설정
    $scope.persons = [];
    // $scope.selectedIndex 속성의 초기값 설정
    $scope.selectedIndex = null;
    // $scope.selectedPerson 속성의 초기값 설정
    $scope.selectedPerson = null;
    // 사용자가 검색하는 이름/메일을 포함하는 객체 초기 설정
    $scope.search = '';

    // Ajax를 사용하여 모델 데이터 로드
    $http
      .get('../data/persons.json')
      .then(function successProcess(response) {
        $scope.persons = response.data.results;
      }, function errorProcess(response) {
        console.error('데이터 로드에 실패했습니다.');
      });

    // 스코프 내에서 사용되는 메소드를 정의
    $scope.settingReadingZero = function(idx) {
      if ( idx < 10 ) {
        idx = '0'+idx;
      }
      return idx;
    };

    // 메소드의 역할: $scope.selectedIndex 속성 값을
    // 사용자가 클릭한 <tr>의 인덱스($index) 값으로 설정
    $scope.selectPerson = function(idx, person) {
      $scope.selectedIndex = idx;
      $scope.selectedPerson = person;
      // console.log($scope.selectedPerson.name.first);
    };

    // 첫글자를 대문자로 변환해서 반환하는 메소드
    $scope.capitalize = function(str) {
      if (!str) { return ''; }
      var firstLetter = str.charAt(0).toUpperCase();
      return firstLetter + str.slice(1) + '.';
    };

    //
    $scope.setComma = function(str) {
      if (!str) { return ''; }
      return str + ',';
    };

    // AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NL, NZ, TR, US

    $scope.setNation = function(nation) {
      if (!nation) {return ''}
      switch(nation) {
        case 'AU': return 'Australia';
        case 'BR': return 'Brazil';
        case 'CA': return 'Canada';
        case 'CH': return 'Switzerland';
        case 'DE': return 'Germany';
        case 'DK': return 'Denmark';
        case 'ES': return 'Spain';
        case 'FI': return 'Finland';
        case 'FR': return 'France';
        case 'GB': return 'United Kingdom';
        case 'IE': return 'Ireland';
        case 'IR': return 'Iran';
        case 'NL': return 'Netherlands';
        case 'NZ': return 'New Zealand';
        case 'TR': return 'Turkey';
        case 'US': return 'United States';
      }
    };

    $scope.sensitiveSearch = function(person) {
      // 초기 로드할 때는 거짓이 나오도록 설정
      if ( $scope.search ) {
        return person.name.first.indexOf($scope.search) === 0 ||
               person.name.last.indexOf($scope.search) === 0 ||
               person.gender.indexOf($scope.search) === 0 ||
               person.email.indexOf($scope.search) === 0;
      }
      // 처음 로드할 때는 모든 조건이 참.
      return true;
    };

  }]);


angular.module('DemoApp',['ngAria', 'jcs-autoValidate', 'angular-ladda'])
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
.run(['defaultErrorMessageResolver', function(defaultErrorMessageResolver) {
    // 오류 메시지 한국어로 변경
    defaultErrorMessageResolver.setI18nFileRootPath('js/lang');
    defaultErrorMessageResolver.setCulture('ko-KR');
    // 기본 오류 메시지를 사용자 정의 메시지로 덮어쓰기
    defaultErrorMessageResolver.getErrorMessages().then(function(errorMessages) {
      errorMessages['invalidID']       = '잠깐! 영문과 숫자로만 구성된 아이디를 사용해주세요.';
      errorMessages['invalidPassword'] = '잠깐! 영문 대문자, 소문자, 숫자, 특수문자 조합된 문자를 최소 6개 이상 요구됩니다.';
      errorMessages['tooYoung']        = '안타깝네요. {0}세 이상 가입이 가능합니다';
      errorMessages['tooOld']          = '죄송합니다. {0}세를 초과할 경우, 가입이 제한됩니다.';
    });

    // defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
    //   errorMessages['badID']           = '잠깐! 영문과 숫자로만 구성된 아이디를 사용해주세요.';
    //   errorMessages['tooYoung']        = '안타깝네요. {0}세 이상 가입이 가능합니다';
    //   errorMessages['tooOld']          = '죄송합니다. {0}세를 초과할 경우, 가입이 제한됩니다.';
    //   errorMessages['patternPassword'] = '대문자, 소문자, 특수기호, 숫자만 사용하여 8자 이상 입력해주세요.';
    // });
  }]);


// -----------------------------------------------------
// 컨트롤러 모듈 호출
// -----------------------------------------------------
require('./controllers/AutoRegisterController');
// require('./controllers/RegisterController');
// require('./controllers/OnepieceController');
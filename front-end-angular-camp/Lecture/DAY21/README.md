###### Fast Campus ─ Front-End AngularJS CAMP

# DAY21

1. AngularJS Form 디자인 Part 2.
1. `angular-auto-validate` 모듈 활용


-

### 1-1. AngularJS Form 디자인 Part 2

- `registerForm.$submitted` 활용
- **WAI-ARIA** 반영 (접근성 향상)
- `$http` 모듈 활용 (등록 내용 서버에 전달 성공/실패 확인)
- 오류 회복성 (사용자에게 오류 내용을 알리고 해당 오류 영역으로 포커스 이동)

##### jQuery 활용 예시(20일차)

```js
// 20일차 추가했던 jQuery 코드
$('#user-email')
  .closest('.form-group').addClass('has-error')
  .end().focus();
```

##### registerForm.$submitted 활용 방향으로 변경

```html
<!-- registerForm.$submitted 활용 방법으로 변경 -->
<div
  class="form-group"
  data-ng-class="{
    'has-error': (!registerForm.email.$pristine || registerForm.$submitted) &amp;&amp; registerForm.email.$invalid,
    'has-success': registerForm.email.$valid
  }">
```

##### **WAI-ARIA** 반영 (접근성 향상)

```html
<div
  class="form-group"
  data-ng-class="{
    'has-error': (!registerForm.email.$pristine || registerForm.$submitted) &amp;&amp; registerForm.email.$invalid,
    'has-success': registerForm.email.$valid
  }">
  <label for="email" class="control-label">이메일 <span aria-label="필수 입력" title="필수 입력">*</span></label>
  <input
    type="email"
    name="email"
    id="email"
    class="form-control"
    data-ng-model="formModel.email"
    placeholder="name@email.com"
    aria-describedby="require-email-desc"
    required>
  <div id="require-email-desc">
    <span
      class="help-block"
      aria-hidden="!registerForm.email.$error.required"
      data-ng-show="registerForm.email.$error.required">이메일은 필수 입력사항입니다.</span>
    <span
      class="help-block"
      aria-hidden="!registerForm.email.$error.email"
      data-ng-show="registerForm.email.$error.email">작성하는 이메일은 @ 기호를 반드시 사용해야 합니다.</span>
    <span
      class="help-block"
      aria-hidden="!registerForm.email.$valid"
      data-ng-show="registerForm.email.$valid">작성하는 이메일은 올바른 유형으로 작성하셨습니다.</span>
  </div>
</div>
```

##### `$http` 모듈 활용 (등록 내용 서버에 전달 성공/실패 확인)

```js
$http.post('https://minmax-server.herokuapp.com/register/', _formModel)
  .then(function(response) {
    console.log('전송 성공! :)');
  }, function(response) {
    console.error('전송 실패! :(');
  });
```

##### 오류 회복성 (사용자에게 오류 내용을 알리고 해당 오류 영역으로 포커스 이동)

```js
switch (form.$error.required[0].$name) {
  case 'name':
    window.alert('아이디 입력은 필수 입력사항입니다. 정정해주세요.');
  break;
  case 'email':
    window.alert('이메일 입력은 필수 입력사항입니다. 정정해주세요.');
  break;
  case 'password':
    window.alert('패스워드 입력은 필수 입력사항입니다. 정정해주세요.');
  // break;
}
document.querySelector('#'+form.$error.required[0].$name).focus();
return false;
```

-

#### AngularJS Form 디자인 코드 전문

##### form-design.html

```html
<!DOCTYPE html>
<html lang="ko-KR" dir="ltr" class="no-js" data-ng-app="DemoApp">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta charset="UTF-8">
  <title>Form Design - AngularJS Application</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png">
  <!-- bower:css -->
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css" />
  <!-- endbower -->
  <!-- inject:css -->
  <link rel="stylesheet" href="css/style.css">
  <!-- endinject -->
</head>
<body data-ng-cloak>

<!-- 헤더 영역 -->
<nav class="navbar navbar-default navbar-inverse navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <a href="/" class="navbar-brand">AngularJS Form Design</a>
    </div>
  </div>
</nav>
<!--// 헤더 영역 -->

<!-- 등록 폼 영역 -->
<div
  class="main-content container"
  data-ng-controller="RegisterController">
  <form name="registerForm" data-ng-submit="onSubmit(registerForm)" novalidate>
    <div class="form-group" data-ng-class="{
      'has-error': (!registerForm.name.$pristine || registerForm.$submitted) &amp;&amp; registerForm.name.$invalid,
      'has-success': registerForm.name.$valid
    }">
      <label for="name" class="control-label">아이디 <span aria-label="필수 입력" title="필수 입력">*</span></label>
      <input
        type="text"
        name="name"
        id="name"
        class="form-control"
        data-ng-model="formModel.name"
        aria-describedby="require-id-desc"
        data-ng-minlength="3"
        data-ng-maxlength="7"
        required>
      <div id="require-id-desc">
        <span
          class="help-block"
          aria-hidden="!registerForm.name.$error.required"
          data-ng-show="registerForm.name.$error.required">아이디는 필수 입력사항입니다. (3~7글자)</span>
        <span
          class="help-block"
          aria-hidden="!registerForm.name.$error.minlength"
          data-ng-show="registerForm.name.$error.minlength">입력한 아이디 값이 3글자 보다 작습니다.</span>
        <span
          class="help-block"
          aria-hidden="!registerForm.name.$error.maxlength"
          data-ng-show="registerForm.name.$error.maxlength">입력한 아이디 값이 7글자 보다 큽니다.</span>
        <span
          class="help-block"
          aria-hidden="!registerForm.name.$valid"
          data-ng-show="registerForm.name.$valid">작성하는 아이디는 올바른 유형으로 작성하셨습니다.</span>
      </div>
    </div>
    <div
      class="form-group"
      data-ng-class="{
        'has-error': (!registerForm.email.$pristine || registerForm.$submitted) &amp;&amp; registerForm.email.$invalid,
        'has-success': registerForm.email.$valid
      }">
      <label for="email" class="control-label">이메일 <span aria-label="필수 입력" title="필수 입력">*</span></label>
      <input
        type="email"
        name="email"
        id="email"
        class="form-control"
        data-ng-model="formModel.email"
        placeholder="name@email.com"
        aria-describedby="require-email-desc"
        required>
      <div id="require-email-desc">
        <span
          class="help-block"
          aria-hidden="!registerForm.email.$error.required"
          data-ng-show="registerForm.email.$error.required">이메일은 필수 입력사항입니다.</span>
        <span
          class="help-block"
          aria-hidden="!registerForm.email.$error.email"
          data-ng-show="registerForm.email.$error.email">작성하는 이메일은 @ 기호를 반드시 사용해야 합니다.</span>
        <span
          class="help-block"
          aria-hidden="!registerForm.email.$valid"
          data-ng-show="registerForm.email.$valid">작성하는 이메일은 올바른 유형으로 작성하셨습니다.</span>
      </div>
    </div>
    <div class="form-group">
      <label for="gender" class="control-label">성별</label>
      <select name="gender" id="gender" class="form-control" data-ng-model="formModel.gender">
        <option value="">성별을 선택해주세요.</option>
        <option value="male">남성</option>
        <option value="female">여성</option>
      </select>
    </div>
    <div class="form-group" data-ng-class="{
      'has-error': (!registerForm.password.$pristine || registerForm.$submitted) &amp;&amp; registerForm.password.$invalid,
      'has-success': registerForm.password.$valid
    }">
      <label for="password" class="control-label">패스워드 <span aria-label="필수 입력" title="필수 입력">*</span></label>
      <input
        type="password"
        name="password"
        id="password"
        class="form-control"
        data-ng-model="formModel.password"
        data-ng-minlength="4"
        data-ng-maxlength="8"
        aria-describedby="require-password-desc"
        required>
        <div id="require-password-desc">
          <span
            class="help-block"
            aria-hidden="!registerForm.password.$error.required"
            data-ng-show="registerForm.password.$error.required">비밀번호 입력은 필수입니다. (4~8글자)</span>
          <span
            class="help-block"
            aria-hidden="!registerForm.password.$error.minlength"
            data-ng-show="registerForm.password.$error.minlength">작성한 비밀번호는 4글자보다 작습니다.</span>
          <span
            class="help-block"
            aria-hidden="!registerForm.password.$error.maxlength"
            data-ng-show="registerForm.password.$error.maxlength">작성한 비밀번호는 8글자보다 큽니다.</span>
          <span
            class="help-block"
            aria-hidden="!registerForm.password.$valid"
            data-ng-show="registerForm.password.$valid">작성한 비밀번호는 올바르게 작성되었습니다.</span>
        </div>
    </div>
    <div class="form-group">
      <button
        type="submit"
        class="btn btn-primary">전송</button>
    </div>
  </form>
</div>
<!--// 등록 폼 영역 -->

<!-- bower:js -->
<script src="bower_components/jquery/dist/jquery.js"></script>
<script src="bower_components/bootstrap/dist/js/bootstrap.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/angular-aria/angular-aria.js"></script>
<script src="bower_components/angular-auto-validate/dist/jcs-auto-validate.js"></script>
<!-- endbower -->
<!-- inject:js -->
<script src="js/app.bundle.js"></script>
<!-- endinject -->
</body>
</html>
```

-

##### RegisterController.js

```js
'use strict';
/*! RegisterController.js © yamoo9.net, 2016 */

angular.module('DemoApp')
.controller('RegisterController', ['$scope', '$http', function($scope, $http) {

  $scope.formModel = {};

  $scope.onSubmit = function(form) {
    console.log($scope.formModel);
    if ( form.$valid ) {
      // https://docs.angularjs.org/api/ng/service/$http#post
      $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel)
        .then(
          function successProcess(res) {
            console.log('전송 성공! :)');
          },
          function errorProcess(res) {
            console.error('전송 실패! :(');
          }
        );
    }
    else {
      switch (form.$error.required[0].$name) {
        case 'name':
          window.alert('아이디 입력은 필수 입력사항입니다. 정정해주세요.');
        break;
        case 'email':
          window.alert('이메일 입력은 필수 입력사항입니다. 정정해주세요.');
        break;
        case 'password':
          window.alert('패스워드 입력은 필수 입력사항입니다. 정정해주세요.');
      }
      document.querySelector('#'+form.$error.required[0].$name).focus();
      return false;
    }
  };

}]);
```

---

### 1-2-1. [angular-auto-validate](http://jonsamwell.github.io/angular-auto-validate/) 모듈 활용

##### angular-auto-validate 모듈 설치

```sh
# gulp.config.js 파일 경로 index.html → *.html 수정
$ bower i -S angular-auto-validate
```

##### AngularJS 의존모듈 로드

```js
// app.js
// jcs-autoValidate 의존 모듈 로드
angular.module('DemoApp',['ngAria', 'jcs-autoValidate']);
```

##### AngularJS 실행블록(run) 설정

```js
angular
  .module('DemoApp',['ngAria', 'jcs-autoValidate'])
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
```

##### form-autoValidate-design.html 코드 전문

```html
<!-- 등록 폼 영역 -->
<div
  class="main-content container"
  data-ng-controller="RegisterAutoValidateController">
  <form data-ng-submit="onSubmit()" novalidate>
    <div class="form-group">
      <label for="name" class="control-label">아이디 <span aria-label="필수 입력" title="필수 입력">*</span></label>
      <!-- 아이디 정규표현식: http://html5pattern.com/Names -->
      <input
        type="text"
        name="name"
        id="name"
        class="form-control"
        data-ng-model="formModel.name"
        data-ng-pattern="/^[A-Za-z0-9_]{1,32}$/"
        data-ng-pattern-err-type="badID"
        data-ng-minlength="5"
        data-ng-maxlength="10"
        required>
    </div>
    <div class="form-group">
      <label for="email" class="control-label">이메일 <span aria-label="필수 입력" title="필수 입력">*</span></label>
      <input
        type="email"
        name="email"
        id="email"
        class="form-control"
        data-ng-model="formModel.email"
        placeholder="name@email.com"
        required>
    </div>
    <div class="form-group">
      <label for="gender" class="control-label">성별</label>
      <select name="gender" id="gender" class="form-control" data-ng-model="formModel.gender">
        <option value="">성별을 선택해주세요.</option>
        <option value="male">남성</option>
        <option value="female">여성</option>
      </select>
    </div>
    <div class="form-group">
      <label for="age" class="control-label">나이</label>
      <input
        data-ng-model="formMode.age"
        class="form-control"
        type="number"
        name="age"
        min=16
        max=70
        data-ng-min-err-type="tooYoung"
        data-ng-max-err-type="tooOld"
        id="age"
        required>
    </div>
    <div class="form-group">
      <label for="password" class="control-label">패스워드 <span aria-label="필수 입력" title="필수 입력">*</span></label>
      <!-- 패스워드 정규표현식: http://html5pattern.com/Passwords -->
      <input
        type="password"
        name="password"
        id="password"
        class="form-control"
        data-ng-model="formModel.password"
        data-ng-pattern="/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/"
        data-ng-minlength="8"
        data-ng-pattern-err-type="patternPassword"
        required>
    </div>
    <div class="form-group">
      <button
        type="submit"
        class="btn btn-primary">전송</button>
    </div>
  </form>
</div>
<!--// 등록 폼 영역 -->
```

-

##### app.js 코드 전문

```js
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
angular
  .module('DemoApp',['ngAria', 'jcs-autoValidate'])
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
require('./controllers/RegisterAutoValidateController');
```

-

### 1-2-2. [angular-ladda](http://remotty.github.io/angular-ladda/) 모듈 활용

#### angular-ladda 모듈 설치 (Bower 활용)

```sh
$ bower i -S angular-ladda
```

#### angular-ladda 의존 모듈 로드

```js
angular.module('DemoApp',['ngAria', 'jcs-autoValidate', 'angular-ladda'])
```

#### ladda 로딩 시작/종료

```html
<!-- ladda 로딩 시작(true), 종료(false) -->
<button
  type="submit"
  data-ladda="true"
  data-style="expand-right"
  class="btn btn-primary">전송</button>
```

#### ladda 설정

##### data-style 속성
- expand-left
- expand-left
- expand-right
- expand-up
- zoom-in
- zoom-out
- slide-left
- slide-right
- slide-up
- slide-down
- contract

##### data-spinner-size 속성
- 10
- 20
- 30
- ...

##### data-spinner-color 속성
- #fe4940

-

### AngularJS 모듈

- [angular-auto-validate](http://jonsamwell.github.io/angular-auto-validate/)
- [angular-ladda](http://remotty.github.io/angular-ladda/) | [ladda](http://lab.hakim.se/ladda/)

-

### 정규 표현식 참고

- [HTML5 패턴 모음](http://html5pattern.com/Passwords)
- [정규식 - 한글 문자집합/문자 범위 지정하기](https://sites.google.com/site/wankyuchoi/home/computer/tips/1)
- [정규식 한글 체크](http://serpiko.tistory.com/385)

---

## Person List/Details 애플리케이션

### 2-1. 랜덤 사용자 정보 생성 API (Random User Generator)

- [randomuser.me](https://randomuser.me/)
- [randomuser.me/documentation](https://randomuser.me/documentation)
- [randomuser.me/photoshop](https://randomuser.me/photoshop)
- [jsonformatter](https://jsonformatter.curiousconcept.com/)

-

### 2-2. Random User Generator 사용법

#### API 데이터 가져오는 방법

###### [cURL](http://ohgyun.com/397)

```sh
# 랜덤 유저 JSON 데이터를 20개 생성하여 출력
$ curl http://api.randomuser.me/?results=20

# 랜덤 유저(여성) JSON 데이터를 10개 생성한 후, random-femle.json 파일 생성
$ curl http://api.randomuser.me/?results=10&gender=female > random-femle.json
```

###### [jQuery](https://randomuser.me/documentation#howto)

```js
// jQuery AJAX 메소드 활용
$.ajax({
  'url': 'http://randomuser.me/api/',
  'dataType': 'json',
  'success': function(data) {
    console.log( data ); // JSON 데이터
  }
});
```

###### AngularJS

```js
// AngularJS $http 모듈 사용
angular
  .module('DEMO', [])
  .controller('RugController', ['$scope', '$http', function($scope, $http){
    $http({
      'method': 'GET',
      'url': 'http://randomuser.me/api/'
    })
    .then(function(response){
      $scope.results = response.data; // JSON 데이터
    });
  }]);
```

##### 전송 성공 시, 반환되는 JSON

```js
{
  results: [{
    user: {
      gender: "female",
      name: {
        title: "ms",
        first: "manuela",
        last: "velasco"
      },
      location: {
        street: "1969 calle de alberto aguilera",
        city: "la coruña",
        state: "asturias",
        zip: "56298"
      },
      email: "manuela.velasco50@example.com",
      username: "heavybutterfly920",
      password: "enterprise",
      salt: ">egEn6YsO",
      md5: "2dd1894ea9d19bf5479992da95713a3a",
      sha1: "ba230bc400723f470b68e9609ab7d0e6cf123b59",
      sha256: "f4f52bf8c5ad7fc759d1d4156b25a4c7b3d1e2eec6c92d80e508aa0b7946d4ba",
      registered: "1303647245",
      dob: "415458547",
      phone: "994-131-106",
      cell: "626-695-164",
      DNI: "52434048-I",
      picture: {
        large: "http://api.randomuser.me/portraits/women/39.jpg",
        medium: "http://api.randomuser.me/portraits/med/women/39.jpg",
        thumbnail: "http://api.randomuser.me/portraits/thumb/women/39.jpg",
      },
      version: "0.6"
      nationality: "ES"
    },
    seed: "graywolf"
  }]
}
```

##### 오류 발생 시, 반환되는 JSON

```js
{
  error: "Uh oh, something has gone wrong. Please tweet us @randomapi about the issue. Thank you."
}
```

##### 요청 응용 방법

```js
// 랜덤 사용자 수 설정
'http://api.randomuser.me/?results=20'

// 성별 설정
'http://api.randomuser.me/?gender=female'

// 포멧 설정 JSON(기본 값) [CSV, YAML, XML]
'http://api.randomuser.me/?format=csv'

// 국가 지정 [AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NL, NZ, TR, US]
'http://api.randomuser.me/?nat=us,dk,fr,gb'

// 페이지네이션 설정
'http://api.randomuser.me/?page=3&results=10'
```

-

### 2-3. 애플리케이션 제작 순서

1. AngularJS를 활용하여 JSON 모델 데이터 템플릿에 적용하여 뷰 구현
1. 테이블 로우 클릭 이벤트 핸들링 (셀 배경 색 변경)
1. 테이블 로우 클릭 시 이벤트 핸들링 (디테일 뷰 변경)
1. 클라이언트 사이드 검색 기능 구현
1. 클라이언트 사이드 정렬 기능 구현
1. 사용자 피드백 처리

-

- `.row > .col-md-8 > table.table.table-bordered`
- `ngRepeat`
- `ngStyle, ngClass`
- `ngClick`

- `.row > .col-md-4 > .panel.panel-default > .panel-heading + .panel-body`
- `dl>dt+dd`

- `.row > .col-md-12 .form-inline.well.well-sm > span.glyphicon.glyphicon-search + .form-group > input.form-control`


-

### 2-4. 스코프

1. 스코프란?
1. 부모 스코프와 자식 스코프
1. 루트 스코프
1. 점 표기법


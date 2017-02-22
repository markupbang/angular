###### Fast Campus ─ Front-End AngularJS CAMP

# DAY20

1. Bootstrap 설치 bower
1. bower.json 메인 파일 수정
1. Form 마크업 추가
1. AngularJS 앱 모듈/컨트롤러 정의
1. $http 모듈 인젝션 및 .post(), .then() 메소드 활용
1. HTML5 유효성 검사(Validation) 활용
1. AngularJS 유효성 검사(Validation) 활용

-

### 1-1. Bootstrap 설치

[Bootstrap](http://getbootstrap.com/) 설치

```sh
$ bower i -S bootstrap
```

-

### 1-2. wirdep 모듈 로드 시, 활용될 경로 수정

`bower_components/bootstrap/bower.json` 수정

```json
"main": [
  "dist/css/bootstrap.min.css",
  "dist/css/bootstrap-theme.min.css",
  "dist/js/bootstrap.js"
]
```

-

### 2. `index.html` 문서에 HTML 마크업 작성

- [Bootstrap: navbar](http://getbootstrap.com/components/#navbar)
- [Bootstrap: form](http://getbootstrap.com/css/#forms)
- [Bootstrap: forms-help-text](http://getbootstrap.com/css/#forms-help-text)
- [Bootstrap: buttons](http://getbootstrap.com/css/#buttons)

```html
<!-- 헤더바 영역 -->
<!--
nav.navbar.navbar-default.navbar-inverse.navbar-fixed-top
  .container
    .navbar-header
      a.navbar-brand
-->

<!-- 메인 콘텐츠 영역 -->
<!--
.container.main-content
  form
    .form-group
      label.control-label
      input.form-control
-->
```

-

### 3. `app.js` 문서에 Angular 모듈/컨트롤러 작성

```js
// Angular 앱 모듈 정의
// https://docs.angularjs.org/api/ng/directive/ngApp
var RegisterApp = angular.module('RegisterApp', []);
```

```js
// 앱 컨트롤러 설정
// https://docs.angularjs.org/api/ng/directive/ngController
RegisterApp.controller('LoginController', function() {});

// a. as 문법
// b. $scope 객체
// https://docs.angularjs.org/guide/scope
```

```js
// 참고 주소
// https://minmax-server.herokuapp.com/register/
RegisterApp.controller('LoginController', ['$scope', function($scope) {
  $scope.formModel = {};
  $scope.onSubmit = function(){};
}]);

// ---------------------------------------------------------------------

// $http 모듈
// https://docs.angularjs.org/api/ng/service/$http
$http
  .post('https://minmax-server.herokuapp.com/register/', $scope.formModel)
  .then(function(response){...}, function(response){...});

// ---------------------------------------------------------------------

// HTML5 Validation
// require
// ngSubmit
// https://docs.angularjs.org/api/ng/directive/ngSubmit

// ---------------------------------------------------------------------

// novalidate
// <form name="registerForm">
// <pre>{{registerForm|json}}</pre>

// ngClass
// https://docs.angularjs.org/api/ng/directive/ngClass
// Bootstrap, Form Help Text
// http://getbootstrap.com/css/#forms-help-text
// data-ng-class="{'has-error': true}"
// registerForm.email.$valid
// registerForm.email.$error
// registerForm.email.$error.required
// registerForm.email.$error.email
// registerForm.$pristine

```
###### Fast Campus ─ Front-End AngularJS CAMP

# DAY22

## 지난 시간 복습...

[DAY21, README.md](../DAY21/README.md)

-

`form-auto-validate.html`

```html
<!DOCTYPE html>
<html lang="ko-KR" dir="ltr" class="no-js" data-ng-app="DemoApp">
<head>
  <meta http-equiv="X-UA-Compatible" content="IE=Edge">
  <meta charset="UTF-8">
  <title>Auto Validate Form Design - AngularJS Application</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- <link rel="icon" type="image/x-icon" href="images/favicon.ico"> -->
  <link rel="shortcut icon" type="image/x-icon" href="images/favicon.png">
  <!-- bower:css -->
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap.min.css" />
  <link rel="stylesheet" href="bower_components/bootstrap/dist/css/bootstrap-theme.min.css" />
  <link rel="stylesheet" href="bower_components/ladda/dist/ladda-themeless.min.css" />
  <!-- endbower -->
  <!-- inject:css -->
  <link rel="stylesheet" href="css/style.css">
  <!-- endinject -->
</head>
<body data-ng-cloak>

<!-- 헤더 영역 -->
<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container">
    <div class="navbar-header">
      <a href="/" class="navbar-brand">AngularJS 폼 디자인</a>
    </div>
  </div>
</nav>
<!--// 헤더 영역 -->

<!-- 등록 폼 영역 -->
<div class="main-content container" data-ng-controller="AutoRegisterController">
  <form data-ng-submit="onSubmit()" novalidate>
    <div class="form-group">
      <label for="name" class="control-label">아이디 <span aria-label="필수 입력" title="필수 입력">*</span></label>
      <input
        type="text"
        name="name"
        id="name"
        class="form-control"
        data-ng-model="formModel.name"
        data-ng-pattern="/^[A-Za-z0-9_]{5,10}$/"
        data-ng-minlength="5"
        data-ng-maxlength="10"
        aria-describedby="name-desc"
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
        aria-describedby="email-desc"
        required>
    </div>
    <div class="form-group">
      <label for="password" class="control-label">패스워드 <span aria-label="필수 입력" title="필수 입력">*</span></label>
      <input
        type="password"
        name="password"
        id="password"
        class="form-control"
        data-ng-model="formModel.password"
        data-ng-minlength="6"
        data-ng-maxlength="12"
        aria-describedby="password-desc"
        required>
    </div>
    <div class="form-group">
      <button
        type="submit"
        data-ladda="submitting"
        data-style="expand-right"
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
<script src="bower_components/spin.js/spin.js"></script>
<script src="bower_components/ladda/dist/ladda.min.js"></script>
<script src="bower_components/angular-ladda/dist/angular-ladda.min.js"></script>
<!-- endbower -->
<!-- inject:js -->
<script src="js/app.bundle.js"></script>
<!-- endinject -->
</body>
</html>
```

-

`js/controller/AutoRegisterController.js`

```js
'use strict';
/*! AutoRegisterController.js © yamoo9.net, 2016 */

angular.module('DemoApp')
.controller('AutoRegisterController', ['$scope', '$http',
  function($scope, $http) {

  $scope.formModel = {};
  $scope.submitting = false;

  $scope.onSubmit = function() {
    $scope.submitting = true;
    $http.post('https://minmax-server.herokuapp.com/register/', $scope.formModel)
      .then(function(response) {
        console.log('전송 성공! :)');
        $scope.submitting = false;
      }, function(response) {
        console.error('전송 실패! :(');
        $scope.submitting = false;
      });
  };

}]);
```

---

## Person List/Details 애플리케이션

1. 리스트 애플리케이션 (정렬/검색 기능)
  1. AngularJS 루프
  1. 클릭 핸들링
  1. 테이블 로우 클릭 시, 디테일 뷰 변경
  1. 검색
  1. 정렬
  1. 사용자 피드백
1. 스코프
  1. 스코프란?
  1. 부모 스코프와 자식 스코프
  1. 루트 스코프
  1. 점 표기법
1. 컨트롤러 <- 서비스 -> 컨트롤러 데이터 공유
  1. 컨트롤러 간 데이터 공유 불가
  1. rootScope를 사용한 컨트롤러 데이터 공유
  1. 서비스를 사용한 컨트롤러 데이터 공유
  1. 서비스 만들기

-

### 1-1. 랜덤 사용자 정보 생성 API (Random User Generator)

- [randomuser.me](https://randomuser.me/)
- [randomuser.me/documentation](https://randomuser.me/documentation)
- [randomuser.me/photoshop](https://randomuser.me/photoshop)
- [jsonformatter](https://jsonformatter.curiousconcept.com/)

-

### 1-2. Random User Generator 사용법

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

### 1-3. 애플리케이션 제작 진행 순서

1. 리스트 애플리케이션 (정렬/검색 기능)
  1. AngularJS 루프
  <br>━ `table.table.table-bordered`, `ngRepeat`
  1. 클릭 핸들링
  <br>━ `ngStyle`, `ngClass`, `ngClick`, `$scope.selectedIndex`
  1. 테이블 로우 클릭 시, 디테일 뷰 변경
  <br>━ `$scope.selectedPerson`, `.panel.panel-default > .panel-heading + .panel-body`
  1. 검색
  <br>━ `form.form-inline.well.well-sm`, `span.glyphicon.glyphicon-search`
  <br>━ `search`, `search.$`, `sensitiveSearch`
  1. 정렬
  <br>━ `.form-group>select.form-control>option[value=""]{ASC,DESC}`
  1. 사용자 피드백
  <br>━ `selectedPerson.email`
  <br>━ `.alert.alert-info>.center-text{No Results found for term '.'}`
1. 스코프
  1. 스코프란?
  1. 부모 스코프와 자식 스코프
  1. 루트 스코프
  1. 점 표기법
1. 컨트롤러 <- 서비스 -> 컨트롤러 데이터 공유
  1. 컨트롤러 간 데이터 공유 불가
  1. rootScope를 사용한 컨트롤러 데이터 공유
  1. 서비스를 사용한 컨트롤러 데이터 공유
  1. 서비스 만들기
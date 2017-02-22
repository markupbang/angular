###### Fast Campus ─ Front-End AngularJS CAMP

# DAY24

## 애플리케이션 제작 진행 순서

### 1. 스코프

1. 스코프(Scope)란?
1. 부모(Parent) 스코프와 자식(Child) 스코프
1. 루트 스코프(Root Scope: `$rootScope`)
1. 점 표기법(Dot Notation)

-

### 2. 서비스(Services)를 통한 컨트롤러 간 데이터 공유

1. `PersonListController` 컨트롤러 분리
  - `PersonListController`
  - `PersonDetailController`
1. 분리된 컨트롤러 간에는 데이터 공유가 안됨.
1. 컨트롤러 ← **서비스** → 컨트롤러 데이터 공유
1. `$rootScope`를 사용한 컨트롤러 데이터 공유
1. 커스텀 서비스 만들기
  - `PersonFactory`
  - `PersonService`

-

### 3. Pagenation + InfiniteScroll

#### 3-1. [ngInfiniteScroll](https://sroze.github.io/ngInfiniteScroll/) 의존 모듈 설치.

```sh
$ bower i -S ngInfiniteScroll
```

-

#### 3-2. `ngInfiniteScroll` JS 파일 로드

※ jQuery, Angular 필요.

```js
<script src="jquery.min.js"></script>
<script src="angular.min.js"></script>
<script src="ng-infinite-scroll.min.js"></script>
```

-

#### 3-3. `infinite-scroll` 의존 모듈 로드.

```js
angular.module('PersonListApp', ['infinite-scroll']);
```

-

#### 3-4. InfiniteScroll 속성 추가

- 이벤트 감지 시, 함수 실행 ━ `data-infinite-scroll="{expression}"`
- 이벤트 감지를 위한 거리 설정 ━ `data-infinite-scroll-distance="{number}"`

```html
<element
  data-infinite-scroll="loadMore()"
  data-infinite-scroll-distance="1"></element>
```

-

#### 3-5. InfiniteScroll 사용을 위한 서비스 설정

##### `services/PersonFactory.js`

```js
angular.module('PersonListApp')
.factory('PersonFactory', ['$http', function($http){
  // PersonService에서 재사용하기 위한 함수 반환
  return function(page, count){
    // 초기 값 설정
    page = page || 1;
    count = count || 30;
    // $http 모듈을 활용한 데이터 반환
    return $http.get('http://api.randomuser.me/?page='+page+'&results='+count);
  };
}]);
```

##### `services/PersonService.js`

```js
/*! PersonService.js © yamoo9.net, 2016 */
'use strict';

angular.module('PersonListApp')
.service('PersonService', ['PersonFactory', function(PersonFactory) {

  // PersonService 반환 객체
  var _service = {

    'selectedPerson': null,
    'persons': [],

    // 현재 페이지 속성
    'page': 1,
    // 로드 시 불러올 데이터 개수 속성
    'count': 20,
    // 로드 제한 횟수 속성
    'limit': 5,
    // 불러올 페이지 유무 속성
    'hasMore': true,
    // 로딩 중인 상태 속성
    'isLoading': false,
    // 데이터 로드 메소드
    'loadPersons': function() {
      var _this = this;
      // 로드 가능한 상태이고 로딩 중인 상태가 아니라면
      if (_this.hasMore && !_this.isLoading) {
        // 로딩 중으로 상태 변경
        _this.isLoading = true;
        // 팩토리를 통해 데이터 로드
        PersonFactory(_this.page, _this.count).then(
          function success(response) {
            // 기존 데이터에 새롭게 로드한 데이터 추가
            angular.forEach(response.data.results, function(person) {
              _this.persons.push(person);
            });
            // 로딩이 끝난 상태로 변경
            _this.isLoading = false;
          },
          function error(response) {
            console.error('데이터 로드에 실패했습니다.');
            _this.isLoading = false;
          }
        );
        // 페이지 속성 증가
        _this.page += 1;
        // 제한 횟수보다 페이지 속성 값이 커지면
        if (_this.limit < _this.page) {
          // 로드 불가능 상태로 변경
          _this.hasMore = false;
        }
      }
    }
  };

  // 초기 로드
  // _service.loadPersons();

  return _service;

}]);
```

#### `controllers/PersonListController.js`

```js
$scope.loadMore = function() {
  console.log('load More...');
  PersonService.loadPersons();
};
```

-

#### 3-6. Ajax 로딩 상태 표시

##### 3-6-1. [angular-spinner](https://github.com/urish/angular-spinner) 의존 모듈 설치.

```sh
$ bower i -S angular-spinner
```

-

##### 3-6-2. `angular-spinner` JS 파일 로드

```js
<script src="spin.js/spin.js"></script>
<script src="angular-spinner/angular-spinner.js"></script>
```

-

##### 3-6-3. `angularSpinner` 의존 모듈 로드

```js
angular.module('PersonListApp', ['angularSpinner']);
```

-

##### 3-6-4. 스피너 추가

```html
<div
  class="spinner"
  data-ng-show="personService.isLoading"
  data-us-spinner="{radius:7, lines: 10, width:3, length: 7}">
  <p>Data Loading...</p>
</div>
```

```sass
.spinner
  position: relative
  width: 150px
  height: 30px
  margin: 0 auto
  padding: 40px 0
  p
    margin-top: 20px
    text-align: center
```

---

### 4. 라우트(`ngRoute`)

싱글 페이지 웹 애플리케이션을 단순히 생각하면 웹 애플리케이션을 사용하는 동안 웹 페이지를 리로드하지 않는 웹 애플리케이션을 의미한다. 매번 웹 페이지를 리로드하지 않는 웹 어플리케이션에 불과하지만 이는 윈도우 운영체제에 설치되는 네이티브 애플리케이션과 동일한 사용자 경험(UX)을 제공할 수 있다. 우리가 많이 사용하는 구글의 지메일(GMail)을 대표적인 싱글 페이지 웹 애플리케이션으로 생각할 수 있는데 지메일을 사용하다 보면 마이크로소프트의 아웃룩과 비교해도 손색이 없을 수준의 기능과 사용자 경험을 느낄 수 있다.

하지만 싱글 페이지 웹 애플리케이션을 만들려면 고려해야 할 사항이 있다. 일반 웹 페이지는 화면 전환 시 페이지를 다시 읽어 오면서 해당 페이지를 가리키는 URL이 변경된다. 하지만 한 페이지 조각을 서버로부터 받아와서 브라우저 전체를 다시 읽지 않고 특정 영역의 DOM을 변경한다면 화면의 상태가 바뀌었음에도 URL이 변경되지 않고 브라우저의 히스토리가 관리되지 않는다. 이러한 문제를 해결하기 위해서 AngularJS는 $location 서비스를 제공한다. 그리고 이 $location 서비스를 이용하여 더욱 편리한 방법으로 특정 URL과 컨트롤러와 화면을 연결 시켜주는 $route 서비스를 제공한다. 그럼 AngularJS의 $route 서비스에 대하여 살펴보자.

[ngRoute](https://docs.angularjs.org/api/ngRoute)
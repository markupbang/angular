###### Fast Campus ─ Front-End AngularJS CAMP

# DAY23

## 애플리케이션 제작 진행 순서

### 1. 리스트 애플리케이션 (정렬/검색 기능)

#### 1-1. 정렬

`.form-group>select.form-control>option[value=""]{ASC,DESC}`

```html
<!-- 정렬(Order) -->
<div class="form-group">
  <label for="order" class="control-label">
    <span class="glyphicon glyphicon-sort-by-attributes-alt" aria-label="Order Content"></span>
  </label>
  <select id="order" class="form-control" data-ng-model="order">
    <option value="name.first">Name (ASC)</option>
    <option value="-name.first">Name (DESC)</option>
    <option value="email">Email (ASC)</option>
    <option value="-email">Email (DESC)</option>
  </select>
</div>
```

-

#### 1-2. 사용자 피드백

- `selectedPerson.email`
- `.alert.alert-info>.center-text{ No Results found for term '.' }`

```html
<!-- 필터링된 데이터를 filteredPerson에 참조 -->
<tr
  data-ng-repeat="person in filteredPerson=(persons | filter:sensitiveSearch | orderBy:order)"
  data-ng-class="{ 'table-on': person.email === selectedPerson.email }"
  data-ng-click="selectPerson(person)">
  <td>{{ ($index+1) | readingZeroNum }}</td>
  <td>{{ person.name.first }} {{person.name.last }}</td>
  <td>{{ person.email }}</td>
  <td>{{ person.gender }}</td>
  <td><a
    href="#!"
    title="Detail View of {{person.name.first }} {{person.name.last}}"
    aria-label="Detail View of {{person.name.first}} {{person.name.last}}">view</a></td>
</tr>
<!-- 사용자 피드백 -->
<tr data-ng-show="filteredPerson.length === 0">
  <td colspan="5">
    <div class="alert alert-info" role="alert">
      <p class="center-text">No Results found for term '{{search}}'.</p>
    </div>
  </td>
</tr>
```


### 2. 커스텀 필터

```js
/*! capitalize.js © yamoo9.net, 2016 */
'use strict';

// 첫글자를 대문자로 변환해서 반환하는 필터
angular.module('PersonListApp').filter('capitalize', function() {
  return function(input, addDot) {
    if (!input) { return ''; }
    var change_input = input.charAt(0).toUpperCase() + input.slice(1);
    if (addDot) {
      change_input += '.';
    }
    return change_input;
  };
});

/*! comma.js © yamoo9.net, 2016 */
'use strict';

// 콤마 처리를 하는 필터
angular.module('PersonListApp').filter('comma', function() {
  return function(input) {
    if (!input) { return ''; }
    return input + ',';
  };
});

/*! readingZeroNum.js © yamoo9.net, 2016 */
'use strict';

// 10보다 작은 수 앞에 0을 붙이는 필터
angular.module('PersonListApp').filter('readingZeroNum', function() {
  return function(num) {
    if (!num) { return ''; }
    return num < 10 ? '0'+num : num;
  };
});

/*! nation.js © yamoo9.net, 2016 */
'use strict';

// 국가 코드에 따라 국가 풀네임 반환하는 필터
angular.module('PersonListApp').filter('nation', function() {
  return function(nation) {
    if (!nation) {return ''}
    // AU, BR, CA, CH, DE, DK, ES, FI, FR, GB, IE, IR, NL, NZ, TR, US
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
});
```

-

### 3. 스코프

1. 스코프(Scope)란?
1. 부모 스코프와 자식 스코프 (Parent VS Child Scope)
1. 루트 스코프(Root Scope: `$rootScope`)
1. 점 표기법(Dot Notation)

-

### 4. 서비스(Services)

1. `PersonListController` 컨트롤러 분리
  - `PersonListController`
  - `PersonDetailController`
1. 분리된 컨트롤러 간에는 데이터 공유 X
1. 컨트롤러 ← **서비스** → 컨트롤러 데이터 공유
1. `$rootScope`를 사용한 컨트롤러 데이터 공유
1. 커스텀 서비스 만들기
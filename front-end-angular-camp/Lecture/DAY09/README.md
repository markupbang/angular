###### Fast Campus ─ Front-End AngularJS CAMP

# DAY09

## jQuery Modules

1. jQuery 유틸리티 메소드(Utility Methods)
1. jQuery 커스터마이징(Customizing)

-

### 1. jQuery 유틸리티 메소드

#### 유틸리티 메소드 사용 장점
<!-- Utility Methods -->

- Javascript의 안 좋은 점 보완

<!-- Fill in gaps in Javascript -->

- 서버와의 통신에 있어 향상된 기능 제공

<!-- Enhance Server Communications -->

- 플러그인 제작 시에 유용하게 사용될 메소드 제공

<!-- Provide utilities in Plugin Authoring -->

- 페이지 내에서 처리해야 할 일을 손쉽게 함

<!-- Ease working in the page -->

- Javascript 기능을 풍부하게 함

<!-- Enable Richer Javascript Coding -->

-

#### 1.1 데이터 체크
<!-- Type Testing Functions -->

- 객체 유형 판별

<!-- Determine the type of Object -->

- 전달인자 유효성 검사에 유용하게 사용 됨.

<!-- Useful for optional parameters & validation -->

##### 데이터 유형 검증 유틸리티 메소드

- **jQuery.isNumeric(o)**<br>숫자 데이터 유형 검증
- **jQuery.isArray(o)**<br>배열 데이터 유형 검증
- **jQuery.isFunction(o)**<br>함수 데이터 유형 검증
- **jQuery.isEmptyObject(o)**<br>비어있는 객체 데이터 유형 검증
- **jQuery.isPlainObject(o)**<br>객체 데이터 유형 검증
- **jQuery.isXMLDoc(o)**<br>XML 문서 검증
- **jQuery.isWindow(o)**<br>window 객체 검증
- **jQuery.type(o)**<br>데이터 [[class]] 문자열을 반환하는 함수

> DEMO: js/01-type-check.js

-

#### 1.2 콜렉션 조작 유틸리티 메소드
<!-- Collection Manipulation Functions -->

- [jQuery.inArray(item, arr)](http://api.jquery.com/jQuery.inArray/)<br>배열 데이터 원소 인덱스 반환 (`-1`, `index`)
- [jQuery.makeArray(o)](http://api.jquery.com/jQuery.makeArray/)<br>유사 배열(객체)을 배열 데이터로 변경
- [jQuery.unique(o)](http://api.jquery.com/jQuery.unique/)<br>배열 원소 중 중복되는 것을 제거
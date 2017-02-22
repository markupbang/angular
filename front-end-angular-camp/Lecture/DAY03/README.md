###### Fast Campus ─ Front-End AngularJS CAMP

# DAY03

### Javascript 안티패턴(Anti-Patterns)

1. 전역(Global Scope)을 가급적 오염시키지 말아라.
1. 느슨한 비교(`==`)가 아닌, 엄격한 비교(`===`)를 행하라.
1. 반복(Loop) 구문에서 중복(Repeat)되는 것을 캐시(Cache)하라.
1. 네이티브 데이터 유형의 경우, 생성자 함수(Constructor Function)를 통해 객체를 생성하지 말아라.
1. 잘못 설계된 `typeof`, `instanceof`와 객체가 아닌 것을 판별할 수 없는 `constructor` 사용에 주의하라.
1. 약속(표준 예약)된 바 없는 네이티브 생성자의 프로토타입 객체를 임의로 확장하지 말아라.

-

##### 안티패턴 4 - 네이티브 데이터 유형의 경우, 생성자 함수(Constructor Function)를 통해 객체를 생성하지 말아라.

```js
// 자바스크립트 안티 패턴

// ------------------------------------------------------------------
// 안티패턴 4번째: 네이티브 데이터 유형의 경우, 생성자 함수를 통해 객체를 생성하지 말아라.
// ------------------------------------------------------------------

// 자바스크립트의 데이터 유형과 생성자 함수
// 숫자 Number()
// 문자 String()
// 불린 Boolean()
// 함수 Function()
// 배열 Array()
// 객체 Object()

// 자바스크립트의 함수는 일급 객체
// 함수가 다양하게 활용 가능
// 생성자 함수로서의 역할 === Class 역할
// 생성자함수() 이름 앞에 new 키워드를 붙여 사용하면
// 객체를 생성하는 역할을 수행한다.

// 안티패턴
// 배열, 객체, 함수 생성자를 사용하지 말아야 한다.
var arr = new Array(9);
var fnc = new Function('console.log(\'hi\')');
var obj = new Object();


// var 를 여러번 사용하여 변수를 선언한 경우
var num;
var str;
var boo;
var fnc;
var arr;
var obj;
var reg;

// var를 한 번만 사용하여 변수를 묶는 경우
var num, str, boo, fnc, arr, obj, reg;

// 후에 데이터를 변수에 할당
// 생성자 함수가 아닌, 리터럴을 사용하라.
num = 9; // 데이터 값(리터럴)
str = 'hi';
boo = false;

/**
 * --------------------------------
 * var 한 번만 사용하는 싱글 var 패턴
 * 변수 선언과 값을 동시에 수행한다.
 * ----------------------------- */
var num = 9,
    str = '나인',
    boo = true,
    fnc = function(){},
    arr = [],
    obj = {},
    // new RegExp('[0-9][a-z]', 'ig');
    reg = /[0-9][a-z]/ig;
```

-

##### 안티패턴 5 - 잘못 설계된 `typeof`, `instanceof`와 객체가 아닌 것을 판별할 수 없는 `constructor` 사용에 주의하라.

```js
// -------------------------------------------------------------------------------------------
// 안티패턴 5번째: 잘못 설계된 typeof, instanceof와 객체가 아닌 것을 판별할 수 없는 constructor 사용에 주의하라.
// -------------------------------------------------------------------------------------------

/**
 * ------------------------------------------------
 * typeof 설계 오류
 * null, Array 모두 'object'로 값을 반환한다.
 * --------------------------------------------- */
console.log( typeof null ); // 'object'
console.log( typeof [] );   // 'object'

/**
 * ------------------------------------------------------------------
 * instanceof 설계 오류
 * 인스턴스 객체 instanceof 생성자 함수
 *
 * typeof의 설계 문제 중 일부 해결 가능
 * 배열 인스턴스를 배열 생성자의 인스턴스라고 올바르게 이야기 해준다.
 *
 * 하지만...
 * 배열 인스턴스를 객체 생성자의 인스턴스라고도 말한다. (오류)
 * 원시 데이터 유형(숫자, 문자, 불린)의 경우는 리터럴 사용 시 잘못된 결과를 반환한다.
 * --------------------------------------------------------------- */
console.log( [] instanceof Array );  // true
console.log( [] instanceof Object ); // true

console.log( 'fastcampus' instanceof String );             // false
console.log( new String('fastcampus') instanceof String ); // true

/**
 * ------------------------------------------------------------------------------
 * constructor
 * 인스턴스 객체는 constructor 속성으로 자신을 생성한 생성자를 참조한다.
 * (prototype 객체에 링크된 인스턴스 객체이므로 prototype 객체의 속성을 모두 사용 가능하기 때문)
 *
 * Javascript 모든 객체 유형에서는 올바르게 객체의 생성자를 말해준다.
 * 하지만... 객체가 아닌 유형(null, undefined)에서는 오류(TypeError)를 발생한다.
 * --------------------------------------------------------------------------- */
console.log( (9).constructor === Number              ); // true
console.log( ([]).constructor === Object             ); // false
console.log( (function(){}).constructor === Function ); // true
console.log( ({}).constructor === Array              ); // false

// null, undefined는 객체가 아니기 때문에 constructor 속성 값이 없어 오류 발생
console.log( (null).constructor      ); // Uncaught TypeError: Cannot read property 'constructor' of null
console.log( (undefined).constructor ); // Uncaught TypeError: Cannot read property 'constructor' of undefined


/**
 * --------------------------------------------------
 * type()
 * 객체/비객체 모두 판별 가능한 헬퍼 함수 제작이 필요한 이유이다.
 * ----------------------------------------------- */

// type() 헬퍼함수 사용 예시
// type(9);    // 'number'
// type(null); // 'null'
// type([]);   // 'array'
```

-

##### type() 헬퍼 함수

```js
/**
 * --------------------------------------------------
 * type()
 * 객체/비객체 모두 판별 가능한 헬퍼 함수 제작이 필요한 이유이다.
 * ----------------------------------------------- */

// type() 헬퍼함수 사용 예시
// type(9);    // 'number'
// type(null); // 'null'
// type([]);   // 'array'

// 숫자, 문자, 불린, 함수, 배열, 객체, 정규표현식, 수학, 날짜, 오류, ...
// (/[a-z]/).constructor      // RegExp
// (new RegExp()).constructor // RegExp
// (new Date()).constructor   // Date
// (new Error).constructor    // Error

function type(data) {
    // constructor가 안전하지 않은 (null, undefined) 확인
    if ( data === undefined || data === null ) {
        // 삼항 조건문으로 유형 확인 후, 결과 값 반환
        return data === undefined ? 'undefined' : 'null';
    }
    // constructor 안전한 객체 유형 확인
    else {
        // 스위치문으로 data 생성자가 무엇인지 유형(case)별 결과 값 반환
        switch( data.constructor ) {
            case Number:   return 'number';
            case String:   return 'string';
            case Boolean:  return 'boolean';
            case Function: return 'function';
            case Array:    return 'array';
            case Object:   return 'object';
            case RegExp:   return 'regexp';
            case Date:     return 'date';
            case Error:    return 'error';
        }
    }
}
```

-

```js
/**
 * --------------------------------------------------
 * type() 헬퍼 함수 - 제작 다른 방법
 * Object.prototype.toString 메소드 빌려쓰기를 통해
 * 객체/비객체를 판별하는 방법
 * ----------------------------------------------- */

/**
 * Javascript 데이터 유형을 감지하여 올바르게 값을 반환하는 함수
 * @param  {anything} data  모든 데이터 유형이 전달될 수 있음
 * @return {string}         데이터 유형 이름을 문자열로 반환
 */
function type(data) {
    // Object.prototype.toString 메소드 빌려쓰기
    // [Object Number], [Object Null]... 문자열 반환
    return Object.prototype.toString.call(data).toLowerCase().slice(8,-1);
}
// type 함수를 재사용하여 결과 값을 true | false로 설정
function isNumber(data) {
    return type(data) === 'number';
}

function isString(data) {
    return type(data) === 'string';
}

function isBoolean(data) {
    return type(data) === 'boolean';
}

function isFunction(data) {
    return type(data) === 'function';
}

function isArray(data) {
    return type(data) === 'array';
}

function isObject(data) {
    return type(data) === 'object';
}
```

-

##### 안티패턴 6 - 약속(표준 예약)된 바 없는 네이티브 생성자의 프로토타입 객체를 임의로 확장하지 말아라.

```js
// 전달받은 데이터(유사배열)를 배열로 변환해주는 함수
//
if (!Array.makeArray) {
    Array.makeArray = function(like_arr) {
        var maked_array = [];
        if ( !Array.isArray(like_arr) ) {
            Array.prototype.forEach.call(like_arr, function(item, index, array) {
                maked_array.push(item);
            });
            return maked_array;
        }
    }
}
```

---

### 문서객체모델(DOM) 조작을 용이하도록 도와주는 헬퍼 함수

- `query()` 함수: 문서객체모델에서 요소노드를 반환하여 변수에 참조할 경우 사용한다.
- `each()` 함수: 배열 또는 유사배열(Like-Array)을 순회하여 개별적으로 조작할 경우 사용한다.
- `type()` 함수: 전달된 데이터 유형을 정확하게 진단하여 올바른 값을 확인하고자 할 경우 사용한다.
    - `isNumber()`
    - `isString()`
    - `isBoolean()`
    - `isFunction()`
    - `isArray()`
    - `isObject()`

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
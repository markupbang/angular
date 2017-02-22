// main.js

// Javascript Closure
// 클로저란?
// 함수가 실행된 후에 함수를 반환하는 경우
// 반환된 함수(클로저)가 이미 실행되어 더 이상 메모리에
// 상주하지않아야 할 실행된 함수의 영역(Scope)을
// 탐색할 수 있는 것을 말한다.

// 함수 리터럴을 변수 outerFn에 참조
// 즉, outerFn 변수는 함수의 포인터가 된다.
var outerFn = function() {
    // 함수를 반환
    // var innerFn = function() {};
    // 공개처리 Public
    // 보안처리 Private
    var scope = 'outerFn의 공간 지역 변수(비공개) scope';
    var innerFn = function() {
        return '나는 innerFn으로 이미 실행되어 소멸되어야 했을 ' + scope + '에 접근할 수 있다.';
    };
    // 함수 반환
    return innerFn;
};

var i_fn = outerFn(); // 함수 실행
// console.log( i_fn() ); // '나는.... 있다.'


// ------- 실습 예제 -------------------------------------------------

// 초기화 변수 값이 0인데
// 사용자가 5를 더 하든..
// 사용자가 10을 더 하든...
// 사용자가 -20을 더 하든 ...
// 기존 기억이 유지된 상태에서 연산이 처리되는 기능이 필요하다.

// #2. 초기 변수 설정 (전역으로 이동)
// 원하는 프로그래밍 처리는 되나, 전역을 오염시키는
// 안티패턴을 실행한 결과이므로 권장되지 않는다.
// var count = 0;

// function addNum(number) {
//     // #1. 초기 변수 설정
//     // 함수 실행 시, 계속 초기화 되어 원하는 프로그래밍이 처리되지 않는다.
//     // var count = 0;
//     // 검증: 전달인자 데이터 유형이 숫자인지...
//     if ( typeof number !== 'number' ) {
//         throw {
//             'name': 'Error',
//             'message': '숫자가 아닙니다.'
//         };
//     }
//     return count += number;
// }

// #3. 문제 해결을 위한 클로저 함수 활용
var initCount = function(initValue) {
    // initCount 함수 영역의 지역 변수
    var count = initValue || 0; // 초기화 값을 설정하는 구문
    // initCount 함수 영역에 선언된 지역 함수를 반환 (클로저 함수)
    return function(number) {
        if ( typeof number !== 'number' ) {
            throw {
                'name': 'Error',
                'message': '숫자가 아닙니다.'
            };
        }
        return count += number;
    };
}

// addNum() 함수를 수행하기 전에 초기 값을 설정하는
// initCount() 함수를 실행
var addNum = initCount(-20);

// console.log( addNum(3) );   // -20 + 3
// console.log( addNum(6) );   // -20 + 3 + 6
// console.log( addNum(-12) ); // -20 + 3 + 6 + (-12)
// console.log( addNum(1) );   // -20 + 3 + 6 + (-12) + 1

// 전역에서 접근 불가능한 변수
// initCount 함수 내부 영역에 은폐(Encapsulation)되어 있다
// console.log( count );


// ------- 즉시실행함수(IIFE) 패턴 -------------------------------------------------
// 함수의 호출 과정 없이 바로 실행되는 함수를 말한다.
// !function(){}()
// +function(){}()
// (function(){}()) [o]
// (function(){})() [o]

// 클로저로 함수를 반환
var counter = (function(){
    // 함수 스코프(전역과 구분되는 지역 공간)
    var _count = 0;
    // 함수 반환 (클로저)
    return function(num) {
        return _count += num;
    };
}());

// console.log( counter(3) );
// console.log( counter(10) );
// console.log( counter(12) );

// 자바스크립트 일반 객체를 통한 Counter 객체 생성
// var Counter = new Object();
// var Counter = Object.create(Object.prototype);
// var Counter = {
//     'initValue' : 0,
//     'increse'  : function(value) {
//         this.initValue += value || 1;
//         return this.initValue;
//     },
//     'decrese'   : function(value) {
//         this.initValue -= value || 1;
//         return this.initValue;
//     },
//     'reset'     : function() {
//         this.initValue = 0;
//         return this.initValue;
//     }
// };

// console.log( Counter.increse() );
// console.log( Counter.increse(3) );
// console.log( Counter.increse(7) );
// console.log( Counter.decrese() );
// console.log( Counter.decrese(10) );
// console.log( Counter.decrese() );
// console.log( Counter.reset() );


// 클로저로 객체를 반환
var Counter = (function(){
    // 전역과 구분되는 지역 공간
    // 은폐된 지역 변수
    var _value = 0;
    // 모듈 공간 [모듈 패턴]
    var _counter = {
        'increseValue': function(value) {
            _value += value || 1;
        },
        'decreseValue': function(value) {
            _value -= value || 1;
        },
        'resetValue': function() {
            _value = 0;
        },
        'setValue': function(value) {
            _value = value || 0;
        },
        'getValue': function() {
            return _value;
        }
    };

    // 클로저 반환(객체 유형을 반환)
    return _counter;

})();

// Counter.increseValue();
// console.log( Counter.getValue() );
// Counter.increseValue(3);
// console.log( Counter.getValue() );
// Counter.decreseValue(9);
// console.log( Counter.getValue() );
// Counter.increseValue(2);
// console.log( Counter.getValue() );
// Counter.decreseValue();
// console.log( Counter.getValue() );
// Counter.increseValue();
// console.log( Counter.getValue() );
// Counter.decreseValue(7);
// console.log( Counter.getValue() );
// Counter.resetValue();
// console.log( Counter.getValue() );

// ------- 모델(Model) 모듈 객체 -------------------------------------------------
// 어떤 데이터를 저장할 것인가?
// 모델 모듈 객체에 어떤 일을 수행하는 멤버를 추가할 것인가?
// 데이터 읽기 (readData)
// 데이터 쓰기 (writeData)
// 데이터 제거 (removeData)
// 데이터 저장 (saveData)
// 데이터 초기화 (resetData)
// 실제 데이터는 어디에 저장할 것인가? 프론트엔드? 백엔드?

var Model = (function(){
    // 모델 초기 값
    var idNum = 0,
        _storage = [];
    // 반활할 클로저 객체(모델 인스턴스 객체)
    return {
        'readData': function() {
            return _storage;
        },
        'writeData': function(id, value) {
            _storage.push({
                'id': id || 'model-' + ++idNum,
                'value': value
            });
        },
        'removeData': function() {
            _storage.pop();
        },
        'saveData': function() {
            // 어딘가에 저장?
            // 서버 쪽, 클라이언트 쪽?
        },
        'resetData': function() {
            _storage = [];
        }
    };
})();

console.log( Model.readData() ); // []

Model.writeData('yamoo9', function() {
    return 'this is function value';
});
console.log( Model.readData() ); // [{'id': 'yamoo9', 'value', function(){}}]

Model.writeData('', { 'name': 'untitled object' });
console.log( Model.readData() );
// [
//      {'id': 'yamoo9', 'value', function(){}},
//      {'id': 'model-1', 'value', { 'name': 'untitled object' }},
// ]

/*! prototype-inherit © yamoo9.net, 2016 */

// 프로토타입(Prototype) 상속
// 클래스를 사용하지 않고
// 객체를 통해 객체를 생성하면서 능력을 부여하는 패턴
// 임시 생성자(프록시) 패턴
// var F = function() {};
// F.prototype = 생성자의 프로토타입;
// new F();

// 방법 1. 생성자 함수를 전달할 경우, 처리되는 응용 헬퍼 함수
// o ← 생성자 함수
// ※ 생성자 함수의 속성 + 프로토타입 객체 속성(공통) 모두 상속
// function makeObject(Constructor) {
//     // 임시 생성자
//     function F(){}
//     F.prototype = Constructor.prototype;
//     return new F();
// }

function Coke(kind) {
    this.kind = kind || '코카콜라';
}
Coke.prototype.drink = function(amount) {
    return this.kind + '를 ' + amount +'만큼 마신다.';
};

// var cok = makeObject(Coke);

// 방법 2. 프로토타입(객체)을 전달할 경우, 처리되는 응용 헬퍼 함수
// o ← 생성자 함수의 프로토타입 객체
// ※ 프로토타입 객체 속성(공통)만 상속
// function makeObj(o) {
//     // 임시 생성자 사용
//     function F() {}
//     F.prototype = o;
//     return new F();
// }

var phone = {
    'name':  'iPhone 6S',
    'calling': function() {}
};

// var cellphone = makeObj(phone);
// console.log(cellphone);

// 방법 3. 전달된 인자의 유형에 따라 처리되는 응용 헬퍼 함수
// 생성자 함수, 프로토타입 모두 적용 가능
// ※ 인자에 따라 생성자 함수의 속성까지 상속 받을지 유무 결정
function obj(arg) {
    // 생성자 함수, 객체
    // 임시 생성자 함수 정의
    function F(){}
    F.prototype = typeof arg === 'function' ? arg.prototype : arg;
    return new F();
}

// 디자인 패턴 중, 생성패턴 = 팩토리 패턴
// 인자의 유형에 따라 각기 다른 객체를 생성하는 패턴
// 함수 생성자를 전달할 경우
var cyidar = obj( Coke );

console.log( cyidar );

// 객체를 전달할 경우
var iphone = obj( phone );

console.log( iphone );

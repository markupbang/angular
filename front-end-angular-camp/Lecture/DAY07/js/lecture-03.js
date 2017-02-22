/**
 * ------------------------------------------------------
 * 클래스 방식의 상속 패턴 #3 - 기본패턴 + 생성자 빌려쓰기 패턴 결합
 * --------------------------------------------------- */

var Parent, Child;

Parent = function(name) {
    this.name = name || 'Adam';
};

Parent.prototype.say = function() {
    return this.name;
};

Child = function() {
    // #2. 부모 생성자의 함수 빌려쓰기
    Parent.apply(this, arguments);
};

// #1. 부모 생성자의 인스턴스를 Child.prototype 객체로 설정
$inherit(Parent, Child);

// #1. 문제점 해결?
// kid.name === ???? 'Adam'
var kid = new Child('Trevi');
// #2. 프로트타입 상속이 없었는데???
// console.log( kid.say() ); // 'Trevi'

// kid 객체 자기 자신의 멤버 name을 제거
// delete kid.name;

// console.log( kid.say() ); // ???? 'Adam'

// kid 객체
// {
//      'name': 'Trevi',
//      '__proto__': new Parent() [ === Parent.prototype ], {
//          'say': function() {}
//      }
// }
/**
 * ------------------------------------------------------
 * 클래스 방식의 상속 패턴 #4 - 프로토타입 객체 공유
 * --------------------------------------------------- */
var Parent, Child;

Parent = function(name) {
    this.name = name;
};
// 부모 생성자의 프로토타입
Parent.prototype = {
    'say': function() {
        return this.name;
    },
    'crying': function() {

    },
    'init_num': 1
};

Child = function() {

};

// #4. 프로토타입 공유하기
// 실질적으로 부모 생성자의 this에 연결된 속성을 상속받아 쓸 이유가 크게 없다.
// 부모 생성자의 프로토타입은 공통적으로 사용되는 멤버들이 존재하므로 이것을 상속하는 것이 유용하다.

// #4. 단점
// 부모 생성자의 프로트타입 객체를 자식 생성자의 프로토타입 객체가 참조하는 형태이기 때문에
// 자식 생성자를 통해 생성된 자식 객체 인스턴스를 사용하여 연결된 프로토타입 속성 값을 추가/제거하면
// 참조된 부모 생성자의 프로토타입 객체가 변질된다.
Child.prototype = Parent.prototype;

// Child 생성자를 호출해서 개별 인스턴스 객체를 생성한다.
var kid  = new Child(),
    rupy = new Child();

console.dir(kid);
console.dir(rupy);
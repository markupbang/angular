/**
 * ----------------------------------------------------------------
 * 클래스 방식의 상속 패턴 #5. 임시 생성자(프록시, Proxy)를 사용하는 방법
 * ------------------------------------------------------------- */
function $inherit(Parent, Child) {
    // #4. 패턴
    // Child.prototype = Parent.prototype;

    // #5. 패턴
    // 중간에 Parent.prototype을 참조할 임시 생성자를 만든다.
    // 임시 생성자의 프토타입에 Parent.prototype을 참조한다.
    // 임시 생성자를 통해 임시 인스턴스 객체를 만들어
    // Child.prototype에 할당한다.
    var _fn = function() {};
    _fn.prototype = Parent.prototype;
    Child.prototype = new _fn();



    // 생성자를 올바르게 변경
    Child.prototype.constructor = Child;

    // super 예약어
    // Child.parent = Parent.prototype;
    // Child._super_ = Parent.prototype;
    // Child.__super__ = Parent.prototype;
    Child.prototype.__super__ = Parent.prototype;
}


function Parent(name) {
    this.name = name;
}

Parent.prototype.say = function() {
    return this.name;
};

function Child() {

}

// 상속 패턴
$inherit(Parent, Child);

// 자식 인스턴스 객체 생성
var kid = new Child();

// kid.constructor.prototype
// console.log( 'kid.__proto__ before : ', kid.__proto__ );

// kid.__proto__를 통해 프로토타입 객체 확장
kid.__proto__.sayGoodbye = function() {
    return this.name + ' say Goodbye';
};

// console.log( 'kid.__proto__ after : ', kid.__proto__ );

// console.log( 'Parent.prototype: ', Parent.prototype );


// kid 객체(인스턴스)의 부모는????? -> Child
console.log( kid instanceof Child ); // true ????


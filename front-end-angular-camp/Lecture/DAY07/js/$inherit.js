/*! $inherit.js © yamoo9.net, 2016 */
// 역할: 전달된 부모 객체의 능력을 자식 객체에게 상속하는 것.
(function(exports){
    'use strict';

    // 모듈 내부의 비공개 멤버
    var inherit = function(Parent, Child) {
        // 상속
        // 자식 객체의 원형이되는 프로토타입 객체에
        // 부모 객체의 원형을 대입(할당)하면 능력을 상속함.

        // 1.
        // 클래스 방식 상속 패턴 #1 - 기본 패턴
        // 프로토타입 체인(추적)
        // 단점...
        //
        Child.prototype = new Parent(); // Parent.prototype
    };

    // 함수 포인터 참조
    // 전역에 공개(노출 패턴)
    exports.$inherit = inherit;

})(this);
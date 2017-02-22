/*! $class.js © yamoo9.net, 2016 */
function $class(desc, SuperClass) {
    'use strict';
    var Class, F;
    // 1. 생성자 정의
    Class = function() {
        // 2번째 살펴 본 패턴
        // 슈퍼 클래스를 빌려쓰는 패턴
        // 슈퍼 클래스에 접근하는 방법?
        if ( Class.__super__ && Class.__super__.hasOwnProperty('__construct') ) {
            Class.__super__.__construct.apply(this, arguments);
        }
        // 자신의 프로토타입의 __construct 속성이 있는지 확인하여 설정하는 코드
        if ( Class.prototype.hasOwnProperty('__construct') ) {
            Class.prototype.__construct.apply(this, arguments);
        }
    }
    // 2. 부모 생성자(슈퍼 클래스)가 있을 경우 상속 실행
    if ( SuperClass ) {
        // 임시 생성자(프록시) 패턴
        // 호이스트를 고려해서 함수 표현식을 사용
        F = function(){};
        // function F(){}
        F.prototype = SuperClass.prototype;
        Class.prototype = new F();
        Class.prototype.constructor = Class;
        Class.__super__ = SuperClass.prototype;
    }
    // 3. 프로토타입 멤버 추가
    // desc 객체를 반복 순환하여 각 멤버를 할당한다.
    // Class.prototype 객체의 멤버로 할당한다.
    for( var key in desc ) {
        var value = desc[key];
        // desc 객체 자신만의 속성을 Class.prototype의 멤버로 설정(추가)한다.
        if ( desc.hasOwnProperty(key) ) {
            Class.prototype[key] = value;
        }
    }

    // 4. 생성자를 반환
    return Class;
}
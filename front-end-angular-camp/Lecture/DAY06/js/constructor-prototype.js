/*! constructor-prototype.js © yamoo9.net, 2016 */

/**
 * 클래스 기반 언어 (엄격한 정적 자료형 언어)
 * "객체 생성"을 목적으로 클래스 -> 인스턴스
 *
 * 함수형,
 * 객체 생성 === 매우 쉽다.
 * 클래스 방식 모방(생성자, 프로토타입), 상속, 객체 생성/합성
 * JSON, JSONP
 * MVC, MVVM
 *
 * UI Components
 * - Navigation
 * - Tab Menu
 * - Button
 * - Slide Menu
 * - Pagenation
 * - Breadcomb
 */

// 네이티브 생성자 (굳이 필요하지 않다면... 리터럴 사용)
// 필요한 경우, 정규 표현식 같은 경우에 필터링할 표현식을
// 당장 어떤 것인지 알 수 없을 때 (변수로 받을 때)
// 이런 경우는 정규 표현식의 생성자를 사용해야 한다.

/**
 * --------------------------------
 * 자바스크립트의 객체 생성 방법
 * 1. 객체 리터럴 표현식을 사용하여 생성
 * 2. 생성자를 사용해서 객체를 생성하는 방법
 * ----------------------------- */

// 객체 리터럴 표현식을 사용하여 생성
var yamoo9 = {}; // 네임스페이스 객체(전역객체)

// 네임스페이스의 하위 객체 생성
yamoo9.utils = {};
yamoo9.utils.array = {};



// 생성자를 사용해서 객체를 생성하는 방법
// 생성자 함수(Constructor Function)
// 함수는 일급 객체, 즉 객체이므로 속성에 접근/추가/제거 하기가 용이
// 생성된 인스턴스 객체가 개별적으로 소유하는 멤버를 할당할 때
// 내부에 멤버를 선언하게 된다.
function Navigation() {
    // this = 생성자가 객체를 생성했을 때, 생성된 객체를 참조
    // this
}

// 생성자 프로토타입(원형) 객체
// 재사용되는 공통된 멤버를 선언할 때 사용한다.
Navigation.prototype; // {}

// 프로토타입 객체에서 생성자를 참조하는 방법
Navigation.prototype.constructor;

// 생성자를 통해 객체를 생성
// gnb, lnb 메모리에 할당된 Navigation 객체 인스턴스...
var gnb = new Navigation(),
    lnb = new Navigation(),
    fnb = new Navigation();

// 생성된 인스턴스 객체는 자신을 생성한 생성자를 참조할 수 있는 속성이 존재
gnb.constructor === Navigation;
lnb.constructor === Navigation;
fnb.constructor === Navigation;

// 프로토타입 원형 객체에 동적으로 기능 추가가 가능하다.
Navigation.prototype.activation = function() {};
Navigation.prototype.deactivation = function() {};
Navigation.prototype.autoPlay = function() {};

// 프로토타입 원형 객체에 연결되어 있는 생성자로부터 생성된 객체 인스턴스는
// 그 능력(기능)을 공유한다. (링크되어 있다)

// console.dir( gnb );

/**
 * gnb는 Navigation 생성자 함수가 만들어낸(new를 사용해서) 사용자 정의 객체 인스턴스이다.
 * Navigation 생성자 함수는 선언됨과 동시에 prototype 속성을 통해 참조 가능한 비어있는 객체(프로토타입)가 생성된다.
 * gnb는 생성과 동시에 Navigation 생성자 함수가 prototype 속성으로 참조하는 프로토타입 객체에 연결되어 있다.
 * 런타임 중에 동적으로 Navigation 생성자 함수의 프로토타입 객체에 멤버를 추가하면 인스턴스 또한 프로토타입 객체에
 * 연결되어 있기 때문에 그 능력을 사용할 수 있다.
 */

 function myFn() {
     // this는 누구를 가리키는가?
     // 컨텍스트가 무엇인가?
     // Function.prototype.call을 사용해서 컨텍스트를 변경할 수 있다.
     // 이벤트 핸들링 시에 핸들러로 함수 포인터가 참조되면 이벤트의 주인(연결된 대상 객체)을 가리킨다.
     console.log(this);
 }

function MyConstructor() {
    // this는 누구를 가리키는가? (참조하는가)
    // 생성자가 낳은 객체를 가리킨다.
    console.log(this);
}


var MugCup = function(content) {
    // 일반적으로 함수 내부의 this가 참조하는 대상은
    // 실행 컨텍스트 객체이며, 전역에서 실행 시
    // 전역 객체인 window가 컨텍스트 객체가 된다.
    // 고로 new를 붙이지 않고 MugCup을 실행하면...
    // 전역이 오염된다. (안티패턴)

    // 반면 'use strict' 모드를 사용하면 undefined가 된다.
    'use strict';
    // console.log(this); // undefined

    // this는 undefined 이므로 객체가 아니기에 아래 코드는 오류가 발생한다.
    // 하지만 'use strict' 모드를 사용하지 않을 경우에는 window 전역 객체의
    // 속성으로 할당되어 전역을 오염시키는 결과를 초래한다.
    this.content = content;
    this.count   = 1;
    this.broken  = false;
    // this.drink   = function(amount) {
    //     return this.content + '를 ' + amount + '만큼 마시다.';
    // };

    // 암묵적으로 this가 반환
    // return this;

    // this가 아닌 다른 어떤 것을 반환할 수 있는가?
    // 생성자 함수는 반드시 this만 반환하는 것이 아니라,
    // 필요에 따라 직접 객체를 반환할 수 있다.
    // return {
    //     'name': '머그컵',
    //     '깨짐': '아니오'
    // };

    // 아래 방식은 return 값이 undefined 이거나,
    // 오류가 발생할 수 있다.
    // return
    // {
    //     'name': '머그컵',
    //     '깨짐': '아니오'
    // };

};

// MugCup 프로트타입 객체 확장
// 확장된 멤버는 모든 Mugcup 인스턴스 객체가 사용 가능 (링크되어 있으니까)
// MugCup.prototype.drink = function(amount) {
//     return this.content + '를 ' + amount + '만큼 마시다.';
// };

// MugCup.prototype.heat = function(time) {
//     return this.content + '를 담은 머그컵을 ' + time + ' 동안 만큼 데우다.';
// };

// MugCup.prototype.mixin = function(other_content) {
//     return this.content + '를 담은 머그컵에 ' + other_content + '를 섞다.';
// };

MugCup.prototype = {
    'drink': function(amount) {
        return this.content + '를 ' + amount + '만큼 마시다.';
    },
    'heat': function(time) {
        return this.content + '를 담은 머그컵을 ' + time + ' 동안 만큼 데우다.';
    },
    'mixin': function(other_content) {
        return this.content + '를 담은 머그컵에 ' + other_content + '를 섞다.';
    },
};



// 우유, 커피, 쥬스를 담을 각각의 머그컵 객체를 생성한다.
var milk_cup   = new MugCup('우유'),
    coffee_cup = new MugCup('커피'),
    juce_cup   = new MugCup('쥬스');

// console.log( milk_cup.drink('220ml') );
// console.log( juce_cup.heat('3초') );
// console.log( juce_cup.drink('30ml') );
// console.log( coffee_cup.mixin('우유') );


/**
 * --------------------------------
 * UI 컴포넌트 객체 디자인
 * --------------------------------
 * - Button 객체 생성자(클래스)
 * - Navigation 객체 생성자(클래스)
 * - Carousel 객체 생성자(클래스)
 * - Gallery 객체 생성자(클래스)
 * - Pagenation 객체 생성자(클래스)
 * - OffCanvas 객체 생성자(클래스)
 * - Modal 객체 생성자(클래스)
 * ----------------------------- */



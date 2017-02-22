// 전역 (Global Scope)

// 함수 표현식(Function Expression)
var Tab = function(selector) {
    // 생성자 함수(Constructor Function)
    this.el = document.querySelector(selector);
    this.selector = selector;
};

// 생성자 함수에 연결된 프로토타입 객체
Tab.prototype = {
    'init': function() {
        console.log( this.selector + ' 요소를 탭 컴포넌트로 설정합니다.' );
    },
    'nextTab': function() {
        console.log( this.selector + ' 요소의 다음 탭을 활성화합니다.' );
    },
    'prevTab': function() {
        console.log( this.selector + ' 요소의 이전 탭을 활성화합니다.' );
    },
    'autoSliding': function() {
        console.log( this.selector + ' 요소 탭 컴포넌트를 자동으로 슬라이드 설정합니다.' );
    },
    'stopSliding': function() {
        console.log( '자동으로 슬라이드 설정된 ' + this.selector + ' 요소 탭 컴포넌트를 멈춥니다.' );
    }
};
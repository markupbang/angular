// 모듈 패턴
(function( exports ){
    'use strict';

    // 비공개 멤버
    function makeArray(o) {
        return Array.prototype.slice.call(o);
    }

    // 생성자 함수
    var Sandbox = function() {

        // 사용자가 전달한 인자가 무엇인지 모르는 상태에서
        // arguments 값을 통해 각각의 값이 무엇인지 판별
        // console.log( arguments.constructor === Array );
        // arguments -> 배열로 변환
        var args = makeArray( arguments ),
            // 콜백 함수를 담을 데이터 선언
            callback,
            // 모듈 리스트를 담을 데이터 선언
            modules;

        // 검증
        // 샌드박스 사용 시, 마지막 인자가 함수가 아닐 때
        if ( typeof args[ args.length - 1 ] !== 'function' ) {
            callback = function(){};
        } else {
            callback = args.pop();
        }

        // 호출해야 할 모듈을 다시 정리
        modules = args[0] && typeof args[0] === 'string' ? args : args[0];

        // new를 강제화 하는 패턴
        if ( !(this instanceof $sandbox) ) {
            return new $sandbox(modules, callback);
        }

        // 모듈을 정리하되, 와이드카드(*) 존재 유무 파악 처리
        if ( !modules || modules[0] === '*' || modules.length === 0) {
            modules = [];
            for ( var module in Sandbox.modules ) {
                modules.push( module );
            }
            // console.log(modules); // dom, ajax, events
        }

        // console.log('modules: ', modules);
        // console.log('callback: ', callback);

        var that = this;

        // 객체 합성이 완료되면...
        modules.forEach(function(module, index) {
            Sandbox.modules[module](that);
        });

        // 콜백 함수 실행
        callback(this);

    };

    // 모듈 담는 리스트
    // 스테틱 멤버 (jQuery의 경우, 유틸리티 메소드)
    Sandbox.modules = {};

    Sandbox.modules.dom = function(box) {
        // console.log(box);
        box.query    = function(selector, context) {};
        box.queryAll = function(selector, context) {};
        box.css      = function(el, prop, value) {};
    };

    Sandbox.modules.ajax = function(box) {
        box.makeRequest = function() {};
        box.getResponse = function() {};
    };

    Sandbox.modules.events = function(box) {
        box.on  = function(el, type, handler, capture) {};
        box.off = function(el, type, handler, capture) {};
    };

    // 프로토타입
    Sandbox.prototype = {
        'version': '1.0.0'
    };

    // 모듈 패턴 내부에 비공개된 멤버 중, 일부를 노출하는 것을 노출 패턴이라고 한다.
    exports.$sandbox = Sandbox;

})( this );
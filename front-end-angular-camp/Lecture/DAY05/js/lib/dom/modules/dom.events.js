/*! dom.events.js © yamoo9.net, 2016 */
(function( dom ){
    'use strict';


    // 진보 이벤트 모델 헬퍼 함수를 만드는데
    // 표준/비표준을 가리지 않고 사용자가 손쉽게
    // 사용할 수 있도록 구현하라.

    // 검증 함수
    function checkEl(element_node) {
        // Validation
        if ( !element_node || element_node.nodeType !== 1 ) {
            throw new Error('전달된 첫번째 인자는 반드시 요소노드여야만 합니다.');
        }
    }

    var addEvent = (function(){
        var _addEvent;
        // W3C Standard
        if ( window.addEventListener ) {
            _addEvent = function(element_node, event_type, callback, capture) {
                checkEl(element_node);
                capture = capture || false;
                element_node.addEventListener(event_type, callback, capture);
            };
        }
        // MS Non Standard
        else if ( window.attachEvent ) {
            // not support capturing
            _addEvent = function(element_node, event_type, callback, capture) {
                checkEl(element_node);
                capture = capture || false;
                element_node.attachEvent('on'+event_type, callback);
            };
        }
        // Legacy Event Model
        else {
            _addEvent = function(element_node, event_type, callback, capture) {
                checkEl(element_node);
                capture = capture || false;
                element_node['on'+event_type] = callback;
            };
        }
        return _addEvent;
    })();

    // function addEvent(element_node, event_type, callback, capture) {
    //     // Validation
    //     if ( !element_node || element_node.nodeType !== 1 ) {
    //         throw new Error('전달된 첫번째 인자는 반드시 요소노드여야만 합니다.');
    //     }
    //     // Default Setting
    //     capture = capture || false; // bubbling 사용 (IE 8- 는 capture를 미지원)
    //     // W3C Standard
    //     if ( element_node.addEventListener ) {
    //         element_node.addEventListener(event_type, callback, capture);
    //     }
    //     // MS Non Standard
    //     else if ( element_node.attachEvent ) {
    //         // not support capturing
    //         element_node.attachEvent('on'+event_type, callback);
    //     }
    //     // Legacy Event Model
    //     else {
    //         element_node['on'+event_type] = callback;
    //     }
    // }

    var removeEvent = (function(){
        var _removeEvent;
        // W3C Standard
        if ( window.removeEventListener ) {
            _removeEvent = function(element_node, event_type, callback, capture) {
                checkEl(element_node);
                capture = capture || false;
                element_node.removeEventListener(event_type, callback, capture);
            };
        }
        // MS Non Standard
        else if ( window.detachEvent ) {
            // not support capturing
            _removeEvent = function(element_node, event_type, callback, capture) {
                checkEl(element_node);
                capture = capture || false;
                element_node.detachEvent('on'+event_type, callback);
            };
        }
        // Legacy Event Model
        else {
            _removeEvent = function(element_node, event_type, callback, capture) {
                checkEl(element_node);
                capture = capture || false;
                element_node['on'+event_type] = null; // 이벤트 제거
            };
        }
        return _removeEvent;
    })();

    // 네임스페이스 생성
    var events = $namespace('dom.events');

    // 네임스페이스 객체 멤버로 공개
    events.on = addEvent;
    events.off = removeEvent;

})( $namespace('dom') );
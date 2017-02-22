(function(dom){
    'use strict';
    // Feçade Pattern

    // 초기화 패턴
    // 단 한번만 문서가 로딩될 때 확인(검증)된 함수만 반환하여 참조하도록 만든다.
    var getStyle = (function(){
        // 1회만 수행
        var _getStyle;
        // W3C 표준 코드
        if ( window.getComputedStyle ) {
            _getStyle = function(elNode, property) {
                return getComputedStyle(elNode, null)[property];
            };
        }
        // MS 비표준 코드
        else {
            _getStyle = function(elNode, property) {
                return elNode.currentStyle[property];
            };
        }
        // 즉시 실행함수가 수행된 이후 반환되는 함수
        // 실제 getStyle에 참조되는 함수
        return _getStyle;
    })();

    // 비공개 함수
    // function getStyle(elNode, property) {
    //     var getComputedStyle = window.getComputedStyle;
    //     // W3C 표준 코드
    //     if ( getComputedStyle ) {
    //         return getComputedStyle(elNode, null)[property];
    //     }
    //     // MS 비표준 코드
    //     else {
    //         return elNode.currentStyle[property];
    //     }
    // }
    // 비공개 함수
    function setStyle(elNode, property, value){
        elNode.style[property] = value;
    }
    // 공개 css 모듈 코드
    function css(elNode, property, value) {
        // CSS 문자열 값을 Javascript에서 쓸 수 있도록 변경해주는 유틸 메소드 사용
        property = dom.utils.toCamel(property);

        if ( dom.utils.isElement(elNode) ) {
            // setter
            if ( value ) {
                setStyle(elNode, property, value);
            }
            // getter
            else {
                return getStyle(elNode, property);
            }
        }
    }

    // dom 모듈 exports
    dom.css = css;

})( $namespace('dom') );
(function(dom){
    'use strict';
    // Feçade Pattern
    // 비공개 함수
    function getStyle(elNode, property) {
        var getComputedStyle = window.getComputedStyle;
        // W3C 표준 코드
        if ( getComputedStyle ) {
            return getComputedStyle(elNode, null)[property];
        }
        // MS 비표준 코드
        else {
            return elNode.currentStyle[property];
        }
    }
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

})( window.dom || (window.dom = {}) );
(function(dom){
    'use strict';

    /**
     * Javascript 데이터 유형을 감지하여 올바르게 값을 반환하는 함수
     * @param  {all_data_format} data 모든 데이터 유형이 전달될 수 있음
     * @return {String}      데이터 유형 이름을 문자열로 반환
     */
    function type(data) {
        // Object.prototype.toString 메소드 빌려쓰기
        return Object.prototype.toString.call(data).toLowerCase().slice(8,-1);
    }
    // type 함수를 재사용하여 결과 값을 true | false로 설정
    function isNumber(data) {
        return type(data) === 'number';
    }

    function isString(data) {
        return type(data) === 'string';
    }

    function isBoolean(data) {
        return type(data) === 'boolean';
    }

    function isFunction(data) {
        return type(data) === 'function';
    }

    function isArray(data) {
        return type(data) === 'array';
    }

    function isObject(data) {
        return type(data) === 'object';
    }

    function isElement(data) {
        return data && (data.nodeType === 1);
    }

    // dom.utils 객체 존재 유무 확인
    if ( !dom.utils ) {
        dom.utils = {};
    }

    // dom 네임스페이스 객체의 멤버로 exports
    dom.utils.type       = type;
    dom.utils.isNumber   = isNumber;
    dom.utils.isString   = isString;
    dom.utils.isBoolean  = isBoolean;
    dom.utils.isFunction = isFunction;
    dom.utils.isArray    = isArray;
    dom.utils.isObject   = isObject;
    dom.utils.isElement  = isElement;

})( window.dom || (window.dom = {}) );
(function(dom){
    'use strict';

    // 검증 dom.utils
    if ( !dom.utils ) {
        dom.utils = {};
    }

    // CSS 문자열을 Javascript에서 처리할 수 있도록 변경
    function toCamel(str) {
        if ( !dom.utils.isString(str) ) {
            throw new Error('전달된 인자 값이 문자가 아닙니다.');
        }
        return str.replace(/-[a-z]/g, function($1) {
            return $1.toUpperCase().replace(/-/, '');
        });
    }

    function toDash(str) {
        if ( !dom.utils.isString(str) ) {
            throw new Error('전달된 인자 값이 문자가 아닙니다.');
        }
        return str.replace(/[A-Z]|_/g, function($1) {
            return '-'+$1.toLowerCase().replace(/_/,'');
        });
    }

    function toUnderscore(str) {
        if ( !dom.utils.isString(str) ) {
            throw new Error('전달된 인자 값이 문자가 아닙니다.');
        }
        return str.replace(/[A-Z]|-/g, function($1) {
            return '_'+$1.toLowerCase().replace(/-/,'');
        });
    }

    function trimLeft(str) {
        if ( !dom.utils.isString(str) ) {
            throw new Error('전달된 인자 값이 문자가 아닙니다.');
        }
        return str.replace(/^\s+/, '');
    }

    function trimRight(str) {
        if ( !dom.utils.isString(str) ) {
            throw new Error('전달된 인자 값이 문자가 아닙니다.');
        }
        return str.replace(/\s+$/, '');
    }

    function trim(str) {
        if ( !dom.utils.isString(str) ) {
            throw new Error('전달된 인자 값이 문자가 아닙니다.');
        }
        return str.replace(/\s+|\s+$/g, '');
    }

    // dom 라이브러리로 exports
    dom.utils.toCamel      = toCamel;
    dom.utils.toDash       = toDash;
    dom.utils.toUnderscore = toUnderscore;
    dom.utils.trim         = trim;
    dom.utils.trimLeft     = trimLeft;
    dom.utils.trimRight    = trimRight;

})( window.dom || (window.dom = {}) );
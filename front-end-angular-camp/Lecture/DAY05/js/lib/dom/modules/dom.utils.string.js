(function(dom){
    'use strict';

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

    // 네임스페이스 확인한 후, 없으면 생성
    // 있으면 네임스페이스 객체 참조
    var utils = $namespace('dom.utils');

    // dom 라이브러리로 exports
    utils.toCamel      = toCamel;
    utils.toDash       = toDash;
    utils.toUnderscore = toUnderscore;
    utils.trim         = trim;
    utils.trimLeft     = trimLeft;
    utils.trimRight    = trimRight;

})( $namespace('dom') );
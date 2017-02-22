(function(dom){
    'use strict';

    /**
     * 리스트(집합)를 반복 순환하여 처리하는 헬퍼 함수
     * @param  {array, like-array} data       배열, 유사배열
     * @param  {function}          callback   콜백함수
     * @return {undefined}                    함수 반환 값 없음
     */
    function each(data, callback) {
        if ( !data.length || dom.utils.isString(data) ) {
            console.error('배열 또는 유사배열 데이터 유형만 처리가 가능합니다.');
        }
        if ( !dom.utils.isFunction(callback) ) {
            console.error('함수 데이터 유형만 처리가 가능합니다.');
        }
        if ( Array.isArray(data) ) {
            data.forEach(callback);
        } else {
            [].forEach.call(data, callback);
        }
    }

    // dom 네임스페이스 객체의 멤버로 exports
    dom.each = each;

})( $namespace('dom') );
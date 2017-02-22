/*! jquery.unique.js © yamoo9.net, 2016 */
(function($){
    'use strict';
    // 유틸리티 코어 메소드 백업
    $._unique = $.unique;
    // 버그 해결을 목적으로 유틸리티 메소드 오버라이딩
    $.unique = function(o) {
        // 검증
        if ( !$.isArray(o) ) {
            return console.error('전달인자는 배열 유형이어야만 합니다.');
        }
        // 유니크한 배열 정의
        var unique_arr = [];
        // 유니크한 배열에 원소를 찾아 담는 처리 과정(반복)
        $.each(o, function(index, item) {
            // 유니크한 배열에 해당 원소가 존재하는가?
            // 존재하지 않는다면 유니크한 배열에 원소로 추가한다.
            if ( $.inArray(item, unique_arr) === -1 ) {
                unique_arr.push(item);
            }
        });

        // 유니크한 배열 원소 반환
        return unique_arr;
    }
})(this.jQuery);
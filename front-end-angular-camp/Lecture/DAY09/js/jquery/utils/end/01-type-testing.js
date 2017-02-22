// 모듈 패턴
(function(exports){
    'use strict';

    // 전역에 공개 함수
    exports.printCallback = function(times, delay, callback) {

        // 전달인자 검증
        var count    = $.isNumeric(times) ? times : 3,
            duration = $.isNumeric(delay) ? delay : 400, // normal = 400 (0.4초)
            cb       = $.isFunction(times) ? times :
                       $.isFunction(delay) ? delay :
                       $.isFunction(callback) ? callback :
                       (function(){});

        // i 값 1회 초기화 (지역 변수)
        var i = 0;

        // 즉시실행함수 + 재귀함수
        (function loopit(){
            i += 1;
            cb();
            if ( i < count ) {
                exports.setTimeout(loopit, duration);
            }
        })();

    }

})(this);
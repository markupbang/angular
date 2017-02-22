/*! lecture.js © yamoo9.net, 2016 */

// STEP 0. 안티 패턴(전역 공간 오염) -----------------------------------------
// $ 별치(Alias) 포기
// $.noConflict();
// $ 별치(Alias) 포기 + window.jQuery 변수 값을 undefined로 만드는 경우
// var $jq = jQuery.noConflict(true);

// console.log( $jq().jquery );
// console.log( $jq.prototype.jquery );

// // jQuery.prototype === jQuery.fn
// console.log( $jq.fn.jquery );

// STEP 1. 모듈 패턴(샌드박스: 외부랑 단절된 공간) ------------------------------
// (function(global, $){
//     'use strict';

//     var $jq = jQuery.noConflict(true);

//     console.log( $jq().jquery );
//     console.log( $jq.prototype.jquery );

//     // jQuery.prototype === jQuery.fn
//     console.log( $jq.fn.jquery );

// })(this, this.jQuery);

// STEP 2. 모듈 패턴(외부에서는 더 이상 jQuery 사용 금지) ------------------------------
// (function(global, $){
//     'use strict';

//     console.log( $().jquery );
//     console.log( $.prototype.jquery );
//     console.log( $.fn.jquery );

// })(this, this.jQuery.noConflict(true));

// // 외부 공간
// console.log( jQuery.type(this.$) );
// console.log( jQuery.type(this.jQuery) );

// STEP 3. 모듈 패턴(외부/내부 jQuery 사용 가능) ------------------------------
// (function(global, $){
//     'use strict';

//     // this(global) 참조 변수는 widnow 인가?
//     if ( $.isWindow(global) ) {
//         console.log('global 지역 변수는 전역 객체인 window를 가리킨다.');
//     }

//     // 비공개 멤버
//     var course_name = 'Front-End Actual CAMP';

//     console.log( '모듈 내부 공간: ', course_name );

//     // console.log( $().jquery );
//     // console.log( $.prototype.jquery );
//     // console.log( $.fn.jquery );

// })(this, this.jQuery);

// Uncaught ReferenceError: course_name is not defined
// console.log( '전역 공간: ', course_name );

// 외부 공간
// console.log( jQuery.type(this.$) );
// console.log( jQuery.type(this.jQuery) );



// 데이터 유형 체크하는 유틸리티 메소드
(function($){
    'use strict';
    // 자바스크립트의 데이터 유형
    var num = 9,
        str = 'jQuery is Amazing!',
        boo = true,
        fnc = function() {},
        arr = [],
        obj = {};

    // jQuery.isSting() 유틸리티 메소드가 없으니 확장해보자.
    if ( !$.isString ) {
        $.isString = function(o) {
            return typeof o === 'string';
        }
    }

    // jQuery.isNumeric ???? 생소하니 ...
    // 참조한 뒤에, 오버라이딩하자.
    if ( !$.isNumber ) {
        // 참조
        $.isNumber = $.isNumeric;

        // 참조한 뒤, 제거
        // ※ 코어는 확장의 목적이 아니라면, 수정하지 않는 것이 좋다.
        // delete $.isNumeric;
    }

    // console.log( 'num is Numeric? ', $.isNumeric(num) );
    console.log( 'num is Number? ', $.isNumber(num) );
    console.log( 'jQuery.isNumeric?', $.isNumeric );
    console.log( 'num is String? ', $.isString(num) );
    console.log( 'num is Function? ', $.isFunction(num) );
    console.log( 'num is Array? ', $.isArray(num) );
    console.log( 'obj is Empty Object? ', $.isEmptyObject(obj) ); // 속성이 없을 경우에 참입니다.
    console.log( 'obj is Plain Object? ', $.isPlainObject(obj) ); // 속성이 있든, 없든 객이면 참입니다.

})(this.jQuery);
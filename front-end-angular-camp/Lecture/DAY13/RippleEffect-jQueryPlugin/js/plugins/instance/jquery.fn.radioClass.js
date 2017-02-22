/*! jquery.fn.radioClass.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    // 1.
    // 플러그인 존재 유무 검증
    $.fn.radioClass = $.fn.radioClass || function(class_name, closest_parent) {
        // 1.
        // 전달인자 유형 유효성 검증
        if ( $.type(class_name) !== 'string' ) {
            $.error('전달받은 클래스 속성 이름은 문자열로 전달해야 합니다.');
        }

        // 3.
        // closest_parent에서 유효성 통과되는 기준
        // - jQuery 인스턴스 객체
        // - CSS 선택자
        if ( closest_parent && !closest_parent.jquery && $.type(closest_parent) !== 'string' ) {
            $.error('전달받은 컨텍스트 부모는 jQuery 인스턴스 객체 또는 선택자 문자열이어야 합니다.');
        }

        // 4.
        // 조건 처리
        // 1) closest_parent 가 존재하지 않을 때
        if ( !closest_parent ) {
            // 2.
            // 선택된 자신의 형제 중, 클래스 속성을 소유한 형제의 클래스 속성 제거
            this.siblings('.'+class_name).removeClass(class_name);
        }
        // 2) closest_parent 가 존재할 때
        else {
            // 5.
            this
                .closest( closest_parent )
                .siblings()
                    .find('.'+class_name).removeClass(class_name);
        }
        // 자신에게 클래스 속성 설정
        this.addClass(class_name);


        // 체이닝 방식 사용 시, 코드
        // this
        //     .siblings('.'+class_name)
        //         .removeClass(class_name)
        //     .end()
        //     .addClass(class_name);

        // 3.
        // jQuery 메소드 체이닝
        return this;
    };

})(this, this.jQuery);
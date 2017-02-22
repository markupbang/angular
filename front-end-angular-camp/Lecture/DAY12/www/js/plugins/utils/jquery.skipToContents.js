/*! jquery.skipToContents.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    // find_focusing_el 값은 boolean => true, false
    // 사용자가 $.skipToContents('.target', true);
    // 기본 값은 부모에게 포커싱을 설정한다.
    // 하지만 사용자가 원환다면 부모 내부의 첫번째 포커스 요소에 포커싱을 설정한다.
    $.skipToContents = function(wrapper, find_focusing_el) {

        // 3.
        // _skipToContents 비공개 함수 정의
        function _skipToContents(evt) {
            // 기본 동작 차단
            // url 뒤에 hash(#)를 붙이지 않음
            evt.preventDefault();
            // evt.target 요소의 href 속성 값을 참조
            var _this = evt.target;
            var target_id = _this.getAttribute('href');
            // var target_id = $.memory(evt.target).attr('href');

            // event.target 요소에 data() 메모리를 설정한다.
            // jQuery 팩토리함수를 클릭 때마다 매번 사용하는 (비싼) 비용을 절감
            var $target = $.memory(_this, 'target_id', $(target_id));

            // find_focusing_el
            // 사용자가 전달한 find_focusing_el 값이 참이라면
            // 부모 요소 내부의 첫번째 포커스 요소를 찾아 포커스를 설정한다.
            if (find_focusing_el) {
                // http://stackoverflow.com/questions/1599660/which-html-elements-can-receive-focus
                var $focuable_in_target = $('[href], [tabindex], button, input, select, textarea', $target);
                $focuable_in_target.eq(0).focus();
                // 함수 종료
                return;
            }

            // console.log( $target.attr('id') );
            // console.log($.isFocusable($target));
            // console.log($.isFocusable( document.querySelector('.test')));
            // $target 요소는 포커스가 가능한가?
            if ( !$.isFocusable($target) ) {
                $target.attr('tabindex', -1);
            }
            // $target 객체를 포커싱한다.
            $target.focus();

        };

        function ariaHiddenStateChangeFalse() {
            this.setAttribute('aria-hidden', false);
        }
        function ariaHiddenStateChangeTrue() {
            this.setAttribute('aria-hidden', true);
        }

        // 1.
        // 검증
        // if ($.type(wrapper) !== 'string') {
        //     $.error('스킵 내비게이션을 설정할 부모 요소 선택자는 문자열이어야 합니다.');
        // }
        // 1-1.
        // 검증 수정
        // jQuery 인스턴스 객체이거나,
        // CSS 선택자 문자열인지 확인
        if ( wrapper && !wrapper.jquery && $.type(wrapper) !== 'string' ) {
            $.error('스킵 내비게이션을 설정할 부모 요소 선택자 문자열 또는 jQuery 인스턴스를 전달해야합니다.');
        }

        // 2.
        // 스킵 내비게이션을 설정할 부모 요소 참조
        // jQuery 인스턴스 객체화
        var $wrapper = $(wrapper),
            $wrapper_links = $wrapper.find('a');

        // $wrapper 내부의 모든 a 요소에 클래스를 설정
        $wrapper_links.addClass('a11y-hidden focusable');

        // WAI-ARIA 역할 설정
        if($wrapper[0].nodeName.toLowerCase() !== 'nav') {
            $wrapper.attr('role', 'navigation');
        }

        // WAI-ARIA 초기 속성(상태) 설정
        $wrapper_links.attr('aria-hidden', true);

        // WAI_ARIA 상태 변경 이벤트 바인딩
        $wrapper_links.on({
            'focus': ariaHiddenStateChangeFalse,
            'blur': ariaHiddenStateChangeTrue
        });

        // 이벤트 바인딩 (이벤트 위임)
        $wrapper.on('click', 'a', _skipToContents);

    };

    // $.fn === jQuery.prototype 객체에 멤버 추가
    $.fn.skipToContents = function(find_focusing_el) {
        // this === $wrapper
        $.skipToContents(this, find_focusing_el);
    };

})(this, this.jQuery);
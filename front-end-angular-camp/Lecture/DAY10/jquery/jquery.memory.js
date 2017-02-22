/*! jquery.memory.js © yamoo9.net, 2016 */
(function($){
    'use strict';
    // 1.
    // 검증
    if (!$) { return console.error('jQuery에 의존하는 모듈입니다. jQuery를 호출하세요.'); }

    if (!$.memory) {
        $.extend($, {
            'memory': function(dom_el) {
                // 메모이제이션 패턴
                var _memory = '$this';
                // 1.
                // 검증(DOM 요소인가?)
                if ( !dom_el || dom_el.nodeType !== 1 ) {
                    return console.error('DOM 요소 노드를 전달해야 합니다.');
                }
                // 2.
                // 조건 확인(이미 jQuery 팩토리 함수를 사용한 적이 있는가?)
                // 반환
                return $.data(dom_el, _memory) || $.data(dom_el, _memory, $(dom_el));
            }
        });

        // 별칭 설정
        $.$ = $.memory;

        // $.memory 유틸리티 메소드 모듈 정의
        // $.memory = function(dom_el) {
        //     // 메모이제이션 패턴
        //     var _memory = '$this';
        //     // 1.
        //     // 검증(DOM 요소인가?)
        //     if ( !dom_el || dom_el.nodeType !== 1 ) {
        //         return console.error('DOM 요소 노드를 전달해야 합니다.');
        //     }
        //     // 2.
        //     // 조건 확인(이미 jQuery 팩토리 함수를 사용한 적이 있는가?)
        //     // 반환
        //     return $.data(dom_el, _memory) || $.data(dom_el, _memory, $(dom_el));
        // };
    }

})(this.jQuery);
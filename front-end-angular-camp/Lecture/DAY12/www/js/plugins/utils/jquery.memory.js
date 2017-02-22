/*! jquery.memory.js © yamoo9.net, 2016 */
(function($){
    'use strict';

    if (!$) { return console.error('jQuery에 의존하는 모듈입니다. jQuery를 호출하세요.'); }

    if (!$.memory) {

        $.extend($, {
            'memory': function(dom_el, key, value) {
                var _memory = key || '$this';
                if ( !dom_el || dom_el.nodeType !== 1 ) {
                    return console.error('DOM 요소 노드를 전달해야 합니다.');}
                return $.data(dom_el, _memory) || $.data(dom_el, _memory, (value || $(dom_el)) );
            }
        });

        // 별칭 설정
        if (!$.$) {
            $.$ = $.memory;
        }

    }

})(this.jQuery);
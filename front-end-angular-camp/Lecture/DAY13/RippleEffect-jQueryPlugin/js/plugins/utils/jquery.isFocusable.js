/*! jquery.isFocusable.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    var doc = exports.document;

    // 전달받은 target [DOMElementNode, jQueryInstanceObject]
    // target 요소가 포커스가 가능한지 유무를 확인하여 결과를 반환하는 유틸리티 메소드
    $.isFocusable = function(target) {
        // 1.
        // 검증
        if ( target && target.nodeType !== 1 && !target.jquery ) {
            $.error('jQuery 인스턴스 객체 또는 문서객체 요소노드여야 합니다.');
        }

        // 2.
        // 현재 문서에 포커스된 요소를 메모리한다.
        var pre_focusable_el = doc.activeElement;

        // 3.
        // target 요소에 포커스를 설정
        target.focus();

        // 4.
        // 이전 포커스 요소와 target 요소를 비교하여 결과를 반환한다.
        var result = doc.activeElement === ( target.jquery ? target[0] : target );

        // 5.
        // 이전 포커스에 포커스 상태를 돌려준다. (복귀)
        pre_focusable_el.focus();

        // 6.
        // 참/거짓 반환
        return result;
    }

})(this, this.jQuery);
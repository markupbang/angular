/*! jquery.fn.radioCheckbox.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    function initRadio($radio) {
        $radio.addClass('a11y-hidden custom-radio');
        var label_id = $radio.attr('id');
        // 동적으로 label 요소를 추가
        $('<label for="'+ label_id +'">')
            .html( $radio.attr('data-label-content') )
            .insertAfter($radio);
    }

    $.fn.radioCheckbox = $.fn.radioCheckbox || function(kind) {
        // 1.
        // 검증
        if ( $.type(kind) !== 'string' ) {
            $.error('전달된 kind 유형은 문자열로 전달되어야 합니다.');
        }

        var $this = this;

        // 2.
        // 유형 체크
        switch(kind) {
            case 'radio':
                $.each($this, function (index, item) {
                    initRadio($this.eq(index));
                });
            break;

            case 'checkbox':
            break;

            default:
                console.warn('radio 또는 checkbox만 설정할 수 있습니다.');
        }
    };



    $('[data-custom-radio]').radioCheckbox('radio');

})(this, this.jQuery);
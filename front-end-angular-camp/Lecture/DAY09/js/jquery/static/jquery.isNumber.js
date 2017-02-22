(function($){
    'use strict';

    // 코어 메소드 백업
    $._isNumeric = $.isNumeric;

    $.isNumber = function(o) {
        return $.type(o) === 'number';
    };

    // 메소드 오버라이딩
    $.isNumeric = $.isNumber;

})(this.jQuery);
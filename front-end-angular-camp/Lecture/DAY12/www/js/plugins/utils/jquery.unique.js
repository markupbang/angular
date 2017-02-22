/*! jquery.unique.js © yamoo9.net, 2016 */
(function($){
    'use strict';

    $._unique = $.unique;

    $.unique = function(o) {

        if ( !$.isArray(o) ) {
            return console.error('전달인자는 배열 유형이어야만 합니다.');
        }

        var unique_arr = [];

        $.each(o, function(index, item) {
            if ( $.inArray(item, unique_arr) === -1 ) {
                unique_arr.push(item);
            }
        });

        return unique_arr;
    };

})(this.jQuery);
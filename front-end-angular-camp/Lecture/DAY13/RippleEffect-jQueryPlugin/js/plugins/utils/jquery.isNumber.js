(function($){
    'use strict';

    $._isNumeric = $.isNumeric;
    $.isNumber   = function(o) { return $.type(o) === 'number'; };
    $.isNumeric  = $.isNumber;

})(this.jQuery);
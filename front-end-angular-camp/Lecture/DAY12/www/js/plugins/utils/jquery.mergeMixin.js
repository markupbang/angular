/*! jquery.mergeMixin.js © yamoo9.net, 2016 */
(function($){
    'use strict';

    $.mergeMixin = function() {
        var args        = $.makeArray(arguments),
            combine_arr = [];

        $.each(args, function(idx, item) {
            $.merge(combine_arr, item);
        });

        return combine_arr;
    };

    if (!$.merges) {
        $.merges = $.mergeMixin;
    }

})(this.jQuery);
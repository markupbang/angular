/*! jquery.isHidpi.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    $.extend($, {
        'getPixelRatio': function() {
            return exports.devicePixelRatio;
        },
        'isHidpi': function() {
            return $.getPixelRatio() > 1;
        }
    });

})(this, this.jQuery);
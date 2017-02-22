/*! jquery.isRetina.js © yamoo9.net, 2016 */
(function(global, $){
    'use strict';

    if ( !$.getPixelRatio ) {
        $.getPixelRatio = function() {
            return global.devicePixelRatio;
        }
    }

    if ( !$.isRetina ) {
        $.isRetina = function() {
            return $.getPixelRatio() > 1;
        }
    }

})(this, this.jQuery);
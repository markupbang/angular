(function(exports, $){
    'use strict';

    $.extend($, {
        'log': function() {
            console.log.apply(console, arguments);
        },
        'error' : function(err) {
            throw new Error(err);
        }
    });

})(this, this.jQuery);
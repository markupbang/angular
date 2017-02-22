(function(document, dom){
    'use strict';

    dom.query = function(selector) {
        // 검증
        if (!selector || typeof selector !== 'string') {
            return;
        }
        return document.querySelector(selector);
    };

    dom.queryAll = function(selector) {
        // 검증
        if (!selector || typeof selector !== 'string') {
            return;
        }
        return document.querySelectorAll(selector);
    };

})( this.document, $namespace('yamoo9.dom') );
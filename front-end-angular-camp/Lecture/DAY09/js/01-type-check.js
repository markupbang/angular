/*! 01-type-check.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    function init() {

        $('<div>', {
            'id': 'output'
        }).appendTo('body');

        var printCallback = exports.printCallback;

        if (printCallback) {
            // prontCallback() 함수는 아래 주소에 있다.
            // js/jquery/utils/begin/01-type-testing.js
            // printCallback(7, 900, printResult);

            // 아래처럼 사용할 수 있도록 함수를 개선한다면?
            printCallback(printResult);
        }

    }

    function printResult() {
        $('#output').append('<br>함수 호출됨!');
    }

    $(init);

})(this, this.jQuery);

/*! testIsRetina.js © yamoo9.net, 2016 */
(function($){

    'use strict';

    // console.log( $.getPixelRatio() );
    // console.log( $.isRetina() );

    // 웹 페이지 문서는 사용자가 보는 화면은
    // <body> 영역이 그려지고 나서야 볼 수 있다.

    // 애플리케이션/웹서비스의 경우, 초기화 과정을 거친다.
    function init() {

        // 동적으로 코드 생성
        // #result를 생성한 다음
        // var $result = $('<div id="result"></div>').appendTo('body');;

        // $('body').append($result);
        // $result.appendTo('body');

        var $result = $('<div>', {
            'id': 'result',
            'html': '<p>기본 템플릿</p>'
        }).appendTo('body');

        if ( $.isRetina() ) {
            // 레티나 디스플레이임을 출력한다.
            $result.html('<p>사용중인 웹 브라우저는 레티나 디스플레이(배율:'+ $.getPixelRatio() +')입니다.</p>');
        } else {
            // 레티나 디스플레이임이 아님을 출력한다.
            $result.html('<p>사용중인 웹 브라우저는 레티나 디스플레이(배율:'+ $.getPixelRatio() +')가 아닙니다.</p>');
        }

    }

    // $(document.body).append('<p>hi, there</p>');

    // DOM이 준비가 되면 실행
    // $(document).ready(function() {
    //     console.log('ready document!!');
    //     $(document.body).append('<p>hi, there</p>');
    // });

    // $(init);
    $(document).ready(init);

})(this.jQuery);
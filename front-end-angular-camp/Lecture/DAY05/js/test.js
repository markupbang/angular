/*! test.js © yamoo9.net, 2016 */
(function( $ ){
    'use strict';

    // // 문서 객체 참조
    // var body = $.query('body');

    // // 참조된 문서 객체의 배경색상 설정 값을 변수에 참조 (GET)
    // var body_bg = $.css(body, 'background-color');

    // // 콘솔에 기록
    // console.log(body_bg);

    // // 참조된 문서 객체에 스타일 설정 (SET)
    // $.css(body, 'background-color', '#FC414B');
    // $.css(body, 'color', '#fff');
    // $.css(body, 'width', '80%');
    // $.css(body, 'margin', '10vh auto');

    // // GET
    // body_bg = $.css(body, 'background-color');

    // // 콘솔에 기록
    // console.log(body_bg);


    // links 클릭하면 콜백되는 함수
    function showMe(event) {
        // 크로스 브라우징을 위한 방법
        // event = event || window.event;
        // event.target = event.target || event.srcElement;
        // event.preventDefault = event.preventDefault || (function() { event.returnValue = true; });

        // 네이티브 토글 클래스 구현
        if ( event.target.nodeName.toLowerCase() === 'a' ) {
            // 브라우저 기본 동작 차단
            event.preventDefault();
            event.target.classList.toggle('active');
        }

    }

    // 대상 탐색 변수 참조
    var links = $.queryAll('nav a');
    $.each(links, function(item, index) {
        // 이벤트에 이벤트 핸들러 바인딩
        $.events.on(item, 'click', showMe);
    });

})( $namespace('dom') );
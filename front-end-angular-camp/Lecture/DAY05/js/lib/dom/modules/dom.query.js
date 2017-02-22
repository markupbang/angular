(function(dom){
    'use strict';

    /**
     * 문서객체를 손쉽게 선택할 수 있도록 도와주는 함수
     * @param  {String}              selector  CSS 선택자
     * @param  {ElementNode, String} context   컨텍스트 요소노드 또는 CSS 선택자
     * @return {NodeList, Array}               수집된 문서 요소 리스트
     */
    function queryAll(selector, context) {

        // 만약 사용자가 context 설정 값을 전달하지 않은 경우라면?
        // if ( typeof context === 'undefined' ) {
        if ( !context ) {
            context = document;
        }

        // 만약 전달받은 context가 문자 데이터 유형이라면?
        if (typeof context === 'string') {
            context = query(context);
        }

        // context.length 속성 유무에 따라 코드 분기
        if (context.length) {
            // _nodeList는 호이스트 되지만,
            // 아래 코드에서는 큰 문제가 발생하지 않음.
            var _nodeList = [];
            // 헬퍼함수 each 재사용
            each(context, function(item){
                // 마치 2중 for 문처럼 다시 each 함수 사용
                each(query(selector, item), function(item){
                    _nodeList.push(item);
                });
            });
            // 수집된 _nodeList 반환
            return _nodeList;
        } else {
            // context 객체가 하나일 경우, 간단하게 결과 반환
            return context.querySelectorAll(selector);
        }

    }

    function query(selector, context) {
        // queryAll() 함수 재사용
        return queryAll(selector, context)[0];
    }

    // dom 네임스페이스 객체의 멤버로 exports
    dom.queryAll = queryAll;
    dom.query    = query;

})( $namespace('dom') );
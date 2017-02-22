/*! $namespace.js © yamoo9.net, 2016 */
// 모듈 패턴
(function(exports){
    'use strict';

    // 클로저 영역에 존재하는 참조 변수
    // 객체 생성자의 프로토타입 멤버(toString) 메소드를 빌려쓰기

        // 비공개 멤버
    var toString = Object.prototype.toString,
        // 비공개이지만 외부에 공개할 멤버
        $namespace = function(ns_str) {
        // 검증
        if ( typeof ns_str !== 'string' ) {
            throw new Error('전달인자는 문자 유형만 가능합니다.');
        }
        // 문자를 전달 받았을 때 어떤 포멧인가?
        // 포멧 예시) 'dom.events.on'
        // 문자 유형 → 배열 유형으로 변경
        // 지역 변수
        var ns_arr = ns_str.split('.'), _namespace; // undefined;
        // ns_arr -> ["dom", "events", "on"]
        // ES5 forEach문 사용 결정
        ns_arr.forEach(function(ns, index) {
            // index 값이 0일때만 사용
            if ( index === 0 ) {
                // exports[ns] === window[ns] 존재 유무 확인
                if ( toString.call(exports[ns]) !== '[object Object]' ) {
                    // 존재하지 않는 네임스페이스 객체를 생성
                    exports[ns] = {};
                }
                // 지역변수 _namespace에 객체를 참조
                _namespace = exports[ns];
            }
            // index 값이 0이 아니면...
            else {
                if ( toString.call( _namespace[ns] ) !== '[object Object]' ) {
                    _namespace[ns] = {};
                }
                _namespace = _namespace[ns];
            }
        });
        // 모든 순환이 끝난 이후에 최종적인 네임스페이스 객체를 반환
        return _namespace;
    }

    // 외부에 모듈 공개
    exports.$namespace = $namespace;

})(this);
// anti-other-pattern-01.js
// ----------------------------------------------------
// var js = 'ECMAScript';

// 전역에 kipfa 네임스페이스 객체를 생성한다.
var kipfa = {};
// anti-pattern-01.js 정의된 네임스페이스 객체를 덮어 씀.
// 코드가 충돌.. (문제 발생)
var fast_campus = ['패스트 캠퍼스'];

kipfa.js = 'ECMAScript';
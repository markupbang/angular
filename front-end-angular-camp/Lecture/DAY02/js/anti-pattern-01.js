// anti-pattern-01.js
// ----------------------------------------------------
// var를 변수 이름 앞에 안 붙일 경우,
// 암묵적으로 전역 객체인 window의 속성으로 설정 됩니다.
// 전역 변수가 됩니다.
// js = 'Javascript';

// 전역에 설정된 네임스페이스 객체를 생성한다.
// var fast_campus = new Object();
var fast_campus = {}; // 객체 리터럴(그 자체의 값)
// var fast_campus = Object.create(Object.prototype);

// var js = 'Javascript';
// 네임스페이스 객체인 fast_campus 속성을 할당
fast_campus.js = 'Javascript';
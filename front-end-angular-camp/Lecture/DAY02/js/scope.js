// 스코프에 대한 설명을 위한 예제
// 스코프란? 영역을 의미합니다.

// // 전역 공간: window excution scope
// var where_is_global = '전역 공간에 명시적으로 선언된 전역 변수';

// this_is_var = '암묵적으로 전역 객체인 widnow의 속성으로 설정됨. 결론은 전역 변수가 됨.';

// // 검증! window 전역 객체의 속성으로 모두 설정되었는지 확인!
// console.log(where_is_global === window.where_is_global);
// console.log(this_is_var === window.this_is_var);

// // 검증! 과연 2개의 전역 변수는 모두 지울(delete) 수 있는가?
// delete where_is_global;
// delete this_is_var;

// console.log('where_is_global 변수는 ', where_is_global ? '지워졌습니다.' : '안 지워졌습니다.');
// console.log('this_is_var 변수는 ', this_is_var ? '지워졌습니다.' : '안 지워졌습니다.');

// 스코프 체인

// 전역 === widnow 공간
var cup = '종이컵';

console.log('전역:', cup); // 종이컵

// 함수 영역
function scopeFn() {
    // #1
    // var cup = '플라스틱 컵';
    cup = '플라스틱 컵'; // cup???
    console.log('함수 내부:', cup); // 플라스틱 컵
}

scopeFn();

console.log('전역:', cup); // 종이컵
'use strict';

// var data = '초기 상태';
// // 객체 유형의 데이터
// var objData = {
//     'framework': 'Angular',
//     'library': 'Susy',
//     'template': 'Jade'
// };
// var convertJsonTypeObjData = null;

// if ( this.localStorage ) {

//     // 데이터 쓰기 (문자열)
//     this.localStorage.setItem('angular-camp', data);

//     // 데이터 읽기
//     this.localStorage.getItem('angular-camp');

//     // 먼저 객체 유형을 JSON 문자열로 변경해야 한다.
//     convertJsonTypeObjData = JSON.stringify(objData);
//     // 데이터 쓰기 (객체 유형을 저장)
//     this.localStorage.setItem('angular-camp', convertJsonTypeObjData);

//     // 데이터 읽기
//     var loadedData = this.localStorage.getItem('angular-camp');

//     // 가져온 데이터(객체)의 멤버에 접근 콘솔에 출력
//     // JSON 문자열을 해석(Parse)하여 객체화 시키는 과정을 거쳐야 한다.
//     console.log( JSON.parse(loadedData).library ); // Susy

// }

// 모듈 호출 require();
var controller = require('./controller');

if ( typeof controller === 'function' ) {
    // 실행
    controller();
} else {
    console.log('constroller는 함수가 아닙니다.');
    if (controller.action) {
        controller.action();
    }
}

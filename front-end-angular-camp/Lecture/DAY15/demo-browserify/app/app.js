// 호출과 동시에 모듈 내부 변수에 참조
var jQuery      = require('jquery'),
    model       = require('./modules/model'),      // 문자
    view        = require('./modules/view')(),     // 함수
    controller  = require('./modules/controller'); // 객체

// 모듈 호출 (내부 변수에 참조하지 않음)
require('./modules/jquery.plugin');
require('./modules/route');


// console.dir( controller );
console.log( 'model: ', model );
console.log( 'view: ', view );
console.log( 'controller.displayModelView:', controller.displayModelView() );
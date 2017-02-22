// './' 상대 경로가 앞에 붙지 않으면
// node_modules 디렉토리 내에서 모듈을 찾는다.
var jQuery = require('jquery');

console.log(jQuery.fn.jquery); // jQuery 버전

// DOM이 완성된 시점에서 jQuery 코드 실행
jQuery(document).ready(init);

function init($) {
    $('.result')
        .html('jQuery 사용 준비 완료!')
        .css('color', '#2C9DA7')
        .myPlugin();
}
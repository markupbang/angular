// jQuery 모듈 로드
var $ = require('jquery');

// jQuery 프로토타입 확장(플러그인 추가)
$.fn.myPlugin = function() {
    return this.each(function(index, el) {
        console.log(el);
    });
};

// 추가된 플러그인 확인(검증)
console.log('$.fn.myPlugin is', typeof $.fn.myPlugin);
'use strict';

var $ = require('jquery');

// 생성자
function TabUI(elem) {
    this.$elem = $(elem);
}

// 생성자 프로토타입
TabUI.prototype = {
    'init': function(options) {
        console.log(options);
    }
}


$.fn.uiTabs = function(options) {
    return this.each(function() {
        return new TabUI(this).init(options);
    })
};

///////////

$('h1').uiTabs('jquery가 정상 작동되고 있습니다.');
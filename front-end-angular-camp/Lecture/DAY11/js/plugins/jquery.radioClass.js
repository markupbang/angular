/*! jquery.radioClass.js © yamoo9.net, 2016 */
(function(exports, $){
    'use strict';

    /**
     * To Do List
     * 전달인자의 기본 값 설정
     */

     var default_class_name = 'on';

    // 검증
    if( !$.fn.radioClass ) {
        // 제작
        $.fn.radioClass = function(class_name) {
            // 초기화 패턴을 사용해서 class_name 결정
            class_name = class_name || default_class_name;

            // 나(클릭한 요소)를 제외한 형제 요소들을 찾아서
            // 해당 클래스를 가진 요소에서 클래스 속성을 제거한다.
            this.siblings('.'+class_name).removeClass(class_name);
            // 그리고 나(클릭한 요소)에게는 해당 클래스를 설정한다.
            this.addClass(class_name);

        };
    }


})(this, this.jQuery);
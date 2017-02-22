/*! 02-collection-manipulation.js © yamoo9.net, 2016 */

(function(exports, $){
    'use strict';

    var arr  = [1, 1, 2, 3, 5, 8, 13, 21, 34],
        arr2 = ['yamoo9', 'fast campus', 'instructor'];

    function init() {

        // [검증] arr는 배열 데이터인가?

        // [검증] 4는 배열 arr의 원소인가?


        // [검증] 13은 배열 arr의 원소인가?


        // [검증] 배열 arr에서 중복되는 내용을 제거하려면?

        // ※ $.unique() 버그 0이 있을 경우 처리 오류
        // https://bugs.jquery.com/ticket/7927


        // [사용자 정의] $.unique() 오류 해결을 위한 메소드 재정의(덮어쓰기)

        // [조작] arr와 arr2를 병합하려면?


        // [조작] arr의 각 원소를 조작하여 새로운 배열을 생성하려면?

        // [조작] arr의 각 원소 중 일부를 필터링하여 새로운 배열을 생성하려면?

        // [조작] 동적으로 요소 생성한 후, 생성된 요소를 수집하여 배열로 변경하려면?

        // [조작] 배열로 변경된 요소 리스트를 필터링하려면?

    }

    $(init);

})(this, this.jQuery);
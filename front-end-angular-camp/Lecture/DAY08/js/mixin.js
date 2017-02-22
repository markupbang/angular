/*! mixin.js © yamoo9.net, 2016 */
// 모듈 패턴(초기화 패턴)
;(function(exports){
    'use strict';

    // 비공개 멤버
    var toString   = Object.prototype.toString,
        slice      = Array.prototype.slice,
        forEach    = Array.prototype.forEach,
        shift      = Array.prototype.shift,
        arr_string = '[object Array]';

    // 인자에 따라 기능을 변경하는 팩토리 패턴을 사용하여
    // 얕은 복사와 깊은 복사를 동시에 처리가능한 헬퍼 함수
    function extend(parent, child, deep) {
    // function extend() {

    //     if ( typeof arguments[0] === 'boolean' ) {
    //         // 깊은 복사
    //     } else {
    //         // 얕은 복사
    //     }

        // 초기화 과정
        child = child || {};
        deep = deep || false;

        // 객체를 반복 순환 탐색
        for (var key in parent) {
            var value = parent[key];
            // 자신만의 속성을 골라내는 조건 확인
            if ( parent.hasOwnProperty(key) ) {
                // value 변수가 참조하는 값이 객체/배열이라면
                // 깊은 복사
                // 단, deep 변수가 참일 경우에만 수행
                if ( typeof value === 'object' && deep ) {
                    // value 배열인지
                    // if ( toString.call(value) === arr_string ) {
                    //     child[key] = [];
                    // }
                    // value 객체인지
                    // else {
                    //     child[key] = {};
                    // }
                    child[key] = toString.call(value) === arr_string ? [] : {};
                    // 재귀함수
                    extend(value, child[key], true);
                } else {
                    // 얕은 복사
                    child[key] = value;
                }
            }
        }
        // 반복 순환 처리된 child 객체를 반환
        return child;
    }

    // 공개를 할 멤버
    function mixin() {
        // 비공개 멤버인 extend() 활용
        // 유사 배열인가?
        // length 속성은 소유했으나,
        // push, shift, unshift, slice, ... , forEach

        // 1.
        // for문을 돌릴 수 있다.
        // var mixin_obj = {},
        //     i         = 0,
        //     is_deep   = typeof arguments[0] === 'boolean',
        //     deep      = is_deep ? arguments[0] : false,
        //     args      = is_deep ? slice.call(arguments, 1) : arguments,
        //     l         = args.length;
        // for ( ; i<l; i+=1 ) {
        //     // 객체를 합성(mixin)한다.
        //     // 객체의 총 개수는 l 카운트 만큼 반복된다.
        //     // 객체를 합성하는 일을 수행하는 함수를 소유했는가?
        //     mixin_obj = extend(args[i], mixin_obj, deep);
        // }

        // 2.
        // 유사배열에 배열의 메소드를 빌려쓸 수 있다.
        // var deep = false, mixin_obj = {};
        // forEach.call(arguments, function(arg, index) {
        //     if (index === 0 && (typeof arg === 'boolean') ) {
        //         // 초기 순서
        //         deep = arg;
        //     } else {
        //         // 객체 합성
        //         extend(arg, mixin_obj, deep);
        //     }
        // });

        // 3.
        // 유사 배열을 배열로 바꾸면..
        // 배열의 메소드를 사용할 수 있다.
        var mixin_obj = {},
            deep      = false,
            args      = slice.call(arguments); // 배열화

        // console.log( toString.call(args) === arr_string ); // 배열 변경된 사항 확인
        args.forEach(function(arg, index) {
            // 객체 합성
            if (index === 0 && typeof arg === 'boolean') {
                deep = arg;
            } else {
                extend(arg, mixin_obj, deep);
            }
        });

        return mixin_obj;
    }

    // 노출패턴
    exports.mixin = mixin;

})(this);
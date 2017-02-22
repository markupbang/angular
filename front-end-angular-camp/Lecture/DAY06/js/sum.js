function sum() {

    // 사용자가 전달한 인자 === arguments
    // arguments는 함수 내부에서만 생성, 참조
    // arguments는 length 속성을 가짐.
    // arguments는 배열은 아니다. (유사 배열)
    // arguments를 생성한 것은 배열이 아니라, 객체이다.
    // [1, 3, 5, 7, 9]
    var i, args_len = arguments.length, total = 0; // 5

    // while문 예시
    // while( args_len-- ) {
    //     // console.log(args_len); // 4, 3, 2, 1, 0
    //     total += arguments[args_len];
    // }

    // for문 예시
    // for ( i=0; i<args_len; i+=1 ) {
    //     total += arguments[i];
    // }

    // forEach문 예시
    // 배열 적용이 가능하나, 유사 배열은 적용할 수 없다.
    // 1. 메소드 빌려쓰기
    // Array.prototype.forEach.call(arguments, function(arg, index) {
    //     total += arg;
    // });

    // console.log( arguments instanceof Array );

    // 2. 유사배열을 배열로 변경하는 방법
    var args_arr = Array.prototype.slice.call(arguments);

    // console.log( args_arr instanceof Array );

    args_arr.forEach(function(arg, index) {
        total += arg;
    });

    return total;

}

sum( 1, 3, 5, 7, 9 ); // 합산된 결과
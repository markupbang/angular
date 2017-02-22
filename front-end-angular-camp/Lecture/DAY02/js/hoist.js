// 호이스트 현상을 테스트하는 예제

// Javascript 함수는 전역과 구분되는 별도의 공간(Scope)을 가진다.
function indpFn() {
    // 호이스트 현상 발생
    // var global_var; // undefined
    // globar_var 변수의 조건 확인 값은 거짓이 된다.
    if (global_var) {
        var global_var = true;
        console.log('global_var is True!');
    } else {
        console.log('global_var is False');
    }
}

var global_var = '전역 변수';



indpFn(); // console에 기록되는 값?!
/**
 * --------------------------------
 * DOM Helper Library
 * ----------------------------- */
/**
 * 문서객체를 손쉽게 선택할 수 있도록 도와주는 함수
 * @param  {String}              selector  CSS 선택자
 * @param  {ElementNode, String} context   컨텍스트 요소노드 또는 CSS 선택자
 * @return {NodeList, Array}               수집된 문서 요소 리스트
 */
function query(selector, context) {

    // 만약 사용자가 context 설정 값을 전달하지 않은 경우라면?
    // if ( typeof context === 'undefined' ) {
    if ( !context ) {
        context = document;
    }

    // 만약 전달받은 context가 문자 데이터 유형이라면?
    if (typeof context === 'string') {
        context = query(context);
    }

    // context.length 속성 유무에 따라 코드 분기
    if (context.length) {
        // _nodeList는 호이스트 되지만,
        // 아래 코드에서는 큰 문제가 발생하지 않음.
        var _nodeList = [];
        // 헬퍼함수 each 재사용
        each(context, function(item){
            // 마치 2중 for 문처럼 다시 each 함수 사용
            each(query(selector, item), function(item){
                _nodeList.push(item);
            });
        });
        // 수집된 _nodeList 반환
        return _nodeList;
    } else {
        // context 객체가 하나일 경우, 간단하게 결과 반환
        return context.querySelectorAll(selector);
    }

}


/**
 * 리스트(집합)를 반복 순환하여 처리하는 헬퍼 함수
 * @param  {array, like-array} data       배열, 유사배열
 * @param  {function}          callback   콜백함수
 * @return {undefined}                    함수 반환 값 없음
 */
function each(data, callback) {

    if ( !data.length || isString(data) ) {
        console.error('배열 또는 유사배열 데이터 유형만 처리가 가능합니다.');
    }

    if ( !isFunction(callback) ) {
        console.error('함수 데이터 유형만 처리가 가능합니다.');
    }

    if ( Array.isArray(data) ) {
        data.forEach(callback);
    } else {
        [].forEach.call(data, callback);
    }

}

/**
 * Javascript 데이터 유형을 감지하여 올바르게 값을 반환하는 함수
 * @param  {all_data_format} data 모든 데이터 유형이 전달될 수 있음
 * @return {String}      데이터 유형 이름을 문자열로 반환
 */
function type(data) {
    // Object.prototype.toString 메소드 빌려쓰기
    return Object.prototype.toString.call(data).toLowerCase().slice(8,-1);
}
// type 함수를 재사용하여 결과 값을 true | false로 설정
function isNumber(data) {
    return type(data) === 'number';
}

function isString(data) {
    return type(data) === 'string';
}

function isBoolean(data) {
    return type(data) === 'boolean';
}

function isFunction(data) {
    return type(data) === 'function';
}

function isArray(data) {
    return type(data) === 'array';
}

function isObject(data) {
    return type(data) === 'object';
}
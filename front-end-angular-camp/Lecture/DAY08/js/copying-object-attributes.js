/*! copying-object-attributes.js © yamoo9.net, 2016 */
// 코드 재사용 패턴
// 객체 속성 복사 패턴
// 믹스-인 패턴

// 복사하는 헬퍼 함수
// 가벼운 복사(Shallow Copy)
function extend(parent, child) {
    var key, value;
    // child 객체 인자가 전달되지 않았을 경우
    child = child || {};
    // parent 객체의 속성을 반복 순환하여
    // 자신만의 속성인지를 검증한 후,
    // 자신의 속성만을 자식 객체에 복사해준다.
    for(key in parent) {
        value = parent[key];
        if ( parent.hasOwnProperty(key) ) {
            child[key] = value;
        }
    }
    // 반환(객체)
    return child;
}
// 부모 객체
var tabmenu = {
    'role': '탭 메뉴',
    'version': '0.0.1',
    'assigned_elements': ['.tab', '.footer-tab'],
    'init': function() {},
    'methods': {
        'nextTab': function() {},
        'prevTab': function() {},
        'playSlide': function() {},
        'stopSlide': function() {}
    }
};

// 자식 객체
var tab = extend(tabmenu);
console.log( tab );


// 복사하는 헬퍼 함수
// 깊은 복사(Deep Copy)
function extendDeep(parent, child) {
    var key, value;
    // child 초기화
    child = child || {};

    // parent 객체의 능력을 child 객체에 복사
    for ( key in parent ) {
        value = parent[key];
        if ( parent.hasOwnProperty(key) ) {
            // 만약... parent[key] 데이터 유형이
            // 복잡한 데이터 유형인 객체 또는 배열이라면
            if ( typeof value === 'object' ) {
                // 어떻게? 깊은 복사를???
                // 만약 value 값이 배열이라면?
                // child[key] = []
                // 만약 value 값이 객체라면?
                // child[key] = {}
                // if ( value instanceof Array ) {
                // if ( Array.isArray(value) ) { // ES5
                //     child[key] = [];
                // } else {
                //     child[key] = {};
                // }
                // 한 줄 코드로 변경
                child[key] = Array.isArray(value) ? [] : {};
                // 재귀 함수
                extendDeep(value, child[key]);
            } else {
                child[key] = value;
            }
        }
    }

    // 처리된 child를 반환
    return child;
}

// 자식 객체
var tab_deep = extendDeep(tabmenu);
console.log( tab_deep );
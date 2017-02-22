// 호이스트(Hoist: 끌어 올리다) 현상
// 현재 영역(Scope)의 최상단으로 변수 이름 또는 함수 선언문이 끌어올려지는 것을 말한다.
// 함수 선언문
// 변수 이름 선언 구간
var body, param, param_text, divi, divi_text, getElement;

// DOM Scripting
// <p> 요소를 동적으로 생성해서
// class 속성 값을 result 설정하고
// 동적으로 js 변수에 할당된 문자열 값을 텍스트 노드로 생성합니다.
// 그리고 <p> 요소에 마지막 자식 콘텐츠로 추가합니다.
// <body>의 요소의 마지막 자식 요소로 추가합니다.

body = document.querySelector('body');
param = document.createElement('p');
param_text = document.createTextNode(fast_campus.js);
param.setAttribute('class', 'result');
param.appendChild(param_text);
body.appendChild(param);

// 오류 발생!!!
// 함수 표현식은 변수에 함수 값을 할당하는 방식이기 때문에
// 호이스트 시에 변수 이름만 스코프의 상위로 이동하여 함수 값이
// 변수에 할당되는 시점이 함수 호출 이후이기 때문에 오류가 발생한다.
var result = getElement('.result + *'); // [div.result]

getElement = function (selector) {
    return document.querySelector(selector);
}

divi = document.createElement('div');
divi_text = document.createTextNode(kipfa.js);
divi.setAttribute('class', 'result');
divi.appendChild(divi_text);
body.appendChild(divi);

var result = getElement('.result'); // [p.result]
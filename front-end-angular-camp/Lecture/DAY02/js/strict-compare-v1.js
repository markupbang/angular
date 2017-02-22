// strict-compare.js
// 느슨한 비교연산과 엄격한 비교연산 데모

var targetEl = document.querySelector('.target-el');
var taregtElFirstA = targetEl.querySelector('li:first-child a');

// CSS 디자이너가 HTML 문서와 분리하여 설정한 스타일 값을 가져오도록 합니다.
var taregtElFirstA_fontSize = window.getComputedStyle(taregtElFirstA,'').fontSize;

// console.log(taregtElFirstA_fontSize);

// 동적으로 버튼과 버튼 텍스트를 생성
var increaseBtn = document.createElement('a');
var increaseBtnText = document.createTextNode('increase');
// 생성된 버튼에 버튼의 역할과 속성을 설정합니다.
// 하이퍼링크 역할을 버튼으로 덮어씀.
increaseBtn.setAttribute('role', 'button');
// 포커스 요소로 설정
increaseBtn.setAttribute('href', '');
// Javascript를 사용하여 버튼 스타일링
increaseBtn.style.display       = 'inline-block';
increaseBtn.style.marginBottom  = '0.625rem';
increaseBtn.style.padding       = '0.325rem 0.875rem';
increaseBtn.style.color         = '#AEA28F';
increaseBtn.style.border        = '1px solid';
increaseBtn.style.borderRadius  = '0.25rem';

taregtElFirstA.style.fontSize   = '1.375rem';
taregtElFirstA.style.transition = 'all 0.3s';

// 문서의 nav.target-el에 생성한 버튼을 마지막 자식요소로 추가합니다.
increaseBtn.appendChild( increaseBtnText );
// targetEl.appendChild( increaseBtn );
targetEl.insertBefore(increaseBtn, targetEl.firstElementChild);


// 버튼에 click 이벤트를 설정합니다.
increaseBtn.addEventListener('click', function(event) {
    // 브라우저가 처리하는 기본 동작을 차단
    event.preventDefault();
    // 이벤트 전파를 차단하려면
    // event.stopPropagation();
    // 버튼을 사용자가 누르면, 첫번째 a요소의 글자 크기를 2px 만큼씩 키웁니다.
    // GET
    // 개발자가 직접 붙이는 인라인 스타일은... ㅠㅡㅠ 아니되옵니다..
    // 인라인 스타일은 자바스크립트에게 양보하세요!
    // taregtElFirstA.style.fontSize; // ????
    // W3C 브라우저 엔진으로부터 계산된 CSS 설정 값을 GET
    var getValue = window.getComputedStyle(taregtElFirstA,'').fontSize;
    var setValue = window.parseInt(getValue, 10) + 4 + 'px';
    taregtElFirstA.style.fontSize = setValue;
});

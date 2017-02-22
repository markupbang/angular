// dom-helper.js 파일에 의존
// strict-compare.js
// var targetEl                = document.querySelector('.target-el');
var targetEl                = query('.target-el')[0];
// var taregtElFirstA          = targetEl.querySelector('li:first-child a');
// var taregtElFirstA          = query('li:first-child a', '.target-el' );
var taregtElFirstA          = query('li:first-child a', query('.target-el')[0] )[0];

var taregtElFirstA_fontSize = window.getComputedStyle(taregtElFirstA,'').fontSize;

var increaseBtn             = document.createElement('a');
var increaseBtnText         = document.createTextNode('increase');

var decreaseBtn             = document.createElement('a');
var decreaseBtnText         = document.createTextNode('decrease');

increaseBtn.setAttribute('role', 'button');
increaseBtn.setAttribute('href', '');

decreaseBtn.setAttribute('role', 'button');
decreaseBtn.setAttribute('href', '');

// increaseBtn.style.display       = 'inline-block';
// increaseBtn.style.marginBottom  = '0.625rem';
// increaseBtn.style.padding       = '0.325rem 0.875rem';
// increaseBtn.style.color         = '#AEA28F';
// increaseBtn.style.border        = '1px solid';
// increaseBtn.style.borderRadius  = '0.25rem';

// decreaseBtn.style.display       = 'inline-block';
// decreaseBtn.style.marginBottom  = '0.625rem';
// decreaseBtn.style.marginLeft    = '0.625rem';
// decreaseBtn.style.padding       = '0.325rem 0.875rem';
// decreaseBtn.style.color         = '#AEA28F';
// decreaseBtn.style.border        = '1px solid';
// decreaseBtn.style.borderRadius  = '0.25rem';

// CSS 속성:값 스타일 구문을 문자열로 만들어 .style.cssText 값으로 대입하는 방법
// var cssCode = 'display:inline-block;marginBottom:0.625rem;padding:0.325rem 0.875rem;color:#AEA28F;border:1px solid;border-radius:0.25rem;';
// increaseBtn.style.cssText = cssCode;

// CSS 클래스 속성 값을 설정
// increaseBtn.classList.add('increase');
// decreaseBtn.classList.add('decrease');

taregtElFirstA.style.fontSize   = '1.375rem';
taregtElFirstA.style.transition = 'all 0.3s';

increaseBtn.appendChild( increaseBtnText );
decreaseBtn.appendChild( decreaseBtnText );

targetEl.insertBefore(decreaseBtn, targetEl.firstElementChild);
targetEl.insertBefore(increaseBtn, targetEl.firstElementChild);

increaseBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var getValue = window.getComputedStyle(taregtElFirstA,'').fontSize;
    var setValue = window.parseInt(getValue, 10) + 4 + 'px';
    taregtElFirstA.style.fontSize = setValue;
});

decreaseBtn.addEventListener('click', function(event) {
    event.preventDefault();
    var getValue = window.getComputedStyle(taregtElFirstA,'').fontSize;
    var setValue = window.parseInt(getValue, 10) - 4 + 'px';
    taregtElFirstA.style.fontSize = setValue;
});
// dom-helper.js 파일에 의존
// strict-compare.js

/**
 * --------------------------------
 * nav a 클릭 이벤트 핸들링
 * a를 사용자가 클릭하면
 * a 요소의 href 속성 값을
 * console.log로 기록하세요.
 * ----------------------------- */
var nav_links = query('nav a');

// console.log( nav_links );

each(nav_links, function(item, index) {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        console.log( e.target.getAttribute('href') );
    });
});
var brand = 'Samsung',
    watch = 'Samsung Watch',
    // CommonJS 진영 명세를 지원하는 Node.js 서버 환경에서 모듈 로드하는 방법
    appleProduct = require('./apple');

function samsungProduct() {
    console.log(brand + ', ' + watch + '.');
}

samsungProduct();

// console.log( typeof appleProduct );
appleProduct();
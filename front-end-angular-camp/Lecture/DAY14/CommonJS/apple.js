var brand = 'Apple',
    watch = 'Apple Watch';

function releaseProduct() {
    console.log(brand + ', ' + watch + '.');
}

function a1() {

}

function a2() {

}

// 값 자체를 내보낼 때
module.exports = releaseProduct;
// module.exports = {
//     'a': a1,
//     'b': a2
// };

// 객체를 내보낼 때
// exports.a = a1;
// exports.b = a2;
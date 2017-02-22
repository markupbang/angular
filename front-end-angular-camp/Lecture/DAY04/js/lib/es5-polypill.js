// 문서가 서버로부터 다운로드되어
// 파싱될 때 한번만 확인하면 되는 것을 수행
// Array.isArray ??
// Array.prototype.forEach ??

if (!Array.isArray) {
    Array.isArray = function(data) {
        return data instanceof Array;
    }
}

// 전달받은 데이터(유사배열)를 배열로 변환해주는 함수
if (!Array.makeArray) {
    Array.makeArray = function(like_arr) {
        var maked_array = [];
        if ( !Array.isArray(like_arr) ) {
            Array.prototype.forEach.call(like_arr, function(item, index, array) {
                maked_array.push(item);
            });
            return maked_array;
        }
    }
}

if (!Array.prototype.forEach) {
    // Array.prototype.forEach 이 존재하지 않는
    // 구형 브라우저에서는 Array.prototype.forEach 정의
    // ※ ES5에서 표준화된(검증된) 메소드이기 때문에 안심하고 확장한다.
    // 하지만 표준화 결정이 되지 않은 것을 확장하는 것은 좋지 않은 안티패턴이다.
    Array.prototype.forEach = function(callback) {
        // 배열 인스턴스 참조 변수 설정
        var that = this;
        // 검증 : callback은 함수여야만 한다.
        if ( typeof callback !== 'function' ) {
            var _error_obj_type = Object.prototype.toString.call(callback).slice(8,-1);
            throw new Error('Uncaught TypeError: #<'+ _error_obj_type +'> is not a function');
        }
        // forEach 역할이 구현화되지 않은 웹 브라우저에서 구현되도록 추상화
        for (var i=0, l=that.length; i<l; i+=1) {
            callback(that[i], i, that);
        }
    }
}
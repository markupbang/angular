'use strict';



var toString = Object.prototype.toString;

// 믹스인 패턴
function _extend(a, b) {
    for(var key in b) {
        if ( b.hasOwnProperty(key) ) {
            a[key] = b[key];
        }
    }
}
function extend() {
    var r = {};
    // 배열 프로토타입 객체의 forEach 메소드 빌려쓰기
    [].forEach.call(arguments, function(item, index) {
        _extend(r, item);
    });
    return r;
}

/**
 * LocalStorage를 사용한 모델 데이터 관리
 */
var Model = function(data) {
    // new를 강제화하는 패턴
    if ( !(this instanceof Model) ) { return new Model(data); }
    this.init(data);
};

Model.prototype = {
    /**
     * 모델 인스턴스 초기화
     * @member of Model.prototype
     * @param  {object} data 사용자가 저장하고자 하는 데이터
     * @return {this}      메소드 체이닝을 위한 인스턴스 객체 반환
     */
    'init': function(data) {
        this.DATA_NAME = 'angular-camp-' + Math.ceil(Math.random()*1000);
        var type = toString.call(data).slice(8,-1).toLowerCase();
        if (type === 'object') {
            this.data = data;
        } else {
            this.data = {};
        }
        return this;
    },
    'save': function(data) {
        // 믹스인 패턴 사용 (객체 합성)
        this.data = extend(this.data, data);
        // 객체를 JSON 문자열로 변경
        var _data = JSON.stringify(this.data);
        // 로컬 스토리지에 저장
        localStorage.setItem(this.DATA_NAME, _data);
        return this;
    },
    'load': function() {
        // localStorage에서 저장된 데이터 값을 가져와야 한다.
        var getData = localStorage.getItem(this.DATA_NAME);
        // 가져온 데이터(문자열)를 객체로 변경한다.
        var convertData = JSON.parse(getData);
        // 변경된 객체를 반환한다.
        return convertData;
    },
    'clear': function() {
        // 저장된 데이터를 지운다.
        localStorage.removeItem(this.DATA_NAME);
    }
};

// module.exports = Model;


// exports.load = function() {
//     console.log('model data load');
// };

// module.exports = {
//     load: function() {
//         console.log('model data load');
//     }
// };
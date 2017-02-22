(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// var data = '초기 상태';
// // 객체 유형의 데이터
// var objData = {
//     'framework': 'Angular',
//     'library': 'Susy',
//     'template': 'Jade'
// };
// var convertJsonTypeObjData = null;

// if ( this.localStorage ) {

//     // 데이터 쓰기 (문자열)
//     this.localStorage.setItem('angular-camp', data);

//     // 데이터 읽기
//     this.localStorage.getItem('angular-camp');

//     // 먼저 객체 유형을 JSON 문자열로 변경해야 한다.
//     convertJsonTypeObjData = JSON.stringify(objData);
//     // 데이터 쓰기 (객체 유형을 저장)
//     this.localStorage.setItem('angular-camp', convertJsonTypeObjData);

//     // 데이터 읽기
//     var loadedData = this.localStorage.getItem('angular-camp');

//     // 가져온 데이터(객체)의 멤버에 접근 콘솔에 출력
//     // JSON 문자열을 해석(Parse)하여 객체화 시키는 과정을 거쳐야 한다.
//     console.log( JSON.parse(loadedData).library ); // Susy

// }

// 모듈 호출 require();
var controller = require('./controller');

if ( typeof controller === 'function' ) {
    // 실행
    controller();
} else {
    console.log('constroller는 함수가 아닙니다.');
    if (controller.action) {
        controller.action();
    }
}

},{"./controller":2}],2:[function(require,module,exports){
'use strict';

var model = require('./model'),
    view = require('./view');

// module.exports 는 정의된 값만 내보냄
// 반면 exports는 객체를 내보냄

// module.exports = function() {
//     return model.load() + view.render();
// };

exports.action = function() {
    return ( model.load ? model.load() : 'model dont have load method' ) + view.render();
};

exports.memory = [];
},{"./model":3,"./view":4}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
'use strict';

exports.render = function() {
    console.log('view render');
};

// module.exports = {
//     render: function() {
//         console.log('view render');
//     }
// };
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJtb2R1bGVzL2FwcC5qcyIsIm1vZHVsZXMvY29udHJvbGxlci5qcyIsIm1vZHVsZXMvbW9kZWwuanMiLCJtb2R1bGVzL3ZpZXcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25GQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcblxuLy8gdmFyIGRhdGEgPSAn7LSI6riwIOyDge2DnCc7XG4vLyAvLyDqsJ3ssrQg7Jyg7ZiV7J2YIOuNsOydtO2EsFxuLy8gdmFyIG9iakRhdGEgPSB7XG4vLyAgICAgJ2ZyYW1ld29yayc6ICdBbmd1bGFyJyxcbi8vICAgICAnbGlicmFyeSc6ICdTdXN5Jyxcbi8vICAgICAndGVtcGxhdGUnOiAnSmFkZSdcbi8vIH07XG4vLyB2YXIgY29udmVydEpzb25UeXBlT2JqRGF0YSA9IG51bGw7XG5cbi8vIGlmICggdGhpcy5sb2NhbFN0b3JhZ2UgKSB7XG5cbi8vICAgICAvLyDrjbDsnbTthLAg7JOw6riwICjrrLjsnpDsl7QpXG4vLyAgICAgdGhpcy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSgnYW5ndWxhci1jYW1wJywgZGF0YSk7XG5cbi8vICAgICAvLyDrjbDsnbTthLAg7J296riwXG4vLyAgICAgdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYW5ndWxhci1jYW1wJyk7XG5cbi8vICAgICAvLyDrqLzsoIAg6rCd7LK0IOycoO2YleydhCBKU09OIOusuOyekOyXtOuhnCDrs4Dqsr3tlbTslbwg7ZWc64ukLlxuLy8gICAgIGNvbnZlcnRKc29uVHlwZU9iakRhdGEgPSBKU09OLnN0cmluZ2lmeShvYmpEYXRhKTtcbi8vICAgICAvLyDrjbDsnbTthLAg7JOw6riwICjqsJ3ssrQg7Jyg7ZiV7J2EIOyggOyepSlcbi8vICAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbmd1bGFyLWNhbXAnLCBjb252ZXJ0SnNvblR5cGVPYmpEYXRhKTtcblxuLy8gICAgIC8vIOuNsOydtO2EsCDsnb3quLBcbi8vICAgICB2YXIgbG9hZGVkRGF0YSA9IHRoaXMubG9jYWxTdG9yYWdlLmdldEl0ZW0oJ2FuZ3VsYXItY2FtcCcpO1xuXG4vLyAgICAgLy8g6rCA7KC47JioIOuNsOydtO2EsCjqsJ3ssrQp7J2YIOuppOuyhOyXkCDsoJHqt7wg7L2Y7IaU7JeQIOy2nOugpVxuLy8gICAgIC8vIEpTT04g66y47J6Q7Je07J2EIO2VtOyEnShQYXJzZSntlZjsl6wg6rCd7LK07ZmUIOyLnO2CpOuKlCDqs7zsoJXsnYQg6rGw7LOQ7JW8IO2VnOuLpC5cbi8vICAgICBjb25zb2xlLmxvZyggSlNPTi5wYXJzZShsb2FkZWREYXRhKS5saWJyYXJ5ICk7IC8vIFN1c3lcblxuLy8gfVxuXG4vLyDrqqjrk4gg7Zi47LacIHJlcXVpcmUoKTtcbnZhciBjb250cm9sbGVyID0gcmVxdWlyZSgnLi9jb250cm9sbGVyJyk7XG5cbmlmICggdHlwZW9mIGNvbnRyb2xsZXIgPT09ICdmdW5jdGlvbicgKSB7XG4gICAgLy8g7Iuk7ZaJXG4gICAgY29udHJvbGxlcigpO1xufSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnY29uc3Ryb2xsZXLripQg7ZWo7IiY6rCAIOyVhOuLmeuLiOuLpC4nKTtcbiAgICBpZiAoY29udHJvbGxlci5hY3Rpb24pIHtcbiAgICAgICAgY29udHJvbGxlci5hY3Rpb24oKTtcbiAgICB9XG59XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBtb2RlbCA9IHJlcXVpcmUoJy4vbW9kZWwnKSxcbiAgICB2aWV3ID0gcmVxdWlyZSgnLi92aWV3Jyk7XG5cbi8vIG1vZHVsZS5leHBvcnRzIOuKlCDsoJXsnZjrkJwg6rCS66eMIOuCtOuztOuDhFxuLy8g67CY66m0IGV4cG9ydHPripQg6rCd7LK066W8IOuCtOuztOuDhFxuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xuLy8gICAgIHJldHVybiBtb2RlbC5sb2FkKCkgKyB2aWV3LnJlbmRlcigpO1xuLy8gfTtcblxuZXhwb3J0cy5hY3Rpb24gPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKCBtb2RlbC5sb2FkID8gbW9kZWwubG9hZCgpIDogJ21vZGVsIGRvbnQgaGF2ZSBsb2FkIG1ldGhvZCcgKSArIHZpZXcucmVuZGVyKCk7XG59O1xuXG5leHBvcnRzLm1lbW9yeSA9IFtdOyIsIid1c2Ugc3RyaWN0JztcblxuXG5cbnZhciB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5cbi8vIOuvueyKpOyduCDtjKjthLRcbmZ1bmN0aW9uIF9leHRlbmQoYSwgYikge1xuICAgIGZvcih2YXIga2V5IGluIGIpIHtcbiAgICAgICAgaWYgKCBiLmhhc093blByb3BlcnR5KGtleSkgKSB7XG4gICAgICAgICAgICBhW2tleV0gPSBiW2tleV07XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBleHRlbmQoKSB7XG4gICAgdmFyIHIgPSB7fTtcbiAgICAvLyDrsLDsl7Qg7ZSE66Gc7Yag7YOA7J6FIOqwneyytOydmCBmb3JFYWNoIOuplOyGjOuTnCDruYzroKTsk7DquLBcbiAgICBbXS5mb3JFYWNoLmNhbGwoYXJndW1lbnRzLCBmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgICBfZXh0ZW5kKHIsIGl0ZW0pO1xuICAgIH0pO1xuICAgIHJldHVybiByO1xufVxuXG4vKipcbiAqIExvY2FsU3RvcmFnZeulvCDsgqzsmqntlZwg66qo6424IOuNsOydtO2EsCDqtIDrpqxcbiAqL1xudmFyIE1vZGVsID0gZnVuY3Rpb24oZGF0YSkge1xuICAgIC8vIG5ld+ulvCDqsJXsoJztmZTtlZjripQg7Yyo7YS0XG4gICAgaWYgKCAhKHRoaXMgaW5zdGFuY2VvZiBNb2RlbCkgKSB7IHJldHVybiBuZXcgTW9kZWwoZGF0YSk7IH1cbiAgICB0aGlzLmluaXQoZGF0YSk7XG59O1xuXG5Nb2RlbC5wcm90b3R5cGUgPSB7XG4gICAgLyoqXG4gICAgICog66qo6424IOyduOyKpO2EtOyKpCDstIjquLDtmZRcbiAgICAgKiBAbWVtYmVyIG9mIE1vZGVsLnByb3RvdHlwZVxuICAgICAqIEBwYXJhbSAge29iamVjdH0gZGF0YSDsgqzsmqnsnpDqsIAg7KCA7J6l7ZWY6rOg7J6QIO2VmOuKlCDrjbDsnbTthLBcbiAgICAgKiBAcmV0dXJuIHt0aGlzfSAgICAgIOuplOyGjOuTnCDssrTsnbTri53snYQg7JyE7ZWcIOyduOyKpO2EtOyKpCDqsJ3ssrQg67CY7ZmYXG4gICAgICovXG4gICAgJ2luaXQnOiBmdW5jdGlvbihkYXRhKSB7XG4gICAgICAgIHRoaXMuREFUQV9OQU1FID0gJ2FuZ3VsYXItY2FtcC0nICsgTWF0aC5jZWlsKE1hdGgucmFuZG9tKCkqMTAwMCk7XG4gICAgICAgIHZhciB0eXBlID0gdG9TdHJpbmcuY2FsbChkYXRhKS5zbGljZSg4LC0xKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmRhdGEgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9LFxuICAgICdzYXZlJzogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAvLyDrr7nsiqTsnbgg7Yyo7YS0IOyCrOyaqSAo6rCd7LK0IO2VqeyEsSlcbiAgICAgICAgdGhpcy5kYXRhID0gZXh0ZW5kKHRoaXMuZGF0YSwgZGF0YSk7XG4gICAgICAgIC8vIOqwneyytOulvCBKU09OIOusuOyekOyXtOuhnCDrs4Dqsr1cbiAgICAgICAgdmFyIF9kYXRhID0gSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKTtcbiAgICAgICAgLy8g66Gc7LusIOyKpO2GoOumrOyngOyXkCDsoIDsnqVcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0odGhpcy5EQVRBX05BTUUsIF9kYXRhKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfSxcbiAgICAnbG9hZCc6IGZ1bmN0aW9uKCkge1xuICAgICAgICAvLyBsb2NhbFN0b3JhZ2Xsl5DshJwg7KCA7J6l65CcIOuNsOydtO2EsCDqsJLsnYQg6rCA7KC47JmA7JW8IO2VnOuLpC5cbiAgICAgICAgdmFyIGdldERhdGEgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGlzLkRBVEFfTkFNRSk7XG4gICAgICAgIC8vIOqwgOyguOyYqCDrjbDsnbTthLAo66y47J6Q7Je0KeulvCDqsJ3ssrTroZwg67OA6rK97ZWc64ukLlxuICAgICAgICB2YXIgY29udmVydERhdGEgPSBKU09OLnBhcnNlKGdldERhdGEpO1xuICAgICAgICAvLyDrs4Dqsr3rkJwg6rCd7LK066W8IOuwmO2ZmO2VnOuLpC5cbiAgICAgICAgcmV0dXJuIGNvbnZlcnREYXRhO1xuICAgIH0sXG4gICAgJ2NsZWFyJzogZnVuY3Rpb24oKSB7XG4gICAgICAgIC8vIOyggOyepeuQnCDrjbDsnbTthLDrpbwg7KeA7Jq064ukLlxuICAgICAgICBsb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLkRBVEFfTkFNRSk7XG4gICAgfVxufTtcblxuLy8gbW9kdWxlLmV4cG9ydHMgPSBNb2RlbDtcblxuXG4vLyBleHBvcnRzLmxvYWQgPSBmdW5jdGlvbigpIHtcbi8vICAgICBjb25zb2xlLmxvZygnbW9kZWwgZGF0YSBsb2FkJyk7XG4vLyB9O1xuXG4vLyBtb2R1bGUuZXhwb3J0cyA9IHtcbi8vICAgICBsb2FkOiBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coJ21vZGVsIGRhdGEgbG9hZCcpO1xuLy8gICAgIH1cbi8vIH07IiwiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnRzLnJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICAgIGNvbnNvbGUubG9nKCd2aWV3IHJlbmRlcicpO1xufTtcblxuLy8gbW9kdWxlLmV4cG9ydHMgPSB7XG4vLyAgICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbi8vICAgICAgICAgY29uc29sZS5sb2coJ3ZpZXcgcmVuZGVyJyk7XG4vLyAgICAgfVxuLy8gfTsiXX0=

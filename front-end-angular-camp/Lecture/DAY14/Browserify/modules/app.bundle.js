(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var data = '초기 상태';
// 객체 유형의 데이터
var objData = {
    'framework': 'Angular',
    'library': 'Susy',
    'template': 'Jade'
};
var convertJsonTypeObjData = null;

if ( this.localStorage ) {

    // 데이터 쓰기 (문자열)
    this.localStorage.setItem('angular-camp', data);

    // 데이터 읽기
    this.localStorage.getItem('angular-camp');

    // 먼저 객체 유형을 JSON 문자열로 변경해야 한다.
    convertJsonTypeObjData = JSON.stringify(objData);
    // 데이터 쓰기 (객체 유형을 저장)
    this.localStorage.setItem('angular-camp', convertJsonTypeObjData);

    // 데이터 읽기
    var loadedData = this.localStorage.getItem('angular-camp');

    // 가져온 데이터(객체)의 멤버에 접근 콘솔에 출력
    console.log( loadedData.library ); // Susy

}

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
    return model.load() + view.render();
};
},{"./model":3,"./view":4}],3:[function(require,module,exports){
'use strict';

exports.load = function() {
    console.log('model data load');
};

// module.exports = {
//     load: function() {
//         console.log('model data load');
//     }
// };
},{}],4:[function(require,module,exports){
'use strict';

module.exports = {
    render: function() {
        console.log('view render');
    }
};
},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIm1vZHVsZXMvYXBwLmpzIiwibW9kdWxlcy9jb250cm9sbGVyLmpzIiwibW9kdWxlcy9tb2RlbC5qcyIsIm1vZHVsZXMvdmlldy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgZGF0YSA9ICfstIjquLAg7IOB7YOcJztcbi8vIOqwneyytCDsnKDtmJXsnZgg642w7J207YSwXG52YXIgb2JqRGF0YSA9IHtcbiAgICAnZnJhbWV3b3JrJzogJ0FuZ3VsYXInLFxuICAgICdsaWJyYXJ5JzogJ1N1c3knLFxuICAgICd0ZW1wbGF0ZSc6ICdKYWRlJ1xufTtcbnZhciBjb252ZXJ0SnNvblR5cGVPYmpEYXRhID0gbnVsbDtcblxuaWYgKCB0aGlzLmxvY2FsU3RvcmFnZSApIHtcblxuICAgIC8vIOuNsOydtO2EsCDsk7DquLAgKOusuOyekOyXtClcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5zZXRJdGVtKCdhbmd1bGFyLWNhbXAnLCBkYXRhKTtcblxuICAgIC8vIOuNsOydtO2EsCDsnb3quLBcbiAgICB0aGlzLmxvY2FsU3RvcmFnZS5nZXRJdGVtKCdhbmd1bGFyLWNhbXAnKTtcblxuICAgIC8vIOuovOyggCDqsJ3ssrQg7Jyg7ZiV7J2EIEpTT04g66y47J6Q7Je066GcIOuzgOqyve2VtOyVvCDtlZzri6QuXG4gICAgY29udmVydEpzb25UeXBlT2JqRGF0YSA9IEpTT04uc3RyaW5naWZ5KG9iakRhdGEpO1xuICAgIC8vIOuNsOydtO2EsCDsk7DquLAgKOqwneyytCDsnKDtmJXsnYQg7KCA7J6lKVxuICAgIHRoaXMubG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2FuZ3VsYXItY2FtcCcsIGNvbnZlcnRKc29uVHlwZU9iakRhdGEpO1xuXG4gICAgLy8g642w7J207YSwIOydveq4sFxuICAgIHZhciBsb2FkZWREYXRhID0gdGhpcy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSgnYW5ndWxhci1jYW1wJyk7XG5cbiAgICAvLyDqsIDsoLjsmKgg642w7J207YSwKOqwneyytCnsnZgg66mk67KE7JeQIOygkeq3vCDsvZjshpTsl5Ag7Lac66ClXG4gICAgY29uc29sZS5sb2coIGxvYWRlZERhdGEubGlicmFyeSApOyAvLyBTdXN5XG5cbn1cblxuLy8g66qo65OIIO2YuOy2nCByZXF1aXJlKCk7XG52YXIgY29udHJvbGxlciA9IHJlcXVpcmUoJy4vY29udHJvbGxlcicpO1xuXG5pZiAoIHR5cGVvZiBjb250cm9sbGVyID09PSAnZnVuY3Rpb24nICkge1xuICAgIC8vIOyLpO2WiVxuICAgIGNvbnRyb2xsZXIoKTtcbn0gZWxzZSB7XG4gICAgY29uc29sZS5sb2coJ2NvbnN0cm9sbGVy64qUIO2VqOyImOqwgCDslYTri5nri4jri6QuJyk7XG4gICAgaWYgKGNvbnRyb2xsZXIuYWN0aW9uKSB7XG4gICAgICAgIGNvbnRyb2xsZXIuYWN0aW9uKCk7XG4gICAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgbW9kZWwgPSByZXF1aXJlKCcuL21vZGVsJyksXG4gICAgdmlldyA9IHJlcXVpcmUoJy4vdmlldycpO1xuXG4vLyBtb2R1bGUuZXhwb3J0cyDripQg7KCV7J2Y65CcIOqwkuunjCDrgrTrs7Trg4Rcbi8vIOuwmOuptCBleHBvcnRz64qUIOqwneyytOulvCDrgrTrs7Trg4RcblxuLy8gbW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcbi8vICAgICByZXR1cm4gbW9kZWwubG9hZCgpICsgdmlldy5yZW5kZXIoKTtcbi8vIH07XG5cbmV4cG9ydHMuYWN0aW9uID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIG1vZGVsLmxvYWQoKSArIHZpZXcucmVuZGVyKCk7XG59OyIsIid1c2Ugc3RyaWN0JztcblxuZXhwb3J0cy5sb2FkID0gZnVuY3Rpb24oKSB7XG4gICAgY29uc29sZS5sb2coJ21vZGVsIGRhdGEgbG9hZCcpO1xufTtcblxuLy8gbW9kdWxlLmV4cG9ydHMgPSB7XG4vLyAgICAgbG9hZDogZnVuY3Rpb24oKSB7XG4vLyAgICAgICAgIGNvbnNvbGUubG9nKCdtb2RlbCBkYXRhIGxvYWQnKTtcbi8vICAgICB9XG4vLyB9OyIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ3ZpZXcgcmVuZGVyJyk7XG4gICAgfVxufTsiXX0=

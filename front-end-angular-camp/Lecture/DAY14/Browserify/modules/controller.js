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
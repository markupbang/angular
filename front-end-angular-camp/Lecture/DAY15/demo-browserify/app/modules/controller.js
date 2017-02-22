var model = require('./model'),
    view  = require('./view')();

// 객체의 메소드 반환
exports.displayModelView = function() {
    return model + '. ' + view;
};
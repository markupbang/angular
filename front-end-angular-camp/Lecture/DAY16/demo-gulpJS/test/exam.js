'use strict';

exports.exam = function(msg) {
  var memory = msg;
  return memory;
};

exports.sum = function() {
  var _result = 0;
  var _args = Array.makeArray(arguments);
  _args.forEach(function(arg, idx) {
    _result += arg;
  });
  return _result;
};

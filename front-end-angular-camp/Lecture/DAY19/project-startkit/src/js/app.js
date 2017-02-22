/*! app.js © yamoo9.net, 2016 */
'use strict';

/**
 * --------------------------------
 * 모듈 로드
 * ----------------------------- */
require('./modernizr-custom');
require('angular');
var $ = window.$ = require('jquery');

/**
 * --------------------------------
 * 문서 객체 참조
 * ----------------------------- */
var $twb = $('#twb');
var $twb_binding = $('#twb-binding');

/**
 * --------------------------------
 * 초기 수행 동작
 * ----------------------------- */
$twb_binding.text($twb.val());

/**
 * --------------------------------
 * 이벤트 핸들링
 * ----------------------------- */
$twb.on('keyup', function(evt) {
  var value = evt.target.value;
  $twb_binding.text(value);
});

$twb_binding.on('keyup', function() {
  $twb.val($twb_binding.text());
});
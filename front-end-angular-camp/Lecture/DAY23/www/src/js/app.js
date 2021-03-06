/*! app.js © yamoo9.net, 2016 */
'use strict';

/**
 * --------------------------------
 * 모듈 로드
 * ----------------------------- */
require('./modernizr-custom');

// -----------------------------------------------------
// AngularJS 모듈 정의
// -----------------------------------------------------
angular.module('PersonListApp', []);

// ------------------------------------------------------
// AngularJS 모듈 호출
// ------------------------------------------------------
// 컨트롤러
require('./controllers/PersonListController');
// 필터
require('./filters/PersonListFilters');
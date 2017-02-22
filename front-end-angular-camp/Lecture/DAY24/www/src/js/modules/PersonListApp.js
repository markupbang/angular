// -----------------------------------------------------
// AngularJS 모듈 정의
// -----------------------------------------------------
angular.module('PersonListApp', ['infinite-scroll']);

// ------------------------------------------------------
// AngularJS 모듈 호출
// ------------------------------------------------------

// 컨트롤러
require('../controllers/PersonListController');
require('../controllers/PersonDetailController');

// 서비스
require('../services/PersonsService');
require('../services/PersonFactory');

// 필터
require('../filters/PersonListFilters');
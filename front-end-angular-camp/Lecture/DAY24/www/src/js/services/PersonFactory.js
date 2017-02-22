/*! PersonFactory.js © yamoo9.net, 2016 */
'use strict';

var app = angular.module('PersonListApp');

app.factory('PersonFactory', ['$http', function($http) {

  // RESTFull Service
  // JSON
  // Client <- AJAX -> Server
  // $http 서비스 말고
  // ngResource 모듈 로드
  // $resource 서비스 쉽게 활용

  return function(page, count) {
    // 초기 값 설정
    page = page || 1;
    count = count || 20;
    // GET
    return $http.get('http://api.randomuser.me/?page='+page+'&results='+count);
  };

}]);
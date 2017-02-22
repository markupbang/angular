/*! ScopeStudy.js © yamoo9.net, 2016 */
'use strict';

// AngularJS 모듈 정의
var app = angular.module('ScopeStudy', []);

// 정의 모듈에 컨트롤러 등록
app.controller('ParentController', ['$scope', parentFn]);
app.controller('ChildController', ['$scope', childFn]);

// 컨트롤러에 연결되는 함수 정의
// 부모 컨트롤러 함수
function parentFn($scope) {
  $scope.name = 'This is Parent Scope Property.';
  $scope.reset = function() {
    $scope.name = 'Reset Scope Property.';
  };
}

// 자식 컨트롤러 함수
function childFn($scope) {
  $scope.reset = function() {
    $scope.name = 'reset child scope Property';
  };
}
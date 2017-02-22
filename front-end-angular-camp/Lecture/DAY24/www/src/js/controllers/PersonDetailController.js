/*! PersonDetailController.js © yamoo9.net, 2016 */
'use strict';

var app = angular.module('PersonListApp');

// Angular의 모듈에 컨트롤러 함수 등록
app.controller('PersonDetailController', ['$scope', 'PersonsService', PersonDetailControllerFn]);

// 컨트롤러 함수 정의
function PersonDetailControllerFn ($scope, PersonsService) {
  // 서비스 객체를 $scope의 속성에 할당(참조)하여 동적으로 변경되는 것을 처리.
  $scope.service = PersonsService;

  // 아래 코드는 로드 되었을 때 1회만 실행된다.
  // $scope.selectedPerson = PersonsService.selectedPerson;
}
'use strict';
/*! AutoRegisterController.js © yamoo9.net, 2016 */

angular.module('DemoApp')
.controller('AutoRegisterController', ['$scope', '$http',
  function($scope, $http) {

    $scope.submitting = false; // 초기 상태
    $scope.formModel = {};
    $scope.onSubmit = function() {
      $scope.submitting = true; // 전송 상태
      // console.log($scope.formModel);
      $http
      .post('https://minmax-server.herokuapp.com/register/', $scope.formModel)
      .then(function(response) {
        console.log('전송 성공! :)');
        $scope.submitting = false; // 전송이 완료된 상태
      }, function(response) {
        console.error('전송 실패! :(');
        $scope.submitting = false;
      });
    };

}]);
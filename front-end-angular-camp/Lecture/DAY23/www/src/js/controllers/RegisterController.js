'use strict';
/*! RegisterController.js © yamoo9.net, 2016 */

angular.module('DemoApp')
.controller('RegisterController', ['$scope', '$http',
  function($scope, $http) {

  // console.dir($http);

  // 지역 변수
  // 외부에서 접근 불가
  var _formModel = {};
  var _onSubmit = function(form) {
    var required;
    // console.log('사용자가 전송한 폼은 유효한가?', form.$valid);
    if ( form.$valid ) {
      // console.log('전송됨. :)');
      console.log(_formModel);
      $http
        .post('https://minmax-server.herokuapp.com/register/', _formModel)
        .then(
          function () {
            // 전송 성공
            console.log('전송 성공 :)');
          },
          function () {
            // 전송 실패
            console.error('전송 실패! :(');
          }
        );
    } else {
      // console.error('폼은 유효하지 않습니다. 다시 작성해주세요.');
      required = form.$error.required[0].$name;
      // 사용자에게 오류 메시지를 보여준다.
      // 조건에 따라 오류메시지를 다르게 보여줘야 한다.
      switch(required) {
        // name이 필수조건으로 확인된 경우
        case 'name':
          window.alert('아이디는 필수 입력사항입니다. 아이디를 입력해주세요.');
        break;
        // email이 필수 조건으로 확인된 경우
        case 'email':
          window.alert('이메일은 필수 입력사항입니다. 이메일을 입력해주세요.');
        break;
        // password가 필수 조건으로 확인된 경우
        case 'password':
          window.alert('패스워드는 필수 입력사항입니다. 패스워드를 입력해주세요.');
        break;
      }
      // 필히 요구되는 항목을 체크해서 문제가 되는 위치에 포커스를 적용한다.
      document.querySelector('#'+required).focus();
    }
  };

  // 외부에 공개
  $scope.formModel = _formModel;
  $scope.onSubmit  = _onSubmit;

}]);
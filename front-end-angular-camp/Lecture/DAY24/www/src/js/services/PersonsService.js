/*! PersonsService.js © yamoo9.net, 2016 */
'use strict';

angular.module('PersonListApp').service('PersonsService', ['PersonFactory', function(PersonFactory){

  var _service = {

    'selectedPerson': null,
    'persons': [],

    'page': 1,
    'limit': 3,
    'count': 20,
    'hasMore': true,
    'isLoading': false,

    'loadPerson': function() {
      var _this = this;
      // 팩토리(함수) 실행
      // 비동기 통신을 통해 데이터를 받아와서 추가한다.
      if ( _this.hasMore && !_this.isLoading ) {
        PersonFactory(_this.page, _this.count).then(function(response) {
          angular.forEach(response.data.results, function(person) {
            _this.persons.push(person);
          })
        });
        _this.page += 1;
      }
    }
  };

  _service.loadPerson();

  // 비동기 데이터 로드
  // $http
  //   .get('/data/persons.json')
  //   .then(function(response) {
  //     angular.forEach(response.data.results, function(person){
  //       _service.persons.push(person);
  //     });
  //   });

  // 먼저 반환되었어도 객체가 반환되었기 때문에
  // 객체를 참조하게 되면 객체의 변경된 속성 값도 추후에 참조할 수 있다.
  return _service;

}]);
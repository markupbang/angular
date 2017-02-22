/*! PizzaController.js © markupbang.com, 2016 */

app.controller('PizzaController', ['$scope','$http', function($scope, $http){
	$scope.appetizers,
	$scope.mains
	$scope.extras = null;

	$http
    .get('/src/data/pizzaPlanets.json')
    .then(function(response) {
    	$scope.appetizers = response.data.appetizers;
    	$scope.mains = response.data.mains;
    	$scope.extras = response.data.extras;
    });
    
}]);
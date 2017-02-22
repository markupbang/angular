app.controller('MainController',['$scope', function($scope) {
	$scope.exercises = [
	{
		icon: 'img/pushup.jpg',
		name: 'Pushups',
		count: 20,
	},
	{
		icon: 'img/squat.jpg',
		name: 'Pushups',
		count: 25,
	},
	{
		icon: 'img/pushup.jpg',
		name: 'Pushups',
		count: 22,
	},
	{
		icon: 'img/lunge.jpg',
		name: 'lunge',
		count: 28,
	},
	{
		icon: 'img/pullup.jpg',
		name: 'pullup',
		count: 17,
	},
	{
		icon: 'img/row.jpg',
		name: 'row',
		count: 5,
	},
	{
		icon: 'img/squat.jpg',
		name: 'squat',
		count: 8,
	},
	{
		icon: 'img/stepup.jpg',
		name: 'stepup',
		count: 1,
	}
	]

	$scope.decrease = function(index) {
		var cnt = $scope.exercises[index].count;
		if(cnt > 0){
			$scope.exercises[index].count -= 1;
		} else {
			alert('Try up!');
		}
	}

	$scope.increase = function(index) {
		$scope.exercises[index].count += 1;
	}
}]);
"use strict";
angular.module('myApp', []);
angular.module('myApp').controller('MainController', ['$scope', '$interval', function($scope, $interval) {
	console.log('Hello.');
	
	/* Module 1 - 1 */
	$scope.message = 'Hello';
	$scope.sayHello = function(name) {
		return $scope.message + ' ' + name;
	}
	
	/* Module 1 - 2 */
	var items = ['bananas', 'apples', 'pears', 'cherries', 'peaches'];
	$scope.itemIndex = null;
	$scope.currentItem = '';
	
	$scope.getItem = function() {
		$scope.currentItem = items[$scope.itemIndex];
	};
	
	/* $interval(function() {
		$scope.itemIndex = Math.round( Math.random() * (items.length - 1) );
		$scope.getItem();
	}, 2000); */
	
	/* Module 1 - 3 */
	$scope.randomValue = -999;
	$interval(function() {
		$scope.randomValue = Math.round(Math.random() * 1000000);
	}, 2000);
	
	$scope.names = ['David', 'Tom', 'Joe'];
	$scope.qty = 20;
	$scope.cost = 1.99;
	$scope.pWidth = 100;
}]);

angular.module('myApp').controller('ParentController', ['$scope', function($scope) {
	$scope.model = {
		name: 'John Smith'
	};
	$scope.name = 'John Smith';
}]);

angular.module('myApp').controller('ChildController', ['$scope', function($scope) {
	
}]);
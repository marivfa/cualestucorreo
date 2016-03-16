angular.module('cualestucorreoApp').controller('CompraController', CompraController);

CompraController.$inject = ['$scope'];

function CompraController($scope) {
	$scope.name = "John Doe";
	$scope.email = "john.doe@domain.com";
	$scope.tdc = "XXXX XXXX XXXX XXXX XXXX";
	$scope.expiration = "07/2017";
	$scope.cvc = "***";
}


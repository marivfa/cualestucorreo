'use strict';

angular.module('cualestucorreoApp').controller('CompraController', ['$scope', '$uibModal', '$location', '$timeout',
	function($scope, $uibModal, $location, $timeout) {
	//$scope.name = "John Doe";
	//$scope.email = "john.doe@domain.com";
	$scope.card={};
	//$scope.card.number = "4242 4242 4242 4242";
	//$scope.card.exp_month = "07";
	//$scope.card.exp_year = "2016";
	//$scope.card.cvc = "***";

	$scope.cancel = function () {
		$scope.$dismiss('cancel');
	};

	$scope.modalPaymentSuccess = function(){
		$scope.cancel();
		$uibModal.open({
			animation: true,
			templateUrl: 'views/precios-exito.html',
			controller: ['$scope', '$uibModalInstance',
			function($scope, $uibModalInstance) {
				$scope.cancel = function () {
				    $uibModalInstance.dismiss('cancel');
				};
				$scope.go = function (path){
				 	$scope.cancel();
  					$location.path(path);
				};
			}]
		});
	}
}]);


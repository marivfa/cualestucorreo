'use strict';

angular.module('cualestucorreoApp').controller('CompraController', ['$scope', '$uibModal', '$location', 'DataService',
	function($scope, $uibModal, $location, DataService) {

	$scope.cancel = function () {
		$scope.$dismiss('cancel');
	};

	$scope.modalPaymentSuccess = function(){
		$uibModal.open({
			animation: true,
			templateUrl: 'views/precios-exito.html',
			controller: ['$scope', '$uibModalInstance','link',
			function($scope, $uibModalInstance, link) {
				$scope.link = link;
				$scope.cancel = function () {
				    $uibModalInstance.dismiss('cancel');
				};
				$scope.go = function (path){
				 	$scope.cancel();
  					$location.path(path);
				};
			}],
			resolve: {
      			link: function () {
      			    return $scope.link;
      			}
      		}
		});
	}

	$scope.modalPaymentError = function(){
		$uibModal.open({
			animation: true,
			templateUrl: 'views/precios-error.html',
			controller: ['$scope', '$uibModalInstance','msjError',
			function($scope, $uibModalInstance, msjError) {
				$scope.msjError = msjError;
				$scope.cancel = function () {
				    $uibModalInstance.dismiss('cancel');
				};
				$scope.go = function (path){
				 	$scope.cancel();
  					$location.path(path);
				};
			}],
			resolve: {
      			msjError: function () {
      			    return $scope.msjError;
      			}
      		}
		});
	}

	$scope.configureStripe = function(){

		var handler = StripeCheckout.configure({
	    	key: 'pk_test_6pRNASCoBOKtIshFeQd4XMUh',
	    	image: 'images/logomin.png',
	    	locale: 'es',
	    	token: function(token) {

	    		//Llamada DataService
				DataService.processPayment(token).then(
					function(data){
						if(data.pagoAprobado){
							$scope.link = data.link;
							$scope.modalPaymentSuccess();
						}else{
							$scope.msjError=data.error;
							$scope.modalPaymentError();
						}
					},
					function(response){
						if(response.status===404){
							$scope.msj = "¡Oops! Problemas para conectarse al servidor. Por favor intente más tarde.";
						}else{
							$scope.msj = "¡Oops! Ocurrió un error inesperado. Por favor intente más tarde.";
						}
					}
				);
	    	}
	  	});
	
	  	$('#customButton').on('click', function(e) {
	    	// Open Checkout with further options:
	    	handler.open({
	    	  name: 'Cuál es su correo',
	    	  description: 'Pago seguro',
	    	  amount: 1000,
	    	  allowRememberMe : false
	    	});
	    	e.preventDefault();
	  	});
	
	 	// Close Checkout on page navigation:
	 	$(window).on('popstate', function() {
	 	  handler.close();
	 	});
	}

}]);


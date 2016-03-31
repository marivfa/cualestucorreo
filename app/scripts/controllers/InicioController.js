'use strict';

angular.module('cualestucorreoApp').controller('InicioController', function ($scope, $uibModal, $location, $route, $timeout, DataService, ResponseFactory) {
	$scope.showHomeImage = true;
	$scope.showSearch = false;
	$scope.validDomain = '^([a-zA-Z0-9\-]+[\.])([a-zA-Z0-9\-]+[\.])?([a-zA-Z0-9\-]+)$';
	$scope.nameSearch = 'Rodrigo Blanco';
	$scope.domainSearch = 'filipinas.com';	

	//TEMPORAL MIENTRAS SE DEFINE DATASERVICE
	$scope.hardTest = true; //true - Datos Cableados, false - Datos del DataService

	//TEMPORAL MIENTRAS SE DEFINE DATASERVICE
	if($scope.hardTest===true){
		$scope.searches = DataService.getRemainingSearches($scope.hardTest);
	}else
	{
		DataService.getRemainingSearches($scope.hardTest).then(
		function(data){
			$scope.searches = data.consultasRestantes;
		});
	}

	$scope.searchEmail = function(){
		$scope.showSearch = false;
		$scope.showHomeImage = false;
		$scope.msj = "Buscando email...";

		//TEMPORAL MIENTRAS SE DEFINE SERVER
		if($scope.hardTest===true){
			$timeout(function(){
				//Llamada simulada al DataService
				$scope.msj = "";
				var data = DataService.getSearchEmail($scope.nameSearch,$scope.domainSearch,$scope.hardTest);
				$scope.response = data;
				$scope.loadResponse();
			},1000);
		}
		else{
			//Llamada DataService
			DataService.getSearchEmail($scope.nameSearch,$scope.domainSearch,$scope.hardTest,$scope.hardTest).then(
				function(data){
					$scope.msj = "";
					$scope.response = data;
			
					$scope.loadResponse();
				},
				function(response){
					if(response.status===404)
					{
						$scope.msj = "¡Oops! Problemas para conectarse al servidor. Por favor intente más tarde.";
					}else
					{
						$scope.msj = "¡Oops! Ocurrió un error desconocido. Por favor intente más tarde.";
					}
				}
			);
		}
	}

	$scope.loadResponse = function () {
		ResponseFactory.accesoPermitido = $scope.response.accesoPermitido;
		ResponseFactory.resultadoPositivo = $scope.response.resultadoPositivo;
		ResponseFactory.userType = $scope.response.userType;
		ResponseFactory.ipOrigen = $scope.response.ipOrigen;
		ResponseFactory.correoValido = $scope.response.correoValido;
		ResponseFactory.consultasRestantes = $scope.response.consultasRestantes;
		ResponseFactory.waitTime = $scope.response.waitTime;
		ResponseFactory.error = $scope.response.error;

		//Busquedas agotadas
		if($scope.response.accesoPermitido===false && $scope.response.consultasRestantes===0){
    		$scope.showSearch = false;
    		$scope.msjResponse1 = "";
			$scope.msjResponse2 = "";

    		$scope.modalNoMoreSearch();
    		$scope.msj = "";
		}
		//Resultado exitoso
    	else if($scope.response.accesoPermitido===true && $scope.response.resultadoPositivo===true){
    		$scope.showSearch = true;
    		$scope.msjResponse1 = "¡Email encontrado!";
			$scope.msjResponse2 = "¿No es este el email que buscas? ¿Deseas realizar otra búsqueda?";
		}
		//No se encontro el correo
		else if($scope.response.accesoPermitido===true && $scope.response.error==="mail not found"){
			$scope.showSearch = true;
			$scope.msjResponse1 = "¡Oops!";
			$scope.msjResponse2 = "No hemos encontrado el email que buscas. Asegúrate de haber escrito bien nombres o dominio.";
		}
		//El servidor no permite verificacion
		else if($scope.response.accesoPermitido===false && $scope.response.error==="refused connection by server"){
			$scope.showSearch = true;
			$scope.msjResponse1 = "Lamentamos decirte que...";
			$scope.msjResponse2 = "Este servidor no permite verificación de correo electrónico.";
		}
		//No se obtuvo respuesta
		else{
    		$scope.showSearch = false;
    		$scope.msjResponse1 = "";
			$scope.msjResponse2 = "";
    		$scope.msj = "";
		}
		$scope.$parent.searches = $scope.response.consultasRestantes;
	}

	$scope.modalNoMoreSearch = function(){
		$uibModal.open({
			animation: true,
			templateUrl: 'views/busquedas-agotadas.html',
			controller: function($scope, $uibModalInstance, $location, ResponseFactory) {
				$scope.cancel = function () {
				    $uibModalInstance.dismiss('cancel');
				};
				$scope.go = function (path){
				 	$scope.cancel();
  					$location.path(path);
				};
				$scope.waitTime = ResponseFactory.waitTime;
				$scope.secondsWaitTime = (parseInt($scope.waitTime.split(":")[0]) * 3600) + (parseInt($scope.waitTime.split(":")[1]) * 60) + parseInt($scope.waitTime.split(":")[2]);
				
				$scope.$on('timer-stopped',function(){
					$("#ready").append("¡Terminó la espera!");
				});
			}
		});
	}

	$scope.modalPaymentForm = function(){
		$uibModal.open({
			animation: true,
			templateUrl: 'views/precios-formulario.html',
			controller: 'CompraController'
		});
	}

	$scope.isActive = function(route) {
    	return $location.path() === route;
	}

	$scope.go = function (path){
  		$location.path(path);
	};

	$scope.reloadRoute = function() {
    	$route.reload();
	}
});

angular.module('cualestucorreoApp').factory('ResponseFactory', function(){
    var response = {
        accesoPermitido : "",
		resultadoPositivo : "",
		userType : "",
		ipOrigen : "",
		correoValido : "",
		consultasRestantes : "",
		waitTime : "",
		error : ""
    }
    return response;
});


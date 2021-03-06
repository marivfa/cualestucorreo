'use strict';

angular.module('cualestucorreoApp').controller('BusquedaController', ['$scope', '$uibModal', '$location', '$route', '$timeout', '$routeParams', 'DataService', 'ResponseFactory',
	function ($scope, $uibModal, $location, $route, $timeout, $routeParams, DataService, ResponseFactory){
	
	$scope.init = function(){
		$scope.showHomeImage = true;
		$scope.showSearch = false;
		$scope.showSearching = false;
		$scope.validDomain = '^([a-zA-Z0-9\-]+[\.])([a-zA-Z0-9\-]+[\.])?([a-zA-Z0-9\-]+)$';
	}
	$scope.init();

	$scope.searchEmail = function(){
		$scope.showHomeImage = false;
		$scope.showSearch = false;
		$scope.showSearching = true;
		$scope.msj = "Buscando email...";

		//Llamada DataService
		DataService.getSearchEmail($scope.nameSearch,$scope.domainSearch, $scope.responseFactory.userid, $scope.responseFactory.usermail).then(
			function(data){
				$scope.showSearching = false;
				$scope.msj = "";
				$scope.response = data;
				$scope.loadResponse();
			},
			function(response){
				$scope.showSearching = false;
				if(response.status===404){
					$scope.msj = "¡Oops! Problemas para conectarse al servidor. Por favor intente más tarde.";
				}else{
					$scope.msj = "¡Oops! Ocurrió un error inesperado. Por favor intente más tarde.";
				}
			}
		);
	}

	$scope.searchEmailENTER = function(event){
		//Tecla ENTER
		if(event.keyCode==13){
			$scope.searchEmail();
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
		if($scope.response.accesoPermitido===false && $scope.response.consultasRestantes===0 && $scope.response.errCode===3){
    		$scope.showSearch = false;
    		$scope.msjResponse1 = "";
			$scope.msjResponse2 = "";

    		$scope.modalNoMoreSearch();
    		$scope.msj = "¡OPS! Se te han acabado las búsquedas.";
		}
		//Resultado exitoso
    	else if($scope.response.accesoPermitido===true && $scope.response.resultadoPositivo===true && $scope.response.errCode===0){
    		$scope.showSearch = true;
    		$scope.msjResponse1 = "¡Email encontrado!";
			$scope.msjResponse2 = "¿No es este el email que buscas? ¿Deseas realizar otra búsqueda?";
		}
		//El servidor no permite verificacion
		else if($scope.response.accesoPermitido===true && $scope.response.errCode===1){
			$scope.showSearch = true;
			$scope.msjResponse1 = "Lamentamos decirte que...";
			$scope.msjResponse2 = "Este servidor no permite verificación de correo electrónico.";
		}
		//No se encontro el correo
		else if($scope.response.accesoPermitido===true && $scope.response.errCode===2){
			$scope.showSearch = true;
			$scope.msjResponse1 = "¡Oops!";
			$scope.msjResponse2 = "No hemos encontrado el email que buscas. Asegúrate de haber escrito bien nombres o dominio.";
		}
		//No se obtuvo respuesta
		else{
    		$scope.showSearch = false;
    		$scope.msjResponse1 = "";
			$scope.msjResponse2 = "";
    		$scope.msj = "¡Oops! Ocurrió un error inesperado. Por favor intente más tarde.";
		}
		$scope.responseFactory.getSearches();
	}

	$scope.modalNoMoreSearch = function(){
		$uibModal.open({
			animation: true,
			templateUrl: 'views/busquedas-agotadas.html',
			controller: ['$scope', '$uibModalInstance', '$location', 'ResponseFactory',
			function($scope, $uibModalInstance, $location, ResponseFactory) {
				$scope.responseFactory = ResponseFactory;
				$scope.cancel = function () {
				    $uibModalInstance.dismiss('cancel');
				};
				$scope.go = function (path){
				 	$scope.cancel();
  					$location.path(path);
				};
				$scope.waitTime = ResponseFactory.waitTime;
				var time = (parseInt($scope.waitTime.split(":")[0]) * 3600) + (parseInt($scope.waitTime.split(":")[1]) * 60) + parseInt($scope.waitTime.split(":")[2]);
				//TEMPORAL MIENTRAS SE RESUELVE EL PROBLEMA CON LA HORA NEGATIVA
				if(time < 0)
					time = 30;
				$scope.secondsWaitTime = time;
				$scope.$on('timer-stopped',function(){
					$scope.$apply(function (){
						$scope.msjReady = "¡Terminó la espera!";
						$scope.responseFactory.total = null;
						$scope.responseFactory.getSearches();
						$scope.go('/precios');
					});
				});
			}]
		});
	}

	$scope.go = function (path){
  		$location.path(path);
	};

	$scope.reloadRoute = function() {
    	$route.reload();
	}


}]);
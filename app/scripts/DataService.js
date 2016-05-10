'use strict';

angular.module('cualestucorreoApp').factory('DataService',['Restangular',function(Restangular){

	Restangular.setBaseUrl('http://ec2-54-173-170-67.compute-1.amazonaws.com:3000');
	//Restangular.setBaseUrl('http://200.90.111.68:3000');
	
	var dataService = {};

	dataService.getSearchEmail = function (nameSearch, domainSearch){
		
		//Respuesta del servidor -->
		//accesoPermitido : true , false
		//resultadoPositivo : true , false
		//userType : guest
		//ipOrigen : 
		//correoValido : 
		//consultasRestantes :
		//waitTime :
		//error :
		//errCode : 0-sin error, 1-conexion rechazada, 2-correo no encontrado, 
		//			3-maximo de consultas alcanzadas, 9-error de base de datos
		return Restangular.all('buscar').post({
			nombre : nameSearch,
			apellido : "",
			dominio : domainSearch,
			userType : "guest"
		});
		
	}

	dataService.processPayment = function (data){
	}

	dataService.getRemainingSearches = function (){
		
		return Restangular.all('consultas').post({
			userType : "guest"
		});
		
	}

	return dataService;
}]);
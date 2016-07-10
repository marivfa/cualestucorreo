'use strict';

angular.module('cualestucorreoApp').factory('DataService',['Restangular',function(Restangular){

	//Restangular.setBaseUrl('http://186.90.66.30:3000');
	//Restangular.setBaseUrl('http://homezerox.all.my:3000');
	Restangular.setBaseUrl('http://ec2-54-173-170-67.compute-1.amazonaws.com:3000');
	
	var dataService = {};

	dataService.getSearchEmail = function (nameSearch, domainSearch, userid, usermail){
		
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
			userid : userid,
			usermail : usermail
		});
		
	};

	dataService.processPayment = function (token){
		return Restangular.all('pagos').post({
			token : token
		});
	};

	dataService.getRemainingSearches = function (userid, usermail){
		
		return Restangular.all('consultas').post({
			userid : userid,
			usermail : usermail
		});
		
	};

	return dataService;
}]);
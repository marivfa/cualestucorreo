'use strict';

angular.module('cualestucorreoApp').factory('DataService',['Restangular',function(Restangular){

	//Restangular.setBaseUrl('http://localhost:8081');
	Restangular.setBaseUrl('http://homezerox.all.my:3000');
	var dataService = {};

	dataService.getSearchEmail = function (nameSearch, domainSearch, hardTest){
		//TEMPORAL MIENTRAS SE DEFINE DATASERVICE
		if(hardTest===true){ 
			//Simulando al servidor ->
			if(nameSearch === 'Rodrigo Blanco' && domainSearch === 'filipinas.com'){
    			return JSON.parse('{"accesoPermitido" : true,"resultadoPositivo" : true,"userType" : "guest","ipOrigen" : "","correoValido" : "r.blancomarroquin@filipinas.com","consultasRestantes" : 9,"waitTime" : "","error" : ""}');	
			}
			else if(domainSearch != 'filipinas.com'){
				return JSON.parse('{"accesoPermitido" : false,"resultadoPositivo" : false,"userType" : "guest","ipOrigen" : "","correoValido" : "","consultasRestantes" : 8,"waitTime" : "","error" : "refused connection by server"}');	
			}
			else if(nameSearch === 'x'){
				return JSON.parse('{"accesoPermitido" : false,"resultadoPositivo" : false,"userType" : "guest","ipOrigen" : "","correoValido" : "","consultasRestantes" : 0,"waitTime" : "00:00:10","error" : "maxSearch exceeded"}');	
			}
			else{
				return JSON.parse('{"accesoPermitido" : true,"resultadoPositivo" : false,"userType" : "guest","ipOrigen" : "","correoValido" : "","consultasRestantes" : 7,"waitTime" : "","error" : "mail not found"}');	
			}
		}else
		{
			//Respuesta del servidor -->
			//accesoPermitido : true , false
			//resultadoPositivo : true , false
			//userType : guest
			//ipOrigen : 
			//correoValido : 
			//consultasRestantes :
			//waitTime :
			//error : "maxSearch exceeded" , "refused connection by server" , "mail not found"
			return Restangular.all('buscar').post({
				nombre : nameSearch,
				apellido : "",
				dominio : domainSearch,
				userType : "guest"
			});
		}
	}

	dataService.processPayment = function (data){
	}

	dataService.getRemainingSearches = function (hardTest){
		//TEMPORAL MIENTRAS SE DEFINE DATASERVICE
		if(hardTest===true){ 
			return 10;
		}else{
			return Restangular.all('consultas').post({
				userType : "guest"
			});
		}
	}

	return dataService;
}]);
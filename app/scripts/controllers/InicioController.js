'use strict';

angular.module('cualestucorreoApp').controller('InicioController', ['$scope', '$location', '$route', '$routeParams', 'DataService', 'ResponseFactory',
	function ($scope, $location, $route, $routeParams, DataService, ResponseFactory){

	$scope.$on('$routeChangeSuccess', function(){
    	$scope.responseFactory = ResponseFactory;
		
		$scope.responseFactory.userid = $routeParams.userid;
		$scope.responseFactory.usermail = $routeParams.usermail;

		$scope.responseFactory.getSearches();
  	});

	$scope.isActive = function(route){
    	return $location.path() === route;
	};

	$scope.go = function (path){
  		$location.path(path);
	};

	$scope.reloadRoute = function(){
    	$route.reload();
	};

}]);

angular.module('cualestucorreoApp').factory('ResponseFactory', ['DataService',function(DataService){
	var response = {};

	response.accesoPermitido = "";
	response.resultadoPositivo = "";
	response.userType = "";
	response.ipOrigen = "";
	response.correoValido = "";
	response.consultasRestantes = "";
	response.diasRestantes = "";
	response.info = "";
	response.waitTime = "";
	response.error = "";
	response.searches = null;
	response.userid = null;
	response.usermail = null;
	response.total = null;
	response.getSearches = function(){
		DataService.getRemainingSearches(response.userid, response.usermail).then(
		function(data){
			if(data.consultasRestantes>=0){
				response.info = "BÚSQUEDAS RESTANTES";
				response.searches = data.consultasRestantes;
				response.total = response.searches;
			}else 
			if(data.consultasRestantes==-1){
				response.info = "DÍAS RESTANTES";
				response.diasRestantes = data.diasRestantes;
				response.total = response.diasRestantes;
			}
		},
		function(response){
			response.searches = 0;
			response.diasRestantes = 0;
			response.total = 0;
		});
	};

	return response;
}]);
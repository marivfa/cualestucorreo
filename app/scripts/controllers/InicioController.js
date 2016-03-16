angular.module('cualestucorreoApp').controller('InicioController', InicioController);

InicioController.$inject = ['$scope','$location'];

function InicioController($scope, $location) {
  	$scope.isActive = function(route) {
    	return $location.path() === route;
	}
	$scope.modal = {};
	$scope.modal.url = 'views/busquedas-agotadas.html';
	$scope.go = function (path){
  		$location.path(path);
	};
}


'use strict';

/**
 * @ngdoc overview
 * @name cualestucorreoApp
 * @description
 * # cualestucorreoApp
 *
 * Main module of the application.
 */
angular
    .module('cualestucorreoApp', [
        'ngAnimate',
        'ngCookies',
        'ngResource',
        'ngRoute',
        'ngSanitize',
        'ngTouch',
        'ui.bootstrap',
        'restangular',
        'timer'
    ])
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller: 'BusquedaController',
            templateUrl: 'views/inicio.html'
        })
        .when('/usuariosPagos', {
            controller: 'BusquedaController',
            templateUrl: 'views/inicio.html'
        })
        .when('/terminos/:userid/:usermail', {
            controller: 'BusquedaController',
            templateUrl: 'views/terminos.html'
        })
        .when('/politica', {
            controller: 'BusquedaController',
            templateUrl: 'views/politica.html'
        })
        .when('/precios', {
            controller: 'CompraController',
            templateUrl: 'views/precios.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

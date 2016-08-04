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
    .config(function ($routeProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');

    $routeProvider
        .when('/', {
            controller: 'BusquedaController',
            templateUrl: 'views/inicio.html'
        })
        .when('/usuariosPagos', {
            controller: 'BusquedaController',
            templateUrl: 'views/inicio.html'
        })
        .when('/terminos', {
            controller: 'BusquedaController',
            templateUrl: 'views/terminos.html'
        })
        .when('/precios', {
            controller: 'CompraController',
            templateUrl: 'views/precios.html'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

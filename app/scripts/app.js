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
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        controller: 'InicioController',
        templateUrl: 'views/inicio.html'
      })
      .when('/terminos', {
        controller: 'InicioController',
        templateUrl: 'views/terminos.html'
      })
      .when('/politica', {
        controller: 'InicioController',
        templateUrl: 'views/politica.html'
      })
      .when('/precios', {
        controller: 'CompraController',
        templateUrl: 'views/precios.html'
      })
      .when('views/precios-formulario.html', {
        controller: 'CompraController',
        templateUrl: 'views/precios-formulario.html'
      })
      .when('views/precios-exito.html', {
        controller: 'CompraController',
        templateUrl: 'views/precios-exito.html'
      })
      .when('views/busquedas-agotadas.html', {
        controller: 'InicioController',
        templateUrl: 'views/busquedas-agotadas.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

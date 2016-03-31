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
    'credit-cards',
    'timer'
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
        controller: 'InicioController',
        templateUrl: 'views/precios.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

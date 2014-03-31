'use strict';

angular.module('zaninApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'hmTouchEvents',
  'chartjs-directive'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/splash.html',
        controller: 'SplashCtrl'
      })
      .when('/game', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/menu', {
        templateUrl: 'views/menu.html',
        controller: 'MenuCtrl'
      })
      .when('/chart', {
        templateUrl: 'views/chart.html',
        controller: 'ChartCtrl'
      })
      .when('/records', {
        templateUrl: 'views/records.html',
        controller: 'RecordsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location) {
    $rootScope.go = function ( path, side ) {
      $rootScope.side = side;
      $location.path( path );
    };
  });
'use strict';


/* no phonegap fallback */
if(window.gameCenter === undefined){
  window.gameCenter = {
    reportAchievement: function (category) {
      console.log(category);
    },
    reportScore: function (category, score) {
      console.log(category, ':', score);
    }
  };
}


angular.module('zaninApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ngTouch',
  'ngAnimate',
  'hmTouchEvents',
  'chartjs-directive',
  'LocalStorageModule'
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
      .when('/tutorial', {
        templateUrl: 'views/tutorial.html',
        controller: 'TutorialCtrl'
      })
      .when('/tutorial', {
        templateUrl: 'views/tutorial.html',
        controller: 'TutorialCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  /*
    change default prefix for local storage
  */
  //FIXME : crashes on minifiying
  /*.config(['localStorageServiceProvider', function(localStorageServiceProvider){
    localStorageServiceProvider.setPrefix('neatnait.zanin');
  }])*/
  /*.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }
  ])*/
  .run(function($rootScope, $location) {
    $rootScope.go = function ( path, side ) {
      $rootScope.side = side;
      $location.path( path );
      
    };
  });



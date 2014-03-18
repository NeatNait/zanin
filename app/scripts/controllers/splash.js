'use strict';

angular.module('zaninApp')
	.controller('SplashCtrl', function ($scope, $interval, $timeout, $animate, $location) {

		$scope.path = 'splash';

		$scope.go = function ( path ) {
			$location.path( '/'+path );
		};

  });

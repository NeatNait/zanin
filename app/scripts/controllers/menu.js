'use strict';

angular.module('zaninApp')
	.controller('MenuCtrl', function ($scope, $interval, $timeout, $animate, $location) {

		$scope.path = 'menu';
		$scope.go = function ( path ) {
			$location.path( path );
		};

  });

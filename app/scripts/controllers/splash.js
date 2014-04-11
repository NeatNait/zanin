'use strict';

angular.module('zaninApp')
	.controller('SplashCtrl', function ($scope, $interval, $timeout, $animate, $location, User, localStorageService) {

		$scope.path = 'splash';

		$scope.go = function ( path ) {
			$location.path( '/'+path );
		};

		//TODO change to full user object
		var userId = localStorageService.get('userId');

		console.log(userId);

		if(userId == null){
			var u = new User();

			u.$save(function(u, putResponseHeaders) {
				//u => saved user object
				//putResponseHeaders => $http header getter
				console.log(u);
				localStorageService.add('userId',u._id);

			});

		}

  });

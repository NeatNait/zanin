'use strict';

angular.module('zaninApp')
	.controller('SplashCtrl', function ($rootScope, $scope, $interval, $timeout, $animate, $location, User, localStorageService, soundService) {

		$scope.path = 'splash';

		soundService.intro.play();

		$scope.go = function ( path ) {
			$location.path( '/'+path );
		};

		//TODO : change to full user object
		var userId = localStorageService.get('userId');

		if(userId === null){
			var u = new User();
			$rootScope.tutorial = true;
			$scope.nextView = '\'tutorial\'';

			u.$save(function(u, putResponseHeaders) {
				//u => saved user object
				//putResponseHeaders => $http header getter
				console.log(u);
				console.log(putResponseHeaders);
				localStorageService.add('userId',u._id);

			});

		}

		else{
			$scope.nextView = '\'game\'';
			$rootScope.tutorial = false;

//			$scope.nextView = '\'game\'';
		}

  });

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
		var tutorial = localStorageService.get('tutorial');

		if(userId === null){
			var u = new User();
			u.$save(function(u, putResponseHeaders) {
				//u => saved user object
				//putResponseHeaders => $http header getter	
				console.log(u);
				console.log(putResponseHeaders);
				localStorageService.add('userId',u._id);

			});

			var userExp = localStorageService.get('userExp');
			if(userExp === null){
				localStorageService.add('userExp',0);
				localStorageService.add('userLevel',1);
			}
		}

		if(tutorial === null){
			$rootScope.tutorial = true;
			$scope.nextView = 'tutorial';
		}

		else{
			$scope.nextView = 'game';
			$rootScope.tutorial = false;
		}

  });

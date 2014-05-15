'use strict';

angular.module('zaninApp')
	.controller('SplashCtrl', function ($scope, $interval, $timeout, $animate, $location, User, localStorageService) {

		$scope.path = 'splash';
<<<<<<< HEAD
		

		$scope.go = function ( path ) {
			$location.path( '/'+path );					
=======

		$scope.go = function ( path ) {
			$location.path( '/'+path );
>>>>>>> 562cf30ab52d942bcee4b6bdfe249c5c1eec44e6
		};

		//TODO : change to full user object
		var userId = localStorageService.get('userId');

<<<<<<< HEAD
		console.log("userID: " + userId);

		if(userId === null){
			var u = new User();			
			$scope.nextView = '\'tutorial\'';
=======
		console.log(userId);

		if(userId === null){
			var u = new User();
>>>>>>> 562cf30ab52d942bcee4b6bdfe249c5c1eec44e6

			u.$save(function(u, putResponseHeaders) {
				//u => saved user object
				//putResponseHeaders => $http header getter
				console.log(u);
				console.log(putResponseHeaders);
				localStorageService.add('userId',u._id);

			});

		}
<<<<<<< HEAD
		else{

			$scope.nextView = '\'game\'';
		}
=======
>>>>>>> 562cf30ab52d942bcee4b6bdfe249c5c1eec44e6

  });

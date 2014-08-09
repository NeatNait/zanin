'use strict';

angular.module('zaninApp')
	.controller('RecordsCtrl', function ($scope, $rootScope, GameStat, User, localStorageService) {
		$rootScope.path = 'records';

		GameStat.query({}, function(gameStats) {
			$scope.gameStats =  gameStats;
		});

		$scope.user = User.get({userId:localStorageService.get('userId')}, function(u) {
			$scope.userName = u.name;
		});

		$scope.updateUser = function () {
			$scope.user.name = $scope.userName;
			$scope.user.$update();
		};
		
	});

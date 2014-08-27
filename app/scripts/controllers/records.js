'use strict';

angular.module('zaninApp')
	.controller('RecordsCtrl', function ($scope, $rootScope, $location, $anchorScroll, GameStat, User, localStorageService) {
		$rootScope.path = 'records';

		var localUserId = localStorageService.get('userId');

		$scope.user = User.get({userId:localUserId}, function(u) {
			$scope.userName = u.name;
		});

		$scope.updateUser = function () {
			$scope.user.name = $scope.userName;
			$scope.user.$update();
		};



		GameStat.query({ 'data': { $elemMatch: { 'field': 'points',
'value': '4' } } }, function(gameStats) {

			gameStats = gameStats.filter(function(e) {
				return e.data;
			});

			gameStats.sort(function(a, b){
				return b.data.points - a.data.points;
			});

			var firstMe = gameStats.map(function(e) { return e.user; }).indexOf(localUserId);
			gameStats[firstMe].yeah = true;

			$scope.gameStats = gameStats;
			$scope.$apply();

			// set the location.hash to the id of
			// the element you wish to scroll to.
			$location.hash('score-'+(firstMe-7));

			angular.element('#score-'+firstMe).addClass('cool');
			// call $anchorScroll()
			$anchorScroll();

		});

		
	});

'use strict';

angular.module('zaninApp')
	.controller('MenuCtrl', function ($rootScope, $scope, $interval, $timeout, $animate, $location) {

		$scope.path = 'menu';

		$scope.go = function ( path ) {
			$location.path( path );
		};

		//TODO change to oldGame
		//if theres no previous game 
		if($rootScope.oldPoints === undefined){
			$rootScope.oldPoints = 0;
		}

		var el = document.querySelector('#points');

		var od = new Odometer({
		  el: el,
		  value: $rootScope.oldPoints, //start with previous game points
		  format: 'd'
		});

		//update points with actual game points after 2sec
		$timeout(function(){
			od.update($rootScope.game.points);
		}, 2000);

		//set previous game points
		if($rootScope.game !== undefined){
			$rootScope.oldPoints = $rootScope.game.points;
		}

  });

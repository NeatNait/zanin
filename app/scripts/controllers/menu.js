'use strict';

angular.module('zaninApp')
	.controller('MenuCtrl', function ($rootScope, $scope, $interval, $timeout, GameStat) {


		$rootScope.path = 'menu';


		if($rootScope.game === undefined){
			$rootScope.game = {};
		}


		//console.log($rootScope.game);

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
		//allowing the view to fully charge and stay black for a while
		$timeout(function(){
			od.update($rootScope.game.points);
		}, 3000);

		//set previous game points
		if($rootScope.game !== undefined){
			$rootScope.oldPoints = $rootScope.game.points;
		}


		/*
		var data = [],
			taps = $rootScope.game.taps;

		for (var tap in taps) {
			data.push({value:taps[tap].count, color: taps[tap].color});
		}

		$scope.clicksChart = {"data": data, "options": {} };
		*/


		//helper for printing time from miliseconds
		$scope.msToTime = function (ms) {
			var milliseconds = parseInt((ms%1000)/100),
				seconds = parseInt((ms/1000)%60),
				minutes = parseInt((ms/(1000*60))%60),
				hours = parseInt((ms/(1000*60*60))%24);

			hours = (hours < 10) ? '0' + hours : hours;
			minutes = (minutes < 10) ? '0' + minutes : minutes;
			seconds = (seconds < 10) ? '0' + seconds : seconds;

			//return hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
			return minutes + '\' '  + seconds + '\'\' ' + milliseconds + '\'\'\'';
		};
  });

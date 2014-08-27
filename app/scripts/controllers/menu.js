'use strict';

angular.module('zaninApp')
	.controller('MenuCtrl', function ($rootScope, $scope, $interval, $timeout, localStorageService) {


		$rootScope.path = 'menu';


		if($rootScope.game === undefined){
			//avoid NaN menu
			//$rootScope.go('splash', '');
			$rootScope.game = {};
		}

		//TODO : change to oldGame
		//if theres no previous game 
		if($rootScope.oldPoints === undefined){
			$rootScope.oldPoints = 0;
		}

		var maxRecord = localStorageService.get('maxRecord');

		if(maxRecord === null){
			maxRecord = 0;
		}

		if($rootScope.game.points >= maxRecord){
			$scope.newRecord = true;
		}



		var el = document.querySelector('#points');

		var od = new Odometer({
		  el: el,
		  value: maxRecord, //start with previous game points
		  format: 'd'
		});

		//update points with actual game points after xsec
		//allowing the view to fully charge and stay black for a while
		$timeout(function(){
			od.update($rootScope.game.points);
			saveRecord($rootScope.game.points, maxRecord);
		}, 4000);

		//set previous game points
		if($rootScope.game !== undefined){
			$rootScope.oldPoints = $rootScope.game.points;
		}


		function saveRecord (record, maxRecord) {

			if(record > maxRecord){
				localStorageService.add('maxRecord', record);
			}

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
			if(!ms){
				ms = 0;
			}
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

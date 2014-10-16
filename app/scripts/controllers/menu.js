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

		//TODO :Level functions should be in a game factory
		function expToLevel(userLevel){
			return Math.pow(userLevel, 1.5)/3 * 10000;
		}


		//TODO :Change for reverse level function when defined
		function checkLevel(userLevel, userExp){

			var lvl = userLevel;
			var exp = expToLevel(lvl);

			while(userExp > exp){
				lvl = lvl + 1;
				exp = expToLevel(lvl);
			}

			return lvl;
		}


		function checkPlayerLevel(){
			var userLevel = localStorageService.get('userLevel');
			if(userLevel === null){
				/* This is an error*/
				userLevel = 1;
			}
			var userExp = localStorageService.get('userExp');
			if(userExp === null){
				/* This is an error*/
				userExp = 0;
			}

			userExp = parseInt(userExp);
			userLevel = parseInt(userLevel);

			$scope.oldLevel = userLevel;
			$scope.newLevel = checkLevel(userLevel, userExp + $rootScope.game.userExpGained);
			if(userLevel < $scope.newLevel){
				localStorageService.add('userLevel',$scope.newLevel);
			}

			localStorageService.add('userExp', userExp + $rootScope.game.userExpGained);

		}

		checkPlayerLevel();

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

		$scope.showGamecenter = function () {
			gameCenter.showAchievements(null, null);
		};
  });

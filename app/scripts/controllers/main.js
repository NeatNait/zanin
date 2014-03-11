'use strict';

angular.module('zaninApp')
	.controller('MainCtrl', function ($scope, $interval, $timeout) {

		var Action = function(g, c){
			this.gesture = g;
			this.color = c;
		};

		var speed = 5000,
			intervalId,
			lastGesture,
			lastColor;


		$scope.colors = [
			{color:'blue', side:'left'},
			{color:'red', side:'left'},
			{color:'green', side:'right'},
			{color:'orange', side:'right'}
		];

		$scope.firstClick = null;

		$scope.gestures = [
			{g:'tap'},
			{g:'doubleTap'}
			//{g:'swipeLeft'},
			//{g:'swipeRight'}
		];

		$scope.actions = [];


		$scope.points = 0;
		$scope.timeLeft = 60;
		$scope.totalTimePlayed = 0;
		$scope.lvl = 'Level 1';

		$interval(function() {
			if($scope.timeLeft <= 0){
				$scope.lvl = 'GAME OVER';
				$scope.timeLeft = 0;
			}
	        else {

				$scope.totalTimePlayed++;

				if($scope.totalTimePlayed < 30) {
					$scope.timeLeft--;
					$scope.lvl = 'Level 1';
				}else if($scope.totalTimePlayed < 60){
					$scope.timeLeft--;
					$scope.timeLeft--;
					$scope.lvl = 'Level 2';
				}else if($scope.totalTimePlayed < 90){
					$scope.timeLeft -= 3;
					$scope.lvl = 'Level 3';
				}else if($scope.totalTimePlayed < 120){
					$scope.timeLeft -= 4;
					$scope.lvl = 'Level 4';
				}
			}
		}, 1000);



		$timeout(function() {
			
			$scope.colors = [
				{color:'blue', side:'right'},
				{color:'red', side:'right'},
				{color:'green', side:'left'},
				{color:'orange', side:'left'}
			];

		}, 4000);



		$interval(function() {
			
			$scope.gestures = [
				{g:'tap'},
				{g:'doubleTap'},
				{g:'swipeLeft'},
				{g:'swipeRight'}
			];

		}, 20000);


		function resetActionEraser () {

			$interval.cancel(intervalId);

			var id = $interval(function() {
				$scope.createNewAction();
			}, speed);

			intervalId = id;

			return id;
		}


		$scope.init = function(){
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
		};

		$scope.createRandomAction = function(){
			var actualColor = $scope.colors[Math.floor($scope.colors.length*Math.random())].color;
			var actualGesture = $scope.gestures[Math.floor($scope.gestures.length*Math.random())].g;
			return new Action(actualGesture, actualColor);
		};

		$scope.aciertos = function(){
			$scope.points++;
			$scope.timeLeft++;
			
			$scope.createNewAction();
		};

		$scope.createNewAction = function () {
			$scope.actions.splice(0, 1);
			$scope.actions.push($scope.createRandomAction());
		};

		var checkColor = function(c){

			//if everything is equal we've got a valid move
			if(c === $scope.actions[0].color){
				$scope.aciertos();

				//reset the action auto creation counter
				resetActionEraser();

			}else{
				console.log('no');
			}
		};


		$scope.checkGesture = function(c, g){

			//this will avoid double tap/single tap same color bug
			if(lastGesture === 'doubleTap' && g === 'tap' && lastColor === c){
				lastGesture = g;
				lastColor = c;
				return;
			}

			lastGesture = g;
			lastColor = c;



			if($scope.actions[0].gesture === g){
				checkColor(c);
			}
		};

  });

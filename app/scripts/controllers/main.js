'use strict';

angular.module('zaninApp')
	.controller('MainCtrl', function ($scope, $interval) {
		$scope.colors = [
			{color:'blue'},
			{color:'red'},
			{color:'green'},
			{color:'pink'},
			{color:'orange'},
			{color:'yellow'}
		];

		$scope.gestures = [
			{g:'tap'},
			{g:'doubletap'},
			{g:'swipeleft'},
			{g:'swiperight'}
		];

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

		$scope.actions = [
			{doubleTap:false, tap:true, swipeLeft:false, swipeRight:false, color:'red'},
			{doubleTap:false, tap:true, swipeLeft:false, swipeRight:false, color:'black'},
			{doubleTap:false, tap:false, swipeLeft:false, swipeRight:true, color:'black'},
			{doubleTap:false, tap:false, swipeLeft:true, swipeRight:false,color:'black'}
		];

		$scope.aciertos = function(){
			$scope.points++;
			$scope.timeLeft ++;
			var actualColor = $scope.colors[Math.floor($scope.colors.length*Math.random())].color;
			console.log(actualColor);
			var actualGesture = $scope.gestures[Math.floor($scope.gestures.length*Math.random())].g;
			$scope.actions.splice(0, 1);
			console.log(actualGesture);
			switch(actualGesture)
			{
				case 'tap':
					$scope.actions.push({doubleTap:true, tap:true, swipeLeft:false, swipeRight:false, color:'black'});
					break;
				case 'doubletap':
					$scope.actions.push({doubleTap:false, tap:true, swipeLeft:false, swipeRight:false, color:'black'});
					break;
				case 'swipeleft':
					$scope.actions.push({doubleTap:false, tap:false, swipeLeft:true, swipeRight:false, color:'black'});
					break;
				case 'swiperight':
					$scope.actions.push({doubleTap:false, tap:false, swipeLeft:false, swipeRight:true, color:'black'});
					break;
				default:
					$scope.actions.push({doubleTap:true, tap:true, swipeLeft:false, swipeRight:false, color:'black'});

			}
			$scope.actions[0].color = actualColor;
		};

		$scope.selectedColor = function(c){
			if($scope.actions[0].doubleTap === false && $scope.actions[0].tap === true){
				if(c === $scope.actions[0].color){
					$scope.aciertos();
				}else{
					console.log('no');
				}
			}
		};

		$scope.selectedColorSwipeLeft = function(c){
			if($scope.actions[0].swipeLeft === true){
				if(c === $scope.actions[0].color){
					$scope.aciertos();
				}else{
					console.log('no');
				}
			}
		};

		$scope.selectedColorSwipeRight = function(c){
			if($scope.actions[0].swipeRight === true){
				if(c === $scope.actions[0].color){
					$scope.aciertos();
				}else{
					console.log('no');
				}
			}
		};

		$scope.selectedColorDouble = function(c){
			if($scope.actions[0].doubleTap === true){
				if(c === $scope.actions[0].color){
					$scope.aciertos();

					//$scope.actions[0].color = actualColor;
				}else{
					console.log('no');
				}
			}
		};

  });

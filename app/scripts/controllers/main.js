'use strict';

angular.module('zaninApp')
	.controller('MainCtrl', function ($scope, $interval, $timeout, $animate) {

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
			{color:'yellow', side:'right'}
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
		$scope.level = 1;
		$scope.combo = 0;
		$scope.maxlvl = 20;
		$scope.ratelvl = 2;
		$scope.ratetime = 2;
		$scope.points = $scope.ratelvl;
		$scope.maxenergy = 5;
		$scope.energy = 0;
		$scope.timeincrease = 0.5;


		$interval(function() {
			//Comprobar Nivel
			//Función logarítmica en función de los aciertos, con el máximo en MAXLVL
			//$scope.level = function(){
				
			function getBaseLog(x, y){
				return Math.log(y) / Math.log(x);
			}			

			var $value = Math.floor(getBaseLog($scope.ratelvl,$scope.points));
			console.log('valor - ' + $value + ' - ' + $scope.points + ' - ' + getBaseLog($scope.ratelvl,$scope.points))  ;

			if($value <= $scope.maxlvl) 
				$scope.level = $value;
			
			
		//}

			if($scope.timeLeft <= 0){
				$scope.lvl = 'GAME OVER';
				$scope.level = 'GAME OVER';
				$scope.timeLeft = 0;
			}

			/*
			* Función para la puntuación de Zanin
			* En función de los puntos, aumenta la difultad, hasta un máximo			
			* todo se basa en un nivel máximo.
			*/

			else{								
				$scope.timeLeft -=  Math.floor($scope.level/$scope.ratetime);	

			}

			/*
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
			*/
		}, 1000);



		$timeout(function() {
			
			$scope.colors = [
				{color:'blue', side:'right'},
				{color:'red', side:'right'},
				{color:'green', side:'left'},
				{color:'yellow', side:'left'}
			];

		}, 40000);



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
			$scope.points += 1 * $scope.level;
			$scope.timeLeft += $scope.level * ($scope.energy+1) * $scope.timeincrease;
			$scope.combo++;
			if($scope.energy < $scope.maxenergy) $scope.energy++;
			
			$scope.createNewAction();
		};

		$scope.fallos = function(){			
			$scope.combo = 0;
			
			//Change for a function
			$scope.energy = 0;

			
			//$scope.createNewAction();
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

				//$scope.colorOk =
				$animate.addClass(angular.element('.'+c), 'pushed', function (){
					$animate.removeClass(angular.element('.'+c), 'pushed');

					console.log(c);
					console.log('end');
				});


			}else{
				console.log('no');
				$scope.fallos();
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
			else{
				//Problema doble tap. Al hacer doble tap, como primero hay un tap, lo entiende como error
				$scope.fallos();
			}
		};

  });

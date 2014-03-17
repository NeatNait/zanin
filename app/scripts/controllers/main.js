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


		$scope.init = function(){

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
			$scope.timeLeft = 101;
			$scope.totalTimePlayed = 0;
			//$scope.lvl = 'Level 1';
			$scope.level = 1;
			$scope.combo = 0;
			$scope.maxlvl = 20;
			$scope.baselvl = 2;
			$scope.ratePoints = 1.2;
			$scope.ratetime = 1;
			$scope.points = $scope.baselvl;
			$scope.maxenergy = 5;
			$scope.energy = 0;
			$scope.timeincrease = 1;


			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());

		};


		$scope.load = function (wait) {
			$timeout(function() {
				$scope.init();
			}, wait);
		};

		$interval(function() {
			//Comprobar Nivel
			//Función logarítmica en función de los aciertos, con el máximo en MAXLVL
			//$scope.level = function(){
				
			function getBaseLog(x, y){
				return Math.log(y) / Math.log(x);
			}

			var $value = Math.floor(getBaseLog($scope.baselvl,$scope.points));
			//console.log('valor - ' + $value + ' - ' + $scope.points + ' - ' + getBaseLog($scope.baselvl,$scope.points))  ;

			if($value <= $scope.maxlvl) {
				$scope.level = $value;
			}
			
			
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




		$scope.createRandomAction = function(){
			var actualColor = $scope.colors[Math.floor($scope.colors.length*Math.random())].color;
			var actualGesture = $scope.gestures[Math.floor($scope.gestures.length*Math.random())].g;
			return new Action(actualGesture, actualColor);
		};

		$scope.aciertos = function(){
			$scope.points += Math.floor($scope.ratePoints * $scope.level);
			$scope.timeLeft += ($scope.energy+1) * $scope.timeincrease;
			$scope.combo++;
			if($scope.energy < $scope.maxenergy) {
				$scope.energy++;
			}
			
			$scope.createNewAction();
		};

		$scope.fallos = function(){
			$scope.combo = 0;
			
			//Change for a function
			$scope.energy = 0;

			//console.log('Fallo');

			
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
					//console.log(c);
					//console.log('end');
				});


			}else{
				//console.log('no');
				$scope.fallos();
			}
		};

	

		$scope.checkGesture = function(c, g){

			console.log(lastGesture + ' - ' + g + ' - ' + $scope.actions[0].gesture);

			//this will avoid double tap/single tap same color bug
			if(lastGesture === 'doubleTap' && g === 'tap' && lastColor === c){
				lastGesture = g;
				lastColor = c;
				return;
			}


			if($scope.actions[0].gesture === g){
				checkColor(c);
			}
			else{
				//Problema doble tap. Al hacer doble tap, como primero hay un tap, lo entiende como error
				if(lastGesture === 'tap' && g === 'tap' && $scope.actions[0].gesture === 'doubleTap'){

				}
				else{
					$scope.fallos();
				}
			}

			lastGesture = g;
			lastColor = c;

		};

  });

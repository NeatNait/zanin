'use strict';

angular.module('zaninApp')
	.controller('MainCtrl', function ($rootScope, $scope, $interval, $timeout, $animate, $location, GameStat, localStorageService) {


		//TODO :  create a factory for Actions
		var Action = function(g, c){
			this.gesture = g;
			this.color   = c;
		};


		
		var	endGameIntervalId,
			lastPileGesture,
			lastGesture,
			lastColor,
			pointsToChange,
			pointsInterval,
			warnInterval,
			pointsToGesture;

		var userId = localStorageService.get('userId');

		$scope.path = 'game';

		//FIXME : sound not working correctly
		var sound = new Howl({
		  urls: ['audio/loop.wav'],
		  loop: true
		});

		//sound.play();

		$scope.tutorial = true;


		$scope.init = function(){

			//TODO : create a factory or service for the entire game object
			$scope.game = {
				start:new Date(),
				end:false,
				taps:{
					red:{
						count:0,
						color:'#E74A43'
					},
					blue:{
						count:0,
						color:'#44C1EB'
					},
					yellow:{
						count:0,
						color:'#FFC634'
					},
					green:{
						count:0,
						color:'#33cc99'
					},
					misses:{
						count:0,
						color:'#4D5360'
					}
				},
				combos:[]
			};


			$scope.loaded = false;

			

			$scope.firstClick = null;

			$scope.gestures = [
				{g:'tap'},
				{g:'doubleTap'}
				//{g:'swipeLeft'},
				//{g:'swipeRight'}
			];

			$scope.actions = [];

			//TODO : change to game object
			//$scope.game.points = 0;
			$scope.timeLeft = 0;
			$scope.totalTimePlayed = 0;
			$scope.level = 1;
			$scope.combo = 0;
			$scope.game.highestCombo = 0;
			$scope.maxlvl = 20;
			$scope.baselvl = 2;
			$scope.ratePoints = 1.2;
			$scope.ratetime = 0.7;
			$scope.game.points = $scope.baselvl;
			$scope.maxenergy = 7;
			$scope.energy = 0;
			$scope.timeincrease = 1;
			$scope.warnToChange = 0;
			pointsToChange = 300;
			pointsInterval = 300;
			warnInterval = 10;
			pointsToGesture = 400;


			//animation end delay
			$timeout(function () {
				start();

			}, 2000);

			$scope.timeLeft = 5;

		};

		//FIXME : 1st action must be a dobletap to avoid the animation bug
		$scope.gameInit = function(){

			

			$scope.colors = [
				{color:'blue', side:'left'},
				{color:'red', side:'left'},
				{color:'green', side:'right'},
				{color:'yellow', side:'right'}
			];

			var color = $scope.colors[Math.floor($scope.colors.length*Math.random())].color;
			var gesture = $scope.gestures[1].g;
			var action = new Action(gesture, color);
			$scope.actions=[];
			$scope.actions.push(action);
			
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
		};

		$scope.tutorialInit = function(){

			/* Tutorial Step 1*/

			$scope.timeLeft = 5000;
			$scope.step = 1;
			tutorialGoToStep($scope.step);

			$scope.$on('acierto', function() {
				$scope.step++;
				tutorialGoToStep($scope.step);
			});

			
			
			/* Tutorial Step 2 */

			/*
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
			$scope.actions.push($scope.createRandomAction());
			*/
		};

		var tutorialGoToStep = function(step){
			switch(step){
				case 1:
					$scope.colors = [
						{color:'blue', side:'left', dimmed:false},
						{color:'red', side:'left', dimmed:false},
						{color:'green', side:'right', dimmed:false},
						{color:'yellow', side:'right', dimmed:false}
					];
					// Animación
					$timeout(function () {
						$scope.colors = [
							{color:'blue', side:'left', dimmed:false},
							{color:'red', side:'left', dimmed:true},
							{color:'green', side:'right', dimmed:true},
							{color:'yellow', side:'right', dimmed:true}
						];
					}, 3500);
								
													

					$scope.actions.push(new Action('doubleTap', $scope.colors[0].color));
					$scope.actions.push(new Action('tap', $scope.colors[0].color));
					$scope.actions.push(new Action('swipeLeft', $scope.colors[0].color));
					$scope.actions.push(new Action('swipeRight', $scope.colors[0].color));
					$scope.actions.push(new Action('tap', $scope.colors[1].color));
					$scope.actions.push(new Action('tap', $scope.colors[2].color));
					$scope.actions.push(new Action('doubleTap', $scope.colors[3].color));
					$scope.actions.push(new Action('swipeLeft', $scope.colors[0].color));
					$scope.actions.push(new Action('swipeRight', $scope.colors[0].color));

					$scope.instructionText = 'Toca una vez el color azul';

					break;
				case 2:
					$scope.instructionText = 'Toca dos veces el color azul';
					break;
				case 3:
					$scope.instructionText = 'Arrastra a la izquierda en el azul';
					break;
				case 4:
					$scope.instructionText = 'Arrastra a la derecha en el azul';
					break;
				case 5:
					$scope.colors = [
						{color:'blue', side:'left', dimmed:true},
						{color:'red', side:'left', dimmed:false},
						{color:'green', side:'right', dimmed:true},
						{color:'yellow', side:'right', dimmed:true}
					];
					$scope.instructionText = 'Rojo';
					break;
				case 6:
					$scope.colors = [
						{color:'blue', side:'left', dimmed:true},
						{color:'red', side:'left', dimmed:true},
						{color:'green', side:'right', dimmed:false},
						{color:'yellow', side:'right', dimmed:true}
					];
					$scope.instructionText = 'Verde';
					break;
				case 7:
					$scope.colors = [
						{color:'blue', side:'left', dimmed:true},
						{color:'red', side:'left', dimmed:true},
						{color:'green', side:'right', dimmed:true},
						{color:'yellow', side:'right', dimmed:false}
					];
					$scope.instructionText = 'Amarillo';
					break;
				case 8:
					$scope.actions = [];
					$scope.colors = [
						{color:'blue', side:'left', dimmed:true},
						{color:'red', side:'left', dimmed:true},
						{color:'green', side:'right', dimmed:true},
						{color:'yellow', side:'right', dimmed:true}
					];
					$scope.instructionText = 'Esto es el tiempo que te queda. Que no desaparezcan !!';
					$scope.timeLeft = 100;
					$timeout(function () {
						$scope.instructionText = 'Gana tiempo acertando';
					}, 5000);

					$timeout(function () {
						$scope.instructionText = 'Ahora, continúa tu partida :-)';
						$scope.step++;
					}, 7500);

					$timeout(function () {
						$scope.tutorial = false;
						$scope.gameInit();
						$scope.timeLeft = 50;
					}, 10000);

					break;
				default:
					$scope.instructionText = 'Zanin!';
			}
			
			
			
		};

		$scope.getComboClass = function (){
			return Math.ceil($scope.combo/20);
		};

		$scope.load = function ()
		{
			$scope.init();
			
			if($scope.tutorial){
				$scope.tutorialInit();
			} else{
				$scope.gameInit();
			}

		};


		function setLevel(){
			function getBaseLog(x, y){
					return Math.log(y) / Math.log(x);
				}

			var $value = Math.floor(getBaseLog($scope.baselvl, $scope.game.points));
				//console.log('valor - ' + $value + ' - ' + $scope.game.points + ' - ' + getBaseLog($scope.baselvl,$scope.game.points))  ;

			if($value <= $scope.maxlvl) {
				$scope.level = $value;
			}
		}

		//changes the color order
		function changeColors(){
			if($scope.game.points > pointsToChange){
				pointsToChange += pointsInterval;
				changeRandomSide();
			}
		}

		//sets $scope.warnToChange var from 0 to warnInterval, depending on how
		//close points to change is to pointsInterval (1 far 10 close)
		function setWarnToChange(){
			
			$scope.warnToChange = warnInterval - (Math.floor((pointsToChange - $scope.game.points) / pointsInterval * warnInterval));
			if($scope.warnToChange > warnInterval){
				$scope.warnToChange = 0;
			}
		}

		function start () {

			//$scope.timeLeft = 5;
			

			//FIXME : detect load animation end
			$timeout(function(){
				$scope.loaded = true;
			}, 2000);


			endGameIntervalId = $interval(function() {
				//Comprobar Nivel
				//Función logarítmica en función de los aciertos, con el máximo en MAXLVL
				//$scope.level = function(){
					
				
				
				
				
			//}

				if($scope.timeLeft <= 0){

					$scope.timeLeft = 0;
					$interval.cancel(endGameIntervalId);

					//FIXME : sound not working					
					sound.fade(1,0,1000);
					gameEnd();

					$location.path('/menu');

				}

				/*
				* Función para la puntuación de Zanin
				* En función de los puntos, aumenta la difultad, hasta un máximo			
				* NOTE : se basa en un nivel máximo.
				*/

				else{
					$scope.timeLeft -=  Math.floor($scope.level/$scope.ratetime);
				}

				
			}, 1000);
		}

	


		/*$timeout(function() {
			
			$scope.colors = [
				{color:'blue', side:'right'},
				{color:'red', side:'right'},
				{color:'green', side:'left'},
				{color:'yellow', side:'left'}
			];

		}, 40000);*/


		function changeRandomSide(){
			$scope.colors.sort(function() { return 0.5 - Math.random(); });
		}

		
		//FIXME cambiar a puntos
		/*
		$interval(function() {
			
			$scope.gestures = [
				{g:'tap'},
				{g:'doubleTap'},
				{g:'swipeLeft'},
				{g:'swipeRight'}
			];

		}, 20000);
		*/

		function includeGestures(){

			$scope.gestures = [
				{g:'tap'},
				{g:'doubleTap'},
				{g:'swipeLeft'},
				{g:'swipeRight'}
			];

		}

		//TODO : reset action at x interval
		/*
		//var speed = 5000,
		//	intervalId,
		function resetActionEraser () {

			$interval.cancel(intervalId);

			var id = $interval(function() {
				$scope.createNewAction();
			}, speed);

			intervalId = id;

			return id;
		}*/



		$scope.createRandomAction = function(){
			var actualColor = $scope.colors[Math.floor($scope.colors.length*Math.random())].color;
			var actualGesture = $scope.gestures[Math.floor($scope.gestures.length*Math.random())].g;
			return new Action(actualGesture, actualColor);
		};

		$scope.aciertos = function(c){
			$scope.game.points += Math.floor($scope.ratePoints * $scope.level);
			$scope.timeLeft += ($scope.energy+1) * $scope.timeincrease;
			$scope.combo++;
			if($scope.energy < $scope.maxenergy) {
				$scope.energy++;
			}
			$scope.game.taps[c].count++;
			//console.log($scope.game.taps[c].color + ':' + $scope.game.taps[c].count);
			$scope.createNewAction();

			setWarnToChange();
			setLevel();
			changeColors();

			if($scope.game.points > pointsToGesture){
				includeGestures();
			}

			$scope.$broadcast('acierto', c);
		};

		$scope.fallos = function(){

			updateComboHistory();

			$scope.combo = 0;
			//Change for a function
			$scope.energy = 0;

			$scope.game.taps.misses.count++;
			//console.log($scope.game.taps.misses.count);

			
			//$scope.createNewAction();
		};

		function gameEnd(){

			updateComboHistory();

			$scope.game.end = new Date();
			$scope.game.timePlayed = $scope.game.end - $scope.game.start;

			//FIXME : remove starting 2 extra points
			$scope.game.points -= $scope.baselvl;
			//let the game object be accesible for any controller
			$rootScope.game = $scope.game;



			var gameStat = new GameStat();

			gameStat.user = userId;
			gameStat.data = $scope.game;

			//persist to server
			gameStat.$save();
			//console.log($scope.game);

		}

		function updateComboHistory(){

			if($scope.game.highestCombo < $scope.combo){
				$scope.game.highestCombo = $scope.combo;
			}

			$scope.game.combos.push({combo:$scope.combo, lost:new Date()});

			//console.log($scope.game);
			//console.log($scope.game.combos);

			//$rootScope.game.game.highestCombo = $scope.game.highestCombo;

		}

		$scope.createNewAction = function () {
			$scope.actions.splice(0, 1);
			$scope.actions.push($scope.createRandomAction());
		};

		var checkColor = function(c){

			//if everything is equal we've got a valid move
			if(c === $scope.actions[0].color){
				$scope.aciertos(c);

				//reset the action auto creation counter
				//resetActionEraser();

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

	
		var prevEvent,
			checkDouble = 0;
			//tapTimeOut;

		/*var checkMove = function(g, c){

			if($scope.actions[0].gesture === g){
				checkColor(c);
			}
			else{
				$scope.fallos();
			}
		};*/

		//TODO : break into multiple functions again
		$scope.checkGesture = function($event, c, g){
			

			//FIXME : detect animation end
			$scope.loaded = true;
			//console.log("Gesto-" + g + "-Pila-"+$scope.actions[0].gesture+"-PilaAnt-"+lastPileGesture + "-CheckDouble"+checkDouble);

			//fixes Tap-doubletap with just two taps error
			if(g === 'doubleTap' &&
				lastPileGesture === 'tap' &&
				$scope.actions[0].gesture === 'doubleTap') {
				//console.log("Paso por aquí");

				g = 'tap';
				
			}
			lastPileGesture = $scope.actions[0].gesture;

			
			if(g === 'tap' && $scope.actions[0].gesture === 'doubleTap'){
				if(checkDouble){
					$scope.fallos();
					checkDouble = 0;
					return;
				}
				checkDouble++;
				return;
			}


			if(checkDouble && g !== 'doubleTap'){
				$scope.fallos();
				checkDouble = 0;
				return;
			}

			checkDouble = 0;

			/*if(lastGesture === 'doubleTap' && g === 'tap' && lastColor === c){
				lastGesture = g;
				lastColor = c;
				return;
			}*/

			if($scope.actions[0].gesture === g){
				checkColor(c);
			}
			
			else{
				//Problema doble tap. Al hacer doble tap, como primero hay un tap, lo entiende como error
			//	if(lastGesture === 'tap' && g === 'tap' && $scope.actions[0].gesture === 'doubleTap'){
			//	}
			//	else{
				$scope.fallos();
			//	}
			}
			

			
			lastGesture = g;
			lastColor = c;
			prevEvent = $event;
		};

  });

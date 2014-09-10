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

		$scope.tutorial = $rootScope.tutorial;


		$scope.init = function(){

			//TODO : create a factory or service for the entire game object
			$scope.game = {
				start:new Date(),
				end:false,
				taps:{
					globalCount:0,
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
					},
					tap:{
						count:0
					},
					doubleTap:{
						count:0
					},
					swipeRight:{
						count:0
					},
					swipeLeft:{
						count:0
					}
				},
				combos:[],
				achievements:[
					{name:'combo25', desc:'25 combo'},
					{name:'combo50', desc:'50 combo'},
					{name:'combo100', desc:'100 combo'},
					{name:'combo250', desc:'250 combo'},
					{name:'combo500', desc:'500 combo'},
					{name:'failMaster', desc:'You are the fail master'},
					{name:'feelBalance', desc:'feel the right balance'}
				]
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
			$scope.baselvl = 2;
			$scope.game.points = 0;
			$scope.game.metAchievements = [];
			//$scope.game.points = $scope.baselvl;
			$scope.timeLeft = 0;
			$scope.totalTimePlayed = 0;
			$scope.level = 1;
			$scope.combo = 0;
			$scope.game.highestCombo = 0;
			$scope.maxlvl = 20;
			$scope.ratePoints = 1.2;
			$scope.ratetime = 0.7;
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

					$scope.instructionText = 'Double tap blue, seems like a good idea';

					break;
				case 2:
					$scope.instructionText = 'Now single tap blue. There will be no return';
					break;
				case 3:
					$scope.instructionText = 'Let\'s try something new. Swipe left over blue';
					break;
				case 4:
					$scope.instructionText = 'It\'s time to swipe right blue. Yep, blue again';
					break;
				case 5:
					$scope.colors = [
						{color:'blue', side:'left', dimmed:true},
						{color:'red', side:'left', dimmed:false},
						{color:'green', side:'right', dimmed:true},
						{color:'yellow', side:'right', dimmed:true}
					];
					$scope.instructionText = 'And zanin created colors! Tap red';
					break;
				case 6:
					$scope.colors = [
						{color:'blue', side:'left', dimmed:true},
						{color:'red', side:'left', dimmed:true},
						{color:'green', side:'right', dimmed:false},
						{color:'yellow', side:'right', dimmed:true}
					];
					$scope.instructionText = 'A wild new color appeared! Tap green';
					break;
				case 7:
					$scope.colors = [
						{color:'blue', side:'left', dimmed:true},
						{color:'red', side:'left', dimmed:true},
						{color:'green', side:'right', dimmed:true},
						{color:'yellow', side:'right', dimmed:false}
					];
					$scope.instructionText = 'Last but not least. Double tap yellow';
					break;
				case 8:
					$scope.actions = [];
					$scope.colors = [
						{color:'blue', side:'left', dimmed:true},
						{color:'red', side:'left', dimmed:true},
						{color:'green', side:'right', dimmed:true},
						{color:'yellow', side:'right', dimmed:true}
					];

					$scope.instructionText = 'Hit every move and you\'ll gain combo';

					$timeout(function () {
						$scope.instructionText = 'The higher the combo, the faster you\'ll gain time';
					}, 4000);

					
					$timeout(function () {
						$scope.step++;
						$scope.instructionText = 'Those bars show your remaining time. They come to zero and game\'s over';
						$scope.timeLeft = 100;
					}, 9000);

					$timeout(function () {
						$scope.instructionText = 'Now it\'s your time to zanin!';
						$scope.step++;
					}, 16000);

					$timeout(function () {
						//FIXME : scope or rootScope for tutorial
						$scope.tutorial = false;
						$rootScope.tutorial = false;
						$scope.gameInit();
						$scope.timeLeft = 50;
						$scope.step++;

					}, 19000);

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

			var $value = Math.floor(getBaseLog($scope.baselvl, $scope.game.points + $scope.baselvl));
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

		$scope.aciertos = function(c,g){
			$scope.game.points += Math.floor($scope.ratePoints * $scope.level);
			$scope.timeLeft += ($scope.energy+1) * $scope.timeincrease;
			$scope.combo++;
			if($scope.energy < $scope.maxenergy) {
				$scope.energy++;
			}
			$scope.game.taps[c].count++;
			$scope.game.taps.globalCount++;
			$scope.game.taps[g].count++;

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
			$scope.game.tapsPerSecond = $scope.game.taps.globalCount / ($scope.game.timePlayed / 1000);

			//FIXME : remove starting 2 extra points
			//$scope.game.points -= $scope.baselvl;
			//let the game object be accesible for any controller
			$rootScope.game = $scope.game;

			var gameStat = new GameStat();

			gameStat.user = userId;
			gameStat.data = $scope.game;
			//gameStat.data.points -= 2;

			//persist to server
			gameStat.$save();
			//console.log($scope.game);

			$scope.checkAchievements();
			
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

		var checkColor = function(c,g){

			//if everything is equal we've got a valid move
			if(c === $scope.actions[0].color){
				$scope.aciertos(c,g);

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
				checkColor(c,g);
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

		//check if the player has already met this achievement
		var checkPlayerAchievement = function(combo, ach){
			// TO DO: check game center to check the achievement
			if(ach.indexOf(combo) > -1){
				return 0;
			}

			return 1;
		};


		$scope.checkAchievements = function(){

			var achievements = localStorageService.get('achievements');
			if(achievements === null){
				achievements = [];
			}


			//Check all Achievements conditions

			//ComboXX
			if($scope.game.highestCombo >= 25 && checkPlayerAchievement('combo25',achievements)){
				$scope.game.metAchievements.push('combo25');
				achievements.push('combo25');
			} else if($scope.game.highestCombo >= 50 && checkPlayerAchievement('combo50',achievements)){
				$scope.game.metAchievements.push('combo50');
				achievements.push('combo50');
			} else if($scope.game.highestCombo >= 100 && checkPlayerAchievement('combo100',achievements)){
				$scope.game.metAchievements.push('combo100');
				achievements.push('combo100');
			}else if($scope.game.highestCombo >= 250 && checkPlayerAchievement('combo250',achievements)){
				$scope.game.metAchievements.push('combo250');
				achievements.push('combo250');
			}else if($scope.game.highestCombo >= 500 && checkPlayerAchievement('combo500',achievements)){
				$scope.game.metAchievements.push('combo500');
				achievements.push('combo500');
			}

			//Balance Master
			if( ($scope.game.taps.swipeLeft.count === $scope.game.taps.swipeRight.count) &&
				$scope.game.points > 2000 &&
				checkPlayerAchievement('balanceMaster',achievements)){
				
				$scope.game.metAchievements.push('balanceMaster');
				achievements.push('balanceMaster');
			}

			//Tap Engineer
			if( ($scope.game.taps.tap.count === $scope.game.taps.doubleTap.count) &&
				$scope.game.points > 2000 &&
				checkPlayerAchievement('tapEngineer',achievements)){
				
				$scope.game.metAchievements.push('tapEngineer');
				achievements.push('tapEngineer');
			}

			//Fail Master
			if($scope.game.points === 0 && checkPlayerAchievement('failMaster',achievements)){
				$scope.game.metAchievements.push('failMaster');
				achievements.push('failMaster');
			}

			console.log($scope.game);
			//save achievements into localStorage
			localStorageService.add('achievements', achievements);
		};

		
  });

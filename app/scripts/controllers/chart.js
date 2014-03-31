'use strict';

angular.module('zaninApp')
	.controller('ChartCtrl', function ($rootScope, $scope, $interval, $timeout, $animate) {

		$scope.path = 'chart';

		var data = [],
			taps = $rootScope.game.taps;

		for (var tap in taps) {
			data.push({value:taps[tap].count, color: taps[tap].color});
		}

		/*
		var data = [{"value":352,"color":"#E74A43"},
					{"value":351,"color":"#44C1EB"},
					{"value":522,"color":"#FFC634"},
					{"value":515,"color":"#33cc99"},
					{"value":225,"color":"#4D5360"}];
		*/

		//delay for animation
		$timeout(function(){
			$scope.clicksChart = {'data': data, 'options': {} };
		}, 1000);

  });

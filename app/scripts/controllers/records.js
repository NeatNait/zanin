'use strict';

angular.module('zaninApp')
	//.controller('RecordsCtrl', function ($scope, $rootScope, GameStat) {
	.controller('RecordsCtrl', function ($scope, $rootScope, GameStat) {
		$rootScope.path = 'rercords';
		$scope.test = '';

		/*GameStat.get({}, function(gameStat) {
	    	console.log(gameStat);
	  	});*/

		//one result
		/*GameStat.query({parkId:'5346741fa9346a0000aef4de'}, function(records) {
			// GET: /user/123/record
			// server returns: [ {id:456, number:'1234', name:'Smith'} ];

			$scope.records = records;
			var record = records[0];
			console.log(records);
			console.log(record);
			// each item is an instance of Creditrecord
			//expect(record instanceof Creditrecord).toEqual(true);
			//record.name = "J. Smith";
			// non GET methods are mapped onto the instances
			//record.$save();
			// POST: /user/123/record/456 {id:456, number:'1234', name:'J. Smith'}
			// server returns: {id:456, number:'1234', name: 'J. Smith'};

			// our custom method is mapped as well.
			//record.$charge({amount:9.99});
			// POST: /user/123/record/456?amount=9.99&charge=true {id:456, number:'1234', name:'J. Smith'}
     	});*/

		/*GameStat.query({}, function(gameStat) {
//		GameStat.get({userId:123}, function(gameStat) {
			console.log(gameStat);
			//gameStat[0].Name = 'test';
			//gameStat[0].$charge();
		});*/

	});

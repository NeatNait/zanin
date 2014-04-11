'use strict';
angular.module('zaninApp')
  .factory('GameStat', ['$resource', function($resource){
    var resource = $resource('http://gamestats-neatnait.rhcloud.com/api/gamestat/:gameStatId',
    	{gameStatId:'@id'}, {
    	charge: {method:'POST', params:{charge:true}}
    });

    return resource;
  }]);

/*
$resource('/user/:userId/card/:cardId',
      {userId:123, cardId:'@id'}, {
       charge: {method:'POST', params:{charge:true}}

      });

query: {method:'GET', params:{parkId:'5346741fa9346a0000aef4de'}, isArray:true}
      */
/*
var module = angular.module( 'my.resource', [ 'ngResource' ] );
module.factory( 'Resource', [ '$resource', function( $resource ) {
  return function( url, params, methods ) {
    var defaults = {
      update: { method: 'put', isArray: false },
      create: { method: 'post' }
    };
    methods = angular.extend( defaults, methods );
    var resource = $resource( url, params, methods );
    resource.prototype.$save = function() {
      if ( !this.id ) {
        return this.$create();
      }
      else {
        return this.$update();
      }
    };
    return resource;
  };
}]);*/
'use strict';

angular.module('zaninApp')
  .factory('User', ['$resource', function($resource){
    var resource = $resource('http://gamestats-neatnait.rhcloud.com/api/user/:userId',
        {userId:'@id'}, {}
      );

    return resource;
  }]);
'use strict';

/**
 * @ngdoc service
 * @name zaninApp.soundService
 * @description
 * # soundService
 * Service in the zaninApp.
 */
angular.module('zaninApp')
  .service('soundService', function soundService() {
	var sound = new Howl({
	  urls: ['audio/loop.wav'],
	  loop: true
	});

	console.log(2);
	return sound;

  });

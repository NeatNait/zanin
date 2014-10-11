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
		var sounds = {
			loop: new Howl({
				urls: ['audio/loop4.wav'],
				loop: true
			}),
			intro: new Howl({
				urls: ['audio/loop.wav'],
				loop: true
			})
		};

		return sounds;

  });

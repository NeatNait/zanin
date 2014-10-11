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
			intro: new Howl({
				urls: ['audio/intro.mp3'],
				buffer: false,
				loop: true
			}),
			loop: new Howl({
				urls: ['audio/loop4.mp3'],
				buffer: false,
				loop: true
			})
		};

		return sounds;

  });

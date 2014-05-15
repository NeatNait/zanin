'use strict';

describe('Service: gamestat', function () {

  // load the service's module
  beforeEach(module('zaninApp'));

  // instantiate service
  var gamestat;
  beforeEach(inject(function (_gamestat_) {
    gamestat = _gamestat_;
  }));

  it('should do something', function () {
    expect(!!gamestat).toBe(true);
  });

});

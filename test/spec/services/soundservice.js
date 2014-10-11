'use strict';

describe('Service: soundService', function () {

  // load the service's module
  beforeEach(module('zaninApp'));

  // instantiate service
  var soundService;
  beforeEach(inject(function (_soundService_) {
    soundService = _soundService_;
  }));

  it('should do something', function () {
    expect(!!soundService).toBe(true);
  });

});

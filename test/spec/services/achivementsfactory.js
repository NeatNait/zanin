'use strict';

describe('Service: AchivementsFactory', function () {

  // load the service's module
  beforeEach(module('zaninApp'));

  // instantiate service
  var AchivementsFactory;
  beforeEach(inject(function (_AchivementsFactory_) {
    AchivementsFactory = _AchivementsFactory_;
  }));

  it('should do something', function () {
    expect(!!AchivementsFactory).toBe(true);
  });

});

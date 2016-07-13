'use strict';

var expect        = require('chai').expect;
var sinon         = require('sinon');
var StationSearch = require('../../lib/src/stationSearch').StationSearch;
var ApiHandler    = require('../../lib/src/ApiHandler').ApiHandler;

describe('StationSearch', function() {

  describe('#search', function() {
  
    it('calls the injected getHandler with the correct url', function() {
      var mockGet = sinon.stub(ApiHandler, 'get');
      var stationSearch = new StationSearch(ApiHandler);
      stationSearch.search('wharf');
      expect(mockGet.calledWith('https://api.tfl.gov.uk/StopPoint/Search/wharf?modes=tube&faresOnly=False&app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779')).to.equal(true);
    });

  });

});

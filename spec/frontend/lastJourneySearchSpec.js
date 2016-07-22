'use strict';

var expect            = require('chai').expect;
var sinon             = require('sinon');
var LastJourneySearch = require('../../lib/src/lastJourneySearch').LastJourneySearch;
var ApiHandler        = require('../../lib/src/ApiHandler').ApiHandler;

describe('lastJourneySearch', function() {

  describe('#findLastJourney', function() {
  
    it('calls the injected getHandler with the correct url', function() {
      var mockGet = sinon.stub(ApiHandler, 'get');
      var lastJourneySearch = new LastJourneySearch(ApiHandler);
      lastJourneySearch.findLastJourney('1000248', '1000038');
      mockGet.restore();
      expect(mockGet.calledWith('https://api.tfl.gov.uk/journey/journeyresults/1000248/to/1000038?app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779&mode=tube&time=0300& alternativeWalking=false&date=20160723')).to.equal(true);
    });
  });
});

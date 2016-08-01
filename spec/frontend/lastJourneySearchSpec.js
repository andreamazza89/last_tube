'use strict';

var expect            = require('chai').expect;
var sinon             = require('sinon');
var LastJourneySearch = require('../../lib/src/lastJourneySearch').LastJourneySearch;
var ApiHandler        = require('../../lib/src/ApiHandler').ApiHandler;

describe('lastJourneySearch', function() {

  describe('#findLastJourney', function() {

    var apiOptions = {
      resourceUrl: 'https://api.tfl.gov.uk/journey/journeyresults/',
      queryParams: '?app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779&mode=tube&time=0300& alternativeWalking=false&date=20160724'
    }
  
    it('calls the injected getHandler with the correct url', function() {
      var mockGet           = sinon.stub(ApiHandler, 'get');
      var lastJourneySearch = new LastJourneySearch(ApiHandler, apiOptions);
      var fromStationID     = '1000248';
      var toStationID       = '1000038';
      var expectedFullUrl   = apiOptions.resourceUrl + 
      lastJourneySearch.findLastJourney(fromStationID, toStationID);
      mockGet.restore();
      expect(mockGet.calledWith('https://api.tfl.gov.uk/journey/journeyresults/1000248/to/1000038?app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779&mode=tube&time=0300& alternativeWalking=false&date=20160724')).to.equal(true);
    });
  });
});

//Understands how url to search for last journey is constructed, delegates the interaction with the Api itself to the injected apiHandler

'use strict';

(function(exports) {
  function LastJourneySearch(ApiHandler, apiOptions) {
    this._apiHandler = ApiHandler;
    this._apiResourceUrl = apiOptions ? apiOptions.resourceUrl : 'https://api.tfl.gov.uk/journey/journeyresults/';
    this._apiQueryParams = apiOptions ? apiOptions.queryParams : '?app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779&mode=tube&time=0300& alternativeWalking=false&date=20160723'; 
  } 

  LastJourneySearch.prototype = {

    findLastJourney: function(fromStationIcsId, toStationIcsId, callback) {
      var searchUrl = this._apiResourceUrl + fromStationIcsId + '/to/' + toStationIcsId + this._apiQueryParams;
console.log(searchUrl);
      this._apiHandler.get(searchUrl, extractFirstJourney);

      function extractFirstJourney(searchResults) {
        var journey = searchResults.journeys[0];
        callback(journey);
      };
    }
  };
  
  exports.LastJourneySearch = LastJourneySearch;

})(this);

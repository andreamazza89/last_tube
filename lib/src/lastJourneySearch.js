//Understands how url to search for last journey is constructed, delegates the interaction with the Api itself to the injected apiHandler

'use strict';

function LastJourneySearch(ApiHandler, apiOptions) {
  this._apiHandler = ApiHandler;
  this._today = new Date();
  this._targetDate = targetDate(this._today);
  this._apiResourceUrl = apiOptions ? apiOptions.resourceUrl : 'https://api-key-handler.herokuapp.com/tfl?apiRequestUrl=https://api.tfl.gov.uk/journey/journeyresults/';
  this._apiQueryParams = apiOptions ? apiOptions.queryParams : '?mode=tube&time=0300& alternativeWalking=false&date=' + this._targetDate; 

  function targetDate(currentDate) {

    if (currentDate.getHours() > 3) {
      currentDate = currentDate.setDate(currentDate.getDate() + 1);
      currentDate = new Date(currentDate);
    }

    var targetYear = currentDate.getFullYear().toString();
    var targetMonth = twoDigitsZeroPadding(currentDate.getMonth() + 1);
    var targetDay = twoDigitsZeroPadding(currentDate.getDate());

    return targetYear + targetMonth + targetDay;
  };

  function twoDigitsZeroPadding(number) {
    number = number.toString();
    if (number.length < 2) {
      return "0" + number
    } else {
      return number
    }
  };
} 

LastJourneySearch.prototype = {

  findLastJourney: function(fromStationIcsId, toStationIcsId, callback) {
    var searchUrl = this._apiResourceUrl + fromStationIcsId + '/to/' + toStationIcsId + this._apiQueryParams;
    this._apiHandler(searchUrl, extractFirstJourney);

    function extractFirstJourney(searchResults) {
      var journey = searchResults.journeys[0];
      callback(journey);
    };
  }
};


module.exports = LastJourneySearch;


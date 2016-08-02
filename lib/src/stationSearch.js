//Understands how url to search for a station is constructed, delegates the interaction with the Api itself to the injected apiHandler

'use strict';

function StationSearch(ApiHandler, apiOptions) {
  this._apiHandler = ApiHandler;
  this._apiResourceUrl = apiOptions ? apiOptions.resourceUrl : 'https://api.tfl.gov.uk/StopPoint/Search/';
  this._apiQueryParams = apiOptions ? apiOptions.queryParams : '?modes=tube&faresOnly=False&app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779'; 
} 

StationSearch.prototype = {

  search: function(searchParameter, callback, printFieldID) {
    var searchUrl = this._apiResourceUrl + searchParameter + this._apiQueryParams;

    this._apiHandler(searchUrl, extractFirstStation);

    function extractFirstStation(searchResult) {
      var station = searchResult.matches[0];
      callback(station, printFieldID);
    };
  }
};

module.exports = StationSearch;


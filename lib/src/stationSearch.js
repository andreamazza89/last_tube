//Understands how url to search for a station is constructed, delegates the interaction with the Api itself to the injected apiHandler

'use strict';

var apiHandler = require('./apiHandler.js');

var apiResourceUrl = 'https://api-key-handler.herokuapp.com/tfl?apiRequestUrl=' +
                     'https://api.tfl.gov.uk/StopPoint/Search/';
var apiQueryParams = '?modes=tube'

function stationSearch(searchParameter, callback, printFieldID, apiOptions) {
  apiResourceUrl = apiOptions ? apiOptions.resourceUrl : apiResourceUrl;
  apiQueryParams = apiOptions ? apiOptions.queryParams : apiQueryParams ; 

  var searchUrl = apiResourceUrl + searchParameter + apiQueryParams;

  apiHandler(searchUrl, extractFirstStation);

  function extractFirstStation(searchResult) {
    var station = searchResult.matches[0];
    callback(station, printFieldID);
  };
} 


module.exports = stationSearch;

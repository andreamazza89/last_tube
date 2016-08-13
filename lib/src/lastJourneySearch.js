//Understands how url to search for last journey is constructed, delegates the interaction with the Api itself to the injected apiHandler

'use strict';

var apiHandler = require('./apiHandler.js');

function lastJourneySearch(fromStationIcsId, toStationIcsId, callback, apiOptions) {
  var now = new Date();
  var targetDate = targetDate(now);
  var targetTime = '0300'
  var apiResourceUrl = apiOptions ? apiOptions.resourceUrl : 'https://api-key-handler.herokuapp.com/tfl?apiRequestUrl=https://api.tfl.gov.uk/journey/journeyresults/';
  var apiQueryParams = apiOptions ? apiOptions.queryParams : '?mode=tube& alternativeWalking=false&date=' + targetDate + '&time=' + targetTime; 
  var searchUrl = apiResourceUrl + fromStationIcsId + '/to/' + toStationIcsId + apiQueryParams;

  apiHandler(searchUrl, extractFirstJourney);

  function extractFirstJourney(searchResults) {
    var journey = searchResults.journeys[0];
    if(journey.startDateTime.match(/\d\d(?=:)/) > 3 && journey.startDateTime.match(/\d\d(?=:)/) < 19) {
      //the following is a horrible thing to be refactored: 
      var targetTime = '0000'
      var apiQueryParams = apiOptions ? apiOptions.queryParams : '?mode=tube& alternativeWalking=false&date=' + targetDate + '&time=' + targetTime; 
      var searchUrl = apiResourceUrl + fromStationIcsId + '/to/' + toStationIcsId + apiQueryParams;
      apiHandler(searchUrl, extractFirstJourney);
    } else {
      callback(journey);
    }
  };


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

module.exports = lastJourneySearch;

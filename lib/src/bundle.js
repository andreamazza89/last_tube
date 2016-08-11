(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//Understands how to interact with an api

'use strict';


var ApiHandler = function(url, callback) { 
    $.get(url, callback);
  }

module.exports = ApiHandler;

},{}],2:[function(require,module,exports){
//Understands how to interact with the user interface (binds events to the logic and updates the view)

'use strict';

var stationSearch     = require('./stationSearch.js');
var lastJourneySearch = require('./lastJourneySearch.js');

var fromStationIcsId;
var toStationIcsId;

$('#fromStation').submit({inputStation: '#fromSearchParameter', outputStation: '#fromStationResult'}, searchStation);
$('#toStation').submit({inputStation: '#toSearchParameter', outputStation: '#toStationResult'}, searchStation);

$('#findLastJourney').click(function(event) { 
  event.preventDefault(); 
  lastJourneySearch(fromStationIcsId, toStationIcsId, displayLastJourney)
});

function searchStation(event) {
  event.preventDefault();
  var searchParameter = $(event.data.inputStation).val();
  var printFieldID = event.data.outputStation;
  stationSearch(searchParameter, updateStationInfo, printFieldID);
}

function updateStationInfo(stationObject, printFieldID) {
  if (printFieldID === '#fromStationResult') {
    fromStationIcsId = stationObject.icsId;
  } else {
    toStationIcsId = stationObject.icsId;
  }
  $(printFieldID).text(stationObject.name);
}

function displayLastJourney(lastJourney) {
  var lastJourneyDateTime = lastJourney.startDateTime;
  $('#lastTrainTime').text(lastJourneyDateTime);
  $('#last-train-container').css('display', 'block');
}


////////////////////////////Consider not sending printFieldID into the callBack as it should be implicit and available to displayStation?

},{"./lastJourneySearch.js":3,"./stationSearch.js":4}],3:[function(require,module,exports){
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
    if(journey.startDateTime.match(/\d\d(?=:)/) > 3) {

      //the following is a horrible thing to be refactored: 
      var targetTime = '0000'
      var apiQueryParams = apiOptions ? apiOptions.queryParams : '?mode=tube& alternativeWalking=false&date=' + targetDate + '&time=' + targetTime; 
      var searchUrl = apiResourceUrl + fromStationIcsId + '/to/' + toStationIcsId + apiQueryParams;
      apiHandler(searchUrl, extractFirstJourney);
    }
    callback(journey);
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

},{"./apiHandler.js":1}],4:[function(require,module,exports){
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

},{"./apiHandler.js":1}]},{},[2]);

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

var StationSearch     = require('./stationSearch.js');
var LastJourneySearch = require('./lastJourneySearch.js');

var stationSearch     = new StationSearch();
var lastJourneySearch = new LastJourneySearch();
var fromStationIcsId;
var toStationIcsId;

$('#fromStation').submit({inputStation: '#fromSearchParameter', outputStation: '#fromStationResult'}, searchStation);
$('#toStation').submit({inputStation: '#toSearchParameter', outputStation: '#toStationResult'}, searchStation);

$('#findLastJourney').click(function(event) { 
  event.preventDefault(); 
  lastJourneySearch.findLastJourney(fromStationIcsId, toStationIcsId, displayLastJourney)
});

function searchStation(event) {
  event.preventDefault();
  var searchParameter = $(event.data.inputStation).val();
  var printFieldID = event.data.outputStation;
  stationSearch.search(searchParameter, updateStationInfo, printFieldID);
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

var apiHandler = require('./ApiHandler.js');

function LastJourneySearch(apiOptions) {
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
    apiHandler(searchUrl, extractFirstJourney);

    function extractFirstJourney(searchResults) {
      var journey = searchResults.journeys[0];
      callback(journey);
    };
  }
};


module.exports = LastJourneySearch;


},{"./ApiHandler.js":1}],4:[function(require,module,exports){
//Understands how url to search for a station is constructed, delegates the interaction with the Api itself to the injected apiHandler

'use strict';

var apiHandler = require('./ApiHandler.js');

function StationSearch(apiOptions) {
  this._apiResourceUrl = apiOptions ? apiOptions.resourceUrl : 'https://api.tfl.gov.uk/StopPoint/Search/';
  this._apiQueryParams = apiOptions ? apiOptions.queryParams : '?modes=tube&faresOnly=False&app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779'; 
} 

StationSearch.prototype = {

  search: function(searchParameter, callback, printFieldID) {
    var searchUrl = this._apiResourceUrl + searchParameter + this._apiQueryParams;

    apiHandler(searchUrl, extractFirstStation);

    function extractFirstStation(searchResult) {
      var station = searchResult.matches[0];
      callback(station, printFieldID);
    };
  }
};

module.exports = StationSearch;


},{"./ApiHandler.js":1}]},{},[2]);

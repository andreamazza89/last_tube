//Understands how to interact with the user interface (binds events to the logic and updates the view)

'use strict';

var StationSearch     = require('./stationSearch.js');
var ApiHandler        = require('./ApiHandler.js');
var LastJourneySearch = require('./lastJourneySearch.js');

var stationSearch     = new StationSearch(ApiHandler);
var lastJourneySearch = new LastJourneySearch(ApiHandler);
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

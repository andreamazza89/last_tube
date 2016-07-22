//Understands how to interact with the user interface (binds events to the logic and updates the view)

'use strict';

$(document).ready(function() {
  
  var stationSearch = new StationSearch(ApiHandler);

  $('#fromStation').submit({inputStation: '#fromSearchParameter', outputStation: '#fromStationResult'}, searchStation);
  $('#toStation').submit({inputStation: '#toSearchParameter', outputStation: '#toStationResult'}, searchStation);

  $('#findLastJourney').click(function(event) { 
    event.preventDefault(); 
    $('#last-train-container').css('display', 'block');
  });

 function searchStation(event) {
    event.preventDefault();
    var searchParameter = $(event.data.inputStation).val();
    var printFieldID = event.data.outputStation;
    stationSearch.search(searchParameter, displayStation, printFieldID);
  }

  function displayStation(stationObject, printFieldID) {
    $(printFieldID).text(stationObject.name);
  }
});


////////////////////////////Consider not sending printFieldID into the callBack as it should be implicit and available to displayStation?

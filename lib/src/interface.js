$(document).ready(function() {
  
  var stationSearch = new StationSearch(ApiHandler);

  $('#fromStation').submit({inputStation: '#fromSearchParameter', outputStation: '#fromStationResult'}, searchStation);
  $('#toStation').submit({inputStation: '#toSearchParameter', outputStation: '#toStationResult'}, searchStation);

 function searchStation(event) {
    event.preventDefault();
    var searchParameter = $(event.data.inputStation).val();
    var printFieldID = event.data.outputStation;
    stationName = stationSearch.search(searchParameter, displayStation, printFieldID);
  }

  function displayStation(stationObject, printFieldID) {
    $(printFieldID).text(stationObject.name);
  }
});


////////////////////////////Consider not sending printFieldID into the callBack as it should be implicit and available to displayStation?

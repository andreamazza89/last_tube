$(document).ready(function() {
  
  var stationSearch= new StationSearch();


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


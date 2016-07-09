$(document).ready(function() {
  
  var stationSearch= new StationSearch();


 $('#fromStation').on('submit', searchFromStation);
 $('#toStation').on('submit', searchToStation);

 function searchFromStation(event) {
    event.preventDefault();
    var searchParameter = $('#fromSearchParameter').val()
    stationName = stationSearch.search(searchParameter, displayFromStation);
  }

  function displayFromStation(stationObject) {
    $('#fromStationResult').text(stationObject.name);
  }

 function searchToStation(event) {
    event.preventDefault();
    var searchParameter = $('#toSearchParameter').val()
    stationName = stationSearch.search(searchParameter, displayToStation);
  }

  function displayToStation(stationObject) {
    $('#toStationResult').text(stationObject.name);
  }
});


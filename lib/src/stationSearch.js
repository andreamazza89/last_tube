//$(document).ready(function() {

  function StationSearch(api = 'tfl') {
    this._api = api;
  } 

  StationSearch.prototype = {

    search: function(searchParameter, callback) {
  

      var example = 'https://api.tfl.gov.uk/StopPoint/Search/' + searchParameter + '?modes=tube&faresOnly=False&app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779';

      $.get(example, extractStation);


      function extractStation(searchResult) {
        var station = searchResult.matches[0];
        callback(station);
      };
    },
  }

//});

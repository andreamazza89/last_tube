  function StationSearch(api, apiOptions) {
    this._api = api || 'https://api.tfl.gov.uk/StopPoint/Search/';
    this._apiOptions = apiOptions || '?modes=tube&faresOnly=False&app_id=86edcb7f&app_key=d623423387aeb5205f919ef9f8549779'; 
  } 

  StationSearch.prototype = {

    search: function(searchParameter, callback, printFieldID) {
      var searchUrl = this._api + searchParameter + this._apiOptions;

      $.get(searchUrl, extractStation);

      function extractStation(searchResult) {
        var station = searchResult.matches[0];
        callback(station, printFieldID);
      };
    }
  };

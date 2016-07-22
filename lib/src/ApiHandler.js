//Understands how to interact with an api

'use strict';

(function(exports) {

  var ApiHandler = {

    get: function(url, callback) { 
      $.get(url, callback);
    }
  };

  exports.ApiHandler = ApiHandler;

})(this);

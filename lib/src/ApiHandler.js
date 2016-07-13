'use strict';

(function(exports) {

  var ApiHandler = {

    get: function(url, callback) { 
console.log(url)
      $.get(url, callback);
    }

  };

  exports.ApiHandler = ApiHandler;

})(this);

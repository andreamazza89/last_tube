//Understands how to interact with an api

'use strict';


var ApiHandler = function(url, callback) { 
    $.get(url, callback);
  }

module.exports = ApiHandler;

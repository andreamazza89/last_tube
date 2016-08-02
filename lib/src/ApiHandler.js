//Understands how to interact with an api

'use strict';


var ApiHandler = {
  get: function(url, callback) { 
    $.get(url, callback);
  }
};

module.exports = ApiHandler;

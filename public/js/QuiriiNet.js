define(['router'], function(router) {
  var initialize = function() {
    //checkLogin(runApplication);
    //Backbone.history.start({pushState: true});
    Backbone.history.start();
  };

  /*var checkLogin = function(callback) {
    $.ajax("/api/me/authenticated", {
      method: "GET",
      success: function() {
        return callback(true);

      },
      error: function(data) {
        return callback(false);
      }
    });
  };

  var runApplication = function(authenticated) {
    if (!authenticated) {
      console.log("User must login.");
      window.location.hash = 'login';
    } else {
      console.log("User is logged in.");
      window.location.hash = 'index';
    }
    Backbone.history.start();
  };*/

  return {
    initialize: initialize
  };
});

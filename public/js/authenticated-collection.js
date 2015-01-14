/* global define:true */
define([
    "Backbone"
], function(Backbone) {
    "use strict";

    /**
     * Wrap Backbone's error with our own, which handles unauthenticated response codes
     * and performs the necessary logic in this case (navigate to login page, perhaps)
     *
     * @param  {Object} options The options for the sync function
     */
    function wrapBackboneError(options) {
        var success = options.success;
        var error = options.error;

        //handle success condition
        options.success = function(response, status, xhr) {
              console.log('SUCCESS RESPONSE IS ', response.meta.code);
              success(response, status, xhr);
              if (response.meta.code === 401) {
                console.log("USER NOT LOGGED IN");

                Backbone.history.navigate("login", {
                  trigger: true
                });
              }
        };        
        options.error = function(response) {
            if (response.status === 401) {
                // Add logic to send the user to the login page,
                // or general authentication page.
                //
                // In this example, we'll send the user to the "login" page:
                Backbone.history.navigate("login", {
                    trigger: true
                });
            } else {
                if (error) error(response);
            }
        };
    }

    // Extend Backbone's Collection to override the sync function. Doing so allows us
    // to get a hook into how the errors are handled. Here we can check if the
    // response code is unauthorized, and if so, navigate to the login page
    return Backbone.Collection.extend({
        sync: function(method, collection, options) {
            wrapBackboneError(options);
            Backbone.Collection.prototype.sync.apply(this, arguments);
        }
    });
});
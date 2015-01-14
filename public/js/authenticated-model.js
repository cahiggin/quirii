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

        //handle error condition
        options.error = function(response) {
            if (response.status === 401) {
                console.log("USER NOT LOGGED IN");
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


    // Extend Backbone's Model to override the sync function. Doing so allows us
    // to get a hook into how the errors are handled. Here we can check if the
    // response code is unauthorized, and if so, navigate to the login page
    return Backbone.Model.extend({
        sync: function(method, model, options) {
            console.log("BACKBONE MODEL OPTIONS ARE", options.success);
            wrapBackboneError(options);
            Backbone.Model.prototype.sync.apply(this, arguments);
        }
    });
});
define(function(require) {
  var AuthModel = Backbone.Model.extend({

		wrapBackboneError: function(options) {
			var success = options.success;
			var error = options.error;
			var customSuccess = function(resp, status, xhr) {
			  console.log('SUCCESS RESPONSE IS ', resp.meta.code);
			  //success(resp, status, xhr);
			  if (resp.meta.code === 401) {
          console.log("USER NOT LOGGED IN");

          Backbone.history.navigate("login", {
            trigger: true
          });
        }
			};
			customError = function(resp, status, xhr) {
			  error(resp, status, xhr);
			};
			options.success = customSuccess;
			options.error = customError;
		},	

		sync: function(method, model, options) {
      //console.log("BACKBONE MODEL OPTIONS ARE", options.success);
      this.wrapBackboneError(options);
      Backbone.Model.prototype.sync.apply(this, arguments);
    },
  	
  	parse: function(response){
  		console.log("PARSING RESPONSE ", response.data);
  		return response.data;
  	}
  });

  return AuthModel;
});
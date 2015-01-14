//define(function(require) {
define(["authenticated-model"], function(AuthenticatedModel){
  	var Morphii = AuthenticatedModel.extend({
  	//var Morphii = Backbone.Model.extend({

  	urlRoot: '/api/morphiis',

  	parse: function(response){
  		return response.data.morphiis;
  	}
  });

  return Morphii;
});


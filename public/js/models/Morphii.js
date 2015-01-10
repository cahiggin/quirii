define(function(require) {
  var Morphii = Backbone.Model.extend({

  	urlRoot: '/api/morphiis',

  	parse: function(response){
  		return response.data.morphiis;
  	}
  });

  return Morphii;
});


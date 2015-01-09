define(function(require) {
  var Morphii = Backbone.Model.extend({

  	urlRoot: '/api/morphiis',

  	parse: function(response){
  		console.log("parsing morphii ", response.data.morphiis);
  		return response.data.morphiis;
  	}
  });

  return Morphii;
});


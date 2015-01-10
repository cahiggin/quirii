define(['models/Morphii'], function(Morphii) {
  var Morphiis = Backbone.Collection.extend({

  	url: '/api/morphiis',

    model: Morphii,

    parse: function(response){
  		return response;
 	}
 	
  });

  return Morphii;
});
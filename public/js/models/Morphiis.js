define(['models/Morphii'], function(Morphii) {
  var Morphiis = Backbone.Collection.extend({

  	url: '/api/morphiis',

    model: Morphii,

    parse: function(response){
    	//console.log("QuiriiCollection data is ", data);
  		return response.data.morphiis;
 	}
 	
  });

  return Morphii;
});
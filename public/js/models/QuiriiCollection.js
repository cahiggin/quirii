define(['models/Quirii'], function(Quirii) {
  var QuiriiCollection = Backbone.Collection.extend({

    model: Quirii,

    parse: function(data){
  		return data.data.quiriis;
 	}
 	
  });

  return QuiriiCollection;
});
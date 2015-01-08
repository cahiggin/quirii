define(['models/Quirii'], function(Quirii) {
  var QuiriiCollection = Backbone.Collection.extend({

  	url: '/api/me/quiriis',

    model: Quirii,

    parse: function(data){
    	//console.log("QuiriiCollection data is ", data);
  		return data.data.quiriis;
 	}
 	
  });

  return QuiriiCollection;
});
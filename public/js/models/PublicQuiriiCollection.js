define(['models/PublicQuirii'], function(PublicQuirii) {
  var PublicQuiriiCollection = Backbone.Collection.extend({

    model: PublicQuirii,

    url: '/api/quiriis/',

    parse: function(data){
  		return data.data.quiriis;
 	}
 	
  });

  return PublicQuiriiCollection;
});
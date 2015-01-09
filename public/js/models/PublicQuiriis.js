define(['models/PublicQuirii'], function(PublicQuirii) {
  var PublicQuiriis = Backbone.Collection.extend({

    model: PublicQuirii,

    url: '/api/quiriis/',

    parse: function(data){
  		return data.data.quiriis;
 	}
 	
  });

  return PublicQuiriis;
});
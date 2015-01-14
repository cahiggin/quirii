//define(['models/PublicQuirii'], function(PublicQuirii) {
//  var PublicQuiriis = Backbone.Collection.extend({
define(['authenticated-collection', 'models/PublicQuirii'], function(AuthenticatedCollection, PublicQuirii){
    var PublicQuiriis = AuthenticatedCollection.extend({	

    model: PublicQuirii,

    url: '/api/quiriis/',

    parse: function(data){
  		return data.data.quiriis;
 	}
 	
  });

  return PublicQuiriis;
});
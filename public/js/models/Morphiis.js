//define(['models/Morphii'], function(Morphii) {
//  var Morphiis = Backbone.Collection.extend({
define(['authenticated-collection', 'models/Morphii'], function(AuthenticatedCollection, Morphii){
    var Morphiis = AuthenticatedCollection.extend({	
  	url: '/api/morphiis',

    model: Morphii,

    parse: function(response){
  		return response;
 	}
 	
  });

  return Morphii;
});
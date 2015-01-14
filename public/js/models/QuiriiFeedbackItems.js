//define(['models/QuiriiFeedbackItem'], function(QuiriiFeedbackItem) {
//  var QuiriiFeedbackItems = Backbone.Collection.extend({
define(['authenticated-collection', 'models/QuiriiFeedbackItem'], function(AuthenticatedCollection, QuiriiFeedbackItem){
    var QuiriiFeedbackItems = AuthenticatedCollection.extend({	

    model: QuiriiFeedbackItem,

    //url: '/api/quiriis/' + this.id + '/feedback',

    parse: function(response){
  		return response.data.feedback;
 	}
 	
  });

  return QuiriiFeedbackItems;
});
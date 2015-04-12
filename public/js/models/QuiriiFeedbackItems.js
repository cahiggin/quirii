define(['authenticated-collection', 'models/QuiriiFeedbackItem'], function(AuthenticatedCollection, QuiriiFeedbackItem){
    var QuiriiFeedbackItems = AuthenticatedCollection.extend({	

    model: QuiriiFeedbackItem,

    parse: function(response){
  		return response.data.feedback;
 	}
 	
  });

  return QuiriiFeedbackItems;
});
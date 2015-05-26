define(['authenticated-collection', 'models/QuiriiFeedbackItem'], function(AuthenticatedCollection, QuiriiFeedbackItem){
    var QuiriiFeedbackItems = AuthenticatedCollection.extend({	

    model: QuiriiFeedbackItem,

    parse: function(response){
        if (response.meta.code === 200) { // Public
  		    return response.data.feedback;
        }
 	}
 	
  });

  return QuiriiFeedbackItems;
});
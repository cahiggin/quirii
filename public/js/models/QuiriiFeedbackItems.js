define(['models/QuiriiFeedbackItem'], function(QuiriiFeedbackItem) {
  var QuiriiFeedbackItems = Backbone.Collection.extend({

    model: QuiriiFeedbackItem,

    url: '/api/quiriis/' + this.id + '/feedback',

    parse: function(response){
  		return response.data.feedback;
 	}
 	
  });

  return QuiriiFeedbackItems;
});
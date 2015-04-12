define(["authenticated-model"], function(AuthenticatedModel){
    var QuiriiFeedbackItem = AuthenticatedModel.extend({
	
    parse: function(response){
  		return response;
 	  }

  });
  
  return QuiriiFeedbackItem;

});
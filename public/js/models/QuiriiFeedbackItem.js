//define(function(require) {
//  var QuiriiFeedbackItem = Backbone.Model.extend({

define(["authenticated-model"], function(AuthenticatedModel){
    var QuiriiFeedbackItem = AuthenticatedModel.extend({

    //urlRoot: '/api/quiriis/' + this.id + '/feedback',
    //idAttribute: "_id",

    parse: function(response){
  		return response;
 	  }

  });
  
  return QuiriiFeedbackItem;

});
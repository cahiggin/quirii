//define(['models/Quiriis'], function(Quiriis) {
//  var User = Backbone.Model.extend({

define(["authenticated-model"], function(AuthenticatedModel){
    var User = AuthenticatedModel.extend({
    urlRoot: '/users',

    initialize: function() {
      
      
    }
  });

  return User;
});
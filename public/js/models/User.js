define(['models/Quiriis'], function(Quiriis) {
  var User = Backbone.Model.extend({
    urlRoot: '/users',

    initialize: function() {
      
      
    }
  });

  return User;
});
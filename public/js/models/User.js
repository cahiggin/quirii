define(['models/QuiriiCollection'], function(QuiriiCollection) {
  var User = Backbone.Model.extend({
    urlRoot: '/users',

    initialize: function() {
      this.quiriis       = new QuiriiCollection();
      this.quiriis.url   = '/api/me/quiriis/';
      console.log(this.quiriis);
      
    }
  });

  return User;
});
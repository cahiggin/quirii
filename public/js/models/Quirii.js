define(["authenticated-model"], function(AuthenticatedModel){
    var Quirii = AuthenticatedModel.extend({

    urlRoot: '/api/me/quiriis/',

    parse: function (data) {
      if(!this.id){
        return data;
      } else {
        return data.data.quirii;
      };
    }
  });
  
  return Quirii;
});
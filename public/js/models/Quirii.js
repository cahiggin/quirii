define(["authenticated-model"], function(AuthenticatedModel){
    var Quirii = AuthenticatedModel.extend({

    urlRoot: '/api/me/quiriis/',

    parse: function (data) {
      if(!this.id){
        return data;
      } else {
        if (data.meta.code === 404 || !data.data) {
          Backbone.history.navigate("login", {
            trigger: true
          });
        } else {
          return data.data.quirii;
        }
      };
    }
  });
  
  return Quirii;
});
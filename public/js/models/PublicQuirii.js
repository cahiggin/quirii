//define(function(require) {
//var Quirii = Backbone.Model.extend({
define(["authenticated-model"], function(AuthenticatedModel) {
  var PublicQuirii = AuthenticatedModel.extend({
    urlRoot: '/api/quiriis/',
    parse: function(data) {
      if (!this.id) {
        return data
      } else {
        return data.data.quirii;
      };
    }
  });
  return PublicQuirii;
});

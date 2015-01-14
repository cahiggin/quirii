//define(function(require) {
  //var Quirii = Backbone.Model.extend({
define(["authenticated-model"], function(AuthenticatedModel){
    var PublicQuirii = AuthenticatedModel.extend({
    urlRoot: '/api/quiriis/',
    //idAttribute: "_id",

    parse: function(data){
    	if (!this.id){
    		return data
    	} else {
        console.log("public quirii data is ", data);
  			return data.data.quirii;
    	};
      //console.log("DATa ", data);
      //console.log("Data data quirii ", data.data.quirii);
      //return data.data.quirii;
    	
 	}

  });
  
  return PublicQuirii;

});
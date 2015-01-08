define(function(require) {
  var Quirii = Backbone.Model.extend({
    urlRoot: '/api/quiriis/',
    //idAttribute: "_id",

    parse: function(data){
    	if (!this.id){
    		return data
    	} else {
  			return data.data.quirii;
    	};
      //console.log("DATa ", data);
      //console.log("Data data quirii ", data.data.quirii);
      //return data.data.quirii;
    	
 	}

  });
  
  return Quirii;

});
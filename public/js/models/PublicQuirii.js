define(function(require) {
  var Quirii = Backbone.Model.extend({
    urlRoot: '/api/quiriis/',

    parse: function(data){
    	if (!this.id){
    		return data
    	} else {
  			return data.data.quirii;
    	};
    	
 	}

  });
  
  return Quirii;

});
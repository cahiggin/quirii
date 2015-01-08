define(function(require) {
  var Quirii = Backbone.Model.extend({

    urlRoot: '/api/me/quiriis/',
    //idAttribute: "_id",

    initialize: function(){
      if (!this.attributes.id){
        //console.log("HAS NO ID", this.attributes);
      } else {
        //console.log("HAS AN ID", this.attributes.id);
        //this.get(this.attributes.id);
      }
    },

    

    parse: function(data){
    	if(!this.id){
        return data;
      } else {
        var quiriiContent = data.data.quirii;
        var feedback = data.data.feedback;
        var wholeQuirii = {quirii: quiriiContent, feedback: feedback};
        return data.data.quirii;
        //return wholeQuirii
      };
    	
 	}

  });
  
  return Quirii;

});
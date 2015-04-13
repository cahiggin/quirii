define(['authenticated-collection', 'models/Quirii'], function(AuthenticatedCollection, Quirii){
    var Quiriis = AuthenticatedCollection.extend({  

    url: '/api/me/quiriis',

    model: Quirii,

    parse: function(data){
        console.log("QuiriiCollection data is ", data);
        return data.data.quiriis;
    }
    
  });

  return Quiriis;
});
define(['QuiriiNetViewPublic', 'text!templates/publicQuirii.html', 'models/PublicQuiriis', 
  'views/giveQuiriiFeedback'], 
  function(QuiriiNetViewPublic, publicQuiriiTemplate, PublicQuiriis, 
    GiveQuiriiFeedbackView) {
  var publicQuiriiView = QuiriiNetViewPublic.extend({
   
    el: $('#content'),

    events: {
    },

    initialize: function() {
      var thisView = this;
      console.log("collection is ", this.collection);
      console.log("model is ", this.model);
      this.model.on('change', this.render, this);
      //this.morphyUi = (new MorphyUiView({el: $("#morphy-ui"), model: this.model})).render();
      this.giveFeedbackView = (new GiveQuiriiFeedbackView({collection:this.collection}));
    },

    render: function() {
      $(this.el).html(_.template(publicQuiriiTemplate)( {
        model: this.model.toJSON()
      }));
      //this.morphyUi = (new MorphyUiView({el: $("#morphy-ui"), model: this.model})).render();

      return this;
    }

  });

  return publicQuiriiView;
});

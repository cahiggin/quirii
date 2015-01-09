define(['QuiriiNetViewPublic', 'text!templates/publicQuirii.html', 'text!templates/morphyUi.html', 
  'models/Morphii', 'views/morphy', 'views/morphyUi', 'models/QuiriiFeedbackItems', 'models/PublicQuiriis'], 
  function(QuiriiNetViewPublic, publicQuiriiTemplate, morphyUiTemplate, 
    Morphy, MorphyView, MorphyUiView, QuiriiFeedbackItems, PublicQuiriis) {
  var publicQuiriiView = QuiriiNetViewPublic.extend({
   
    el: $('#content'),

    events: {
    },

    initialize: function() {
      var that = this;
      that.id = this.model.id;
      this.model.on('change', this.render, this);
      //this.morphyUi = (new MorphyUiView({el: $("#morphy-ui"), model: this.model})).render();
    },

    render: function() {
      $(this.el).html(_.template(publicQuiriiTemplate)( {
        id: this.id,
        model: this.model.toJSON()
      }));
      this.morphyUi = (new MorphyUiView({el: $("#morphy-ui"), model: this.model})).render();

      return this;
    }

  });

  return publicQuiriiView;
});

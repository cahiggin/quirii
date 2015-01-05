define(['QuiriiNetViewPublic', 'text!templates/publicQuirii.html', 'text!templates/morphyUi.html', 'models/Morphy', 'views/morphy', 'views/morphyUi'], 
  function(QuiriiNetViewPublic, publicQuiriiTemplate, morphyUiTemplate, Morphy, MorphyView, MorphyUiView) {
  var publicQuiriiView = QuiriiNetViewPublic.extend({
   
    el: $('#content'),

    events: {
    },

    initialize: function() {
      this.model.on('change', this.render, this);
      //this.morphyUi = (new MorphyUiView({el: $("#morphy-ui"), model: this.model})).render();
    },

    render: function() {
      $(this.el).html(_.template(publicQuiriiTemplate)( {
        model: this.model.toJSON()
      }));
      this.morphyUi = (new MorphyUiView({el: $("#morphy-ui"), model: this.model})).render();

      return this;
    }

  });

  return publicQuiriiView;
});

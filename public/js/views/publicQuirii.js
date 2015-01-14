define(['QuiriiNetView', 'text!templates/publicQuirii.html', 'models/PublicQuiriis', 
  'views/giveQuiriiFeedback'], 
  function(QuiriiNetView, publicQuiriiTemplate, PublicQuiriis, 
    GiveQuiriiFeedbackView) {
  var publicQuiriiView = QuiriiNetView.extend({

    requireLogin: false,
   
    el: '#content',

    initialize: function(options) {
      var thisView = this;
      this.options = options;
      this.morphiis = options.morphiis;
      this.morphiis.on('reset', this.renderGetFeedback, this);
      this.morphiis.on('change', this.renderGetFeedback, this);
      this.morphiis.on('add', this.renderGetFeedback, this);
      this.model.on('change', this.render, this);
    },

    renderGetFeedback: function(){
      this.giveFeedbackView = (new GiveQuiriiFeedbackView({collection:this.collection, morphiis:this.morphiis}));
    },

    render: function() {
      $(this.el).html(_.template(publicQuiriiTemplate)( {
        model: this.model.toJSON()
      }));
      return this;
    }

  });

  return publicQuiriiView;
});

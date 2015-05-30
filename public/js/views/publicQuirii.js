define(['QuiriiNetView', 'text!templates/publicQuirii.html', 'models/PublicQuiriis', 
  'views/giveQuiriiFeedback'], 
  function(QuiriiNetView, publicQuiriiTemplate, PublicQuiriis, 
    GiveQuiriiFeedbackView) {
  var publicQuiriiView = QuiriiNetView.extend({
    requireLogin: false,
    el: '#content',
    
    events: {
      "click #show-quirii": "showQuirii"
    },

    initialize: function(options) {
      var thisView = this;
      this.options = options;
      this.morphiis = options.morphiis;
      this.feedbackCollection = options.fbCollection;
      this.morphiis.on('reset', this.renderGetFeedback, this);
      this.morphiis.on('change', this.renderGetFeedback, this);
      this.morphiis.on('add', this.renderGetFeedback, this);
      this.model.on('change', this.render, this);
    },

    renderGetFeedback: function(){
      this.giveFeedbackView = (new GiveQuiriiFeedbackView({
        feedbackCollection:this.feedbackCollection, 
        morphiis:this.morphiis
      }));
    },
    
    showQuirii: function () {
      $('#landing-view, #powered-by').remove();
      $('#respond-view').hide().removeClass('hidden').fadeIn();    
      $('#navigation').hide().removeClass('hidden').fadeIn();    
    },
    
    render: function() {
      QuiriiScope.setTitle('Quirii');
      $('#navigation').addClass('hidden give-feedback');
      
      $(this.el).html(_.template(publicQuiriiTemplate)( {
        model: this.model.toJSON()
      }));
      return this;
    }

  });

  return publicQuiriiView;
});

define(['QuiriiNetView', 'text!templates/morphyUi.html', 'models/Morphii',
  'models/QuiriiFeedbackItem', 'views/morphiiStaticThumb', 'text!templates/giveQuiriiFeedback.html',
  'views/morphy'],
function(QuiriiNetView, morphyUiTemplate, Morphii, 
  QuiriiFeedbackItem, MorphiiStaticThumbView, giveQuiriiFeedbackTemplate,
  MorphiiView) {
  var giveQuiriiFeedbackView = QuiriiNetView.extend({

    requireLogin: false,
    
    el: '#quirii-feedback',

    events: {
      "input input[name=intensity]": "updateMorphii",
      "click input[name=scale]:checked": "switchMorphii",
      "click #postMorphy": "postMorphii"
    },

    initialize: function(options) {
      _.bindAll(this,'render');
      this.options = options;
      var thisView = this;
      //define this.feedbackCollection from options
      this.feedbackCollection = options.feedbackCollection;

      //define this.model to be an instance of QuiriiFeedbackItem
      this.model = new QuiriiFeedbackItem();
      this.model.url = options.feedbackCollection.url;

      //check that this.morphiis has been set by parent view
      this.morphiisCollection = options.morphiis;

      //convert this.morphiis to an array to use underscore all over it
      this.morphiis = this.morphiisCollection.toJSON();

      //render the template
      this.render();

    },

    updateMorphii: function(){
      intensityVal = $('input[name=intensity]').val();
      this.morphView.morphMe(this.anch, intensityVal, this.delt);
    },

    postMorphii: function(e) {
      var self = this;
      var morphiiType = $('input[name=scale]:checked').val();
      var morphiiIntensity = $('input[name=intensity]').val();
      var comment = $('textArea[name=comment]').val();
      var anonymous = $('#anonymous').prop('checked');
      
      e.preventDefault();

      if (morphiiType === undefined){
        morphiiType = "Delighted";
      };

      if (!morphiiIntensity) {
        morphiiIntensity = "0"
      };

      if (comment) {
        this.$el.find('#postMorphy, textarea[name=comment]').prop('disabled', 'disabled');

        self.model.set({
          morphiiType: morphiiType,
          morphiiIntensity: morphiiIntensity,
          comment: comment,
          anonymous: anonymous
        });

        self.model.save(null, {
          success: function () {
            self.renderFeedbackSuccessView();
          },
          patch: true
        });
      } else {
        this.$el.addClass('has-error');
        this.$el.find('.control-label').removeClass('hidden');
      } 
    },
    
    renderFeedbackSuccessView: function () {
      var container = $('#public-quirii');
      //commented out to remove functionality due to quirii bug
      //var shareAnchor = $('<a>').attr('href', QuiriiScope.twitterShareLink('Quirii:')).addClass('big-btn twitter btn-block').html('<i class="fa fa-twitter"></i> Tweet this Quirii');
          
     $('#respond-view', container).fadeOut().remove();
     $('#success-view', container).hide().removeClass('hidden').fadeIn().find('.button-group:last').append(shareAnchor);
    },

    renderMorphii: function(morphiiType){
      var thisView = this;
      var morphii = _.findWhere(this.morphiis, {name: morphiiType});
      thisView.morphView = new MorphiiView({el:$('#morphii-container'),model: morphii});
      thisView.anch = JSON.parse(morphii.anchor);
      thisView.delt = JSON.parse(morphii.delta);
      thisView.intensity = $('input[name=intensity]').val();
      thisView.morphView.morphMe(thisView.anch, thisView.intensity, thisView.delt);
    },

    switchMorphii: function(){
      var thisView = this;
      thisView.morphiiType = $('input[name=scale]:checked').val();
      if (thisView.morphiiType === undefined){
        this.$el.find('#Delighted').prop('checked', 'checked');
        thisView.morphiiType = "Delighted";
      };
      this.$el.find('.selected-morphii').text(thisView.morphiiType);
      thisView.renderMorphii(thisView.morphiiType); 
    },

    renderMorphiiThumbs: function(){
      var thisView = this;
      _.each(this.morphiis, function(morphii){
        var morphiiRadioView = new MorphiiStaticThumbView({
          model: morphii
        });
        morphiiRadioView.parentView = thisView;
        morphiiRadioView.render();
      });
    },

    render: function() {
      //render the template
      this.$el.html(giveQuiriiFeedbackTemplate);
      
      //render the morphiis collection thumbs
      this.renderMorphiiThumbs();

      //call switchMorphii to make sure a type is selected
      this.switchMorphii();

      //call renderMorphii to make sure morphii is loaded
      this.renderMorphii(this.morphiiType);
      
      $('.morphii-radios img').one("load", function() {
        $('#Delighted').prop('checked', false);
        setTimeout(function () {
          $('#Delighted').prop('checked', true);
        }, 5);
      }).each(function() {
        if(this.complete) $(this).load();
      });

      return this;
    }
  });

  return giveQuiriiFeedbackView;
});

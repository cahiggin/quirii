define(['QuiriiNetViewPublic', 'text!templates/morphyUi.html', 'models/Morphii',
  'models/QuiriiFeedbackItem', 'views/morphiiStaticThumb', 'text!templates/giveQuiriiFeedback.html',
  'views/morphy'],
function(QuiriiNetViewPublic, morphyUiTemplate, Morphii, 
  QuiriiFeedbackItem, MorphiiStaticThumbView, giveQuiriiFeedbackTemplate,
  MorphiiView) {
  var giveQuiriiFeedbackView = QuiriiNetViewPublic.extend({
    el: '#quirii-feedback',

    events: {
      
      "input input[name=intensity]": "updateMorphii",
      "click input[name=scale]:checked": "switchMorphii",
      "click #postMorphy":"postMorphii"
    },

    initialize: function(options) {
      _.bindAll(this,'render');
      this.options = options;
      var thisView = this;
      console.log(options.collection.url);
      //check that this.collection was set by the parent view
      //console.log("this.collection has been defined by the parent view ", this.collection);
      
      //define this.model to be an instance of QuiriiFeedbackItem
      this.model = new QuiriiFeedbackItem();
      this.model.url = options.collection.url;

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

    postMorphii: function() {
      var thisView = this;
      var morphiiType = $('input[name=scale]:checked').val();
      var morphiiIntensity = $('input[name=intensity]').val();
      var comment = $('textArea[name=comment]').val();

      if (morphiiType === undefined){
        morphiiType = "Delight";
      };

      if (!morphiiIntensity) {
        morphiiIntensity = "0"
      };


      thisView.model.set({
        morphiiType: morphiiType,
        morphiiIntensity: morphiiIntensity,
        comment: comment
      });

      thisView.model.save();
      this.render();
      console.log("current model is ", thisView.model);
     
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
        thisView.morphiiType = "Delight";
      };
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

      return this;
    }
  });

  return giveQuiriiFeedbackView;
});
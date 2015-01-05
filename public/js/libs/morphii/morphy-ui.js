// This is just a sample of how we set up a backbone view that had a morphy in it

define(['SocialNetView', 'text!templates/morphyUi.html', 'views/morphy', 'models/Morphy', 'models/Activity',
  'models/ReviewCollection', 'models/Review', 'views/review', 'views/morphyActivity'],
function(SocialNetView, morphyUiTemplate, MorphyView, Morphy, Activity, ReviewCollection, Review, 
  ReviewView, MorphyActivityView) {
  var morphyUiView = SocialNetView.extend({
    el: $('#morphy-ui'),

    events: {
      
      "change input[name=intensity]": "updateMorphy",
      "click input[name=scale]:checked": "switchMorphy",
      "click #postMorphy":"postMorphy"
    },

    initialize: function(options) {
      _.bindAll(this, 'postMorphy', 'render');
      this.collection = this.model.attributes.reviews;
      this.revCollection = new ReviewCollection(this.collection);
      this.revCollection.bind('add', this.onActivityAdded, this);
      this.productId = this.model.attributes._id;
      var that = this;
      this.scaleName = $('input[name=scale]:checked').val();
      if (this.scaleName === undefined){
        this.scaleName = "Delight";
      };

      
      $.get('/morphies/' + this.scaleName + '/scale', function(morphy){
        that.morphView = new MorphyView({el:$('#morphy-container'),model: morphy});
        that.anch = JSON.parse(morphy.anchor);
        that.delt = JSON.parse(morphy.delta);
        that.intensity = $('input[name=intensity]').val();
        that.morphView.morphMe(that.anch, that.intensity, that.delt);
      });

      this.render();
    },

    updateMorphy: function(){
      var sliderVal = $('input[name=intensity]').val();
      this.morphView.morphMe(this.anch, sliderVal, this.delt);
    },

    onActivityCollectionReset: function(collection) {
      var that = this;
      collection.each(function (model) {
        that.onActivityAdded(model);
      });
    },

    onActivityAdded: function(review) {
      var reviewHtml = (new ReviewView({model: review})).render().el;
      $(reviewHtml).prependTo('.review_list').hide().fadeIn('slow');

      var morphySvg = (new MorphyActivityView({el:$("#intensity-gram"), model: review}));

    },

    postMorphy: function() {
      var that = this;
      var morphyScale = this.scaleName;
      var memoText = $('textarea[name=memo]').val();
      var intensityVal = $('input[name=intensity]').val();
      var product = this.productId;
      $.post('/products/' + this.productId + '/reviews', {
        productId: product,
        scale: morphyScale,
        memo: memoText,
        intensity: intensityVal
      }).done( function(data) {
        console.log(data);
        that.revCollection.add(data);
      }).fail(function() {
        // an error occurred
        console.log('an error has happened');
      });
      return false;
    },

    switchMorphy: function(){
      this.scaleName = $('input[name=scale]:checked').val();
      var sliderVal = $('input[name=intensity]').val();
      var that = this;
      $.get('/morphies/' + this.scaleName + '/scale', function(morphy){
        that.morphView = new MorphyView({el:$('#morphy-container'),model: morphy});
        that.anch = JSON.parse(morphy.anchor);
        that.delt = JSON.parse(morphy.delta);
        that.intensity = $('input[name=intensity]').val();
        that.morphView.morphMe(that.anch, that.intensity, that.delt);
      });

    },

    render: function() {
      this.$el.html(morphyUiTemplate);
    }
  });

  return morphyUiView;
});

define(['QuiriiNetViewPublic', 'text!templates/morphyUi.html', 'models/Morphii', 'models/Morphiis',
  'models/QuiriiFeedbackItem', 'views/morphiiStaticThumb'],
function(QuiriiNetViewPublic, morphyUiTemplate, Morphii, Morphiis, 
  QuiriiFeedbackItem, MorphiiStaticThumbView) {
  var giveQuiriiFeedbackView = QuiriiNetViewPublic.extend({
    el: '#morphy-ui',

    events: {
      
      "input input[name=intensity]": "updateMorphy",
      "click input[name=scale]:checked": "switchMorphy",
      "click #postMorphy":"postMorphy"
    },

    initialize: function(options) {
      _.bindAll(this,'render');


      var thisView = this;

      //check that this.collection was set by the parent view
      console.log("this.collection has been defined by the parent view ", this.collection);
      
      //define this.model to be an instance of QuiriiFeedbackItem
      this.model = new QuiriiFeedbackItem();

      //init a collection of morphiis
      this.morphiisCollection = new Morphiis();
      //this.morphiisCollection.url = '/api/morphiis';
      this.morphiisCollection.on('reset', this.makeRender, this);
      this.morphiisCollection.on('add', this.makeRender, this);
      //this.morphiisCollection.on('change', this.makeRender, this); 
      this.morphiisCollection.fetch({reset: true});
      
      this.render();
    },

    updateMorphy: function(){
      
    },

    postMorphy: function() {
     
    },

    switchMorphy: function(){
      
    },

    makeRender: function(){

      //thisView
      var thisView = this;

      //check that morphiis have been fetched
      console.log("making render ", this.morphiisCollection);

      //render each morphii
      this.morphiisCollection.each(function(morphii){
        var morphiiRadioView = new MorphiiStaticThumbView({
          model: morphii
        });
        morphiiRadioView.parentView = thisView;
        morphiiRadioView.render();
      });

    },

    

    render: function() {
      //render the template
      this.$el.html(morphyUiTemplate);

      return this;
    }
  });

  return giveQuiriiFeedbackView;
});

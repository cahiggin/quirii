define(['QuiriiNetViewPublic', 'text!templates/morphyUi.html', 'views/morphy', 'models/Morphii'],
function(QuiriiNetViewPublic, morphyUiTemplate, MorphyView, Morphy) {
  var morphyUiView = QuiriiNetViewPublic.extend({
    el: $('#morphy-ui'),

    events: {
      
      "input input[name=intensity]": "updateMorphy",
      "click input[name=scale]:checked": "switchMorphy",
      "click #postMorphy":"postMorphy"
    },

    initialize: function(options) {
      _.bindAll(this,'render');
      var that = this;
      this.scaleName = $('input[name=scale]:checked').val();
      if (this.scaleName === undefined){
        this.scaleName = "Delight";
      };

      
      $.get('/api/morphiis/' + this.scaleName , function(data){
        var morphii = data.data.morphii;

        that.morphView = new MorphyView({el:$('#morphy-container'),model: morphii});
        that.anch = JSON.parse(morphii.anchor);
        that.delt = JSON.parse(morphii.delta);
        that.intensity = $('input[name=intensity]').val();
        if(!that.intensity){
          that.intensity = 0.05;
          that.morphView.morphMe(that.anch, that.intensity, that.delt);
        }
        that.morphView.morphMe(that.anch, that.intensity, that.delt);
      });

      this.render();
    },

    updateMorphy: function(){
      var sliderVal = $('input[name=intensity]').val();
      this.morphView.morphMe(this.anch, sliderVal, this.delt);
    },

    

    postMorphy: function() {
      var that = this;
      var morphyScale = this.scaleName;
      var memoText = $('textarea[name=memo]').val();
      var intensityVal = $('input[name=intensity]').val();
     
      $.post('/api/quiriis/' + this.model.id + '/feedback', {
        
        morphyType: morphyScale,
        comment: memoText,
        morphyIntensity: intensityVal
      }).done( function(data) {
        console.log(data);
        
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
      $.get('/api/morphiis/' + this.scaleName , function(data){
        var morphii = data.data.morphii;
        that.morphView = new MorphyView({el:$('#morphy-container'),model: morphii});
        that.anch = JSON.parse(morphii.anchor);
        that.delt = JSON.parse(morphii.delta);
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

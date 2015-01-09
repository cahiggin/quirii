define(['QuiriiNetViewPublic', 'text!templates/morphiiStaticThumb.html'],
function(QuiriiNetViewPublic, morphiiStaticThumbTemplate) {
  var morphiiStaticThumbView = QuiriiNetViewPublic.extend({
    el: '.morphiiTypeRadio',

    events: {
      
      //"input input[name=intensity]": "updateMorphy",
      //"click input[name=scale]:checked": "switchMorphy",
      //"click #postMorphy":"postMorphy"
    },

    initialize: function(options) {
      console.log("BINGO");
    },

    
    render: function() {
      console.log("morphy static render bitchez");
      //render the template
      this.$el.html(morphiiStaticThumbTemplate);

      //parent view action
      this.parentView.$el.append(this.$el);

      return this;
    }
  });

  return morphiiStaticThumbView;
});

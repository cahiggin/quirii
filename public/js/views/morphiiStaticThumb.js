define(['QuiriiNetView', 'text!templates/morphiiStaticThumb.html'],
function(QuiriiNetView, morphiiStaticThumbTemplate) {
  var morphiiStaticThumbView = QuiriiNetView.extend({
  	requireLogin: false,
    el: '.morphii-radios',

    render: function() {
      this.$el.prepend(_.template(morphiiStaticThumbTemplate)({model: this.model}));
      return this;
    }

  });

  return morphiiStaticThumbView;
});

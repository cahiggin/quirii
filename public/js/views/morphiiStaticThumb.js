define(['QuiriiNetView', 'text!templates/morphiiStaticThumb.html'],
function(QuiriiNetView, morphiiStaticThumbTemplate) {
  var morphiiStaticThumbView = QuiriiNetView.extend({
  	
  	requireLogin: false,

    el: '.morphiiTypeRadios',

    render: function() {
      this.parentView.$el.prepend(_.template(morphiiStaticThumbTemplate)({model: this.model}));
      return this;
    }

  });

  return morphiiStaticThumbView;
});

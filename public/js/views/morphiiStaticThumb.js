define(['QuiriiNetViewPublic', 'text!templates/morphiiStaticThumb.html'],
function(QuiriiNetViewPublic, morphiiStaticThumbTemplate) {
  var morphiiStaticThumbView = QuiriiNetViewPublic.extend({
    el: '.morphiiTypeRadios',

    render: function() {
      this.parentView.$el.append(_.template(morphiiStaticThumbTemplate)({model: this.model}));
      return this;
    }

  });

  return morphiiStaticThumbView;
});

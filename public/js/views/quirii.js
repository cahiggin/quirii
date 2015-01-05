define(['QuiriiNetView', 'text!templates/quirii.html'], function(QuiriiNetView, quiriiTemplate) {
  var quiriiView = QuiriiNetView.extend({
    tagName: 'li',

    render: function() {
      $(this.el).html(_.template(quiriiTemplate)({ model: this.model.toJSON() }) );
      return this;
    }

  });

  return quiriiView;
});
define(['QuiriiNetView', 'text!templates/quiriiDetail.html'], 
  function(QuiriiNetView, quiriiDetailTemplate) {
  var quiriiDetailView = QuiriiNetView.extend({
   
    el: $('#content'),

    events: {
    },

    initialize: function() {
      var that = this;
      that.id = this.model.id;
      this.model.on('change', this.render, this);
    },

    render: function() {
      $(this.el).html(_.template(quiriiDetailTemplate)( {
        id: this.id,
        model: this.model.toJSON()
      }));
      return this;
    }

  });

  return quiriiDetailView;
});

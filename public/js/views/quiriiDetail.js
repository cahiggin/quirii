define(['QuiriiNetView', 'text!templates/quiriiDetail.html'], 
  function(QuiriiNetView, quiriiDetailTemplate) {
  var quiriiDetailView = QuiriiNetView.extend({
   
    el: $('#content'),

    events: {
      'click #deleteQuirii':'deleteQuirii'
    },

    initialize: function() {
      var that = this;
      that.id = this.model.id;
      this.model.on('change', this.render, this);
    },

    deleteQuirii: function(){
      $.delete('/api/me/quiriis/' + this.id )
        .done( function(data) {
          console.log(data);

        }).fail(function() {
          // an error occurred
          console.log('an error has happened');
      });
      
      return false;
    }

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

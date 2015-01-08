define(['QuiriiNetView', 'text!templates/quiriiDetail.html'], 
  function(QuiriiNetView, quiriiDetailTemplate) {
  var quiriiDetailView = QuiriiNetView.extend({
   
    el: $('#content'),

    events: {
      'click #deleteQuirii':'deleteQuirii'
    },

    initialize: function() {
      var that = this;
      this.model.on('change', this.render, this);
      this.model.on('destroy', this.quiriiDeleted, this);
      console.log(this.model);
    },

    deleteQuirii: function(){
      var that = this;
      this.model.destroy({
        wait: true,
        success:function(model, response){
          console.log("SHITS GONE", response, model);
        },
        error: function(model, response){
          console.log("error ", response);
        }
      });
      
      return false;
    },

    quiriiDeleted: function(){
      location.href='/#index';
    },

    render: function() {
      //var quiriiModel = this.model.quirii;
      //var feedbackModel = this.model.feedback;
      //console.log(quiriiModel, feedbackModel);
      $(this.el).html(_.template(quiriiDetailTemplate)( {
        //id: this.id,
        model: this.model.toJSON()
      }));
      return this;
    }

  });

  return quiriiDetailView;
});

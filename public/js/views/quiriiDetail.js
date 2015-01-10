define(['QuiriiNetView', 'text!templates/quiriiDetail.html', 'views/feedbackItem'], 
  function(QuiriiNetView, quiriiDetailTemplate, FeedbackItemView) {
  var quiriiDetailView = QuiriiNetView.extend({
   
    el: $('#content'),

    events: {
      'click #deleteQuirii':'deleteQuirii'
    },

    initialize: function() {
      _.bindAll(this,'render');
      var that = this;
      console.log("MODEL", this.model);
      console.log("Collection", this.collection);

      this.collection.on('add', this.onFeedbackAdded, this);
      this.collection.on('reset', this.onFeedbackCollectionReset, this);

      this.model.on('change', this.render, this);
      this.model.on('destroy', this.quiriiDeleted, this);
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

    onFeedbackCollectionReset: function(collection) {
      var that = this;
      collection.each(function (model) {
        console.log("feedback model", model);
        that.onFeedbackAdded(model);
      });
    },

    onFeedbackAdded: function(feedbackItem) {
      
      var feedbackHtml = (new FeedbackItemView({ model: feedbackItem })).render().el;
      $(feedbackHtml).prependTo('.feedback_list').hide().fadeIn('slow');  

      //var morphySvg = (new MorphiiFeedbackView({ el: $("#intensity-gram"), model: feedbackItem }));

    },

    render: function() {
      $(this.el).html(_.template(quiriiDetailTemplate)( {
        model: this.model.toJSON()
      }));
      return this;
    }

  });

  return quiriiDetailView;
});

define(['QuiriiNetView', 'text!templates/quiriiDetail.html', 'views/feedbackItem'], 
  function(QuiriiNetView, quiriiDetailTemplate, FeedbackItemView) {
  var quiriiDetailView = QuiriiNetView.extend({
   
    el: $('#content'),

    events: {
      'click #deleteQuirii': 'deleteQuirii'
    },

    initialize: function(options) {
      _.bindAll(this,'render');
      
      this.feedbackCollection = options.fbCollection;
      this.feedbackCollection.on('add', this.onFeedbackAdded, this);
      this.feedbackCollection.on('reset', this.onFeedbackCollectionReset, this);

      this.model.on('change', this.render, this);
      this.model.on('destroy', this.quiriiDeleted, this);

      this.render();
    },

    deleteQuirii: function() {
      var self = this,
          confirmed = confirm('Are you sure you would like to delete this Quirii?');
          
      if (confirmed) {
        this.model.destroy({ wait: true });
      }
    },

    quiriiDeleted: function() {
      location.href = '/';
    },

    onFeedbackCollectionReset: function(collection) {
      var that = this;
      collection.each(function (model) {
        that.onFeedbackAdded(model);
      });
    },

    onFeedbackAdded: function(feedbackItem) {
      var feedbackHtml = (new FeedbackItemView({ model: feedbackItem })).render().el;
      $(feedbackHtml).prependTo('.feedback-list').hide().fadeIn('slow');  

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

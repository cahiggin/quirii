define(['QuiriiNetView', 'text!templates/quiriiDetail.html', 'views/feedbackItem', 'views/morphy'], 
  function(QuiriiNetView, quiriiDetailTemplate, FeedbackItemView, MorphiiView) {
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
      
      this.morphiis = options.morphiis;
      this.morphiis.on('reset', this.addMorphiiToFeedbackItem, this);
      this.morphiis.on('change', this.addMorphiiToFeedbackItem, this);
      this.morphiis.on('add', this.addMorphiiToFeedbackItem, this);

      this.render();
    },

    deleteQuirii: function(e) {
      var self = this,
          confirmed = confirm('Are you sure you would like to delete this Quirii?');
          
      e.preventDefault();
          
      if (confirmed) {
        this.model.destroy({ wait: true });
      }
    },
    
    addMorphiiToFeedbackItem: function () {
      var self = this;
      $('.feedback-list .feedback-item').each(function () {
        var type = $(this).data('type'),
            intensity = $(this).data('intensity'),
            target = $(this).find('.morphii-icon');
            
        self.renderMorphii(type, intensity, target);
        target.find('svg').removeAttr('height').removeAttr('width');
      });
      $.ajax({
        url: location.origin + '/api/me/quiriis/' + location.hash.split('/').pop() + '/aggregate',
        success: function (data) {
          var obj = data.data.aggMorphii,
              total = 0;
              
          console.log(obj);
          
          for (prop in obj) {
            total += obj[prop].count;
          }
          self.renderMorphii(obj[0]._id, obj[0].avgIntensity, $('#aggregate-morphii'));
          $('#aggregate-morphi svg').removeAttr('height').removeAttr('width');
        }
      });
    },
    
    renderMorphii: function (type, intensity, targetEl){
      var self = this;
      
      var morphii = _.findWhere(this.morphiis.toJSON(), {name: type});
      this.morphView = new MorphiiView({el: targetEl, model: morphii});
      this.anch = JSON.parse(morphii.anchor);
      this.delt = JSON.parse(morphii.delta);
      this.morphView.morphMe(self.anch, intensity, self.delt);
    },

    quiriiDeleted: function() {
      Backbone.history.navigate("view", {
        trigger: true
      });
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
      $('.no-feedback').remove();
    },

    render: function() {
      QuiriiScope.setTitle('Quirii Details');
    
      $(this.el).html(_.template(quiriiDetailTemplate)( {
        model: this.model.toJSON()
      }));
      
      $('#share-twitter').attr('href', QuiriiScope.twitterShareLink('Quirii:', location.origin + '/' + $('#share-twitter').data('url')));
      return this;
    }

  });

  return quiriiDetailView;
});

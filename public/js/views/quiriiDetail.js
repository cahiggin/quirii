define(['QuiriiNetView', 'text!templates/quiriiDetail.html', 'views/feedbackItem', 'views/morphy'], 
  function(QuiriiNetView, quiriiDetailTemplate, FeedbackItemView, MorphiiView) {
  var quiriiDetailView = QuiriiNetView.extend({
   
    el: $('#content'),

    events: {
      'click #deleteQuirii': 'deleteQuirii',
      'click #copyQuirii': 'copyQuirii'
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

    copyQuirii: function(e) {
      var self = this,
          quiriiLink = prompt("Copy Link Below", "http://quirii.herokuapp.com/#/quiriis/" + this.model.id);

     /* if(navigator.userAgent.match(/Android/i)
          || navigator.userAgent.match(/webOS/i)
          || navigator.userAgent.match(/iPhone/i)
          || navigator.userAgent.match(/iPad/i)
          || navigator.userAgent.match(/iPod/i)
          || navigator.userAgent.match(/BlackBerry/i)
          || navigator.userAgent.match(/Windows Phone/i)) {

        location.href = "sms:";

      } else {
        alert("you are not using a mobile device");
      }*/
      
      e.preventDefault();
    },
    
    addMorphiiToFeedbackItem: function () {
      var self = this;
      
      $('.feedback-list .feedback-item').each(function () {
        var type = $(this).data('type'),
            intensity = $(this).data('intensity'),
            target = $(this).find('.morphii-icon');

            //exp
            if (type == "Srsly"){
              type = "Frustrated";
              console.log("CHANGED SERIOUSLY TO ", type);
            } else if (type === "Delight"){
              type = "Delighted";
              console.log("CHANGED DELIGHT TO " + type);
            } else if (type === "Surprise"){
              type = "Surprised";
              console.log("CHANGED SURPRISE TO " + type);
            } else if (type === "Disgust"){
              type = "Disgusted"
              console.log("CHANGED DISGUSTED TO " + type);
            }
            //END exp
            
        self.renderMorphii(type, intensity, target);
        target.find('svg').removeAttr('height').removeAttr('width');
      });

      $.ajax({
        url: location.origin + '/api/me/quiriis/' + self.id + '/aggregate',
        success: function (data) {
            self.addAggregateData(data);
        }
      });
    },
    
    addAggregateData: function (data) {
      var obj = data.data.aggMorphii,
          $aggregateMorphii = $('#aggregate-morphii'),
          max, total = 0;

      if (obj[0]) {
        for (prop in obj) {
          total += obj[prop].count;
        }

        max = _.where(obj, {count: _.max(obj, function(obj){ return obj.count; }).count });

        if (max.length > 1) {
          $aggregateMorphii.prev('.no-feedback').text('No one feeling has emerged as dominant yet.');
        } else {
          this.renderMorphii(obj[0]._id, obj[0].avgIntensity, $('#aggregate-morphii > .morphii'));
          $('#aggregate-morphii svg').removeAttr('height').removeAttr('width');
          $('#total-reviews').text(function () {
            return $(this).text().replace('{0}', total);
          });
          $('#aggregate-status').html(function () {
            return $(this).text().replace('{0}', '<strong>' + ((obj[0].count / total) * 100).toFixed(0) + '%</strong>').replace('{1}', '<em>' + obj[0]._id + '</em>');
          });
          $aggregateMorphii.removeClass('hidden');
          $aggregateMorphii.prev('.no-feedback').hide();
        }
      }
    },
    
    renderMorphii: function (type, intensity, targetEl){
      var self = this,
          morphii = _.findWhere(this.morphiis.toJSON(), {name: type});
          
      if (morphii) {
        this.morphView = new MorphiiView({el: targetEl, model: morphii});
        this.anch = JSON.parse(morphii.anchor);
        this.delt = JSON.parse(morphii.delta);
        this.morphView.morphMe(self.anch, intensity, self.delt);
      }
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
      $('.feedback-list .no-feedback').remove();
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

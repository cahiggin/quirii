define(['QuiriiNetView', 'text!templates/index.html', 'views/quirii', 'models/Quirii', 'models/QuiriiCollection'],
function(QuiriiNetView, indexTemplate, QuiriiView, Quirii, QuiriiCollection) {
  var indexView = QuiriiNetView.extend({
    el: $('#content'),

    events: {
    },

    initialize: function() {
      this.collection.on('add', this.onQuiriiAdded, this);
      this.collection.on('reset', this.onQuiriiCollectionReset, this);
    },

    onQuiriiCollectionReset: function(collection) {
      var that = this;
      collection.each(function (model) {
        that.onQuiriiAdded(model);
      });
    },

    onQuiriiAdded: function(quirii) {
      var quiriiHtml = (new QuiriiView({ model: quirii })).render().el;
      $(quiriiHtml).prependTo('.quirii_list').hide().fadeIn('slow');      
    },

    render: function() {
      this.$el.html(indexTemplate);
    }
  });

  return indexView;
});
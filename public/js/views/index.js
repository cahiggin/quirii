define(['QuiriiNetView', 'text!templates/index.html', 'text!templates/createQuirii.html', 
  'views/quirii', 'views/createQuirii', 'models/Quirii', 'models/Quiriis'],
function(QuiriiNetView, indexTemplate, createQuiriiTemplate, 
  QuiriiView, CreateQuiriiView, Quirii, QuiriiCollection) {
  var indexView = QuiriiNetView.extend({
    el: $('#content'),

    initialize: function(options) {
      var url = Backbone.history.getFragment();
      
      _.bindAll(this, 'render');

      this.route = (url === '' || url === 'view') ? 'view' : 'create';
      this.collection.fetch();
      this.collection.on('add', this.onQuiriiAdded, this);
      this.collection.on('reset', this.onQuiriiCollectionReset, this);
      this.quiriiModel = new Quirii();
    },

    onQuiriiCollectionReset: function(collection) {
      var self = this;
      collection.each(function (model) {
        self.onQuiriiAdded(model);
      });
    },

    onQuiriiAdded: function(quirii) {
      var quiriiHtml = (new QuiriiView({ model: quirii })).render().el;
      $(quiriiHtml).prependTo('#your-quiriis-ui ul');
    },

    createQuirii: function(){
      this.createQuiriiUi = (new CreateQuiriiView({collection: this.collection})).render();
    },

    render: function() {
      this.$el.html(indexTemplate);
      $(this.route === 'create' ? '#your-quiriis-ui' : '#create-ui').hide();
      
      this.createQuirii();
      return this;
    }
  });

  return indexView;
});
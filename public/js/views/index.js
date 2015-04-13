define(['QuiriiNetView', 'text!templates/index.html', 'text!templates/createQuirii.html', 
  'views/quirii', 'views/createQuirii', 'models/Quirii', 'models/Quiriis'],
function(QuiriiNetView, indexTemplate, createQuiriiTemplate, 
  QuiriiView, CreateQuiriiView, Quirii, QuiriiCollection) {
  var indexView = QuiriiNetView.extend({
    el: $('#content'),

    initialize: function(options) {
      _.bindAll(this, 'render');
      this.collection.fetch();
      this.collection.on('add', this.onQuiriiAdded, this);
      this.collection.on('reset', this.onQuiriiCollectionReset, this);

      this.quiriiModel = new Quirii();

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

    newQuiriiAdd: function(quirii){
      console.log(quirii);
    },

    makeRender: function(){
      this.createQuiriiUi = (new CreateQuiriiView({collection: this.collection})).render();
    },

    render: function() {
      this.$el.html(indexTemplate);
      this.makeRender();
      return this;
    }
  });

  return indexView;
});
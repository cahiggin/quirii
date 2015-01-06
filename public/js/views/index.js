define(['QuiriiNetView', 'text!templates/index.html', 'text!templates/createQuirii.html', 
  'views/quirii', 'views/createQuirii', 'models/Quirii', 'models/QuiriiCollection'],
function(QuiriiNetView, indexTemplate, createQuiriiTemplate, 
  QuiriiView, CreateQuiriiView, Quirii, QuiriiCollection) {
  var indexView = QuiriiNetView.extend({
    el: $('#content'),

    events: {
      //'click #create-quirii':'createQuiriiModal'
    },

    initialize: function() {
      this.collection.on('add', this.onQuiriiAdded, this);
      this.collection.on('reset', this.onQuiriiCollectionReset, this);
      this.render();
      this.createQuiriiUi = (new CreateQuiriiView({el: $("#create-ui") })).render();

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

    /*createQuiriiModal: function(){
      
      this.createQuiriiUi = (new CreateQuiriiView({el: $("#create-ui")})).render();
    },*/

    render: function() {
      this.$el.html(indexTemplate);
    }
  });

  return indexView;
});
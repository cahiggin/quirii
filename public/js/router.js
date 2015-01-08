define(['views/index', 'views/login', 'views/logout', 'views/quirii', 'views/quiriiDetail', 
  'views/publicQuirii', 'models/User', 'models/Quirii', 'models/PublicQuirii',
  'models/QuiriiCollection', 'models/PublicQuiriiCollection'],
function(IndexView, LoginView, LogoutView, QuiriiView, QuiriiDetailView, 
  PublicQuiriiView, User, Quirii, PublicQuirii, 
  QuiriiCollection, PublicQuiriiCollection) {
  var QuiriiRouter = Backbone.Router.extend({
    currentView: null,

    routes: {
      'index': 'index',
      'login': 'login',
      'me/quiriis/:id': 'quiriiDetail',
      'quiriis/:id': 'publicQuirii',
      'logout': 'logout'
    },

    changeView: function(view) {
      if ( null != this.currentView ) {
        this.currentView.undelegateEvents();
      }
      this.currentView = view;
      this.currentView.render();
    },

    index: function(){
      var allQuiriisCollection = new QuiriiCollection();
      this.changeView(new IndexView({
        collection: allQuiriisCollection
      }));
      allQuiriisCollection.fetch();
    },

    login: function(){
      this.changeView(new LoginView);
    },

    logout: function(){
      this.changeView(new LogoutView);
    },

    quiriiDetail: function(id){
      var model = new Quirii({ id: id });
      model.url = '/api/me/quiriis/' + id;
      this.changeView(new QuiriiDetailView({
        model: model,
        
      }));
      model.fetch({reset:true});  
      //model.fetch();
    },

    publicQuirii: function(id){
      var model = new PublicQuirii({ id: id });
      this.changeView(new PublicQuiriiView({
        model: model
      }));
      model.fetch({reset:true});    
    }

  });

  return new QuiriiRouter();
});


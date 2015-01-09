define(['views/index', 'views/login', 'views/logout', 'views/quirii', 'views/quiriiDetail', 
  'views/publicQuirii', 'models/User', 'models/Quirii', 'models/Quiriis', 
  'models/PublicQuirii', 'models/PublicQuiriis', 'models/QuiriiFeedbackItems'],
function(IndexView, LoginView, LogoutView, QuiriiView, QuiriiDetailView, 
  PublicQuiriiView, User, Quirii, Quiriis, 
  PublicQuirii, PublicQuiriis, QuiriiFeedbackItems) {
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
      var allQuiriis = new Quiriis();
      this.changeView(new IndexView({
        collection: allQuiriis
      }));
      allQuiriis.fetch();
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
      var quiriiModel = new PublicQuirii({ id: id });
      var feedbackCollection = new QuiriiFeedbackItems();
      feedbackCollection.url = '/api/quiriis/' + id + '/feedback';
      this.changeView(new PublicQuiriiView({
        model: quiriiModel,
        collection: feedbackCollection
      }));
      quiriiModel.fetch({reset:true});
      feedbackCollection.fetch({reset: true});    
    }

  });

  return new QuiriiRouter();
});


define(['views/index', 'views/login', 'views/logout', 'views/quirii', 'views/quiriiDetail', 
  'views/publicQuirii', 'models/User', 'models/Quirii', 'models/Quiriis', 'models/Morphiis',
  'models/PublicQuirii', 'models/PublicQuiriis', 'models/QuiriiFeedbackItems'],
function(IndexView, LoginView, LogoutView, QuiriiView, QuiriiDetailView, 
  PublicQuiriiView, User, Quirii, Quiriis, Morphiis,
  PublicQuirii, PublicQuiriis, QuiriiFeedbackItems) {
  var QuiriiRouter = Backbone.Router.extend({
    currentView: null,

    routes: {
      '': 'index',
      'api/me/settings': 'loggedin',
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
    },

    login: function(){
      this.changeView(new LoginView);
    },

    loggedin: function(){
      window.location.hash = '/'
    },

    logout: function(){
      this.changeView(new LogoutView);
    },

    quiriiDetail: function(id){
      var model = new Quirii({ id: id });
      var feedbackCollection = new QuiriiFeedbackItems();
      feedbackCollection.url = '/api/quiriis/' + id + '/feedback';
      this.changeView(new QuiriiDetailView({
        model: model,
        fbCollection: feedbackCollection
      }));
      model.fetch({
        reset: true,
        success: function () {
          feedbackCollection.fetch({
            reset: true
          });
        }
      });
    },

    publicQuirii: function(id){
      var quiriiModel = new PublicQuirii({ id: id });
      var feedbackCollection = new QuiriiFeedbackItems();
      feedbackCollection.url = '/api/quiriis/' + id + '/feedback';
      var morphiisCollection = new Morphiis();
      this.changeView(new PublicQuiriiView({
        model: quiriiModel,
        fbCollection: feedbackCollection,
        morphiis: morphiisCollection

      }));
      quiriiModel.fetch({reset:true});
      feedbackCollection.fetch({reset: true});  
      morphiisCollection.fetch({reset: true});  
    }

  });

  return new QuiriiRouter();
});


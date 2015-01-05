require.config({

  paths: {
    jQuery: '/js/libs/jquery',
    Underscore: '/js/libs/underscore',
    Backbone: '/js/libs/backbone',
    bootstrap: '/js/libs/bootstrap',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',
    SocialNetView: '/js/QuiriiNetView'
  },

  shim: {
    'Backbone': ['jQuery','Underscore'],
    'QuiriiNet': ['Backbone'],
    'bootstrap': ['jQuery']
  }, 


});


require(['jQuery', 'QuiriiNet', 'bootstrap'], function($, QuiriiNet) {
  
  QuiriiNet.initialize();
  return{};
});
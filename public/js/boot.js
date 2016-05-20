require.config({

  paths: {
    jQuery: '/js/libs/jquery',
    Underscore: '/js/libs/underscore',
    pathseg: '/js/libs/pathseg.js',
    Backbone: '/js/libs/backbone',
    S3Upload: '/js/libs/s3upload',
    bootstrap: '/js/libs/bootstrap',
    models: 'models',
    text: '/js/libs/text',
    templates: '../templates',
    //SocialNetView: '/js/QuiriiNetView',
    QuiriiNetView: '/js/QuiriiNetView'
    

  },

  shim: {
    'Backbone': ['jQuery','Underscore'],
    'QuiriiNet': ['Backbone'],
    'bootstrap': ['jQuery']
  }, 


});


require(['jQuery', 'QuiriiNet', 'bootstrap', 'S3Upload', 'pathseg'], function($, QuiriiNet) {
  QuiriiNet.initialize();
  return{};
});
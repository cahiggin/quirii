define(['router'], function(router) {
  var initialize = function() {    
    var scope = {},
        $nav = $('#navigation');
      
    scope.setTitle = function (title) {
      title = title || '';
          
      $('.title', $nav).text(title);
      document.title = title;
    };
      
    window.QuiriiScope = scope;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});

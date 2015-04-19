define(['router'], function(router) {
  var initialize = function() {    
    var scope = {},
        $nav = $('#navigation');
      
    scope.setTitle = function (title) {
      title = title || '';
          
      $('.title', $nav).text(title);
      document.title = title;
    };
    
    scope.hideNavigation = function () {
      $nav.addClass('hidden');
    };
    
    scope.showNavigation = function () {
      $nav.removeClass('hidden');
    };
      
    window.QuiriiScope = scope;
    Backbone.history.start();
  };
  return {
    initialize: initialize
  };
});

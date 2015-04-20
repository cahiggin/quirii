define(['router'], function(router) {
  var initialize = function() {    
    var $nav = $('#navigation'),
        scope;
    
    scope = {
      history: [],
      setTitle: function (title) {
        title = title || '';
            
        $('.title', $nav).text(title);
        document.title = title;
      },
      hideNavigation: function () {
        $nav.addClass('hidden');
      },
      showNavigation: function () {
        $nav.removeClass('hidden');
      },
      handlePageChange: function () {        
        if (Backbone.history.getFragment().indexOf('?prev') === -1) {
          QuiriiScope.history.push(Backbone.history.getFragment());
        }

        $('.prev', $nav).toggle(QuiriiScope.history.length > 1 && this.isAvailable(QuiriiScope.history[0]));
      }
    }
      
    window.QuiriiScope = scope;
    Backbone.history.start();
  };
  
  return {
    initialize: initialize
  };
});

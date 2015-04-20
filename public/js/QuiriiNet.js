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
        var fragment = Backbone.history.getFragment();      
        if (fragment.indexOf('?prev') === -1) {
          QuiriiScope.history.push(Backbone.history.getFragment());
        }

        $('.prev', $nav).toggle(QuiriiScope.history.length > 1 && fragment.indexOf('create') !== 0 && fragment.indexOf('view') !== 0);
      },
      previousPage: function () {
        var url = QuiriiScope.history[QuiriiScope.history.length - 2],
            previous = url ? url + '?prev=true' : 'view';

        Backbone.history.navigate('#/' + previous, { replace: true });
        QuiriiScope.history = QuiriiScope.history.slice(0, -1);
      }
    }
    
    $(document).off('click.QuiriiScope');
    
    $(document).on('click.QuiriiScope', '#navigation .prev', function (e) {
      QuiriiScope.previousPage();
    });
    $(document).on('click.QuiriiScope', '#navigation .cancel', function (e) {
      Backbone.history.navigate('#/view', { replace: true });
    });
      
    window.QuiriiScope = scope;
    Backbone.history.start();
  };
  
  return {
    initialize: initialize
  };
});

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
      },
      isAvailable: function (url) {
        if (url !== undefined && (!(url === '' && Backbone.history.getFragment().indexOf('view') > -1))) {
          return true;
        }
        return false;
      },
      previousPage: function () {
        var url = QuiriiScope.history[QuiriiScope.history.length - 2],
            previous = url ? url + '?prev=true' : 'view';

        if (this.isAvailable(url)) {
          Backbone.history.navigate('#/' + previous, { replace: true });
          QuiriiScope.history = QuiriiScope.history.slice(0, -1);
        }
      }
    }
    
    $(document).on('click.CUSTOMLALLSDLASDLLDSA', '#navigation .prev', function (e) {
      QuiriiScope.previousPage();
    });
      
    window.QuiriiScope = scope;
    Backbone.history.start();
  };
  
  return {
    initialize: initialize
  };
});

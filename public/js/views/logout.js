define(['QuiriiNetView', 'text!templates/logout.html'],
function(QuiriiNetView, logoutTemplate) {
  var logoutView = QuiriiNetView.extend({
    el: $('#content'),

    events: {
    },

    initialize: function() {

      $.ajax("/logout", {
        method: "GET",
        success: function() {
          return callback(true);

        },
        error: function(data) {
          return callback(false);
        }
      });

    },

    render: function() {
      this.$el.html(logoutTemplate);
    }
  });

  return logoutView;
});
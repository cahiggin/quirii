define(['QuiriiNetView', 'text!templates/login.html'],
function(QuiriiNetView, loginTemplate) {
  var loginView = QuiriiNetView.extend({
    el: $('#content'),

    events: {
    },

    initialize: function() {
    },

    render: function() {
      this.$el.html(loginTemplate);
    }
  });

  return loginView;
});
define(['QuiriiNetView', 'text!templates/login.html'],
function(QuiriiNetView, loginTemplate) {
  var loginView = QuiriiNetView.extend({
    el: $('#content'),

    events: {
      'click .login-twitter': 'loginWithTwitter'
    },

    initialize: function() {
    },

    loginWithTwitter: function(e){
      e.preventDefault();
      var target = $(e.currentTarget);
      console.log("THE TARGET IS ", target);
      location.href = $( e.currentTarget ).attr( "href" );
    },

    render: function() {
      this.$el.html(loginTemplate);
    }
  });

  return loginView;
});
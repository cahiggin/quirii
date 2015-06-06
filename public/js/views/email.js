define(['QuiriiNetView', 'text!templates/email.html'],
function(QuiriiNetView, emailTemplate) {
  var emailView = QuiriiNetView.extend({
    el: $('#content'),

    events: {
      'click #submit-email': 'handleEmail'
    },
    
    handleEmail: function () {
      this.updateEmail(this.$el.find('#email').val());
    },
    
    updateEmail: function (email) {
      var self = this;
      
      this.user.email = email;
      $.ajax({
        method: 'PUT',
        url: '/api/me/settings',
        data: self.user,
        success: function (data) {
          console.log(data);
          self.redirect();
        }
      });
    },
    
    redirect: function () {
      QuiriiScope.showNavigation();
      window.location.hash = '/';
    },
    
    initialize: function() {
      var self = this;
      
      $.ajax({
        method: 'GET',
        url: '/api/me/settings',
        success: function (data) {
          self.user = data.data.user;
          console.log(self.user);
          
          if (self.user.email) {
            self.redirect();
          } else {
          }
        }
      });
    },

    render: function() {
      this.$el.html(emailTemplate);
    }
  });

  return emailView;
});
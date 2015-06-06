define(['QuiriiNetView', 'text!templates/email.html'],
function(QuiriiNetView, emailTemplate) {
  var emailView = QuiriiNetView.extend({
    el: $('#content'),

    events: {
      'click #submit-email': 'handleEmail'
    },
    
    handleEmail: function () {
      var input = this.$el.find('#email').val();
      
      if (this.isValidEmail(input.trim())) {
        $('#invalid-email').hide();
        this.updateEmail(input);
      } else {
        $('#invalid-email').show();
      }
    },
    
    updateEmail: function (email) {
      var self = this;
      
      this.user.email = email;
      
      $.ajax({
        method: 'PUT',
        url: '/api/me/settings',
        data: self.user,
        success: function (data) {
          self.redirect();
        }
      });
    },
    
    isValidEmail: function (email) {
        var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        return re.test(email);
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
          
          if (self.user.email) {
            self.redirect();
          } else {
            $('#login, #powered-by').removeClass('hidden');
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
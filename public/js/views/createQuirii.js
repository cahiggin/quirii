define(['QuiriiNetView', 'text!templates/createQuirii.html', 'views/createQuirii', 'models/Quirii'],
function(QuiriiNetView, createQuiriiTemplate, CreateQuiriiView, Quirii) {
  var createQuiriiView = QuiriiNetView.extend({
    el: $('#create-ui'),

    events: {
      "click #postQuirii":"postQuirii"
    },

    initialize: function(options) {
      console.log("initializing quirii");
      _.bindAll(this,'render');
      var that = this;
      this.render();
    },

    postQuirii: function(){
      var that = this;
      var titleText = $('input[name=title]').val();
      var promptText = $('input[name=prompt]').val();
      var mediaUrlText = $('input[name=mediaUrl]').val();
      console.log(titleText, promptText, mediaUrlText);
      $.post('/api/me/quiriis/', {
        title: titleText,
        prompt: promptText,
        mediaUrl: mediaUrlText
      }).done( function(data) {
        console.log(data);
        
      }).fail(function() {
        // an error occurred
        console.log('an error has happened');
      });
      return false;
    },


    

    render: function(){
      this.$el.html(createQuiriiTemplate);
    }
  });

  return createQuiriiView
});
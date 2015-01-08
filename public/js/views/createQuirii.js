define(['QuiriiNetView', 'text!templates/createQuirii.html', 'views/createQuirii', 'models/Quirii'],
function(QuiriiNetView, createQuiriiTemplate, CreateQuiriiView, Quirii) {
  var createQuiriiView = QuiriiNetView.extend({
    el: $('#create-ui'),

    events: {
      "click #postQuirii":"postQuirii"
    },

    initialize: function(options) {
      //_.bindAll(this, 'render');

      var that = this;
      that.newQuiriiPost = new Quirii();

      that.newQuiriiPost.on('request', this.postedQuirii, this);
      //this.render();
    },

    postQuirii: function(){
      var that = this;
      var titleText = $('input[name=title]').val();
      var promptText = $('input[name=prompt]').val();
      var mediaUrlText = $('input[name=mediaUrl]').val();

      /*var newQuiriiPost = new Quirii({
        title: titleText, 
        prompt: promptText, 
        mediaUrl: mediaUrlText
      });*/

      this.newQuiriiPost.set({
        title: titleText, 
        prompt: promptText, 
        mediaUrl: mediaUrlText
      });

      //newQuiriiPost.save();
      this.newQuiriiPost.save();
      return false;
    },

    postedQuirii:function(){
      console.log("posted a quirii");
      $('#quiriiForm').reload();
    },


    

    render: function(){
      this.$el.html(createQuiriiTemplate);
      return this;
    }
  });

  return createQuiriiView
});
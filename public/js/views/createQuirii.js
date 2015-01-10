define(['QuiriiNetView', 'text!templates/createQuirii.html', 'views/createQuirii', 'models/Quirii'],
function(QuiriiNetView, createQuiriiTemplate, CreateQuiriiView, Quirii) {
  var createQuiriiView = QuiriiNetView.extend({
    el: '#create-ui',

    events: {
      "click #postQuirii":"postQuirii"
    },

    initialize: function(options) {
      //_.bindAll(this, 'render');

      var that = this;
      console.log(this.collection.url);
      this.model = new Quirii();
      this.model.url = this.collection.url;

      //this.model.on('request', this.postedQuirii, this);
      //this.render();
    },

    postQuirii: function(){
      
      var thisView = this;
      var titleText = $('input[name=title]').val();
      var promptText = $('input[name=prompt]').val();
      var mediaUrlText = $('input[name=mediaUrl]').val();
      thisView.model.set({
        title: titleText,
        prompt: promptText,
        mediaUrl: mediaUrlText
      });

      thisView.model.save();
      this.render();
      console.log("current model is ", thisView.model);
    },
    
    render: function(){
      this.$el.html(createQuiriiTemplate);
      return this;
    }
  });

  return createQuiriiView
});
define(['QuiriiNetView', 'text!templates/feedbackItem.html'], function(QuiriiNetView, feedbackItemTemplate) {
  var feedbackItemView = QuiriiNetView.extend({
    tagName: 'li',

    initialize: function(options){
    	var that = this;
    	console.log(this.model);
    },

    render: function() {
      $(this.el).html(_.template(feedbackItemTemplate)({ model: this.model.toJSON() }) );
      return this;
    }

  });

  return feedbackItemView;
});
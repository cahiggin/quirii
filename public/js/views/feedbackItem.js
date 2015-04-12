define(['QuiriiNetView', 'text!templates/feedbackItem.html'], function(QuiriiNetView, feedbackItemTemplate) {
  var feedbackItemView = QuiriiNetView.extend({
    tagName: 'li',

    render: function() {
      $(this.el).html(_.template(feedbackItemTemplate)({ model: this.model.toJSON() }) );
      return this;
    }

  });

  return feedbackItemView;
});
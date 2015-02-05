define(['QuiriiNetView', 'text!templates/createQuirii.html', 'views/createQuirii', 'models/Quirii'],
function(QuiriiNetView, createQuiriiTemplate, CreateQuiriiView, Quirii) {
  var createQuiriiView = QuiriiNetView.extend({
    el: '#create-ui',

    events: {
      "click #postQuirii":"postQuirii",
      "change #files":"s3upload"
    },

    initialize: function(options) {
      //_.bindAll(this, 'render');

      var that = this;
      console.log("USER IS ", options);
      this.model = new Quirii();
      this.model.url = this.collection.url;

      //this.model.on('request', this.postedQuirii, this);
      //this.render();
    },

    //s3 upload trial run
    s3upload: function(){
      console.log("beginning s3 upload");
      var filename = $('input[type=file]').val().replace(/.*(\/|\\)/, '');
      console.log("FILE NAME ", filename);
      var currDate = Date.now();
      var uploadFilename = currDate + filename;
      console.log("File is ", uploadFilename);
      var status_elem = $('#status');
      var url_elem = $('#image_url');
      var preview_elem = $('#preview');
      var s3upload = new S3Upload({
        file_dom_selector: 'files',
        s3_object_name: uploadFilename,
        s3_sign_put_url: '/api/sign_s3',
        onProgress: function(percent, message) {
            console.log('PROGRESS: ' + percent + '% ' + message);
            status_elem.html('Upload progress: ' + percent + '% ' + message);
        },
        onFinishS3Put: function(public_url) {
            console.log("UPLOAD COMPLETED");
            status_elem.html('Upload completed. Uploaded to: '+ public_url);
            url_elem.val(public_url);
            console.log("URL ELEM VALUE IS ",url_elem.value);
            preview_elem.html('<img src="'+public_url+'" style="width:300px;" />');
        },
        onError: function(status) {
            status_elem.html('Upload error: ' + status);
            console.log("Upload error: ", status);
        }
      });
    },
    //end s3 trial run

    postQuirii: function(){
      
      var thisView = this;
      var titleText = $('input[name=title]').val();
      var promptText = $('input[name=prompt]').val();
      //var mediaUrlText = $('input[name=mediaUrl]').val();
      var mediaUrlText = $('input[name=image_url]').val();
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
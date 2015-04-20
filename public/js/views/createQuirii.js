define(['QuiriiNetView', 'text!templates/createQuirii.html', 'views/createQuirii', 'models/Quirii'],
function(QuiriiNetView, createQuiriiTemplate, CreateQuiriiView, Quirii) {
  var createQuiriiView = QuiriiNetView.extend({
    el: '#create-ui',

    events: {
      "submit #quirii-form": "postQuirii",
      "change #files": "s3upload"
    },

    initialize: function(options) {
      _.bindAll(this, 'render', 'postQuirii');
      this.collection = options.collection;
      this.model = new Quirii();
      this.model.url = this.collection.url;
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

    postQuirii: function(e) {
      var self = this,
          titleText = $('input[name=title]').val(),
          promptText = $('input[name=prompt]').val(),
          mediaUrlText = $('input[name=image_url]').val();
          
      e.preventDefault();
      this.model.set({
        title: titleText,
        prompt: promptText,
        mediaUrl: mediaUrlText
      });

      this.model.save(null, {
        success: function () {
          self.render();
          self.collection.fetch();
          
          Backbone.history.navigate('#/view', { replace: true });
          $('#create-ui').fadeOut(function () {
            QuiriiScope.setTitle('Your Quiriis');
            $('#navigation .cancel').hide();
            $('#your-quiriis-ui').fadeIn();
          });
        }
      });
    },
    
    render: function(){
      this.$el.html(createQuiriiTemplate);
      return this;
    }
  });

  return createQuiriiView
});
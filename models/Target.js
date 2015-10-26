module.exports = function(mongoose) {
  
  var TargetSchema = new mongoose.Schema({
    owner:   { type: mongoose.Schema.ObjectId, ref:'User' },
    mediaType: { type: String },
    mediaUrl: { type: String },
    comment:  { type: String },
    created: { type: Date }
  });

  var Target = mongoose.model('Target', TargetSchema);

  var findAll = function(callback){
    Target.find(function(err, docs){
      callback(docs);
    });
  };

  var findById = function(targetId, callback) {
    Target.findOne({_id:targetId}, function(err,doc) {
      callback(doc);
    });
  };

  var findByName = function(targetName, callback) {
    Target.findOne({name:targetName}, function(err, doc) {
      callback(doc);
    });
  };

  var saveTarget = function(user, target, callback){
    var quiriiTarget = new Target();
    quiriiTarget.owner = user._id;
    quiriiTarget.mediaType = target.mediaType; //will change as we evolve app to accept more upload types
    quiriiTarget.mediaUrl = target.mediaUrl;
    quiriiTarget.comment = target.prompt;
    quiriiTarget.created = new Date();

    quiriiTarget.save(function(err, doc) {
          if(err) { 
            console.log("OOPS there was an error saving your target ", err);
            throw err; 
          } else {
            console.log("successfully saved your target check it out ", doc);
            callback(doc);
          } 
    });
  }

  

  return {
    findAll: findAll,
    findById: findById,
    findByName: findByName,
    saveTarget: saveTarget,
    Target: Target
  }
}

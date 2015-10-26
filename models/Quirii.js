module.exports = function(mongoose) {

  // Mongoose feedback for quirii schema
  var Feedback = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref:'User' },
    userName: { type: String },
    morphiiType: { type: String }, //we could make this a ref to morphiiScale
    morphiiIntensity: { type: Number, min: 0, max: 1 }, //a number 0 - 1, rounded to thousandth
    comment: { type: String }, //an optional text comment
    created_at: { type: Date, default: Date.now }
  });

  // Mongoose Quirii Setup
  var QuiriiSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.ObjectId, ref:'User' },
    title: { type: String },
    //had commented these out but uncommenting for legacy quiriis
    
    mediaUrl: { type: String },
    prompt: { type: String },
    //end uncommenting for legacy quiriis
    target: { type: mongoose.Schema.ObjectId, ref: 'Target' }, //that gives a ref to the id of the target
    feedback: [Feedback],
    feedbackIsPublic: { type: Boolean },
    created: { type: Date, default: Date.now }
  });

  var Quirii = mongoose.model('Quirii', QuiriiSchema);

  var find = function(callback){
    Quirii.find(function(err, doc){
      callback(doc);
    });
  };

  var findAll = function(callback){
    Quirii.find().populate('owner').sort({ created : 1}).exec(function(err, docs){
      var publicQuiriis = [];
      docs.forEach(function(doc){
        //handle legacy quiriis:
        if (doc.target === undefined){
          console.log("legacy quirii");
          publicQuiriis.push({ _id: doc._id,
                            owner: doc.owner,
                            title: doc.title,
                            mediaUrl: doc.mediaUrl,
                            prompt: doc.prompt,
                            created: doc.created,
                            feedbackIsPublic: doc.feedbackIsPublic
          });
        } else {
        publicQuiriis.push({ _id: doc._id,
                            owner: doc.owner,
                            title: doc.title,
                            /*mediaUrl: doc.mediaUrl,
                            prompt: doc.prompt,*/
                            target: doc.target,
                            created: doc.created,
                            feedbackIsPublic: doc.feedbackIsPublic
        });
      }
      });
      callback(publicQuiriis);
    });
  };

  var findForUser = function(userid, callback){
    Quirii.find({ owner: userid }).populate('owner').populate('target').sort({ created : 1}).exec(function(err, docs){
      var publicQuiriis = [];
      docs.forEach(function(doc){
        //handle legacy quiriis
        if (doc.target === null){
          publicQuiriis.push({ _id: doc._id,
                              //owner: doc.owner,
                              title: doc.title,
                              mediaUrl: doc.mediaUrl,
                              prompt: doc.prompt,
                              created: doc.created
          });
          //new quiriis
        } else {
        publicQuiriis.push({ _id: doc._id,
                            //owner: doc.owner,
                            title: doc.title,
                            //mediaUrl: doc.target.mediaUrl,
                            prompt: doc.target.comment,
                            target: doc.target,
                            created: doc.created
        });
      }
      });
      callback(publicQuiriis);
    });
  }

  var findById = function(quiriiId, callback) {
    Quirii.findOne({ _id:quiriiId }).populate('owner').exec(function(err, doc){
      callback(doc);
    });
  };

  var findQuiriiInfo = function(quiriiId, callback){
    //Quirii.findOne({_id:quiriiId}).populate('owner').exec(function(err, doc){
    Quirii.findOne({_id:quiriiId}).populate('owner').populate('target').exec(function(err, doc){

      if (doc.feedbackIsPublic === undefined){
        doc.feedbackIsPublic = true;
      };
      var publicQuirii = {};
      //handle the legacy quirii schema
      if (doc.target === undefined){
        console.log("legacy quirii ii");
        publicQuirii.owner = doc.owner;
        publicQuirii.title = doc.title;
        publicQuirii.mediaUrl = doc.mediaUrl;
        publicQuirii.prompt = doc.prompt;
        publicQuirii.quiriiTime = doc.quiriiTime;
        publicQuirii.feedbackIsPublic = doc.feedbackIsPublic;
        var privateQuiriiDetail = doc.feedback;
      } else {
        console.log("not a legacy quirii ", doc);
        publicQuirii.owner = doc.owner;
        publicQuirii.title = doc.title;
        //publicQuirii.mediaUrl = doc.target.mediaUrl;
        publicQuirii.prompt = doc.target.comment;
        publicQuirii.target = doc.target;
        publicQuirii.quiriiTime = doc.quiriiTime;
        publicQuirii.feedbackIsPublic = doc.feedbackIsPublic;
        var privateQuiriiDetail = doc.feedback;
      }

      callback(publicQuirii, privateQuiriiDetail);
    });
  };

  var saveQuirii = function(user, quirii, target, callback){
    var newQuirii = new Quirii();
    newQuirii.owner = user._id;
    newQuirii.title = quirii.title;
    //try saving full target compare to just saving _id and populating on recall
    //newQuirii.target = target._id;
    newQuirii.target = target;
    newQuirii.quiriiTime = new Date();
    newQuirii.feedbackIsPublic = quirii.feedbackIsPublic;

    //save the quirii and the target
    newQuirii.save(function(err, doc) {
      
          if(err) { 
            console.log("OOPS there was an error saving your quirii ", err);
            throw err; 
          } else {
            console.log("Quirii Saved! ", doc)
            callback(doc);
          } 
        });
  };

  var findAndUpdate = function(quiriiId, quirii, callback){
    Quirii.findOne({_id:quiriiId}, function(err, doc){

      var updateQuirii = doc;
      /*updateQuirii.title = quirii.title;
      updateQuirii.mediaUrl = quirii.mediaUrl;
      updateQuirii.prompt = quirii.prompt;*/
      updateQuirii.target = quirii.target;
      updateQuirii.quiriiTime = quirii.quiriiTime;
      updateQuirii.feedbackIsPublic = quirii.feedbackIsPublic;
      updateQuirii.save(function(err, obj){
        if (err) { throw err; }
        callback(obj);
      });

    });
  };

  var removeQuirii = function(quiriiId, callback){
    Quirii.remove({_id:quiriiId}, function(err){
      callback();
    });
  };

  var addFeedback = function(quiriiId, user, feedbackBody, callback){
    Quirii.findOne( { _id:quiriiId }, function(err, doc){
      if (err) { throw err; }
      var newFeedback = {
          userId: user._id, 
          userName: user.name,
          anonymous: feedbackBody.anonymous,
          morphiiType: feedbackBody.morphiiType,
          morphiiIntensity: feedbackBody.morphiiIntensity, //a number 0 - 1, rounded to thousandth
          comment: feedbackBody.comment,
          created_at: new Date()
      }
      doc.feedback.push(newFeedback);
      doc.save(function (err, docUd){
        if (err){
          throw err;
        }
        callback(docUd);
      });
    });
  };

  var getFeedback = function(quiriiId, callback){
    Quirii.findOne({_id:quiriiId}).populate('owner').exec(function(err, doc){
      var quiriiFeedback = doc.feedback;
      callback(quiriiFeedback);
    });
  };

  var aggregateMorphii = function(quiriiId, callback){
    var ObjId = mongoose.Types.ObjectId;
    var evtId = new ObjId(quiriiId);
    Quirii.aggregate({ $match: { _id: evtId }}, { $unwind: '$feedback' })
      .project({ _id: 0,
        feedback: {
          morphiiType: 1,
          morphiiIntensity: 1
        } 
      })
      .group({ _id: '$feedback.morphiiType',
               count: { $sum: 1 },
               avgIntensity: { $avg: '$feedback.morphiiIntensity' }
             }).sort({ count: -1 }).exec( function(err, agg){
              if (err) {
                console.log('aggregation err');
                callback(null);
              };
            callback(agg);
    });
             
    
  };

  var findQuiriiFeedbackForUser = function(quiriiid, feedbackid, user, callback){
    Quirii.findOne({ _id: quiriiid }, function(err, foundquirii){
      if (err) { console.log('ERROR IS '+ err); }
      var feedbackArray = foundquirii.feedback;

      callback(foundquirii);
    });
  };

  return {
    find: find,
    findAll: findAll,
    findForUser: findForUser,
    findById: findById,
    findQuiriiInfo: findQuiriiInfo,
    saveQuirii: saveQuirii,
    findAndUpdate: findAndUpdate,
    removeQuirii: removeQuirii,
    addFeedback: addFeedback,
    getFeedback: getFeedback,
    aggregateMorphii: aggregateMorphii,
    findQuiriiFeedbackForUser: findQuiriiFeedbackForUser,
    Quirii: Quirii
  }
}

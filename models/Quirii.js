module.exports = function(mongoose) {

  // Mongoose feedback for quirii schema
  var Feedback = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId, ref:'User' },
    userName: { type: String },
    morphyType: { type: String }, //we could make this a ref to morphyScale
    morphyIntensity: { type: Number, min: 0, max: 1 }, //a number 0 - 1, rounded to thousandth
    comment: { type: String }, //an optional text comment
    created_at: { type: Date, default: Date.now }
  });

  // Mongoose Quirii Setup
  var QuiriiSchema = new mongoose.Schema({
    owner: { type: mongoose.Schema.ObjectId, ref:'User' },
    title: { type: String },
    mediaUrl: { type: String },
    prompt: { type: String },
    feedback: [Feedback],
    created: { type: Date, default: Date.now }
  });

  var Quirii = mongoose.model('Quirii', QuiriiSchema);

  var find = function(callback){
    Quirii.find(function(err, doc){
      callback(doc);
    });
  };

  var findAll = function(callback){
    Quirii.find().populate('owner').exec(function(err, docs){
      var publicQuiriis = [];
      docs.forEach(function(doc){
        publicQuiriis.push({ _id: doc._id,
                            owner: doc.owner,
                            title: doc.title,
                            mediaUrl: doc.mediaUrl,
                            prompt: doc.prompt,
                            created: doc.created
        });
      });
      callback(publicQuiriis);
    });
  };


/* stopped editing here */


  var findForUser = function(userid, callback){
    Quirii.find({ owner: userid }, function(err, docs){
      var publicQuiriis = [];
      docs.forEach(function(doc){
        publicQuiriis.push({ _id: doc._id,
                            //owner: doc.owner,
                            title: doc.title,
                            mediaUrl: doc.mediaUrl,
                            prompt: doc.prompt,
                            created: doc.created
        });

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
    Quirii.findOne({_id:quiriiId}).populate('owner').exec(function(err, doc){
      var publicQuirii = {};
      publicQuirii.owner = doc.owner;
      publicQuirii.title = doc.title;
      publicQuirii.mediaUrl = doc.mediaUrl;
      publicQuirii.prompt = doc.prompt;
      publicQuirii.quiriiTime = doc.quiriiTime;
      var privateQuiriiDetail = doc.feedback;
      callback(publicQuirii, privateQuiriiDetail);
    });
  };

  var saveQuirii = function(user, quirii, callback){
    var newQuirii = new Quirii();
    newQuirii.owner = user._id;
    newQuirii.title = quirii.title;
    newQuirii.mediaUrl = quirii.mediaUrl;
    newQuirii.prompt = quirii.prompt;
    newQuirii.quiriiTime = quirii.quiriiTime;
    newQuirii.save(function(err, obj) {
          if(err) { throw err; }
          callback(obj);
        });
  };

  var findAndUpdate = function(quiriiId, quirii, callback){
    Quirii.findOne({_id:quiriiId}, function(err, doc){

      var updateQuirii = doc;
      updateQuirii.title = quirii.title;
      updateQuirii.mediaUrl = quirii.mediaUrl;
      updateQuirii.prompt = quirii.prompt;
      updateQuirii.quiriiTime = quirii.quiriiTime;
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
          morphyType: feedbackBody.morphyType,
          morphyIntensity: feedbackBody.morphyIntensity, //a number 0 - 1, rounded to thousandth
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

  var aggregateMorphy = function(quiriiId, callback){
    var ObjId = mongoose.Types.ObjectId;
    var evtId = new ObjId(quiriiId);
    Quirii.aggregate({ $match: { _id: evtId }}, { $unwind: '$feedback' })
      .project({ _id: 0,
        feedback: {
          morphyType: 1,
          morphyIntensity: 1
        } 
      })
      .group({ _id: '$feedback.morphyType',
               count: { $sum: 1 },
               avgIntensity: { $avg: '$feedback.morphyIntensity' }
             }).sort({ count: -1 }).exec( function(err, agg){
              if (err) {
                console.log('aggregation err');
                callback(null);
              };
              console.log(agg);
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
    aggregateMorphy: aggregateMorphy,
    findQuiriiFeedbackForUser: findQuiriiFeedbackForUser,
    Quirii: Quirii
  }
}

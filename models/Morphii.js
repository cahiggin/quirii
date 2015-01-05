module.exports = function(mongoose) {
  
  var MorphiiSchema = new mongoose.Schema({
    name:   { type: String },
    anchor: { type: String },
    delta:  { type: String }
  });

  var Morphii = mongoose.model('Morphii', MorphiiSchema);

  var findAll = function(callback){
    Morphii.find(function(err, docs){
      callback(docs);
    });
  };

  var findById = function(morphiiId, callback) {
    Morphii.findOne({_id:morphiiId}, function(err,doc) {
      callback(doc);
    });
  };

  var findByName = function(morphiiName, callback) {
    Morphii.findOne({name:morphiiName}, function(err, doc) {
      callback(doc);
    });
  };

  

  return {
    findAll: findAll,
    findById: findById,
    findByName: findByName,
    Morphii: Morphii
  }
}

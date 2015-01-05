module.exports = function(mongoose, passport) {
  
  // Passport/Mongoose User Schema setup
  var UserSchema = new mongoose.Schema({
    provider: String,
    uid: String,
    name: String,
    username: { type: String, unique: true },
    image: String,
    bio: String,
    email: { type: String },
    created: {type: Date, default: Date.now}
  });

  // Create an instance of User
  var User = mongoose.model('User', UserSchema);

/*============================*/
//       USER METHODS         //
/*============================*/

  // Mongoose - USER find all method
  var find = function(callback){
    User.find(function(err, theusers){
      if (err){
        console.log(err);
      }else{
      callback(theusers);
    };
    });
  };

  // Mongoose - USER findById method
  var findById = function(uid, callback) {
    User.findOne({ uid: uid }, function(err, user) {
        if (user){
          callback(user);
        }else{
          callback(null);
        }
    });
  };

  //Mongoose - USER findByUsername method
  var findByUsername = function(username, callback) {
    User.findOne({username:username}, function(err, theuser) {
      if (err){
        console.log(err);
      }else{
      callback(theuser);
    };
    });
  };

  // Mongoose/Passport Deserialization to find the User by id
  var deserializeTheUser = function(uid, callback){
    
      User.findOne({uid:uid}, function (err, user) {
        callback(err, user);
      });

  };

  // MONGOOSE USER Add a user using twitter passport
  var addUser = function(profile, callback){
    User.findOne({uid:profile.id}, function(err, user){
      if (user){
        callback(user);
      }else{
        var user = new User();
        user.provider = "twitter";
        user.uid = profile.id;
        user.name = profile.displayName;
        user.username = profile._json.screen_name;
        user.image = profile._json.profile_image_url;
        user.bio = profile._json.description;
        user.save(function(err, user) {
          if(err) { throw err; }
          callback(user);
        }); 
      }
    });
  };

  // Mongoose Update User function
  var updateUser = function(user, newUserData, callback){
    User.findOne({uid: user.uid}, function(err, foundUser){
      var updatedUser = foundUser;
      if (newUserData.email){ 
        updatedUser.email = newUserData.email;
      };
      if (newUserData.name){
        updatedUser.name = newUserData.name;
      };
      if (newUserData.bio){
        updatedUser.bio = newUserData.bio;
      };
      updatedUser.save(function(err, obj){
        if (err) { throw err; }
        callback(obj);
      });
    });
  };

  var removeUser = function(userId, callback){
    User.remove({_id:userId}, function(err){
      callback();
    });
  };
  
 
  

  return {
    find: find,
    findById: findById,
    findByUsername: findByUsername,
    addUser: addUser,
    deserializeTheUser: deserializeTheUser,
    updateUser: updateUser,
    removeUser: removeUser,
    User: User
  }
}

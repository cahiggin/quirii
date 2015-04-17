var express     = require("express");
var app         = express();
var crypto      = require("crypto");
var passport    = require('passport');
var TwitterStrategy = require('passport-twitter').Strategy;
var aws = require('aws-sdk');

//mongo hq 
//this is the quirii mongo path
//TO DO: put this in heroku env var ASAP
var dbPath = 'mongodb://quiriidbuser:Charlie123@dogen.mongohq.com:10042/Quirii';

var mongoose    = require('mongoose');

// Configure the application
app.configure(function(){
  app.set('views', __dirname + '/views');
  //app.set('view engine', 'ejs');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());

  //rewrite the urls to strip the /api
  /*app.all('*', function(req, res, next){
    req.url = req.url.replace(/^(?!\/api)(\/me|\/users|\/quiriis|\/morphiis)/, '/api$&');
    console.log("NEW REQ URL IS ", req.url);
    next();
  });*/

  app.use(app.router);
  app.use(express.static(__dirname + '/public'));

  

  //connect to mongoose:
  mongoose.connect(dbPath, function onMongooseError(err) {
  //mongoose.connect(process.env.MONGOHQ_URL, function onMongooseError(err){
    if (err) throw err;
  });
  
});

// Hook up the data layer
var models = {
  User: require('./models/User')(mongoose, passport),
  Morphii: require('./models/Morphii')(mongoose),
  Quirii: require('./models/Quirii')(mongoose)
};


// Moodl Me Local Env Twitter App Credentials
//Local Env Twitter app credentials:
/*var TWITTER_CONSUMER_KEY = '9DR3Nv9T9mJVo5LIGK7y4Q';
var TWITTER_CONSUMER_SECRET = 'VUvrJsap9MA8UWULi2oPasj31FyFtiI2Nt3sNYqb6E';
var TWITTER_CALLBACK_URL = 'http://localhost:5000/auth/twitter/callback';*/

//UPDATE WITH CONFIG VARS FOR HEROKU
var TWITTER_CONSUMER_KEY = process.env.TWITTER_CONSUMER_KEY;
var TWITTER_CONSUMER_SECRET = process.env.TWITTER_CONSUMER_SECRET;
var TWITTER_CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;


//set up Twitter Passport strategy
passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    //callbackURL: "http://corleymbp-2.local:5000/auth/twitter/callback"
    //callbackURL: "http://localhost:5000/auth/twitter/callback"
    callbackURL: TWITTER_CALLBACK_URL

    //callbackURL: "http://quirii.herokuapp.com/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
    models.User.findById(profile.id, function(user) {
      if (user){
      done(null, user);
    } else {
      models.User.addUser(profile, function(user){
        done(null, user);
      });
    }
    })  //close User.findOne
  }  //closes function(token...)
));  //closes passport.use for TwitterStrategy

//Passport Serialization fcn to store the user id 
passport.serializeUser(function(user, done) {
  done(null, user.uid);
});

//Passport Deserialization to find the User by id
passport.deserializeUser(function(uid, done) {
  models.User.deserializeTheUser(uid, function (err, user) {
    done(err, user);
  });
});



// S3 Credentials
var AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
var AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;
var S3_BUCKET = process.env.S3_BUCKET;


// GET index route
app.get('/', function(req, res){
  res.render('index');
});

// GET login route
app.get('/login', function(req, res){
  //res.send(401);
  res.render('login');
});

// GET twitter authentication route
app.get('/auth/twitter',
  passport.authenticate('twitter'),
  function(req, res){
    // request will be redirected to Twitter for authentication...
  });

// the twitter callback-- 
// if the authentication fails the user will be redirected to /login
// if the authentication is successful, the user will be taken to /users/username
app.get('/auth/twitter/callback', 
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  function(req, res) {
    //res.redirect('/users' + req.user.username);
    res.redirect('/#/api/me/settings');
  });

// GET logout route
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.send({ meta: {
              code: 401
            },
            data: {
              message: "user is not authenticated"
            }
  });
}

//middleware to parse out /api and return resources
app.use('/api', function (req, res, next) {
  res.send("GOT IT");
  next();
})

/*
// OUR USER ROUTES
*/

/*
// User [/api/users/:username]
*/

// GET route for a single user
app.get('/api/users/:username', function(req, res){
  var uname = req.params.username;
  models.User.findByUsername(uname, function(theuser){
    res.send({ meta: {
                code: 200
              },
              data: {
                user: theuser
              } 
            });
  });
});




/*
// User Collection [/api/users]
*/

// GET all users route
app.get('/api/users', function(req, res){
  models.User.find(function(theusers){
    res.send({ meta: {
                code: 200
              },
              data: {
                user: theusers
              } 
            });
  });
});

/*
// Current User [/api/users/me]
*/

//check login status of user
app.get('/api/me/authenticated', function(req,res){
  var user = req.user;
  if (!req.user){
    res.send(401);
  } else {
  models.User.findById(user.uid, function(theuser){
    res.send(200);
  });
}});

// GET current user
app.get('/api/me/settings', ensureAuthenticated, function(req, res){
  var user = req.user;
  console.log(req.user);
  models.User.findByUsername(user.username, function(theuser){
    res.send({ meta: {
                code: 200
              },
              data: {
                user: theuser
              } 
            });
  });
});

// PUT current user
app.put('/api/me/settings', function(req, res){
  if (!req.user){
    res.redirect('/');
  } else {
  var user = req.user;
  var newUserData = req.body;
  models.User.updateUser(user, newUserData, function(updatedUser){
    res.send({ meta: {
                code: 201
              },
              data: {
                user: updatedUser
              } 
            });
  });
}
});

// DELETE current user
app.delete('/api/me/settings', function(req, res){
  if (!req.user){
    res.redirect('/');
  } else {
  var user = req.user;
  models.User.removeUser(user.uid, function(){
    res.send({ meta: {
                code: 204,
                message: "the user has been deleted"
            }});
  });
}
});

/*
//QUIRII ROUTES
*/


/*
// Quirii Collection [/api/quiriis]
*/

// GET /api/quiriis - a list of all quiriis
app.get('/api/quiriis', function(req,res){
  models.Quirii.findAll(function(quiriis){
    res.send({
              meta: {
                code: 200
              },
              data: {
                quiriis: quiriis
              }
            });
  });
});

// GET /api/users/:username/quiriis - a list of all quiriis for a specific user
app.get('/api/users/:username/quiriis', function(req, res){
  var evtsUserName = req.params.username;
    models.User.findByUsername(evtsUserName, function(user){
      var userId = user._id;
      models.Quirii.findForUser(userId, function(quiriis){
        res.send({
              meta: {
                code: 200,
                
              }, 
              data:{
                quiriis: quiriis
              }
            });
      });
    });
});


/*
// Quirii [/api/quiriis/:quiriiid]
*/

// GET a quirii - returns the quirii with specified id
app.get('/api/quiriis/:quiriiid', function(req, res){
  var quiriiId = req.params.quiriiid;
  models.Quirii.findQuiriiInfo(quiriiId, function(quirii, privateFeedback){
    res.send({
              meta: {
                code: 200
              },
              data: {
              quirii: quirii
              }
            });
  });
});


/*
// Current User Quirii [/api/me/quiriis/:quiriiid]
*/


// GET a quirii for Current user
app.get('/api/me/quiriis/:quiriiid', ensureAuthenticated, function(req, res){
  if (!req.user){
    res.send({
              meta: {
                code: 404, 
                message: "user not signed in"
              }
            });
  } else {
  var quiriiId = req.params.quiriiid;
  models.Quirii.findQuiriiInfo(quiriiId, function(quirii, privateFeedback){
    res.send({
              meta: {
                code: 200
              },
              data: {
                quirii: quirii,
                feedback: privateFeedback
              }
            });
  });
}
});

// PUT a quirii for current user - updates the persisted quirii with given id
app.put('/api/me/quiriis/:quiriiid', ensureAuthenticated, function(req, res){
  if (!req.user){
    res.send({
              meta: {
                code: 404, 
                message: "user not signed in"
              }
            });
  } else {
  var quiriiId = req.params.quiriiid;
  var updatedQuirii = req.body;
  models.Quirii.findAndUpdate(quiriiId, updatedQuirii, function(currentQuirii){
    res.send({
              meta: {
                code: 201
              },
              data: {
                quirii: currentQuirii
              }
            });
  });
}
});

// DELETE a quirii for current user - deletes the quirii with given id
app.delete('/api/me/quiriis/:quiriiid', ensureAuthenticated, function(req, res){
  if (!req.user){
    res.send({
              meta: {
                code: 404, 
                message: "user not signed in"
              }
            });
  } else {
  var quiriiId = req.params.quiriiid;
  models.Quirii.removeQuirii(quiriiId, function(){
    res.send({
              meta: {
                code: 204,
                message: "The quirii has been deleted."
              }
            });
    res.send(204, "The quirii has been deleted.");
  });
}
});

//GET the aggregate morphii for the current user's Quirii with specified id
app.get('/api/me/quiriis/:quiriiid/aggregate', ensureAuthenticated, function(req, res){
  if (!req.user){
    res.send({
              meta: {
                code: 404, 
                message: "user not signed in"
              }
            });
  } else {
  var quiriiId = req.params.quiriiid;
  models.Quirii.aggregateMorphii(quiriiId, function(aggregatemorphii){
    console.log("AGGREGATE MORPHII IS " + aggregatemorphii);
    res.send({
              meta: {
                code: 200
              },
              data: {
                aggMorphii: aggregatemorphii
              }
    });
  });
}
});



/*
// Current User Quirii Collection [/api/me/quiriis]
*/

// GET Quirii Collection for Currently Logged In User
app.get('/api/me/quiriis', ensureAuthenticated, function(req, res){
  if (!req.user){
    res.send({
              meta: {
                code: 404, 
                message: "user not signed in"
              }
            });
  } else {
    var usr = req.user;
    models.Quirii.findForUser(usr._id, function(quiriis){
      //return quiriis with matching userid
      //for general feedback use the Quiriis.getAllFeedback route
    res.send({
              meta: {
                code: 200,
              },
              data:{
                quiriis: quiriis
              }
            });
  });
  }
});

// Handle the S3 upload request

app.get('/api/sign_s3', function(req, res){
    aws.config.update({accessKeyId: AWS_ACCESS_KEY, secretAccessKey: AWS_SECRET_KEY});
    console.log("THE key IS NAMED ", AWS_ACCESS_KEY);
    var user = req.user;
    var object_name = req.query.s3_object_name;
    var s3 = new aws.S3();
    var s3_params = {
        Bucket: S3_BUCKET,
        Key: req.query.s3_object_name,
        Expires: 60,
        ContentType: req.query.s3_object_type,
        ACL: 'public-read'
    };
    s3.getSignedUrl('putObject', s3_params, function(err, data){
        if(err){
            console.log(err);
        }
        else{
            var return_data = {
                signed_request: data,
                //url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+req.query.s3_object_name
                //ideal but requires us to pass user to s3upload.js
                //url: 'https://'+S3_BUCKET+'.s3.amazonaws.com/'+user.uid+'_'+object_name
                url: 'https://s3.amazonaws.com/quirii/'+req.query.s3_object_name
            };
            res.write(JSON.stringify(return_data));
            res.end();
        }
    });
});



// Current User POST Quirii
app.post('/api/me/quiriis', function(req, res){
  if (!req.user){
    res.send({
              meta: {
                code: 404, 
                message: "user not signed in"
              }
            });
  } else {
  var user = req.user;
  var newQuirii = req.body;
  console.log(req.body);
  models.Quirii.saveQuirii(user, newQuirii, function(quirii){
    res.send({
              meta: {
                code: 201
              },
              data: {
                quirii: quirii
              }
            });
  });
}
});

/*
// Quiriis Feedback [/api/quiriis/:quiriiid/feedback]
*/


// GET feedback for a quirii
app.get('/api/me/quiriis/:quiriiid/feedback', ensureAuthenticated, function(req, res){
  if (!req.user){
    res.send({
              meta: {
                code: 404, 
                message: "user not signed in"
              }
            });
  } else {
  var quiriiId = req.params.quiriiid;
  models.Quirii.findQuiriiInfo(quiriiId, function(quirii, privateFeedback){
          res.send({
                meta: {
                  code: 200
                },
                data: {
                  quirii: quirii,
                  feedback: privateFeedback
                }
              });
    }); //close findbyid
  };
});


//GET public feedback for a quirii
app.get('/api/quiriis/:quiriiid/feedback', function(req, res){
  var quiriiId = req.params.quiriiid;
  models.Quirii.findQuiriiInfo(quiriiId, function(quirii, privateFeedback){
      res.send({
              meta: {
                code: 200
              },
              data: {
                quirii: quirii,
                feedback: privateFeedback
              }
            });
    });
});

// POST feedback to a quirii - appends feedback to quirii with given id
app.post('/api/quiriis/:quiriiid/feedback', function(req, res){
  var quiriiId = req.params.quiriiid;
  var user = req.user;
  if (!user){
    var user = {
      userId: null,
      username: "anonymous"
    }
  }
  var feedback = req.body;
  models.Quirii.addFeedback(quiriiId, user, feedback, function(quirii){
    res.send({
              meta: {
                code: 201
              },
              data: {
                quirii: quirii
              }
            });
  });
});

//Delete feedback for a quirii - current user must be the same user who created the feedback object
app.delete('/api/quiriis/:quiriiid/feedback/:feedbackid', function(req, res){
  var quiriiId = req.params.quiriiid;
  var fbId = req.params.feedbackid;
  var user = req.user;
  console.log(quiriiId);
  models.Quirii.findQuiriiFeedbackForUser(quiriiId, fbId, user, function(quirii){
    //returns the feedback object matching quiriiid and userid and deletes it
    res.send({
            meta: {
              code: 200,
              message: "feedback cannot be deleted."
            },
            data: {
              quirii: quirii
            }
    });
  });
});




/*
//MORPHY METHODS [/api/morphiis]
*/

//GET /api/morphiis - GET all morphiis
app.get('/api/morphiis', function(req, res){
  models.Morphii.findAll(function(morphiis){
    res.send({
              meta: {
                code: 200
              },
              data: {
                morphiis: morphiis
              }
            });
  });
});

//GET /api/morphiis - GET a morphii by :name
app.get('/api/morphiis/:morphiiName', function(req, res){
  var morphiiName = req.params.morphiiName;
  models.Morphii.findByName(morphiiName, function(morphii){
    res.send({
              meta: {
                code: 200
              },
              data: {
                morphii: morphii
              }
            });
  });
});

//GET /api/morphiis/:id route - GET a morphii by :id
app.get('/api/morphiis/:id', function(req, res){
  var morphiiId = req.params.id;
  models.Morphii.findById(morphiiId, function(morphii){
    res.send({
              meta: {
                code: 200
              },
              data: {
                morphii: morphii
              }
            });
  });
});


// configuration:
var port = process.env.PORT || CONFIG.port || 3000;
//local port
//var port = 3000;
app.listen(port);
console.log("The magic is happening on port "+ port);

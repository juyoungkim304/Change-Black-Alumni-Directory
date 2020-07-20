var express = require('express');
var router = express.Router();
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));

var session = require('express-session');
var passport = require('passport');
var Auth0Strategy = require('passport-auth0');
var dotenv = require('dotenv');

var userPermission = require('./middleware/userPermission.js');
var secured = require('./middleware/secured.js');

dotenv.config();

// config express-session
var sess = {
    secret: 'admin',
    cookie: {},
    resave: false,
    saveUninitialized: true
};

//session handling
if (app.get('env') === 'production') { sess.cookie.secure = true; }
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());

//passport configuration

//use auth0
var strategy = new Auth0Strategy(
    {
        domain: process.env.AUTH0_DOMAIN,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        callbackURL:
            'http://localhost:5000/callback'
    },
    function (accessToken, refreshToken, extraParams, profile, done) {
        // accessToken is the token to call Auth0 API (not needed in the most cases)
        // extraParams.id_token has the JSON Web Token
        // profile has all the information from the user
        return done(null, profile);
    }
);
passport.use(strategy);

//serialize and deserialize user instances to and from the session
passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});


//database connection
var db = mysql.createConnection({
    host: 'blackalumnidirectory.cxs1kr4seklv.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'badg',
    password: 'blackalumni1',
    database: 'blackalumni'
});

db.connect((err) => {
    if (err) {
        console.log(err)
        throw err;
    }
    console.log("Connected to database...");
});
global.db = db;

var login = require('./routes/auth.js');
const { profilePage } = require('./routes/profile.js');
const { flagProfile } = require('./routes/profile.js');
const { searchPage } = require('./routes/searchresults.js');
const { editPage, editedPage } = require('./routes/editProfile.js');
const { addProfile, addedProfile } = require('./routes/addProfile.js');
const { deletePage } = require('./routes/deleteProfile.js');
const { requestEditPage, requestEdit } = require('./routes/requestEdit.js');

app.set('view engine', 'ejs');

app.use(userPermission());

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    console.log('Reached search-;landing.ejs');
    res.render('pages/search-landing');
});

app.get(/^\/profile\$(\d+)/, profilePage);

app.use('/', login);

app.get(/^\/searchresults=([0-9]+)&(.*)/, searchPage);

app.get(/^\/addprofile/, addProfile);

app.post(/^\/addprofile/, addedProfile);

app.get(/^\/editprofile\$(\d+)/, editPage);

app.post(/^\/editprofile\$(\d+)/, editedPage);

app.get(/^\/deleteprofile\$(\d+)/, secured(), deletePage);

app.post(/^\/profile\$(\d+)/, flagProfile);

app.get('/requestedit', requestEditPage);

app.post('/requestedit', requestEdit);


app.listen(process.env.PORT || 5000);
console.log("Listening at 5000...");

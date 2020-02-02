var express = require('express');
var app = express();
var mysql = require('mysql');
// add bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

// var mongodb = require('mongodb').mongodb;
// global.mongodb = mongodb;

// const db = require('./config/db');

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

const {profilePage} = require('./routes/profile.js');
const {searchPage} = require('./routes/searchresults.js');
// const {editPage, editedPage} = require('./routes/editProfile.js');
// const {addProfile, addedProfile} = require('./routes/addProfile.js');
const {deletePage} = require('./routes/deleteProfile.js');


app.set('view engine', 'ejs');

app.use('/public', express.static('public'));


app.get('/', function(req, res) {
    console.log('Reached search-;landing.ejs');
    res.render('pages/search-landing');
});

app.get(/^\/profile\$(\d+)/, profilePage);

app.get(/^\/searchresults=([0-9]+)&(.*)/, searchPage);

// app.get(/^\/editprofile\$(\d+)/, editPage);

// app.post(/^\/editprofile\$(\d+)/, editedPage);

// var deletePage = express.Router().delete;

app.get(/^\/deleteprofile\$(\d+)/, deletePage);

// app.post(/^\/deleteprofile\$(\d+)/, deletedPage);

// app.get(/^\/addprofile/, addProfile);

// app.post(/^\/addprofile/, addedProfile);

app.listen('8080');
console.log("Listening at 8080...");

var express = require('express');
var app = express();
var mysql = require('mysql');

var db = mysql.createConnection({
    host: 'blackalumnidirectory.cosk8ebxjg1j.us-east-1.rds.amazonaws.com',
    user: 'badg',
    password: 'blackalumni1',
    database: 'blackalumni'
});

db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("Connected to database...");
});
global.db = db;

const {profilePage} = require('./routes/profile.js');
const {searchPage} = require('./routes/searchresults.js');
//const {search-landing} = require('./routes/landing.js')

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));


app.get('/', function(req, res) {
    console.log('Reached search-;landing.ejs');
    res.render('pages/search-landing'); // placeholder -- should be replaced with our starting page
});

app.get(/^\/profile\$(\d+)/, profilePage);

app.get(/^\/searchresults=&(.*)/, searchPage);

app.get(/^\/editprofile\$(\d+)/, editPage);

app.listen('8080');
console.log("Listening at 8080...");
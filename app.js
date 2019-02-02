var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.use('/public', express.static('public'));

app.get('/', function(req, res) {
    res.render('pages/startpageplaceholder'); // placeholder -- should be replaced with our starting page
});

app.get('/searchresults', (req, res) => {
    res.render('pages/searchresults')
})

app.listen('8080');
console.log("Listening at 8080...");
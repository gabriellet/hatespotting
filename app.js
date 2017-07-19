// dependencies
require('@risingstack/trace');
var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
// app.use(express.static(__dirname + '/middleware'));

// views is directory for all template files
app.set('views', __dirname + '/templates');
app.set('view engine', 'ejs');

// authorize with google maps
app.locals.gmClient = require('@google/maps').createClient({
        key: 'AIzaSyCIqP1j3q6Hig9rgCGuNfGCMxZIQLGKkXY'
});

// render index page
app.get('/', function(req, res) {
  res.status(200).render('pages/index');
});

// execute search
var gmSearch = require('./middleware/gmSearch');
//app.use(express.static('/public'));

app.get('/search', gmSearch, function(req, res) {
    // get search parameter
    // var searchString = request.query.q;
    //console.log('Search result in app.js is ', res.locals.gmResponse);
    console.log(req.query.q);
    gmSearchResponse = res.locals.gmResponse;
    //console.log(gmSearchResponse);
    res.json(gmSearchResponse || {});
    //res.status(200).render('pages/index'); 
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
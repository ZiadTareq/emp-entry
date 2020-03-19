/* eslint-disable strict */
var express = require('express');
var app = express();
var request = require('request');
var parser = require('body-parser');

app.use(parser.urlencoded({extended: true}));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
  request('http://localhost:3000/api/enteries', function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var data = JSON.parse(body);
      res.render('home', {data: data});
    }
  });
});

app.post('/add', function(req, res) {
  res.set('Content-Type', 'application/json');
  request.post(
    'http://localhost:3000/api/enteries',
      JSON.stringify(req.body),
    (error, res, body) => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`statusCode: ${res.statusCode}`);
      console.log(body);
    }
  );

  console.log(JSON.stringify(req.body));
});

app.listen('3333', function() {
  console.log('Server is running');
});

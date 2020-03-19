/* eslint-disable strict */
var express = require('express');
var app = express();
var request = require('request');
var parser = require('body-parser');
var axios = require('axios');

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
  const options = {
    headers: {'Content-Type': 'application/json'},
  };

  axios
  .post('http://localhost:3000/api/enteries', JSON.stringify(req.body), options)
  .then(res => {
    console.log(`statusCode: ${res.statusCode}`);
    console.log(res);
  })
  .catch(error => {
    console.error(error);
  });

  console.log(JSON.stringify(req.body));
});

app.listen('3333', function() {
  console.log('Server is running');
});

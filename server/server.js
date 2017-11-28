require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');

const { mongoose, mongoUrl } = require('./database/mongoose');
// const { ObjectID } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());


//page routes
//index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});

//login
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/login.html'));
});

//view a list - TODO figure out how to handle query string so that ?list="unique id" brings up the appropriate list
app.get('/grocerylist', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/listView.html'));
});

//browse recipes
app.get('/recipes', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/browseRecipes.html'));
});




var server = app.listen(port, function() {
	console.log(`Grocery Guru listening on port ${port}`);
	console.log(`Mongo started on port: ${mongoUrl}`);
});

module.exports = app;

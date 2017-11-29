require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const _ = require('lodash');

const { User } = require('./models/user');
const { mongoose, mongoUrl } = require('./database/mongoose');
const { ObjectID } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

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



//user api routes
//create account
app.post('/users/create', (req, res) => {
	var body = _.pick(req.body, ['username', 'password']);
	var user = new User(body);

	user.save()
		.then(() => {
			res.status(200).sendFile(path.join(__dirname + '/../public/index.html'));
		}).catch((err) => {
			res.status(400).send(err);
		});
});

//login
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['username', 'password']);

	User.findByCredentials(body.username, body.password)
		.then((user) => {
			res.status(200).sendFile(path.join(__dirname + '/../public/index.html'));
		}).catch((err) => {
			res.status(400).send(err);
		});
});



var server = app.listen(port, function() {
	console.log(`Grocery Guru listening on port ${port}`);
});

module.exports = app;

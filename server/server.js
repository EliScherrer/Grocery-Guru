require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
var path = require('path');
const _ = require('lodash');

const { User } = require('./models/user');
const { List } = require('./models/list');
const { mongoose, mongoUrl } = require('./database/mongoose');
const { ObjectID } = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({
	extended:true
}));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, '/../public')));

/*******************************

	   page navigation routes

*******************************/
//index
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/index.html'));
});
app.get('/list', function(req, res) {
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


/*******************************

				user api routes

*******************************/
//create account
app.post('/users/create', (req, res) => {
	var body = _.pick(req.body, ['username', 'password']);
	//add default friends
	body.friends = [
		"user1",
		"user2",
		"user3",
		"user4",
		"user5"
	]
	//add default lists
	body.lists = [
		"defaultList1",
		"defaultList2",
	]

	var user = new User(body);

	user.save()
		.then(() => {
			console.log("account creation was successful!");
			res.status(200).send("account created for: " + body.username);
		}).catch((err) => {
			console.log("account creation failed!");
			console.log(err);
			res.status(400).send(err);
		});
});

//login
app.post('/users/login', (req, res) => {
	var body = _.pick(req.body, ['username', 'password']);

	User.findByCredentials(body.username, body.password)
		.then((user) => {
			console.log(user);
			res.status(200).send(user);
		}).catch((err) => {
			console.log("login failed!");
			res.status(400).send(err);
		});
});

//get user friends
app.post('/users/friends', (req, res) => {
	var body = _.pick(req.body, ['username', 'password']);

	console.log(body.username);

	User.findByCredentials(body.username, body.password)
		.then((user) => {
			res.status(200).send(user.friends);
		}).catch((err) => {
			console.log("couldn't get friends");
			console.log(err);
			res.status(400).send(err);
		});
});

//get user lists
app.post('/users/lists', (req, res) => {
	var body = _.pick(req.body, ['username', 'password']);

	User.findByCredentials(body.username, body.password)
		.then((user) => {
			res.status(200).send(user.lists);
		}).catch((err) => {
			console.log("login failed!");
			res.status(400).send(err);
		});
});


/*******************************

				list api routes

*******************************/
//create list
app.post('/list/create', (req, res) => {
	var body = _.pick(req.body, ['username', 'password']);

	var list = new List(body);

	list.save()
		.then(() => {
			console.log("list creation was successful!");
			res.status(200).send("list created for: " + body.username);
		}).catch((err) => {
			console.log("list creation failed!");
			console.log(err);
			res.status(400).send(err);
		});
});

//TODO add item to list

//TODO remove item from list

//TODO change item on list

//TODO share list

//TODO delete list






var server = app.listen(port, function() {
	console.log(`Grocery Guru listening on port ${port}`);
});

module.exports = app;

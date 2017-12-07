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

//index page is login screen
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/login.html'));
});

//login screen
app.get('/login', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/login.html'));
});

//home screen
app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/home.html'));
});

//view a list
app.get('/grocerylist', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/listView.html'));
});

//browse recipes
app.get('/recipes', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/browseRecipes.html'));
});

//add recipes
app.get('/recipes/add', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/addRecipe.html'));
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

//add a friend
app.post('/users/friends/add', (req, res) => {
	var body = _.pick(req.body, ['username', 'password', 'friend']);
	//first find the logged in user
	User.findByCredentials(body.username, body.password)
		.then((user) => {
			//then try to add a friend
			var oldFriendsList = user.friends;

			User.findByName(body.friend)
			.then((user) => {

				for (var i = 0; i < oldFriendsList.length; i++) {
					if (oldFriendsList[i] === body.friend) {
						return res.status(400).send("That person is already your friend!");
					}
				}

				User.findOneAndUpdate(
					{ "username" : body.username },
					{ $push: { friends: body.friend } },
					{ new: true },
					function (err, doc) {
						if (err) {
							console.log("couldn't add?");
							console.log(err);
							res.status(400).send(err);
						}
						else {
							console.log(doc);
							res.status(200).send("friend added!");
						}
					}
				);

			}).catch((err) => {
				console.log("couldn't find that person");
				console.log(err);
				res.status(400).send(err);
			});


		}).catch((err) => {
			console.log("couldn't find this user");
			console.log(err);
			res.status(400).send(err);
		});
});

//remove a friend from friends list
app.post('/users/friends/remove', (req, res) => {
	var body = _.pick(req.body, ['username', 'password', 'friend']);

	User.findByCredentials(body.username, body.password)
		.then((user) => {
			User.update(
	  		{ "username" : body.username },
			  { $pull: { friends: body.friend } },
			  { multi: false },
				function (err, doc) {
					if (doc.nModified === 0) {
						console.log("couldn't remove that person, probably bc he isn't one of your friends");
						res.status(400).send("couldn't remove that person, possible he isn't one of your friends");
					}
					else {
						console.log(doc);
						res.status(200).send("friend removed!");
					}
				}
			);
		}).catch((err) => {
			console.log("couldn't find the currently logged in user");
			console.log(err);
			res.status(400).send(err);
		});
});

//add a grocery list to the user's lists
app.post('/users/lists/add', (req, res) => {
	var body = _.pick(req.body, ['username', 'listName']);
	//first find the logged in user
	User.findByName(body.username)
		.then((user) => {

			//make sure that user doesn't already have that list listed
			var listsList = user.lists;
			for (var i = 0; i < listsList.length; i++) {
				if (listsList[i] === body.listName) {
					return res.status(400).send("You already have that list!");
				}
			}

			//make sure that list exists
			List.findByName(body.listName)
				.then((list) => {
					//add the grocery list to the user's lists
					User.findOneAndUpdate(
						{ "username" : body.username },
						{ $push: { lists: body.listName } },
						{ new: true },
						function (err, doc) {
							if (err) {
								console.log("couldn't add?");
								console.log(err);
								res.status(400).send(err);
							}
							else {
								console.log(doc);
								res.status(200).send("list added!");
							}
						}
					);
				}).catch((err) => {
					console.log("can't add that list because it doesn't exist");
					console.log(err);
					res.status(400).send("can't add that list because it doesn't exist");
				});
		}).catch((err) => {
			console.log("couldn't find the currently logged in user");
			console.log(err);
			res.status(400).send(err);
		});
});

//remove a grocery list from the user's lists
app.post('/users/lists/remove', (req, res) => {
	var body = _.pick(req.body, ['username', 'listName']);

	User.findByName(body.username)
		.then((user) => {
			User.update(
	  		{ "username" : body.username },
			  { $pull: { lists: body.listName } },
			  { multi: false },
				function (err, doc) {
					if (doc.nModified === 0) {
						console.log("couldn't remove that list, probably bc it isn't one of your lists");
						res.status(400).send("couldn't remove that list, probably bc it isn't one of your lists");
					}
					else {
						console.log(doc);
						res.status(200).send("list removed!");
					}
				}
			);
		}).catch((err) => {
			console.log("couldn't find the currently logged in user");
			console.log(err);
			res.status(400).send(err);
		});
});

/*******************************

				list api routes

*******************************/
//create list
app.post('/lists/create', (req, res) => {
	var body = _.pick(req.body, ['listName']);
	//var user = _.pick(req.body, ['username', 'password']);

	var list = new List(body);

	// var item = {
	// 	itemName : "apple",
	// 	quantity : "2",
	// 	genre : "fruit",
	// 	acquired : "false",
	// }
	// list.items.push(item);

	list.save()
		.then(() => {
			console.log("list creation was successful!");
			res.status(200).send("list created for");
		}).catch((err) => {
			console.log("list creation failed!");
			console.log(err);
			res.status(400).send(err);
		});
});

//delete list
app.post('/lists/remove', (req, res) => {
	var body = _.pick(req.body, ['listName']);

	//make sure that list exists
	List.findByName(body.listName)
		.then((list) => {
			// List.remove(
			//    { "listName" : body.listName }
			// );
			list.remove(function (err) {
				if(err) {
					return res.status(400).send(err);
				}
				else {
					res.status(200).send("list deleted");
				}
			});
		}).catch((err) => {
			console.log("can't remove that list because it doesn't exist");
			console.log(err);
			res.status(400).send("can't remove that list because it doesn't exist");
		});
});

//get list - list name is in the query string - should probably add the unique ID to this (or replace with)
app.get('/lists/get', (req, res) => {
	var listName = req.query.listName
	console.log(listName);

	List.findByName(listName)
		.then((list) => {
			res.status(200).send(list);
		}).catch((err) => {
			console.log("couldn't get the list");
			console.log(err);
			res.status(400).send(err);
		});
});

//add item to list
app.post('/lists/item/add', (req, res) => {
	var body = _.pick(req.body, ['listName']);
	var item = _.pick(req.body, ['itemName', 'quantity', 'genre', 'acquired']);
	console.log(item);

	//TODO do some error checking here to make sure all the fields are there and have valid values
	if (body.listName === undefined || body.listName === null) {
		res.status(400).send("missing parameters");
	}
	else if (item.itemName === undefined || item.itemName === null) {
		res.status(400).send("missing parameters");
	}
	else if (item.quantity === undefined || item.quantity === null) {
		res.status(400).send("missing parameters");
	}
	else if (item.genre === undefined || item.genre === null) {
		res.status(400).send("missing parameters");
	}
	else if (item.acquired === undefined || item.acquired === null) {
		res.status(400).send("missing parameters");
	}
	else {
		List.findOneAndUpdate(
			{ "listName" : body.listName },
			{ $push: { items: item } },
			{ new: true },
			function (err, doc) {
				if (err) {
					console.log("didn't work?");
					console.log(err);
					res.status(400).send(err);
				}
				else {
					console.log(doc);
					res.status(200).send(doc);
				}
			}
		);
	}
});

//remove item from list
app.post('/lists/item/remove', (req, res) => {
	var body = _.pick(req.body, ['listName', 'itemName']);

	List.update(
		{ "listName" : body.listName },
	  { $pull: { items: { itemName: body.itemName } } },
	  { multi: false },
		function (err, doc) {
			if (doc.nModified === 0) {
				console.log("couldn't remove that item, probably bc it isn't in your lists");
				console.log(body.listName);
				console.log(body.itemName);
				res.status(400).send("couldn't remove that item, probably bc it isn't in your lists");
			}
			else {
				console.log(doc);
				res.status(200).send("item removed!");
			}
		}
	);
});


//TODO change item on list
app.post('/lists/item/change', (req, res) => {
	var body = _.pick(req.body, ['listName']);
	var item = _.pick(req.body, ['itemName', 'quantity', 'genre', 'acquired']);
	console.log(item);

	//TODO do some error checking here to make sure all the fields are there and have valid values
	if (body.listName === undefined || body.listName === null) {
		res.status(400).send("missing parameters");
	}
	else if (item.itemName === undefined || item.itemName === null) {
		res.status(400).send("missing parameters");
	}
	else if (item.quantity === undefined || item.quantity === null) {
		res.status(400).send("missing parameters");
	}
	else if (item.genre === undefined || item.genre === null) {
		res.status(400).send("missing parameters");
	}
	else if (item.acquired === undefined || item.acquired === null) {
		res.status(400).send("missing parameters");
	}
	//TODO change this next part, it was just copied and pasted
	else {
		console.log(item.itemName);
		List.update(
			{ "listName" : body.listName, "items.itemName" : item.itemName },
			{ "$set" : { "items.$" : item } },
			{ new: true },
			function (err, doc) {
				if (err) {
					console.log("didn't work?");
					console.log(err);
					res.status(400).send(err);
				}
				else {
					console.log(doc);
					res.status(200).send(doc);
				}
			}
		);
	}
});




var server = app.listen(port, function() {
	console.log(`Grocery Guru listening on port ${port}`);
});

module.exports = app;

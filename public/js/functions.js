/**********************************************

	 functions for doing things with the user

************************************************/

//create a new user
function createUser() {
	var user = document.getElementById("username").value;
	var pass = document.getElementById("password").value;

	var props = {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			username: user,
			password: pass
		})
	};

	fetch(BASE_URL + '/users/create', props)
		.then(function(response) {
			if (response.ok) {
				console.log("account creation was succesful");

				localStorage.setItem('user', user);
				localStorage.setItem('pass', pass);

				window.location = "/home";
				return;
			}
			else {
				console.log("creation failed");

				//TODO username was already taken, tell the user to come up with something else

				return;
			}
		}).catch(function(err) {
				console.log("there was a network error");
				console.log(err);
				return;
		});
}

//login a user
function validateUser() {
  var user = document.getElementById("username").value;
  var pass = document.getElementById("password").value;

	var props = {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			// 'mode': 'cors'
		},
		body: JSON.stringify({
			username: user,
			password: pass
		})
	};

	fetch(BASE_URL + '/users/login', props)
		.then(function(response) {
		  if (response.ok) {
				console.log("login was succesful");

				window.localStorage.setItem('user', user);
				window.localStorage.setItem('pass', pass);

				window.location = "/home";
				return;
			}
			else {
				console.log("login failed");

				//TODO username or password was incorrect, tell the user

				return;
			}
		}).catch(function(err) {
				console.log("there was a network error");
				console.log(err);
				return;
		});
}

//get an array of the username's lists
function getUserLists(username, password) {
	//get the username and password that were saved to local storage when the user loged in
	// username = localStorage.getItem(user);
	// password = localStorage.getItem(pass);

	var props = {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			username: username,
			password: password,
		})
	};

	fetch(BASE_URL + '/users/lists', props)
		.then(function(lists) {
			if (lists.ok) {
				console.log("lists successfully retrieved");
				return lists;
			}
			else {
				console.log("retrieval failed");

				//TODO retrieval failed, send an error message (this should probably never happen though because all the info is gathered from local storage)

				return;
			}
		}).catch(function(err) {
				console.log("there was a network error");
				console.log(err);
				return;
		});
}

//add the listName to the username's lists
function addListToUser(listName, username) {

}


/**********************************************

	 functions for doing things with lists

************************************************/

//creates a blank list listName
function createList(listName) {

}

//returns the listName list object
function getList(listName) {
	var props = {
		method: 'GET'
	};

	fetch(BASE_URL + `/lists/get?listName={listName}`, props)
		.then(function(list) {
			if (list.ok) {
				return list;
			}
			else {
				console.log("couldn't get the list ");

				//TODO couldn't get the list for some reason, display an error message

				return;
			}
		}).catch(function(err) {
				console.log("there was a network error");
				console.log(err);
				return;
		});
}

//adds an itme with all of the required attributes to the listName
function addItemToList(listName, itemName, quantity, genre, acquired) {
	var props = {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			listName: listName,
			itemName: itemName,
			quantity: quantity,
			genre: genre,
			acquired: acquired
		})
	};

	fetch(BASE_URL + '/lists/add', props)
		.then(function(response) {
			if (response.ok) {
				console.log("item was successfully added");
				return;
			}
			else {
				console.log("creation failed");

				//TODO adding failed, send some error message

				return;
			}
		}).catch(function(err) {
				console.log("there was a network error");
				console.log(err);
				return;
		});
}

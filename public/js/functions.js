var BASE_URL = "https://mysterious-inlet-94873.herokuapp.com";
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
	// username = localStorage.getItem("user");
	// password = localStorage.getItem("pass");

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

	return new Promise((resolve, reject) => {
		fetch(BASE_URL + '/users/lists', props)
			.then(function(response) {

				if (response.ok) {
					response.json().then(function(lists) {
						console.log("lists successfully retrieved");
						console.log("lists...");
						console.log(lists);
						resolve(lists)
						return resolve(lists);
					});
				}
				else {
					console.log("retrieval failed");

					//TODO retrieval failed, send an error message (this should probably never happen though because all the info is gathered from local storage)

					return reject("retrieval failed");
				}
			}).catch(function(err) {
					console.log("there was a network error");
					console.log(err);
					return reject("there was a network error");
			});
	 });
}

//TODO add the listName to the username's lists
function addListToUser(listName, username) {

}
 //TODO Delete user from list??
 function delListToUser(listName, username) {
	
}

function addFriend(username, friend) {
	
}
/**********************************************

	 functions for doing things with lists

************************************************/

//TODO needs to be done
function deleteList(listName) {


}

//creates a blank list listName -- returns true if successful, false if failed
function createList(listName) {
	var props = {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify({
			listName: listName
		})
	};

	fetch(BASE_URL + '/lists/create', props)
		.then(function(response) {
			if (response.ok) {
				console.log("list was successfully created");
				return true;
			}
			else {
				console.log("creation failed");

				//TODO adding failed, send some error message

				return false;
			}
		}).catch(function(err) {
				console.log("there was a network error");
				console.log(err);
				return false;
		});
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

//TODO needs to be done
function delItemToList(listName, itemName, quantity, genre, acquired) {

}

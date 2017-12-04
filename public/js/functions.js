//add the listName to the username's lists
function addListToUser(listName, username) {

}

//returns the listName list object
function getListObject(listName) {

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

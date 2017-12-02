//var BASE_URL = "http://localhost:3000";
var BASE_URL = "https://mysterious-inlet-94873.herokuapp.com";

// OLD VALIDATION

//var attempt = 5; // Variable to count number of attempts.
// Below function Executes on click of login button.
// function validate() {
//     var username = document.getElementById("username").value;
//     var password = document.getElementById("password").value;
//     if ( username == "Test1234" && password == "Test1234"){
//         alert ("Login successfully");
//         window.location = "list.html"; // Redirecting to other page.
//         return false;
//     }
//     else{
//         attempt --;// Decrementing by one.
//         alert("You have left "+attempt+" attempt;");
//         if( attempt == 0){
//             document.getElementById("username").disabled = true;
//             document.getElementById("password").disabled = true;
//             document.getElementById("submit").disabled = true;
//             return false;
//         }
//     }
// }

function validate() {
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

function create() {
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

var attempt = 5; // Variable to count number of attempts.
// Below function Executes on click of login button.
function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    if ( username == "Test1234" && password == "Test1234"){
        alert ("Login successfully");
        window.location = "list.html"; // Redirecting to other page.
        return false;
    }
    else{
        attempt --;// Decrementing by one.
        alert("You have left "+attempt+" attempt;");
        if( attempt == 0){
            document.getElementById("username").disabled = true;
            document.getElementById("password").disabled = true;
            document.getElementById("submit").disabled = true;
            return false;
        }
    }
}

function validate() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

		var props = { method: 'POST',
		               mode: 'cors'
								};

		fetch(process.env.BASE_URL + '/users/login', props).then(function(response) {
		  return response.blob();
		}).then(function(myBlob) {
		  var objectURL = URL.createObjectURL(myBlob);
		  myImage.src = objectURL;
		});


}

function create() {

}

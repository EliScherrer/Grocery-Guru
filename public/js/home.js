function create_button(listname) {
    var button = document.createElement("button");
    button.innerHTML = listname;

    var createA = document.createElement('a');
    createA.setAttribute('href', `/grocerylist?listName=${listname}`);

    createA.appendChild(button);

    // 2. Append somewhere
    var node = document.createElement("li");
    node.appendChild(createA);
    //var link = document.getElementById("li"); //or grab it by tagname etc
    //link.href = "listView.html";
    document.getElementById("but_lists").appendChild(node);
    //var list = document.getElementsByTagName("ul");
    //list.appendChild(button);
}

function create_all_buttons() {
    username = localStorage.getItem("user");
	password = localStorage.getItem("pass");
    //var lists = getUserLists(username, password);

		getUserLists(username, password)
			.then(function (lists) {
		    for (var i = 0; i < lists.length; i++) {
		        create_button(lists[i]);
		        //add_style(i);
	    	}
            }).catch(function(err) {
                console.log("there was a error");
                console.log("Error: " + err);
            });
}

function newList() {
    var inputValue = document.getElementById("myInput").value;
    //get users list and also make sure that this list doesn't already exist
    if(inputValue != "") {
        createList(inputValue)
            .then(function (result) {
                addListToUser(inputValue, localStorage.getItem("user"))
                    .then(function (result2) {
                        return create_button(inputValue);
                    }).catch(function(err) {
                        console.log("there was a error");
                        console.log("Error: " + err);
                    });
        }).catch(function(err) {
             console.log("there was a error");
             console.log("Error: " + err);
        });


    }
  }

  function newFriend() {
    username = localStorage.getItem("user");
	password = localStorage.getItem("pass");
    var FriendName = document.getElementById("Friend").value;
	var url = window.location.toString();
    var res = url.split("=");
    var list = res[1];
    
	addFriendToList(username, password, FriendName).then(function () {
        return;
    }).catch(function(err) {
        console.log("there was a error");
        console.log("Error: " + err);
    });
}


function getUserLists() {
	//get the username and password that were saved to local storage when the user loged in
	username = localStorage.getItem(user);
	password = localStorage.getItem(pass);

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

function create_button(listname) {
    var button = document.createElement("button");
    button.innerHTML = listname;
    
    var createA = document.createElement('a');
    createA.setAttribute('href', "listView.html");

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
    //var lists = getUserLists();
        //example of input
        var item1 = {
            name:"apple",
            quantity: 2,
            type: "fruit",
            aquired: true
        };
        var item2 = {
            name:"pear",
            quantity: 2,
            type: "fruit",
            aquired: false
        };
        var item3 = {
            name:"chicken",
            quantity: 2,
            type: "protein",
            aquired: false
        };
        var item4 = {
            name:"spinach",
            quantity: 6,
            type: "vegetable",
            aquired: false
        };
        var item5 = {
            name:"cheese",
            quantity: 4,
            type: "dairy",
            aquired: false
        };
        var item6 = {
            name:"cereal",
            quantity: 2,
            type: "grain",
            aquired: false
        };
        var item7 = {
            name:"milk",
            quantity: 1,
            type: "dairy",
            aquired: false
        };
        var item8 = {
            name:"orange",
            quantity: 2,
            type: "fruit",
            aquired: false
        };
        var item9 = {
            name:"cereal",
            quantity: 2,
            type: "grain",
            aquired: false
        };
        var item10 = {
            name:"bread",
            quantity: 2,
            type: "grain",
            aquired: false
        };
        var item11 = {
            name:"cereal",
            quantity: 2,
            type: "grain",
            aquired: false
        };
        var item12 = {
            name:"cereal",
            quantity: 2,
            type: "grain",
            aquired: false
        };
        var items1 = [item1, item2, item3];
        var items2 = [item4, item5, item6];
        var items3 = [item7, item8, item9];
        var items4 = [item10, item11, item12];
        var list1 = {list_name: "list_a", all: items1};
        var list2 = {list_name: "list_b", all: items2};
        var list3 = {list_name: "list_c", all: items3};
        var list4 = {list_name: "list_d", all: items4};
        var total = [list1, list2, list3, list4];
    for (var i = 0; i < total.length; i++) {
        create_button(total[i].list_name);
        //add_style(i);
    }
}

function add_style(i) {
    var sheet = document.styleSheets;
    var name = "button";
    final = name.concat(i);
    var sty = "{position: absolute; left: 10px; top: 150px; width: 100px; height: 30px; font-size: 18px; font-family: sans-serif; font-weight: bold; color: white; border-radius: 4px; text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2); background: rgb(28, 184, 176);}"
    final = final.concat(sty);
    sheet.innerHTML = final
    document.body.appendChild(sheet);    
}

function newList() {
    var inputValue = document.getElementById("myInput").value;
    //get users list and also make sure that this list doesn't already exist
    if(inputValue != "") {
        create_button(inputValue);

        
        //add list to database
    }
  }
function body_onLoad() {
	test();
	//create_table();
}

function test() {
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
    create_table(list1);
}

function create_table(list2) {
    //example of input
	var table = '';
	var list = list2;
    var rows = list.all.length + 1;
    var cols = 4;
    var i = -1;
    for (var r = 0; r < rows; r++) {
        table += '<tr>';
        //cols = total[r].all.length;
        for (var c = 0; c < cols; c++) {
            if (r == 0) {
                if (c == 0) {
                    table += '<th>' + "Name" + '</th>';
                }
                else if (c == 1) {
                    table += '<th>' + "Quantity" + '</th>';
                }
                else if (c == 2) {
                    table += '<th>' + "Type" + '</th>';
                }
                else if (c == 3) {
                    table += '<th>' + "Aquired" + '</th>';
                }
            }
            else {
                //i++;
                if (c == 0) {
                    table += '<td>' + list.all[r-1].name + '</td>';
                }
                else if (c == 1) {
                    table += '<td>' + list.all[r-1].quantity + '</td>';
                }
                else if (c == 2) {
                    table += '<td>' + list.all[r-1].type + '</td>';
                }
                else if (c == 3) {
                    table += '<td>' + list.all[r-1].aquired + '</td>';
                }
            }
        }
        table += '</tr>';
    }
    var node = document.getElementById("ingredients");
    node.innerHTML = table;
}

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

function newItem() {
//addItemToList();
//create_table();
}

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

function body_onLoad() {
	getTheList();

	//var btn = document.getElementById("btnRecipes");
	//btn.onclick = goToAddRecipe();
	//create_table();
}



function goToAddRecipe() {
	var url = window.location.toString();
	var res = url.split("=");
	var list = res[1];
	window.location.href= `/recipesadd?listName=${list}`;
}

function getTheList() {
    var url = window.location.toString();
    var res = url.split("=");
    var list = res[1];
    console.log(list);

    getList(list)
	    .then(function (list1) {
	        create_table(list1);
	    }).catch(function(err) {
	        console.log("there was a error");
	        console.log("Error: " + err);
	    });
}

function delete_Item(listName, itemName) {
    deleteItemFromList(listName, itemName)
    .then(function (result) {
        location.reload();
        return;
    }).catch(function(err) {
        console.log("there was a error");
        console.log("Error: " + err);
    });

}

function edit_row (listName, itemName, quantity, genre, acquired) {
    console.log("here");
	document.getElementById("c_item").value = itemName;
	document.getElementById("c_quantity").value = quantity;
	document.getElementById("c_type").value = genre;
    document.getElementById("c_acquired").value = acquired;
    document.getElementById('id01').style.display='block';
}

function change_row () {
    var itemName = document.getElementById("c_item").value;
	var quantity = document.getElementById("c_quantity").value;
    var genre = document.getElementById("c_type").value;
    var acquired = document.getElementById("c_acquired").value;

    //location.reload();
    var url = window.location.toString();
    console.log(url);
    var res = url.split("=");
    var list = res[1];

    changeItemInList(list, itemName, quantity, genre, acquired)
        .then(function (result) {
            getTheList(list);
            location.reload();
        }).catch(function(err) {
            console.log("there was a error");
            console.log("Error: " + err);
                    return;
        });

}

function change_a (listName, itemName, quantity, genre, acquired) { 
    
    if (acquired == "true") {
        var a = false;
        var url = window.location.toString();
        console.log(url);
        var res = url.split("=");
        var list = res[1];
    
        changeItemInList(list, itemName, quantity, genre, a)
            .then(function (result) {
                getTheList(list);
                location.reload();
            }).catch(function(err) {
                console.log("there was a error");
                console.log("Error: " + err);
                        return;
            });
    }
    else {
        var a = true;
        var url = window.location.toString();
        console.log(url);
        var res = url.split("=");
        var list = res[1];
    
        changeItemInList(list, itemName, quantity, genre, a)
            .then(function (result) {
                getTheList(list);
                location.reload();
            }).catch(function(err) {
                console.log("there was a error");
                console.log("Error: " + err);
                        return;
            });
    }
}

function create_table(list1) {
    //example of input
		var table = '';
		var table2 = '';
		var list = list1;
    var rows = list.items.length + 1;
    var cols = 6;
    var i = -1;
    for (var r = 0; r < rows; r++) {
        table += '<tr>';
        //cols = total[r].all.length;
        for (var c = 0; c < cols; c++) {
            if (r == 0) {
                if (c == 0) {
                    table += '<th>' + "Ingredient" + '</th>';
										table2 += '<th>' + "Recipe" + '</th>';
                }
                else if (c == 1) {
                    table += '<th>' + "Quantity" + '</th>';
										table2 += '<th>' + "Ingredients" + '</th>';
                }
                else if (c == 2) {
                    table += '<th>' + "Type" + '</th>';
										table2 += '<th>' + "In Cart" + '</th>';
                }
                else if (c == 3) {
                    table += '<th>' + "In Cart" + '</th>';
										table2 += '<th>' + "Delete" + '</th>';
                }
                else if (c == 4) {
                    table += '<th>' + "Delete" + '</th>';
                }
                else if (c == 5) {
                    table += '<th>' + "Edit" + '</th>';
                }
            }
            else {
								//if adding an ingredient
					if (list.items[r-1].genre !== "recipe") {
	                //i++;
	                var name_i = list.items[r-1].itemName;
                    var name_l = list.listName;
                    var name_q = list.items[r-1].quantity;
                    var name_g = list.items[r-1].genre;
                    var name_a = list.items[r-1].acquired;
	                if (c == 0) {
	                    table += '<td>' + list.items[r-1].itemName + '</td>';
	                }
	                else if (c == 1) {
	                    table += '<td>' + list.items[r-1].quantity + '</td>';
	                }
	                else if (c == 2) {
	                    table += '<td>' + list.items[r-1].genre + '</td>';
	                }
	                else if (c == 3) {
	                    var kms = "obtained";
	                    if (list.items[r-1].acquired) {
                            table += '<td><input type="checkbox" onclick="change_a(\'' + name_l + '\',\'' + name_i+ '\',\'' + name_q+ '\',\'' + name_g+ '\',\'' + name_a+ '\')" value="checked" checked /></td>';
                            //table += '<td><input type="checkbox" value="checked" checked /></td>';
	                    }
	                    else {
	                        table += '<td><input type="checkbox" onclick="change_a(\'' + name_l + '\',\'' + name_i+ '\',\'' + name_q+ '\',\'' + name_g+ '\',\'' + name_a+ '\')" value="checked"  /></td>';    
	                    }
	                }
	                else if (c == 4) {
	                    table += '<td><button type="button" onclick="delete_Item(\'' + name_l + '\',\'' + name_i+ '\')">Delete</button></td>';
	                }
	                else if (c == 5) {
	                    table += '<td><button type="button" onclick="edit_row(\'' + name_l + '\',\'' + name_i+ '\',\'' + name_q+ '\',\'' + name_g+ '\',\'' + name_a+ '\')">Edit</button></td>';
	                    //table += '<td><button onclick="document.getElementById("id01").style.display="block"" style="width:auto;">Sign Up</button></td>';
	                }
								}
								//adding a recipe
								else {
									//i++;
	                var name_i = list.items[r-1].itemName;
                    var name_l = list.listName;
                    var name_q = list.items[r-1].quantity;
                    var name_g = "recipe";
                    var name_a = list.items[r-1].acquired;
                    
	                if (c == 0) {
	                    table2 += '<td>' + list.items[r-1].itemName + '</td>';
	                }
	                else if (c == 1) {
	                    table2 += '<td>' + list.items[r-1].quantity + '</td>';
	                }
	                else if (c == 2) {
						if (list.items[r-1].acquired) {
                            table2 += '<td><input type="checkbox" onclick="change_a(\'' + name_l + '\',\'' + name_i+ '\',\'' + name_q+ '\',\'' + name_g+ '\',\'' + name_a+ '\')" value="checked" checked /></td>';
                            //table += '<td><input type="checkbox" value="checked" checked /></td>';
	                    }
	                    else {
	                        table2 += '<td><input type="checkbox" onclick="change_a(\'' + name_l + '\',\'' + name_i+ '\',\'' + name_q+ '\',\'' + name_g+ '\',\'' + name_a+ '\')" value="checked"  /></td>';    
	                    }
	                }
	                else if (c == 3) {
	                    var kms = "obtained?";
						table2 += '<td><button type="button" onclick="delete_Item(\'' + name_l + '\',\'' + name_i+ '\')">Delete</button></td>';
	                }

				}
            }
        }
        table += '</tr>';
				table2 += '</tr>';
    }
    var node = document.getElementById("ingredients");
    node.innerHTML = table;
		var node2 = document.getElementById("recipes");
    node2.innerHTML = table2;
}

function newItem() {
	var itemName = document.getElementById("Item").value;
	var quantity = document.getElementById("Quantity").value;
	var type = document.getElementById("Type").value;
  var acquired = "false";
  var url = window.location.toString();
  var res = url.split("=");
  var list = res[1];

  addItemToList(list, itemName, quantity, type, acquired)
    .then(function (result) {
        return getTheList(list);
    }).catch(function(err) {
        console.log("there was a error");
        console.log("Error: " + err);
				return;
    });

}

function deleteCurrentList() {
    var url = window.location.toString();
    var res = url.split("=");
    var list = res[1];
    username = localStorage.getItem("user");
    if(confirm("Are you sure you want to delete?") == true) {
        delListFromUser(list, username).then(function (result) {
            return;
        }).catch(function(err) {
            console.log("there was a error delList");
            console.log("Error: " + err);
                    return;
        });
        deleteList(list).then(function (result) {
            window.location.href='/home';
            return;
        }).catch(function(err) {
            console.log("there was a error delUserFromList");
            console.log("Error: " + err);
                    return;
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
	addFriendToList(username, password, FriendName).then(function (list) {
        populateFriendList(list);
    }).catch(function(err) {
        console.log("there was a error");
        console.log("Error: " + err);
    });
}

function add_Friend_To_List(name) {
    var url = window.location.toString();
    var res = url.split("=");
    var list = res[1];
    console.log(name);
    console.log(list);
    addListToUser(list, name)
	    .then(function (add) {

	        return;
	    }).catch(function(err) {
	        console.log("there was a error");
	        console.log("Error: " + err);
	    });
}

function populateFriendList(list1) {
    var list = list1;
    var len = list.length;
    var node = document.getElementById("myDropdown");
    var fin = '';
    while(node.firstChild){
        node.removeChild(node.firstChild);
    }
    for (var i = 0; i < len; i++) {
        var name = list[i];
        fin = '<a onclick="add_Friend_To_List(\'' + name + '\')">' + name + '</a>';
        node.innerHTML += fin;
    }
    console.log(fin);

    document.getElementById("myDropdown").classList.toggle("show");
}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myDropList() {
    username = localStorage.getItem("user");
    password = localStorage.getItem("pass");
    getFriendsList(username, password)
    .then(function (list) {
        populateFriendList(list);
    }).catch(function(err) {
        console.log("there was a error");
        console.log("Error: " + err);
    });
    //document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
/*
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

*/

function body_onLoad() {
	test();
	//create_table();
}

function test() {
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

function create_table(list1) {
    //example of input
	var table = '';
	var list = list1;
    var rows = list.items.length + 1;
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
                    table += '<th>' + "Acquired" + '</th>';
                }
            }
            else {
                //i++;
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
                    var kms = "obtained?";
                    if (list.items[r-1].acquired) {
                        table += '<td><input type="checkbox" value="checked" checked />' + kms + '</td>';
                    }
                    else {
                        table += '<td><input type="checkbox" value="checked" />' + kms + '</td>';
                    }
                }
            }
        }
        table += '</tr>';
    }
    var node = document.getElementById("ingredients");
    node.innerHTML = table;
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
        create_table(list);
    }).catch(function(err) {
        console.log("there was a error");
        console.log("Error: " + err);
    });
	
}

function delItem() {
	//deleteList
}

function addFriend() {
	var FriendName = document.getElementById("Friend").value;
	//var listName =
	addListToUser(listName, "Friend");
}

function newFriend() {

}

/* When the user clicks on the button,
toggle between hiding and showing the dropdown content */
function myDropList() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
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

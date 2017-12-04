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
    var lists = getUserLists();
    console.log(lists);
    for (var i = 0; i < lists.length; i++) {
        create_button(lists.listName);
        //add_style(i);
    }
}

function newElement() {
    var inputValue = document.getElementById("myInput").value;
    //get users list and also make sure that this list doesn't already exist
    if(inputValue != "") {
        create_button(inputValue);
        createList(inputValue);
        addListToUser(inputValue, localStorage.getItem(user));
    }
  }

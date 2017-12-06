function getRecipes() {
    var search = document.getElementById("Search").value;
    var q = document.getElementById("Number").value;
    //var res = url.split("=");
    //var list = res[1];
    //console.log(list);

    getRecipe(search, q)
	    .then(function (list1) {
            //console.log("return: " + list1);
            create_table(list1);
	    }).catch(function(err) {
	        console.log("there was a error");
	        console.log("Error: " + err);
	    });
}

function create_table(list1) {
    //example of input
    console.log(list1);
    var table = '';
	var list = list1;
    var rows = list.length + 1;
    var cols = 4;
    var i = -1;
    var imageName = '';
    var allIngredients = '';
    for (var r = 0; r < rows; r++) {
        table += '<tr>';
        //cols = total[r].all.length;
        for (var c = 0; c < cols; c++) {
            if (r == 0) {
                if (c == 0) {
                    table += '<th>' + "Picture" + '</th>';
                }
                else if (c == 1) {
                    table += '<th>' + "Name" + '</th>';
                }
                else if (c == 2) {
                    table += '<th>' + "Ingredients" + '</th>';
                }
                else if (c == 3) {
                    table += '<th>' + "Add?" + '</th>';
                }
            }
            else {
                //i++;
                if (c == 0) {
                    imageName = list[r-1].image;
                    console.log(imageName);
                    table += '<td><img src=' + imageName + ' border=3 height=100 width=100></img></td>';
                }
                else if (c == 1) {
                    table += '<td>' + list[r-1].name + '</td>';
                }
                else if (c == 2) {
                    allIngredients = list[r-1].ingredients.toString();
                    table += '<td>' +  allIngredients+ '</td>';
                }
                else if (c == 3) {
                    var kms = "add?";
                    table += '<td><input type="checkbox" value="checked" />' + kms + '</td>';
                }
            }
        }
        table += '</tr>';
    }
    var node = document.getElementById("recipes");
    node.innerHTML = table;

}

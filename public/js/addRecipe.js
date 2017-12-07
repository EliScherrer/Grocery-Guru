var returnedRecipes = [];

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
		returnedRecipes = list;
    var rows = list.length + 1;
    var cols = 4;
    var i = -1;
    var imageName = '';
    var allIngredients = '';
    var link = '';
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
                link = list[r-1].link;
                if (c == 0) {
                    imageName = list[r-1].image;
                    console.log(imageName);
                    table += '<td><a href="' + link + '"><img src=' + imageName + ' border=3 height=100 width=100></img></a></td>';
                }
                else if (c == 1) {
                    table += '<td><a href="' + link + '">' + list[r-1].name + '</a></td>';
                }
                else if (c == 2) {
                    // allIngredients = list[r-1].ingredients.toString();
										var temp = list[r-1]
										var allIngredients = ""
										for (var i = 0; i < temp.ingredients.length; i++) {
											allIngredients += temp.ingredients[i] + ", ";
										}

                    table += '<td>' +  allIngredients+ '</td>';
                }
                else if (c == 3) {
                    table += `<td><input type="button" class="addButton" onclick="addRecipeToList(${r})" value="Add To List"></input></td>`;
                }
            }
        }
        table += '</tr>';
    }
    var node = document.getElementById("recipes");
    node.innerHTML = table;

}

function addRecipeToList(index) {

	var i = index - 1;
	recipe = returnedRecipes[i];

	console.log(recipe);

	var itemName = recipe.name

	var ingredients = ""
	for (var i = 0; i < recipe.ingredients.length; i++) {
		ingredients += recipe.ingredients[i] + " ";
	}
	var quantity = ingredients;
	console.log(quantity);

	var type = "recipe";
	var acquired = "false";

	var url = window.location.toString();
	var res = url.split("=");
	var list = res[1];

	addItemToList(list, itemName, quantity, type, acquired)
		.then(function (result) {
				alert("added")
		}).catch(function(err) {
				console.log("there was a error");
				console.log("Error: " + err);
				return;
		});
}

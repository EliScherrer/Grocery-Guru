function create_table() {
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
    var table = '';
    var list = total[1];
    var rows = list.all.length + 1;
    var cols = 2;
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
                    table += '<th>' + "Add to List" + '</th>';
                }
            }
            else {
                //i++;
                if (c == 0) {
                    table += '<td>' + list.all[r-1].name + '</td>';
                }
                else if (c == 1) {
                    table += '<td>' + "Add to List" + '</td>';
                }
            }
        }
        table += '</tr>';
    }
    var node = document.getElementById("recipes");
    node.innerHTML = table;
}
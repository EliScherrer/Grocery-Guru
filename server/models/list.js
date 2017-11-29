const mongoose = require('mongoose');
const _ = require('lodash');

var ListSchema = new mongoose.Schema({
  listName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
	items: [{
		itemName : { type : String },
		quantity : { type : String },
		genre : { type : String },
		acquired : { type : Boolean },
	}],
});

ListSchema.statics.findByName = function (listName) {
	var List = this;

	return List.findOne({ listName }).then((list) => {
		if (!list) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			if (listName === list.listName) {
				resolve(list);
			}
			else {
				reject();
			}
		});
	});
};



var List = mongoose.model('lists', ListSchema)

module.exports = { List };

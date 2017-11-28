const mongoose = require('mongoose');
const _ = require('lodash');

var UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    minlength: 1,
  }
});

UserSchema.statics.findByCredentials = function (username, password) {
	var User = this;

	return User.findOne({username}).then((user) => {
		if (!user) {
			return Promise.reject();
		}

		return new Promise((resolve, reject) => {
			if (password === user.password) {
				resolve(user);
			}
			else {
				reject();
			}
		});
	});
};



var User = mongoose.model('users', UserSchema)

module.exports = { User };

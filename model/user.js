const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	photo_cloudinary: {
		type: String,
	},
	cloudinary_id: {
		type: String,
	},
});

const User = new mongoose.model("User",userSchema);

module.exports = User;
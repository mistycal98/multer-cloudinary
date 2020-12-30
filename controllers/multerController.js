const User = require("../model/user");
const cloudinary = require("cloudinary").v2;

getAllEmployees = async (req, res) => {
	try {
		let result = await User.find();
		res.json({
			status: "Sucess",
			data: result,
		});
	} catch (error) {
		console.log(error);
		res.json({
			status: "Unsucessful",
			message: "Error in getallemployees",
		});
	}
};

createEmployee = async (req, res) => {
	try {
		console.log(cloudinary);
		cloudinary.config({
			cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
			api_key: process.env.CLOUDINARY_API_KEY,
			api_secret: process.env.CLOUDINARY_API_SECRET,
		});
		console.log(cloudinary);
		const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
		let user = new User({
			name: req.body.name,
			photo_cloudinary: cloudinaryResult.secure_url,
			cloudinary_id: cloudinaryResult.public_id,
		});
		let result = await user.save();
		res.json({
			status: "Sucessfull",
			body: result,
		});
	} catch (err) {
		console.log(err);
	}
};
updateEmployee = () => {};
deleteEmployee = () => {};

module.exports = { getAllEmployees, createEmployee, updateEmployee, deleteEmployee };

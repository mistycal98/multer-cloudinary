const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const upload = require("./multer");
const cloudinary = require("./cloudinary");
const User = require("./model/user");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ status: "Success", message: "This is the Home Page" });
});

// POST method
app.post("/", upload.single("image"), async (req, res) => {
	try {
		const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
		let user = new User({
			name: req.body.name,
			photo_cloudinary: cloudinaryResult.url,
			cloudinary_id: cloudinaryResult.public_id,
		});
		let result = await user.save();
		res.json(result);
	} catch (err) {
		console.log(err);
	}
});

try {
	mongoose.connect(
		process.env.DB_CONNECT_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
		},
		() => {
			console.log("Connected to DB!");
		}
	);
} catch (error) {
	console.log(error);
}

app.listen(`${process.env.PORT}`, () => {
	console.log(`Started on ${process.env.PORT}`);
});

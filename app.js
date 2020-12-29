const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const upload = require("./multer");
const cloudinary = require("./cloudinary");

dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
	res.json({ status: "Success", message: "This is the Home Page" });
});
app.post("/", upload.single("image"), async (req, res) => {
	try{
		const cloudinaryResult = await cloudinary.uploader.upload(req.file.path);
		res.json(cloudinaryResult);   
	}catch(err){
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

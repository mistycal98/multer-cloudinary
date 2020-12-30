const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");

const multerRoute = require('./routes/multerRoutes');
dotenv.config({ path: "./config.env" });

const app = express();

app.use(express.json());

// User Routes
app.use("/user", multerRoute);

// DB Connection 
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

// home page
app.get("/", (req, res) => {
	res.json({ status: "Success", message: "This is the Home Page" });
});

// 404 not found handler
app.get('*', (req,res)=>{
	res.json({status:"Success",message : "No routes found 404"});
});

app.listen(`${process.env.PORT}`, () => {
	console.log(`Started on ${process.env.PORT}`);
});

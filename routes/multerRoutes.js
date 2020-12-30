const express = require("express");
const upload = require("../utils/multer");
const { createEmployee, getAllEmployees } = require("../controllers/multerController");
const multerRoute = express.Router();

multerRoute.route("/").get(getAllEmployees).post(upload.single("image"), createEmployee);

module.exports = multerRoute;

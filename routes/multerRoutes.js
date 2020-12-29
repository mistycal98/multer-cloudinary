const express = require("express");
const upload = require("../middlewares/multer");
const { createEmployee, getAllEmployees } = require("../controllers/multerController");
const router = express.Router();

router.route("/").get(getAllEmployees).post(upload.single("image"), createEmployee);

module.exports = router;

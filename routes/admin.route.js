const express = require("express");
const upload = require("../middlewares/upload");
const checktoken = require("../middlewares/checktoken");

const AdminController = require("../controllers/admin.controller");

const router = express.Router();

router.get("/collections", checktoken, AdminController.GetCollections);

router.post("/upload", checktoken, upload, (req, res) => {
	upload(req, res, (err) => {
		if (err) {
			res.status(500).json({
				code: 500,
				error: "something went wrong while uploading",
			});
		} else {
			res.status(201).json({ code: 201, status: "success" });
		}
	});
});

router.post("/login", AdminController.Login);
router.post("/register", AdminController.Register);

module.exports = router;

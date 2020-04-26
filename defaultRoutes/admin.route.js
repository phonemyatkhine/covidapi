var MongoClient = require("mongodb").MongoClient;
var express = require("express");
var multer = require("multer");
var jwt = require("jsonwebtoken");
var router = express.Router();
var Admin = require("../defaultModels/admin.model");
var Checker = require("../defaultFunctions/TokenChecker");
var crypto = require("crypto");
require("dotenv").config();

module.exports = router;
const expiration = 4000000;

var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, __dirname + "/uploads");
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname);
	},
});
var upload = multer({ storage: storage }).any();

router.post("/add_file", upload, (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		res.redirect("/");
	});
});

router.get("/collections", Checker, function (req, res) {
	var Redata = [];
	MongoClient.connect(
		process.env.DATABASE_URL,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
		},
		function (err, db) {
			var db1 = db.db("covidapi");
			db1.listCollections().toArray(function (err, items) {
				items.forEach((element) => {
					if (element.name != "admin") {
						Redata.push(element.name);
					}
				});
				res.status(200).json({ code: 200, data: Redata });
			});
		}
	);
});

router.post("/login", async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	console.log("Login calling " + email + " : " + password);
	var token = null;

	if (req.query.token != null) {
		token = req.query.token;
		console.log("Tokein found " + token);
	}

	if (token) {
		jwt.verify(token, process.env.KEY, (err, _nil) => {
			if (err) {
				console.log("verifying error");
				res.status(403).json({
					code: 403,
					error: "Invalid token",
				});
			} else {
				res.status(200).json({ code: 200, token: token });
			}
		});
	} else {
		try {
			var admin = await Admin.findOne({
				email: email,
			});
			if (admin) {
				console.log("Found");

				salt = admin.salt;
				let input_pass = `${password}${salt}`;
				let hashedPassword = crypto
					.createHash("sha1")
					.update(input_pass)
					.digest("hex");
				if (hashedPassword == admin.password) {
					console.log("matched!");
					token = jwt.sign(
						{
							email,
							password,
						},
						process.env.KEY,
						{
							expiresIn: "1d",
						}
					);
					console.log("returning token");
					res.status(200).json({ code: 200, token: token });
				} else {
					res.status(403).json({
						code: 403,
						error: "Invalid email or password",
					});
				}
			} else {
				res.status(403).json({
					code: 403,
					error: "Invalid email or password",
				});
			}
		} catch (err) {
			res.status(500).json({ code: 500, error: "Something went wrong" });
		}
	}
});

router.post("/register", async (req, res) => {
	console.log("Register calling");

	// use password salt for uncrackable hash
	let email = req.body.email;
	let password = req.body.password;
	let key = req.body.key;
	let salt = "_" + Math.random().toString(36).substr(2, 9);

	let SaltedPassword = `${password}${salt}`;
	let hashedPassword = crypto
		.createHash("sha1")
		.update(SaltedPassword)
		.digest("hex");

	if (key == process.env.KEY) {
		try {
			let admin = new Admin({
				email: email,
				salt: salt,
				password: hashedPassword,
			});
			try {
				var newAdmin = await Admin.findOne({
					email: email,
				});
				if (newAdmin) {
					res.status(422).json({
						code: 422,
						error: "email address is already registered.",
					});
				} else {
					await admin.save();
					token = jwt.sign(
						{
							email,
							password,
						},
						process.env.KEY,
						{
							expiresIn: "1d",
						}
					);
					res.status(201).json({ code: 201, token: token });
				}
			} catch (err) {
				res.status(500).json({ code: 500, error: err.body });
			}
		} catch (err) {
			res.status(500).json({ code: 500, error: err.body });
		}
	}
});

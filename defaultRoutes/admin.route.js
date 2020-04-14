var MongoClient = require('mongodb').MongoClient;
var express = require("express");
var multer = require('multer');
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
		cb(null, __dirname + '/uploads')
	},
	filename: function (req, file, cb) {
		cb(null, file.originalname)
	}
})
var upload = multer({ storage: storage }).any();

router.post('/add_file', upload, (req, res) => {
	upload(req, res, function (err) {
		if (err) {
			return res.end("Error uploading file.");
		}
		res.redirect('/');
	});
});

router.get('/collections', Checker, function (req, res) {
	var Redata = [];
	MongoClient.connect(process.env.DATABASE_URL_TESTING, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	}, function (err, db) {
		var db1 = db.db('covidapi');
		db1.listCollections().toArray(function (err, items) {
			console.log(items);
			items.forEach(element => {
				if (element.name != "admin") {
					Redata.push(element.name);
				}
			});
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.json(Redata);
		});
	});
});

//dev stage
router.get("/", Checker, function (req, res) {
	res.redirect("http://localhost:3000/static/coviddashB/html/main.html");
});

router.get("/login", function (req, res) {
	res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
});

// router.get(/\/login(\/r=(.*))?/, (req, res) => {
// 	// above regex resolve /login/r=uri-to-redirect
// 	const render_data = { redirect_to: undefined };
// 	const redirect_url = req.params[1];
// 	if (redirect_url) {
// 		render_data = { redirect_to: redirect_url };
// 	}
// 	// redirect_url will embed to login page
// 	res.render("login", render_data);
// });
router.post("/login", async (req, res) => {
	console.log("Login calling")
	let email = req.body.email;
	let password = req.body.password;

	var token = null;

	if (req.cookies.token != null) {
		token = req.cookies.token;
		console.log("Tokein found");
	}

	if (token) {
		jwt.verify(token, process.env.KEY, (err, _nil) => {
			if (err) {
				console.log("verifying error");

				res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
			}
			else {
				res.redirect("http://localhost:3000/static/coviddashB/html/main.html")
			}
		});
	} else {
		try {
			var admin = await Admin.findOne({
				email: email
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
					token = jwt.sign({
						email,
						password
					},
						process.env.KEY, {
						expiresIn: "1d"
					}
					);
					console.log("Assign Cookie");

					res.status(200)
						.cookie("token", token, {
							expires: new Date(Date.now() + expiration),
							secure: false,
							httpOnly: true
						})
						.cookie("acc",email)
						.redirect("http://localhost:3000/static/coviddashB/html/main.html");
				} else {
					res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
				}
			} else {
				res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
			}
		} catch (err) {
			res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
		}
	}
});


router.post("/register", async (req, res) => {
	console.log("Register calling");

	// use password salt for uncrackable hash
	let email = req.body.email;
	let password = req.body.password;
	let key = req.body.key;
	let salt =
		"_" +
		Math.random()
			.toString(36)
			.substr(2, 9);

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
				password: hashedPassword
			});
			try {
				var newAdmin = await admin.save();
				token = jwt.sign({
					email,
					password
				},
					process.env.KEY, {
					expiresIn: "1d"
				}
				);


				res.status(200)
					.cookie("token", token, {
						expires: new Date(Date.now() + expiration),
						secure: false,
						httpOnly: true
					})
					.cookie("acc",email)
					.redirect("http://localhost:3000/static/coviddashB/html/main.html");
			} catch (err) {
				res.status(200).json({
					message: "Admin Account Created"
				});
			}
		} catch (err) {
			res.status(500).json({
				message: err.message
			});
		}
	}
});

router.post("/logout", async (req, res) => {
	console.log("logging out");
	if (req.cookies.token != null) {
		res.status(200)
			.clearCookie("token")
			.redirect("http://localhost:3000/static/coviddashB/html/login.html");
	}
	res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
});
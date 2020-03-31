var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var Admin = require("../models/admin.model");
var Contact = require("../models/contact.model");
var crypto = require("crypto");
require("dotenv").config();

module.exports = router;
const expiration = 400000;

router.get("/login", function(req, res) {
	res.render("login");
});

// wildcard regex route for redirect login
/* 
 *	admin/login/r/(foo)
 *	will redirect to foo
*/
router.get(/\/login\/r(.*)/, function(req, res) {
	res.render("login", { redirect: req.params[0] });
});

router.post("/login", async (req, res) => {
	console.log("Log In Post");
	console.log(req.body);
	let redirect = req.body.redirect || null;
	let email = req.body.email;
	let password = req.body.password;
	let hashedPassword = crypto
		.createHash("md5")
		.update(password)
		.digest("hex");
	var token = null;

	if (req.cookies.token != null) {
		token = req.cookies.token;
	}
	if (token != null) {
		jwt.verify(token, process.env.KEY, (err, ele) => {
			if (err) {
				res.render("login", { redirect: redirect });
			}
		});
		if (redirect) {
			res.redirect(redirect);
		} else {
			res.redirect("/admin");
		}
	} else {
		try {
			var admin = await Admin.find({
				email: email,
				password: hashedPassword
			});
			if (admin.length != 0) {
				token = jwt.sign(
					{
						email,
						password
					},
					process.env.KEY,
					{
						expiresIn: "1d"
					}
				);
				res.status(200)
					.cookie("token", token, {
						expires: new Date(Date.now() + expiration),
						secure: false,
						httpOnly: true
					})
					.then(() => {
						res.redirect(redirect);
					});
			} else {
				res.render("login", { redirect: redirect });
			}
		} catch (err) {
			res.render("login", { redirect: redirect });
		}
	}
});

router.post("/register", async (req, res) => {
	let email = req.body.email;
	let password = req.body.password;
	let key = req.body.key;
	let hashedPassword = crypto
		.createHash("md5")
		.update(password)
		.digest("hex");
	console.log(req.body);
	if (key == process.env.KEY) {
		try {
			var admin = new Admin({
				email: email,
				password: hashedPassword
			});
			try {
				var newAdmin = await admin.save();
				token = jwt.sign(
					{
						email,
						password
					},
					process.env.KEY,
					{
						expiresIn: "1d"
					}
				);
				res.status(200)
					.cookie("token", token, {
						expires: new Date(Date.now() + expiration),
						secure: false,
						httpOnly: true
					})
					.render("admin");
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
	if (req.cookies.token != null) {
		res.status(200)
			.cookie("token", { expires: Date.now() })
			.then(() => {
				res.redirect("/admin/login");
			});
	}
});

router.get("/create-contact", (req, res) => {
	var token = null;
	if (req.cookies.token != null) {
		token = req.cookies.token;
	}
	if (token != null) {
		jwt.verify(token, process.env.KEY, (err, ele) => {
			if (err) {
				res.redirect(`/admin/login/r/admin/create-contact`);
			}
		});
		res.render("forminput");
	} else {
		res.redirect(`/admin/login/r/admin/create-contact`);
	}
});

router.get("/", function(req, res, next) {
	var token = null;
	if (req.cookies.token != null) {
		token = req.cookies.token;
	}
	if (token != null) {
		jwt.verify(token, process.env.KEY, (err, ele) => {
			if (err) {
				res.redirect("/admin/login/r/admin/");
			}
		});
		Contact.find({}, (err, data) => {
			if (err) {
				console.log(err);
			}
			res.render("admin", { contacts: data });
		});
	} else {
		res.redirect("/admin/login/r/admin/");
	}
});

async function getAdmin(req, res, next) {
	var email = req.body.email;

	try {
		admin = await Admin.findOne({
			email: email
		});
		if (admin != null) {
			return res.status(409).json({
				message: "Admin account already created."
			});
		}
	} catch (err) {
		return res.status(500).json({
			message: err.message
		});
	}

	next();
}
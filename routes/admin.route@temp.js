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

var express = require("express");
var jwt = require("jsonwebtoken");
var router = express.Router();
var Admin = require("../models/admin.model");
var Contact = require("../models/contact.model");
var crypto = require("crypto");
require("dotenv").config();

module.exports = router;
const expiration = 400000;

router.get(/\/login(\/r=(.*))?/, (req, res) => {
	// above regex resolve /login/r=uri-to-redirect
	const render_data = { redirect_to: undefined };
	const redirect_url = req.params[1];
	if (redirect_url) {
		render_data = { redirect_to: redirect_url };
	}
	// redirect_url will embed to login page
	res.render("login", render_data);
});

router.post("/login", async (req, res) => {
	let redirect_url = req.body.redirect_to;
	const render_data = { redirect_to: undefined };
	if (redirect_url) {
		render_data = { redirect_to: redirect_url };
	}
	let email = req.body.email;
	let password = req.body.password;

	var token = null;

	if (req.cookies.token != null) {
		token = req.cookies.token;
	}

	if (token) {
		jwt.verify(token, process.env.KEY, (err, _nil) => {
			if (err) {
				res.render("login", render_data);
			}
		});
		if (redirect_url) {
			res.redirect(redirect_url);
		} else {
			res.redirect("/admin");
		}
	} else {
		try {
			var admin = await Admin.findOne({
				email: email
			});
			if (admin) {
				salt = admin.salt;
				let input_pass = `${password}${salt}`;
				let hashedPassword = crypto
					.createHash("sha1")
					.update(input_pass)
					.digest("hex");
				console.log(`Hash: ${hashedPassword}`);
				if (hashedPassword == admin.password) {
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
					res.render("login", render_data);
				}
			} else {
				res.render("login", render_data);
			}
		} catch (err) {
			res.render("login", render_data);
		}
	}
});

router.post("/register", async (req, res) => {
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
		console.log(`Hash: ${hashedPassword}`);
		try {
			let admin = new Admin({
				email: email,
				salt: salt,
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

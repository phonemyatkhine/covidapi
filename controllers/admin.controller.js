const mongoose = require("mongoose");
const Admin = require("../models/admin.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const GetCollections = (req, res) => {
	let list = [];
	mongoose.connection.db.listCollections().toArray((err, collections) => {
		if (err) {
			res.status(500).json({
				code: 500,
				error:
					"Something went wrong when exporting mongoose collection list",
			});
		} else {
			collections.forEach((collection) => {
				if (collection.name !== "admin") {
					list.push(collection.name);
				}
			});
			res.status(200).json({ code: 200, data: list });
		}
	});
};

const Login = async (req, res) => {
	let email = req.body.email || req.query.email;
	let password = req.body.password || req.query.password;
	console.log("Login calling " + email + " : " + password);
	var token = null;

	if (req.query.token != null) {
		token = req.query.token;
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
				salt = admin.salt;
				let input_pass = `${password}${salt}`;
				let hashedPassword = crypto
					.createHash("sha1")
					.update(input_pass)
					.digest("hex");
				if (hashedPassword == admin.password) {
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
			console.error(err);
			res.status(500).json({ code: 500, error: "Something went wrong" });
		}
	}
};

const Register = async (req, res) => {
	// use password salt for uncrackable hash
	let email = req.body.email || req.query.email;
	let password = req.body.password || req.query.password;
	let key = req.body.key || req.query.key;

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
					res.status(201).json({
						code: 201,
						token: token,
						message: "Admin account created successfully",
					});
				}
			} catch (err) {
				res.status(500).json({ code: 500, error: err.body });
			}
		} catch (err) {
			res.status(500).json({ code: 500, error: err.body });
		}
	}
};

module.exports = {
	GetCollections: GetCollections,
	Login: Login,
	Register: Register,
};

var express = require("express");
var router = express.Router();
var jwt = require("jsonwebtoken");
var Contact = require("../models/contact.model");

module.exports = router;

router.get("/list", async (req, res) => {
	try {
		var contact = await Contact.find({});
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(contact);
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
});

// Get contacts from certain division and certain type
router.get("/list/:state/:type", async (req, res) => {
	let stateDivision = req.params.state;
	let contactType = req.params.type;
	try {
		var contact = await Contact.find({
			stateDivision: stateDivision,
			contactType: contactType
		});
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(contact);
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
});

//Get contacts from certain division
router.get("/list/:state/", async (req, res) => {
	let stateDivision = req.params.state;
	try {
		var contact = await Contact.find({ stateDivision: stateDivision });
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json(contact);
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
});

router.post("/", getContact, async (req, res, next) => {
	if (res.contact == null) {
		var contact = new Contact({
			name: req.body.name,
			phoneNumber: req.body.phoneNumber,
			location: req.body.location,
			stateDivision: req.body.stateDivision,
			contactType: req.body.contactType,
			status: req.body.status
		});
		try {
			var newcontact = await contact.save();
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(201).json(newcontact);
		} catch (err) {
			res.status(400).json({
				message: err.message
			});
		}
	} else {
		res.status(409).json({
			message: "Contact Already Exists"
		});
	}
});

// Update one contact
router.patch("/name/:name", getContact, async (req, res) => {
	try {
		contact.overwrite({
			name: req.body.name,
			phoneNumber: req.body.phoneNumber,
			location: req.body.location,
			stateDivision: req.body.stateDivision,
			contactType: req.body.contactType,
			status: req.body.status
		});
		try {
			await contact.save();
			res.setHeader("Access-Control-Allow-Origin", "*");
			res.status(201).json(contact);
		} catch (err) {
			res.status(400).json({
				message: err.message
			});
		}
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
});

// Delete one subscriber
router.delete("/name/:id", getContact, async (req, res) => {
	try {
		await res.contact.remove();
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.json({
			message: "Deleted This Contact"
		});
	} catch (err) {
		res.status(500).json({
			message: err.message
		});
	}
});

//get contact
async function getContact(req, res, next) {
	var token = null;
	if (req.cookies.token != null) {
		token = req.cookies.token;
	}
	if (token != null) {
		jwt.verify(token, process.env.KEY, (err, ele) => {
			if (err) {
				res.render("login");
			}
		});
		if (req.params.name == null) {
			var name = req.body.name;
		} else {
			var name = req.params.name;
		}

		let contact = null;
		try {
			contact = await Contact.findOne({ name: name });
			// ! duplicated - @heinthanth
			// if (contact == null) {
			// 	res.setHeader("Access-Control-Allow-Origin", "*");
			// 	next();
			// }
		} catch (err) {
			return res.status(500).json({
				message: err.message
			});
		}
		res.setHeader("Access-Control-Allow-Origin", "*");
		res.contact = contact;
		next();
	} else {
		res.render("login");
	}
}

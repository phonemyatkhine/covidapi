var jwt = require("jsonwebtoken");

function TokenCheck(req, res, next) {
	console.log("Checker Operation");
	var token = null;
	if (req.query.token != null) {
		token = req.query.token;
	} else {
		res.status(403).json({
			code: 403,
			error: "an active token must be passed as parameter",
		});
	}
	if (token) {
		jwt.verify(token, process.env.KEY, (err, _nil) => {
			if (err) {
				// res.redirect("http://localhost:3000/static/coviddashB/html/login.html");
				res.status(403).json({
					code: 403,
					error: "an active token must be passed as parameter",
				});
			}
		});
		next();
	}
}

module.exports = TokenCheck;

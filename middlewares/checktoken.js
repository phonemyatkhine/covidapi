const jwt = require("jsonwebtoken");

const fn = (req, res, next) => {
	let token = req.query.token || req.body.token;
	if (token) {
		jwt.verify(token, process.env.KEY, (err, _) => {
			if (err) {
				res.status(403).json({
					code: 403,
					error: "invalid token",
				});
			}
			next();
		});
	} else {
		res.status(403).json({
			code: 403,
			error: "an active token must be passed as parameter",
		});
	}
};

module.exports = fn;

const jwt = require("jsonwebtoken");
require("dotenv").config();

function checkAuth(req, res, next) {
	try {
		const token = req.headers.authorization.split(" ")[1];
		const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
		req.userData = decodedToken;
		next();
	} catch (error) {
		return res.status(401).json({
			message: "Invalid or expired token provided!",
			error: error,
		});
	}
}

module.exports = {
	checkAuth: checkAuth,
};

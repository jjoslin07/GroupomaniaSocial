// Import json web token dependency.
const jwt = require('jsonwebtoken');

// Middleware to create token access for a unique user.
module.exports = (req, res, next) => {
    try {
        // Extract the token from the incoming request's Authorization header.
        const token = req.headers.authorization.split(' ')[1];
        // Decode the token if !valid throw error.
        const decodedToken = jwt.verify(token, process.env.SECRET_TOKEN);
        // Extract user id from the token.
        const userId = decodedToken.userId;
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            // Pass execution along if everything is working correctly.
            next();
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};
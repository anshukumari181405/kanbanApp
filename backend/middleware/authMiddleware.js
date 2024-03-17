const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. Token not provided.' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, 'secretkey');
    // Attach the user ID to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;

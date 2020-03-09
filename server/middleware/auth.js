const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
  // Get token from header
  const token = req.header('authToken');

  // Check if there is token
  if (!token) {
    return res.status(401).json({ msg: 'Invalid authorization' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtToken'));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Invalid token' });
  }
};

const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized - Missing token' });
  }

  try {
    jwt.verify(token, 'your-secret-key', (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      req.user = user;
      next();
    });
    
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized - Invalid token' });
  }
};


const fetchUserDetailsVToken = (token) => {
  const newToken = token.split(" ")[1];
  let newUser;
  jwt.verify(newToken, 'your-secret-key', (err, user) => {
      if (err) return res.status(403).json({ message: 'Forbidden' });
      newUser = user;
    });
    return newUser;
};

module.exports = { verifyToken, fetchUserDetailsVToken };

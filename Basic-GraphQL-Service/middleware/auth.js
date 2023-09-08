const jwt = require('jsonwebtoken');

const SECRET_KEY = process.env.JWT_SECRET;

const verifyToken = (token) => {
  try {
    if (!token) return null;
    const user = jwt.verify(token, SECRET_KEY);
    return user;
  } catch (error) {
    return null;
  }
};

module.exports = {
  verifyToken,
};

const jwt = require('jsonwebtoken');

const tokenMiddleware = (req, res, next) => {
  const bearer = req.headers.authorization;
  const token = bearer?.split(' ')[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET || "secret", (err, decoded) => {
      if (err) {
        return res.status(401).json({
          message: 'Invalid token',
          error: err,
        });
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(401).json({
      message: 'No token provided',
    });
  }
}

module.exports = tokenMiddleware;
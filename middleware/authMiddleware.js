const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({ message: 'No token provided' });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(500).send({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  });
};

// const jwt = require('jsonwebtoken');
// const secret = process.env.SECRET; // Replace with your actual secret

// const verifyToken = (req, res, next) => {
//   const token = req.headers['x-access-token'];
//   if (!token) {
//     return res.status(403).send({ message: 'No token provided!' });
//   }

//   jwt.verify(token, secret, (err, decoded) => {
//     if (err) {
//       return res.status(500).send({ message: 'Failed to authenticate token.' });
//     }
//     // Save user ID for use in other routes
//     req.userId = decoded.id;
//     next();
//   });
// };

// module.exports = { verifyToken };

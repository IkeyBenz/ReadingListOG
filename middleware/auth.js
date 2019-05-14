const jwt = require('jsonwebtoken');
const User = require('../models/user');

/** Checks if the request is authenticated. */
module.exports = function checkAuth(req, res, next) {
  if (req.cookies && req.cookies.rl) {
    const id = jwt.decode(req.cookies.rl)._id;
    User.findById(id).then((user) => {
      req.user = user;
      res.locals.authenticatedUser = user;

      return next();
    });
  } else {
    next();
  }
};

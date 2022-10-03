const jwt = require("jsonwebtoken");

const { createError } = require("../utils/error");

const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }

  jwt.verify(token, process.env.JWT_TOKEN, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    // console.log(user);
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === user.param.id || req.user.user_type === "admin") {
      next();
    } else {
      return next(createError(403, "You are not authorized"));
    }
  });
};

const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.user_type === "user") {
      return next(createError(403, "You are not authorized!"));
    }
    next();
  });
};

module.exports = {  verifyUser, verifyAdmin };

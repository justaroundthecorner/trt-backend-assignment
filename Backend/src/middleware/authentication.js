const jwt = require("jsonwebtoken");
const config_data = require("../../config.json").development;

const isAuthenticated = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    const err = {
      message: "Not authenticated",
      status: 401,
    };
    next(err);
  }

  jwt.verify(token, config_data.secret_key, (err, user) => {
    console.log('hi')
    if (err) {
      const err = {
        message: "This access is forbidden",
        status: 403,
      };
      next(err);
    }
    req.user = user;
    next();
  });
};
module.exports = isAuthenticated;

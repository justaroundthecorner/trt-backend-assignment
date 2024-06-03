const express = require("express");
const router = express.Router();
const UserBusiness = require("../business/userBusiness");
const session = require('express-session');
const schemaValidator = require('../middleware/schemaValidator');
const schemas = require('../schema');


//register a new User
router.post("/user/registration",[schemaValidator(schemas.userRegister)], async (req, res, next) => {
  let result;
  try {
    const userBusiness = new UserBusiness();
    result = await userBusiness.registerUser(req.params, req.body);
    res.status(result.status).send(result);
  } catch (err) {
    const error = {
      message: err,
      status: 400,
    };
    next(error);
  }
});

//Login as a user with JWT
router.post("/user/login",[schemaValidator(schemas.userLogin)], async (req, res, next) => {
    let result;
    try {
      const userBusiness = new UserBusiness();
      result = await userBusiness.loginUser(req.params, req.body);
      req.session.user_id=result.user_id
      delete result.user_id
      res.status(result.status).send(result);
    } catch (err) {
      const error = {
        message: err,
        status: 401,
      };
      next(error);
    }
  
  });

module.exports = router;

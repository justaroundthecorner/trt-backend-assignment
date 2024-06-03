const User = require("../Model/index").users;
const { transaction } = require("objection");
const bcrypt = require("bcrypt");
const config_data = require("../../config.json").development;
const jwt = require("jsonwebtoken");
const session = require("express-session");

class UserData {
  async registerUser(reqParam, payload) {
    //starting DB transaction for insertion
    const knex = User.knex();
    const trx = await transaction.start(User.knex());
    try {
      const { user_name, email, password } = payload;

      //encrypt the password to store in DB
      const hashedPassword = await bcrypt.hash(password, 10);
      let newPayload = { user_name, email, password: hashedPassword };
      let result = await User.query(trx).insert(newPayload);

      result = {
        success: true,
        message: "User registered successfully",
        status: 200,
      };
      await trx.commit();
      return result;
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
  async loginUser(reqParam, payload) {
    const knex = User.knex();
    const trx = await transaction.start(User.knex());
    try {
      let result, token;
      const { email, password } = payload;
      //getting user via email, since that is unique
      let user = await User.query(trx).where("email", email).first();
      //decrypting the password to authenticate user
      if (user && (await bcrypt.compare(password, user.password))) {

       // creating a jwt token as a response, expires in an hour
        token = jwt.sign(
          { id: user.id, email: user.email },
          config_data.secret_key,
          { expiresIn: "1h" }
        );
      
      result = {
        user_id: user.id,
        success: true,
        result: {
          access_token: token,
          token_type: "Bearer",
          expires_in: 3600,
        },
        message: "user login sucessfull",
        status: 200,
      };
      await trx.commit();
      return result;
    }
    } catch (err) {
      await trx.rollback();
      throw err;
    }
  }
}
module.exports = UserData;

const UserData = require("../data/userData");

class UserBusiness {
  constructor() {
    this.userData = new UserData();
  }

  // register user
  async registerUser(reqParam, reqBody) {
    let result;
    try {
      result = await this.userData.registerUser(reqParam, reqBody);
      return result;
    } catch (err) {
      throw err;
    }
  }

  //login a user
  async loginUser(reqParam, reqBody) {
    let result;
    try {
      result = await this.userData.loginUser(reqParam, reqBody);
      return result;
    } catch (err) {
      throw err;
    }
  }
 }
module.exports = UserBusiness;

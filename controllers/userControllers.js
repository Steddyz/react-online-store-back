const ApiError = require("../error/ApiError");

class UserController {
  async register(req, res) {}
  async login(req, res) {}
  async check(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("you didn't add an ID"));
    }
    res.json(id);
  }
}

module.exports = new UserController();

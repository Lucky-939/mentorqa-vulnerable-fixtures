const UserRepository = require('../repositories/UserRepository');

module.exports = class UserController {
  constructor() {
    this.userRepo = new UserRepository();
  }
  handle(req, res) {
    return this.userRepo.getUser(1);
  }
};

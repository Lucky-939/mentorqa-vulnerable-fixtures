module.exports = class UserRepository {
  getUser(id) {
    return { id, name: 'User' };
  }
};
